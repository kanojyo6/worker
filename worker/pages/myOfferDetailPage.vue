<template>
	<scroll-view>
		<view class="offerDetail-background">
			<view class="offerDetail-content" style="height: 1000rpx;">
				<!-- 图片 -->
				<view v-if="offerDetailInfo.imageUrl === ''" class="offerDetail-image" style="background: #DADADA;">
				</view>
				<image v-else class="offerDetail-image" :src="offerDetailInfo.imageUrl" mode="aspectFill"></image>
				<!-- 用户信息 -->
				<view class="offerDetail-userMsg">
					<view style="display: flex; align-items: center;">
						<view class="offerDetail-avatar" style="background: #DADADA;"></view>
						<view style="margin-left: 20rpx;">{{ offerDetailInfo.publisherName }}</view>
					</view>
					<view style="display: flex; align-items: center;">
						<image src="/static/logos/icon_location@2x.png" mode="aspectFit"
							style="width: 40rpx; height: 40rpx;"></image>
						<view style="color: #919191; margin-left: 10rpx; font-size: 26rpx;">
							{{ offerDetailInfo.location }}</view>
					</view>
				</view>
				<!-- 订单信息 -->
				<view class="offerDetail-orderMsg">
					<view style="font-size: 38rpx; font-weight: bold;">{{ offerDetailInfo.title }}</view>
					<view style="font-size: 38rpx; font-weight: bold; color: #42B880;">{{ offerDetailInfo.salary }}元
					</view>
					<view style="font-size: 30rpx; font-weight: bold; color: #42B880;">
						{{ offerDetailInfo.salaryPeriod }}</view>
				</view>
			</view>

			<!-- 兼职详情 -->
			<view class="offerDetail-content" style="margin-top: 30rpx; margin-bottom: 30rpx;">
				<text style="font-size: 45rpx; font-weight: bold; margin-left: 35rpx; margin-top: 35rpx;">兼职详情</text>
				<text style="font-size: 30rpx; margin-left: 35rpx; margin-top: 35rpx; margin-right: 35rpx;">
					{{ offerDetailInfo.content }}
				</text>
			</view>

			<button @click="" class="offerDetail-submitBtn">查看申请</button>
		</view>
	</scroll-view>

</template>

<script setup lang="ts">
	import { computed, ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { useOrderDetailStore, useApplicatorsListStore } from '../stores/orderDetailPageStore'

	const orderDetailStore = useOrderDetailStore()
	const applicatorsListStore = useApplicatorsListStore()
	const orderId = ref('')

	// 计算属性
	const offerDetailInfo = computed(() => orderDetailStore.getOrderDetailInfo)

	onLoad(async (option) => {
		console.log('传入id为: ', option.id);
		orderId.value = option.id;
		uni.showLoading({ title: '获取数据中' });
		try {
			await loadofferDetailInfo(option.id)
		} catch (error) {
			//TODO handle the exception
			console.error('请求详情时发生了错误: :', error);
			uni.hideLoading();
			uni.showToast({
				title: '请求错误',
				icon: 'none'
			});
		}
	})

	// 加载订单详情数据
	const loadofferDetailInfo = async (id : number) => {
		try {
			await orderDetailStore.fetchOrderDetailInfo(id)
		} catch (e) {
			//TODO handle the exception
			console.error('加载数据失败:', e);
			throw e
		}
	}
</script>

<style>
	/* 去除按钮默认样式 */
	button::after {
		border: none;
	}

	button {
		position: relative;
		display: block;
		margin-left: auto;
		margin-right: auto;
		padding-left: 0px;
		padding-right: 0px;
		box-sizing: border-box;
		text-align: center;
		text-decoration: none;
		line-height: 1.35;
		-webkit-tap-highlight-color: transparent;
		overflow: hidden;
		color: #000;
		font-size: 32rpx;
		background-color: #fff;
		width: 10%;
		height: 100%;
	}

	.offerDetail-background {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 90%;
		padding: 5%;
		height: 100%;
		background: linear-gradient(#7FD8B3, white);
	}

	.offerDetail-content {
		width: 100%;
		display: flex;
		flex-direction: column;
		background: white;
		border-radius: 30rpx;
	}

	.offerDetail-image {
		width: 100%;
		height: 60%;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
	}

	.offerDetail-userMsg {
		width: 90%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 30rpx 50rpx;
	}

	.offerDetail-avatar {
		width: 90rpx;
		height: 90rpx;
		border-radius: 100rpx;
	}

	.offerDetail-orderMsg {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-evenly;
		width: 85%;
		margin: auto;
	}

	.offerDetail-submitBtn {
		width: 95%;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		color: white;
		background: #42B880;
		margin-top: 40rpx;
		border-radius: 60rpx;
	}

	.offerDetail-popup {
		width: 460rpx;
		height: 660rpx;
		padding: 20rpx;
		background-color: #fff;
		margin: auto;
		border-radius: 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.offerDetail-popup-btns {
		width: 90%;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		margin-top: 70rpx;
	}

	.popup-btn {
		width: 180rpx;
		height: 70rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50rpx;
		font-size: 28rpx;
	}
</style>