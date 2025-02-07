<template>
	<view class="orderDetail-background">
		<view class="orderDetail-content">
			<!-- 图片 -->
			<view class="orderDetail-image" style="background: #DADADA;"></view>
			<!-- 用户信息 -->
			<view class="orderDetail-userMsg">
				<view style="display: flex; align-items: center;">
					<view class="orderDetail-avatar" style="background: #DADADA;"></view>
					<view style="margin-left: 20rpx;">{{ userName }}</view>
				</view>
				<view style="display: flex; align-items: center;">
					<image src="/static/logos/icon_location@2x.png" mode="aspectFit" style="width: 40rpx; height: 40rpx;"></image>
					<view style="color: #919191; margin-left: 10rpx; font-size: 26rpx;">{{ address }}</view>
				</view>
			</view>
			<!-- 订单信息 -->
			<view class="orderDetail-orderMsg">
				<view style="font-size: 38rpx; font-weight: bold;">万达优衣库招服务员</view>
				<view style="font-size: 38rpx; font-weight: bold; color: #42B880;">1000元</view>
				<view style="font-size: 30rpx; font-weight: bold; color: #42B880;">4个月</view>
			</view>
		</view>
		<button @click="handleSubmit" class="orderDetail-submitBtn">提交申请</button>
		<uni-popup ref="popup">
			<!-- 弹出层 -->
			<view>
				<view style="width: 200rpx; height: 200rpx; background-color: #42B880; margin: auto; border-radius: 30rpx;">111111111</view>
			</view>
		</uni-popup>
	</view>
	
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import uniPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue'

	const userName = ref('用户名称')
	const address = ref('翻斗花园')
	
	// 控制弹出层
	const popup = ref(null)
	const handleSubmit = () => {
		console.log(popup.value)
		popup.value.open('button')
	}
</script>

<style>
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
		height: 1000rpx;
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
</style>
