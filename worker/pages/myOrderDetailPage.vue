<template>
	<scroll-view>
		<view class="orderDetail-background">
			<view class="orderDetail-content" style="height: 1000rpx;">
				<!-- 图片 -->
				<view v-if="orderDetailInfo.imageUrl === ''" class="orderDetail-image" style="background: #DADADA;">
				</view>
				<image v-else class="orderDetail-image" :src="orderDetailInfo.imageUrl" mode="aspectFill"></image>
				<!-- 用户信息 -->
				<view class="orderDetail-userMsg">
					<view style="display: flex; align-items: center;">
						<view class="orderDetail-avatar" style="background: #DADADA;"></view>
						<view style="margin-left: 20rpx;">{{ orderDetailInfo.publisherName }}</view>
					</view>
					<view style="display: flex; align-items: center;">
						<image src="/static/logos/icon_location@2x.png" mode="aspectFit"
							style="width: 40rpx; height: 40rpx;"></image>
						<view style="color: #919191; margin-left: 10rpx; font-size: 26rpx;">
							{{ orderDetailInfo.location }}</view>
					</view>
				</view>
				<!-- 订单信息 -->
				<view class="orderDetail-orderMsg">
					<view style="font-size: 38rpx; font-weight: bold;">{{ orderDetailInfo.title }}</view>
					<view style="font-size: 38rpx; font-weight: bold; color: #42B880;">{{ orderDetailInfo.salary }}元
					</view>
					<view style="font-size: 30rpx; font-weight: bold; color: #42B880;">
						{{ orderDetailInfo.salaryPeriod }}</view>
				</view>
			</view>

			<!-- 兼职详情 -->
			<view class="orderDetail-content" style="margin-top: 30rpx; margin-bottom: 30rpx;">
				<text style="font-size: 45rpx; font-weight: bold; margin-left: 35rpx; margin-top: 35rpx;">兼职详情</text>
				<text style="font-size: 30rpx; margin-left: 35rpx; margin-top: 35rpx; margin-right: 35rpx;">
					{{ orderDetailInfo.content }}
				</text>
			</view>


			<button @click="handleSubmit" class="orderDetail-submitBtn">查看申请</button>
			<uni-popup ref="popup">
				<!-- 弹出层 -->
				<orderDetailPopup />
			</uni-popup>
		</view>
	</scroll-view>

</template>

<script setup lang="ts">
	import { computed, ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { useOrderDetailStore, useApplicatorsListStore } from '../stores/orderDetailPageStore'
	import uniPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue'
	import orderDetailPopup from './components/orderDetailPopup.vue';

	const orderDetailStore = useOrderDetailStore()
	const applicatorsListStore = useApplicatorsListStore()
	const orderId = ref('')

	// 计算属性
	const orderDetailInfo = computed(() => orderDetailStore.getOrderDetailInfo)

	// 控制弹出层
	const popup = ref(null)
	const handleSubmit = async () => {
		try {
			popup.value.open('bottom')
			uni.showLoading({
				title: '获取数据中'
			})
			await applicatorsListStore.fetchApplicatorList(orderId.value, 0)
		} catch (e) {
			//TODO handle the exception
			console.error(e)
		}
	}
	const dismissPopup = () => {
		popup.value.close()
	}

	onLoad(async (option) => {
		console.log('传入id为: ', option.id);
		orderId.value = option.id;
		uni.showLoading({ title: '获取数据中' });
		try {
			await loadOrderDetailInfo(option.id)
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
	const loadOrderDetailInfo = async (id : number) => {
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

	.orderDetail-background {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 90%;
		padding: 5%;
		height: 100%;
		background: linear-gradient(#7FD8B3, white);
	}

	.orderDetail-content {
		width: 100%;
		display: flex;
		flex-direction: column;
		background: white;
		border-radius: 30rpx;
	}

	.orderDetail-image {
		width: 100%;
		height: 60%;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
	}

	.orderDetail-userMsg {
		width: 90%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 30rpx 50rpx;
	}

	.orderDetail-avatar {
		width: 90rpx;
		height: 90rpx;
		border-radius: 100rpx;
	}

	.orderDetail-orderMsg {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-evenly;
		width: 85%;
		margin: auto;
	}

	.orderDetail-submitBtn {
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

	.orderDetail-popup {
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

	.orderDetail-popup-btns {
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