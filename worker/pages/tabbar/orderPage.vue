<template>
	<view class="orderPage-background">
		<scroll-view style="width: 100%;">
			<form style="display: flex; flex-direction: column; width: 100%;" @submit="handleSubmit">
				<!-- 基本信息 -->
				<view class="orderPage-basicMsg">
					<!-- 需求类型 -->
					<view class="orderPage-basicMsgItem">
						<view class="orderPage-itemTitle">需求类型:</view>
						<picker name="orderType" @change="handleOrderTypeChange" mode="selector" :value="orderTypeIndex"
							:range="orderTypeArr">
							<view class="orderPage-orderType">{{ orderTypeArr[orderTypeIndex] }}</view>
						</picker>
					</view>
					<!-- 需求标题 -->
					<view class="orderPage-basicMsgItem">
						<view class="orderPage-itemTitle">需求标题:</view>
						<input name="orderTitle" placeholder="请输入标题 (20字以内)" class="orderPage-orderTitle"
							v-model="orderTitle" maxlength="20" />
					</view>
					<!-- 详细内容 -->
					<view class="orderPage-basicMsgItem">
						<view class="orderPage-itemTitle">详细内容:</view>
						<textarea name="orderContent" placeholder="请输入内容 (300字以内)" class="orderPage-orderTextarea"
							v-model="orderContent" maxlength="300" />
					</view>
					<!-- 期望薪资 -->
					<view class="orderPage-basicMsgItem" style="margin-top: 220rpx;">
						<view class="orderPage-itemTitle">期望薪资:</view>
						<input name="orderSalary" placeholder="请输入期望薪资" class="orderPage-orderSalary"
							v-model="orderSalary" maxlength="30" />
					</view>
					<!-- 时间范围 -->
					<view class="orderPage-basicMsgItem">
						<view class="orderPage-itemTitle">时间范围:</view>
						<input name="orderTime" placeholder="请输入时间范围" class="orderPage-orderTitle" v-model="orderTime"
							maxlength="30" />
					</view>
				</view>

				<!-- 重要信息 -->
				<view class="orderPage-importentMsg">
					<view style="font-size: 28rpx; font-weight: bold; color: orange;">重要信息</view>
					<!-- 联系方式 -->
					<view class="orderPage-importentMsgItem" style="height: 150rpx;">
						<view class="orderPage-itemTitle">联系方式:</view>
						<view style="display: flex; flex-direction: column;">
							<radio-group @change="handleChatTypeChange" style="display: flex;">
								<label v-for="item in chatTypeMap" :key="item"
									style="display: flex; margin-left: 40rpx; align-items: center; margin-bottom: 20rpx;">
									<radio :value="item" :checked="item === orderChatTypeIndex"></radio>
									<view style="font-size: 26rpx;">{{ item }}</view>
								</label>
							</radio-group>
							<input name="orderChatNum" placeholder="请输入联系方式" type="number" class="orderPage-orderTitle"
								style="background: #DADADA;" v-model="orderChatNum" />
						</view>
					</view>
					<!-- 地址信息 -->
					<view class="orderPage-importentMsgItem">
						<view class="orderPage-itemTitle">地址信息:</view>
						<input name="orderAddress" placeholder="请输入地址信息" class="orderPage-orderTitle"
							style="background: #DADADA;" v-model="orderAddress" />
					</view>
					<!-- 补充图片 -->
					<view class="orderPage-importentMsgItem">
						<view class="orderPage-itemTitle">补充图片:</view>
						<button @click="getImg" class="orderPage-chooseImg" type="default">
							<view v-if="orderImage === ''">选择图片</view>
							<image v-else :src="orderImage" mode="aspectFill"
								style="width: 100%; height: 100%; border-radius: 10rpx;"></image>
						</button>
					</view>
					<!-- 图片上传状态 -->
					<view v-if="uploadStatus" class="upload-status"
						:class="{'upload-success': uploadSuccess, 'upload-error': !uploadSuccess}">
						{{ uploadStatusText }}
					</view>
				</view>

				<button form-type="submit" class="orderPage-submitBtn" :disabled="isSubmitting">
					{{ isSubmitting ? '发布中...' : '发布' }}
				</button>
			</form>
		</scroll-view>
	</view>
	<!-- 图片裁剪器 -->
	<wd-img-cropper v-model="showimgCropper" :img-src="selectedImageSrc" @confirm="handleConfirm"
		@cancel="handleCropCancel" :img-width="600" :img-height="600"></wd-img-cropper>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';

	// 定义类型接口
	interface RecruitmentData {
		title : string;
		content : string;
		salary : number;
		salaryPeriod : string;
		imageUrl : string;
		type : string;
		location : string;
		contactType : string;
		contactInfo : string;
		positionCount : number;
		companyName : string;
	}

	interface UploadResponse {
		imageUrl : string;
		message ?: string;
	}

	interface ChooseImageSuccessCallbackResult {
		tempFilePaths : string[];
		tempFiles : {
			path : string;
			size : number;
			type ?: string;
		}[];
	}

	interface CropperConfirmEvent {
		tempFilePath : string;
		[key : string] : any;
	}

	// API基础URL
	const API_BASE_URL : string = 'http://183.136.206.77:45212'; // 替换为你的API域名

	// 需求类型
	const orderTypeIndex = ref<number>(0);
	const orderTypeArr : string[] = ["技术类", "生活类", "家教类", "代办事", "校内兼职", "校外兼职", "实习", "买卖"];

	// 需求类型枚举映射
	const recruitmentTypeMap : string[] = [
		"TECH",
		"LIFESTYLE",
		"TUTORING",
		"ERRANDS",
		"CAMPUS_JOB",
		"OFF_CAMPUS_JOB",
		"INTERNSHIP",
		"TRADING"
	];

	// 联系方式类型
	const orderChatTypeIndex = ref<string>('微信号');
	const chatTypeMap : string[] = ["微信号", "手机号", "电子邮箱"];

	// 联系方式类型枚举映射
	const orderChatTypeMap : { [key : string] : string } = {
		"微信号": "WECHAT",
		"手机号": "PHONE",
		"电子邮箱": "EMAIL"
	};

	// 表单数据
	const orderTitle = ref<string>('');
	const orderContent = ref<string>('');
	const orderSalary = ref<string>('');
	const orderTime = ref<string>('');
	const orderChatNum = ref<string>('');
	const orderAddress = ref<string>('');

	// 图片数据
	const selectedImageSrc = ref<string>(''); // 原始图片数据
	const orderImage = ref<string>(''); // 裁剪后的本地图片路径
	const imageUrl = ref<string>(''); // 上传到服务器后的图片URL

	// 图片裁剪器显示状态
	const showimgCropper = ref<boolean>(false);

	// 上传和提交状态
	const isUploading = ref<boolean>(false);
	const isSubmitting = ref<boolean>(false);
	const uploadStatus = ref<boolean>(false);
	const uploadSuccess = ref<boolean>(false);
	const uploadStatusText = ref<string>('');

	// 获取选择图片
	const getImg = () : void => {
		uni.chooseImage({
			count: 1,
			sizeType: ["compressed"],
			success: (res : ChooseImageSuccessCallbackResult) => {
				console.log("选择图片成功");
				const tempFilePath = res.tempFilePaths[0];
				selectedImageSrc.value = tempFilePath;
				showimgCropper.value = true;
			},
			fail: () => {
				console.log('选择图片失败');
				uni.showToast({
					icon: 'none',
					title: '选择图片失败'
				});
			}
		});
	};

	// 处理裁剪选择图片（确认）
	const handleConfirm = (event : CropperConfirmEvent) : void => {
		console.log('启用裁剪');
		const { tempFilePath } = event;
		orderImage.value = tempFilePath;

		// 上传图片
		uploadImage(tempFilePath);
	};

	// 处理裁剪选择图片（取消）
	const handleCropCancel = () : void => {
		console.log('取消裁剪');
		uni.showToast({
			icon: 'none',
			title: '取消上传图片'
		});
	};

	// 上传图片
	const uploadImage = (filePath : string) : void => {
		isUploading.value = true;
		uploadStatus.value = true;
		uploadStatusText.value = '图片上传中...';

		// 获取token
		const token = uni.getStorageSync('token');
		if (!token) {
			uploadSuccess.value = false;
			uploadStatusText.value = '未登录，请先登录';
			isUploading.value = false;
			return;
		}

		uni.uploadFile({
			url: `${API_BASE_URL}/api/recruitments/upload-image`,
			filePath: filePath,
			name: 'file',
			header: {
				'Authorization': 'Bearer ' + token
			},
			success: (uploadRes) => {
				try {
					const data = JSON.parse(uploadRes.data) as UploadResponse;
					if (uploadRes.statusCode === 200 && data.imageUrl) {
						imageUrl.value = data.imageUrl;
						uploadSuccess.value = true;
						uploadStatusText.value = '图片上传成功';
						uni.showToast({
							title: '图片上传成功',
							icon: 'success'
						});
					} else {
						uploadSuccess.value = false;
						uploadStatusText.value = data.message || '图片上传失败';
						uni.showToast({
							title: data.message || '图片上传失败',
							icon: 'none'
						});
					}
				} catch (e) {
					uploadSuccess.value = false;
					uploadStatusText.value = '上传响应解析失败';
					console.error('上传响应解析失败:', e);
				}
			},
			fail: (err) => {
				uploadSuccess.value = false;
				uploadStatusText.value = '图片上传失败，请重试';
				console.error('图片上传失败:', err);
				uni.showToast({
					title: '图片上传失败，请重试',
					icon: 'none'
				});
			},
			complete: () => {
				isUploading.value = false;
			}
		});
	};

	// 需求类型变更处理
	const handleOrderTypeChange = (event : { detail : { value : string } }) : void => {
		console.log("orderType改变：", event.detail.value);
		orderTypeIndex.value = parseInt(event.detail.value);
	};

	// 联系方式类型变更处理
	const handleChatTypeChange = (event : { detail : { value : string } }) : void => {
		console.log("chatType改变：", event.detail.value);
		orderChatTypeIndex.value = event.detail.value
	}

	// 提交表单事件
	const handleSubmit = () => {
		// 表单验证
		if (!orderTitle.value) {
			uni.showToast({ title: '请输入需求标题', icon: 'none' });
		}
		if (!orderContent.value) {
			uni.showToast({ title: '请输入详细内容', icon: 'none' });
		}
		if (!orderSalary.value) {
			uni.showToast({ title: '请输入期望薪资', icon: 'none' });
		}
		if (!orderChatNum.value) {
			uni.showToast({ title: '请输入联系方式', icon: 'none' });
		}
		if (!orderAddress.value) {
			uni.showToast({ title: '请输入地址信息', icon: 'none' });
		}

		// 检查图片是否上传成功
		if (orderImage.value && !imageUrl.value) {
			if (isUploading.value) {
				uni.showToast({ title: '图片上传中，请稍候', icon: 'none' });
			} else {
				uni.showToast({ title: '图片未上传成功，请重试', icon: 'none' });
			}
		}

		// 防止重复提交
		if (isSubmitting.value) {
			return;
		}

		isSubmitting.value = true;

		// 准备提交数据
		const recruitmentData : RecruitmentData = {
			title: orderTitle.value,
			content: orderContent.value,
			salary: parseFloat(orderSalary.value) || 0,
			salaryPeriod: orderTime.value,
			imageUrl: imageUrl.value,
			type: recruitmentTypeMap[orderTypeIndex.value],
			location: orderAddress.value,
			contactType: orderChatTypeMap[orderChatTypeIndex.value],
			contactInfo: orderChatNum.value,
			positionCount: 1, // 默认招聘人数
			companyName: '个人发布' // 可根据需要调整
		};

		console.log('提交的表单数据:', recruitmentData);

		// 获取token
		const token = uni.getStorageSync('token');
		if (!token) {
			isSubmitting.value = false;
			return uni.showModal({
				title: '提示',
				content: '您尚未登录，请先登录',
				success: (res) => {
					if (res.confirm) {
						uni.navigateTo({ url: '/pages/login/login' });
					}
				}
			});
		}

		// 发送创建招聘需求的请求
		uni.request({
			url: `${API_BASE_URL}/api/recruitments`,
			method: 'POST',
			data: recruitmentData,
			header: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			},
			success: (res : any) => {
				if (res.statusCode === 200) {
					uni.showToast({
						title: '发布成功',
						icon: 'success'
					});

					// 发布成功后，清除表单数据
					resetForm();

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
				isSubmitting.value = false;
			}
		});
	};

	// 重置表单
	const resetForm = () : void => {
		orderTitle.value = '';
		orderContent.value = '';
		orderSalary.value = '';
		orderTime.value = '';
		orderChatNum.value = '';
		orderAddress.value = '';
		orderImage.value = '';
		imageUrl.value = '';
		orderTypeIndex.value = 0;
		uploadStatus.value = false;
	};

	// 页面加载时初始化
	onMounted(() => {
		// 检查是否登录
		const token = uni.getStorageSync('token');
		if (!token) {
			uni.showModal({
				title: '提示',
				content: '发布需求需要先登录，是否前往登录？',
				success: (res) => {
					if (res.confirm) {
						uni.navigateTo({ url: '/pages/login/login' });
					} else {
						uni.navigateBack();
					}
				}
			});
		}
	});
