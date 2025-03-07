import { RecruitmentRequestModel } from '../model/recruitmentRequestModel'

const baseUrl = "http://183.136.206.77:45212"

// 提交发布需求
export const submitOrder = async (
	recruitmentData : RecruitmentRequestModel,
	resetFormCallback : () => void,
	setSubmittingCallback : (value : boolean) => void
) => {
	return new Promise((resolve, reject) => {
		// 发送创建招聘需求的请求
		uni.request({
			url: `${baseUrl}/api/recruitments`,
			method: 'POST',
			data: recruitmentData,
			header: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + uni.getStorageSync('token')
			},
			success: (res : any) => {
				if (res.statusCode === 200) {
					uni.showToast({
						title: '发布成功',
						icon: 'success'
					});

					// 发布成功后，清除表单数据
					resetFormCallback();

					// 延迟返回上一页或跳转到列表页
					setTimeout(() => {
						uni.navigateBack(); // 或跳转到其他页面
					}, 1500);
				} else {
					const errorMsg = res.data?.message || '发布失败，请重试';
					uni.showToast({
						title: errorMsg,
						icon: 'none'
					});
				}
			},
			fail: (err : any) => {
				console.error('发布招聘需求出错:', err);
				uni.showToast({
					title: '网络错误，请检查网络后重试',
					icon: 'none'
				});
			},
			complete: () => {
				// 调用更新提交状态的回调函数
				setSubmittingCallback(false);
			}
		});
	})
}