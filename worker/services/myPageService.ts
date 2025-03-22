import { refreshAccessToken } from './refreshTokenService'

const baseUrl = "http://183.136.206.77:45212"

// 获取我的需求
export const requestMyOrdersInfo = async (page : number, size : number) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + "/api/recruitments/my-published",
			method: 'GET',
			data: {
				page: page,
				size: size
			},
			header: {
				'content-type': 'application/json',
				'Authorization': 'Bearer ' + uni.getStorageSync('token')
			},
			success: async (res) => {
				if (res.statusCode === 200) {
					try {
						const data = res.data as { content : any[] }
						const responseData = data.content.map(item => {
							return {
								id: item.id,
								imageUrl: item.imageUrl,
								publisherId: item.publisherId,
								publisherName: item.publisherName,
								location: item.location,
								type: item.type,
								typeName: item.typeName,
								title: item.title,
								salary: item.salary,
								salaryPeriod: item.salaryPeriod,
								status: item.status,
								statusName: item.statusName,
								content: item.content,
								contactType: item.contactType,
								contactTypeName: item.contactTypeName,
								contactInfo: item.contactInfo
							};
						})

						console.log('获取我的发布成功', responseData);
						resolve(responseData)

					} catch (error) {
						console.log('解析数据失败:', error);
						reject('解析数据失败');
					}
				} else if (res.statusCode === 403) {
					console.log("accessToken失效，尝试刷新");
					try {
						// 尝试刷新 Token
						const newToken = await refreshAccessToken();
						// 刷新成功：保存新 Token，并递归重试请求
						uni.setStorageSync("token", newToken);
						const retryResult = await requestMyOrdersInfo(page, size);
						resolve(retryResult);
					} catch (e) {
						// 刷新失败：拒绝 Promise，终止递归
						reject(e);
					}
				} else {
					reject('获取我的发布失败');
				}
			}
		})
	})
}

// 获取我的申请
export const requestMyOffersInfo = async (page : number, size : number) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + "/api/applications/my-applications",
			method: 'GET',
			data: {
				page: page,
				size: size
			},
			header: {
				'content-type': 'application/json',
				'Authorization': 'Bearer ' + uni.getStorageSync('token')
			},
			success: async (res) => {
				if (res.statusCode === 200) {
					try {
						const data = res.data as { content : any[] }
						const responseData = data.content.map(item => {
							return {
								id: item.id,
								requirementId: item.requirementId,
								requirementTitle: item.requirementTitle,
								location: item.location,
								salary: item.salary,
								salaryPeriod: item.salaryPeriod,
								contactInfo: item.contactInfo,
								contactType: item.contactType,
								contactTypeName: item.contactTypeName,
								imageUrl: item.imageUrl
							};
						})

						console.log('获取我的申请成功', responseData);
						resolve(responseData)

					} catch (error) {
						console.log('解析数据失败:', error);
						reject('解析数据失败');
					}
				} else if (res.statusCode === 403) {
					console.log("accessToken失效，尝试刷新");
					try {
						// 尝试刷新 Token
						const newToken = await refreshAccessToken();
						// 刷新成功：保存新 Token，并递归重试请求
						uni.setStorageSync("token", newToken);
						const retryResult = await requestMyOffersInfo(page, size);
						resolve(retryResult);
					} catch (e) {
						// 刷新失败：拒绝 Promise，终止递归
						reject(e);
					}
				} else {
					reject('获取我的申请失败');
				}
			}
		})
	})
}