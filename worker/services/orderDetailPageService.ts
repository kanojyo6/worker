import { refreshAccessToken } from "./refreshTokenService"

const baseUrl = "http://183.136.206.77:45212"

// 获取推荐信息
export const requestOrderDetailInfo = async (id : number) => {
	return new Promise((resolve, reject) => {
		const token = uni.getStorageSync('token')
		if (token === '') {
			console.log('token无效');
			uni.hideLoading()
			uni.showToast({
				title: 'token无效',
				icon: 'none'
			})
			return
		}
		uni.request({
			url: baseUrl + `/api/recruitments/${id}`,
			method: 'GET',
			header: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			},
			success: async (res : any) => {
				if (res.statusCode === 200) {
					console.log('请求详情成功: ', res);
					const responseData = res.data;
					resolve(responseData);
					uni.hideLoading();
				} else if (res.statusCode === 403) {
					// 处理accessToken失效
					console.log('accessToken失效，尝试刷新');
					try {
						// 尝试刷新 Token
						const newToken = await refreshAccessToken();
						// 刷新成功：保存新 Token，并递归重试请求
						uni.setStorageSync("token", newToken);
						const retryResult = await requestOrderDetailInfo(id);
						resolve(retryResult);
					} catch (e) {
						// 刷新失败：拒绝 Promise，终止递归
						reject(e); 
					}
				} else {
					const errorMsg = res.data?.message || '请求失败，请重试';
					uni.showToast({
						title: errorMsg,
						icon: 'none'
					});
				}	 
			},
			fail: (error : any) => {
				console.log('请求详情失败: ', error)
				uni.showToast({
					title: '网络错误，请检查网络后重试',
					icon: 'none'
				});
			}
		})
	})
}