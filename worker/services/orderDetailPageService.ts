import { refreshToken } from "./AuthService"

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
						await refreshToken();
						// 刷新成功：保存新 Token，并递归重试请求
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

// 获取该订单的申请列表（我的需求专用）
export const requestApplicatorsList = async (requirementId : string, page: number) => {
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
			url: baseUrl + `/api/applications/requirement/${requirementId}/not-ignored`,
			method: 'GET',
			header: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			},
			data: {
				page: page,
				size: 20
			},
			success: async (res : any) => {
				if (res.statusCode === 200) {
					console.log('请求详情成功: ', res);
					const data = res.data as { content : any[] };
					const responseData = data.content;
					resolve(responseData);
					uni.hideLoading();
				} else if (res.statusCode === 403) {
					// 处理accessToken失效
					console.log('accessToken失效，尝试刷新');
					try {
						// 尝试刷新 Token
						await refreshToken();
						// 刷新成功：保存新 Token，并递归重试请求
						const retryResult = await requestApplicatorsList(requirementId, page);
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

// 同意申请（我的需求专用）
export const agreeApplicator = async (id : string) => {
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
			url: baseUrl + `/api/applications/${id}/accept`,
			method: 'POST',
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
						await refreshToken();
						// 刷新成功：保存新 Token，并递归重试请求
						const retryResult = await agreeApplicator(id);
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

// 忽略申请（我的需求专用）
export const ignoreApplicator = async (id : string) => {
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
			url: baseUrl + `/api/applications/${id}/ignore`,
			method: 'POST',
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
						await refreshToken();
						// 刷新成功：保存新 Token，并递归重试请求
						const retryResult = await ignoreApplicator(id);
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