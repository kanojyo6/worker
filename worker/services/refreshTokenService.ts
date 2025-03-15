const baseUrl = "http://183.136.206.77:45212"

// 辅助方法
const showAlert = () => {
	uni.showModal({
		title: '提示',
		content: '登录已过期，请重新登陆',
		success: (res) => {
			if (res.confirm) {
				uni.switchTab({ url: '/pages/tabbar/myPage' });
			} else {
				uni.navigateBack();
			}
		}
	});
}

// 刷新token
export const refreshAccessToken = async () => {
	return new Promise((resolve, reject) => {
		const REFRESH_TOKEN = uni.getStorageSync('refresh_token')
		console.log('refresh_token = ', REFRESH_TOKEN);
		if (REFRESH_TOKEN === '') {
			console.log('登录失效，请重新登陆');
			uni.hideLoading()
			uni.showToast({
				title: '登录失效，请重新登陆',
				icon: 'none'
			})
			showAlert()
			reject('刷新token失败');
		}
		uni.request({
			url: baseUrl + `/auth/token/refresh/miniapp`,
			method: 'POST',
			header: {
				'Content-Type': 'application/json',
				'X-Refresh-Token': REFRESH_TOKEN
			},
			success: (res : any) => {
				if (res.statusCode === 200) {
					console.log('刷新token成功: ', res);
					const { access_token, refresh_token } = res.data;
					uni.setStorageSync('token', access_token);
					uni.setStorageSync('refresh_token', refresh_token);
					console.log('刷新成功：access_token: ', uni.getStorageSync('token'))
					console.log('刷新成功：refresh_token: ', uni.getStorageSync('refresh_token'))
					resolve(res.data);
					uni.hideLoading();
				} else {
					const errorMsg = res.data?.message || '请求失败，请重试';
					uni.showToast({
						title: errorMsg,
						icon: 'none'
					});
					showAlert()
					reject('刷新token失败');
				}
			},
			fail: (error : any) => {
				console.log('刷新token失败: ', error)
				uni.showToast({
					title: '网络错误，请检查网络后重试',
					icon: 'none'
				});
				showAlert()
				reject('刷新token失败');
			}
		})
	})
}

export const validateAccessToken = async () => {
	return new Promise((resolve, reject) => {
		const ACCESS_TOKEN = uni.getStorageSync('token')
		if (ACCESS_TOKEN === '') {
			console.log('ACCESS_TOKEN为空');
			uni.hideLoading()
			return
		}
		uni.request({
			url: baseUrl + `/auth/token/validate`,
			method: 'GET',
			header: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + ACCESS_TOKEN
			},
			success: (res : any) => {
				if (res.statusCode === 200) {
					console.log('验证token成功: ', res);
					const responseData = res.data;
					resolve(responseData);
					uni.hideLoading();
				} else {
					const errorMsg = res.data?.message || '请求失败，请重试';
					uni.showToast({
						title: errorMsg,
						icon: 'none'
					});
				}
			},
			fail: (error : any) => {
				console.log('刷新token失败: ', error)
				uni.showToast({
					title: '网络错误，请检查网络后重试',
					icon: 'none'
				});
			}
		})
	})
}