import { refreshAccessToken } from "./refreshTokenService"

const baseUrl = "http://183.136.206.77:45212"

// 获取分类详情
export const requestTypeDetailInfo = async (type : string, page: number, size: number) => {
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
			url: baseUrl + `/api/recruitments/type/${type}}`,
			method: 'GET',
			data: {
				page: page,
				size: size
			},
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
					const newToken = await refreshAccessToken();
					if (newToken) {
						resolve(await requestTypeDetailInfo(type, page, size))
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