</script>

<style>
	.orderPage-itemTitle {
		font-size: 30rpx;
		font-weight: 600;
	}

	.orderPage-background {
		display: flex;
		flex-direction: column;
		width: 100%;
		min-height: 100vh;
		align-items: center;
		background: linear-gradient(#7FD8B3, white);
	}

	.orderPage-basicMsg {
		display: flex;
		width: 100%;
		height: 800rpx;
		flex-direction: column;
		align-items: center;
		margin: 0rpx 50rpx;
	}

	.orderPage-basicMsgItem {
		display: flex;
		width: 100%;
		height: 13%;
		align-items: center;
	}

	.orderPage-orderType {
		width: 460rpx;
		height: 100%;
		padding: 20rpx;
		border-radius: 10rpx;
		background: white;
		margin-left: 30rpx;
		font-size: 24rpx;
		display: flex;
		justify-content: space-between;
	}

	.orderPage-orderTitle {
		width: 460rpx;
		height: 80rpx;
		padding: 0rpx 20rpx;
		border-radius: 10rpx;
		background: white;
		margin-left: 30rpx;
		font-size: 26rpx;
		display: flex;
	}

	.orderPage-orderTextarea {
		width: 460rpx;
		height: 230%;
		padding: 25rpx 20rpx;
		border-radius: 10rpx;
		background: white;
		margin-left: 30rpx;
		margin-top: 220rpx;
		font-size: 28rpx;
		display: flex;
	}

	.orderPage-orderSalary {
		width: 460rpx;
		height: 70%;
		padding: 0rpx 20rpx;
		margin: 50rpx 0rpx;
		border-radius: 10rpx;
		background: white;
		margin-left: 30rpx;
		font-size: 26rpx;
		display: flex;
	}

	.orderPage-importentMsg {
		display: flex;
		width: 90%;
		height: 700rpx;
		flex-direction: column;
		align-items: start;
		background: white;
		border-radius: 30rpx;
		padding: 20rpx 40rpx;
	}

	.orderPage-importentMsgItem {
		display: flex;
		width: 100%;
		height: 15%;
		align-items: center;
		margin-top: 15rpx;
	}

	.orderPage-chooseImg {
		width: 300rpx;
		height: 300rpx;
		border-radius: 10rpx;
		background: #DADADA;
		margin-left: 30rpx;
		margin-top: 260rpx;
		font-size: 24rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #8e8e8e;
		padding: 0;
		/* 覆盖按钮默认内边距 */
		overflow: hidden;
		/* 确保图片不溢出 */
	}

	.orderPage-submitBtn {
		width: 50%;
		height: 65rpx;
		border-radius: 70rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 26rpx;
		color: white;
		background: #42B880;
		margin-bottom: 30rpx;
		margin-top: 30rpx;
	}

	.orderPage-submitBtn[disabled] {
		background: #a0d7b9;
		color: #eee;
	}

	.upload-status {
		font-size: 24rpx;
		padding: 10rpx 30rpx;
		margin-left: 130rpx;
		margin-top: 230rpx;
	}

	.upload-success {
		color: #42B880;
	}

	.upload-error {
		color: #ff4d4f;
	}
</style>