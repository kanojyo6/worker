const baseUrl = "http://183.136.206.77:45212"

// 获取推荐信息
export const requestRecommendedInfo = async (page: number, size: number) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + '/api/recruitments/recommended',
			data: {
				page: page,
				size: size
			},
			method: 'GET',
			header: {
				'Content-Type': 'application/json'
			},
			success: (res: any) => {
				if (res.statusCode === 200) {
					console.log('请求推荐需求信息成功: ', res);
					const data = res.data as { content : any[] }
					const responseData = data.content.map(item => {
						return {
							id: item.id,
							imageUrl: item.imageUrl,
							title: item.title,
							salaryPeriod: item.salaryPeriod
						};
					})
					resolve(responseData)
					uni.hideLoading();
				} else {
					const errorMsg = res.data?.message || '请求失败，请重试';
					uni.showToast({
						title: errorMsg,
						icon: 'none'
					});
				}
			},
			fail: (error: any) => {
				console.log('请求推荐需求信息失败: ', error)
				uni.showToast({
					title: '网络错误，请检查网络后重试',
					icon: 'none'
				});
			}
		})
	})
}