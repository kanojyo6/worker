import { myOrderResponseModel } from '../model/myOrderResponseModel'

const baseUrl = "http://183.136.206.77:45212"

export const requestMyOrdersInfo = async () => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + "/api/recruitments/my-published",
			method: 'GET',
			header: {
				'content-type': 'application/json',
				'Authorization': 'Bearer ' + uni.getStorageSync('token')
			},
			success: (res) => {
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
				} else {
					reject('获取我的发布失败');
				}
			}
		})
	})
}