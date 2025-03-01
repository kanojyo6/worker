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
					<view class="orderPage-importentMsgItem">
						<view class="orderPage-itemTitle">联系方式:</view>
						<view style="display: flex; flex-wrap: nowrap; align-items: center;">
							<radio-group>
								<view v-for="(item, index) in orderChatTypeList">
									<radio :value="item" :checked="index === orderChatType"></radio>
								</view>
							</radio-group>
							<input name="orderChatNum" placeholder="请输入联系方式" class="orderPage-orderTitle"
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
						<button @click="getImg" class="orderPage-chooseImg">
							<view v-if="orderImage === ''">选择图片</view>
							<image v-else :src="orderImage" mode="aspectFill"></image>
						</button>
					</view>
				</view>

				<button form-type="submit" class="orderPage-submitBtn">发布</button>
			</form>
		</scroll-view>
	</view>
	<!-- 图片裁剪器 -->
	<wd-img-cropper v-model="showimgCropper" :img-src="selectedImageSrc" @confirm="handleConfirm"
		@cancel="handleCropCancel" :img-width="600" :img-height="600"></wd-img-cropper>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	// 需求类型
	const orderTypeIndex = ref(0)
	const orderTypeArr : string[] = ["技术类", "生活类", "家教类", "代办事", "校内兼职", "校外兼职", "实习", "买卖"]
	// 需求标题
	const orderTitle = ref('')
	// 需求内容
	const orderContent = ref('')
	// 期望薪资
	const orderSalary = ref('')
	// 时间范围
	const orderTime = ref('')
	// 联系方式
	const orderChatTypeList: string[] = ["微信号", "手机号", "电子邮箱"]
	const orderChatType = ref(0)
	const orderChatNum = ref('')
	// 地址信息
	const orderAddress = ref('')
	// 上传图片
	const selectedImageSrc = ref('')	// 原始图片数据
	const orderImage = ref('')
	// 图片裁剪器显示状态
	const showimgCropper = ref<boolean>(false)

	// 获取选择图片
	const getImg = () => {
		uni.chooseImage({
			count: 1,
			sizeType: "compressed",
			success: (res) => {
				console.log("选择图片成功")
				const tempFilePath = res.tempFilePaths[0]
				selectedImageSrc.value = tempFilePath
				showimgCropper.value = true
			},
			fail() {
				console.log('选择图片失败');
			},
			complete() {
				console.log('结束');
			},
		})
	}

	// 处理裁剪选择图片（确认）
	const handleConfirm = (event) => {
		console.log('启用裁剪')
		const { tempFilePath } = event
		orderImage.value = tempFilePath
	}
	// 处理裁剪选择图片（取消）
	const handleCropCancel = (event) => {
		console.log('取消裁剪')
		uni.showToast({
			icon: 'none',
			title: '取消上传图片'
		})
	}



	const handleOrderTypeChange = (event : any) => {
		console.log("orderType改变：", event.detail.value)
		orderTypeIndex.value = event.detail.value
	}

	// 提交表单事件
	const handleSubmit = (event : any) => {
		console.log('form发生了提交事件，携带数据为: ' + JSON.stringify(event.detail.value))
	}
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
		height: 70%;
		padding: 0rpx 20rpx;
		border-radius: 10rpx;
		background: white;
		margin-left: 30rpx;
		font-size: 24rpx;
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
		font-size: 24rpx;
		display: flex;
	}

	.orderPage-importentMsg {
		display: flex;
		width: 90%;
		height: 560rpx;
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
		width: 500rpx;
		height: 200rpx;
		border-radius: 10rpx;
		background: #DADADA;
		margin-left: 30rpx;
		margin-top: 160rpx;
		font-size: 24rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #8e8e8e;
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
	}
</style>