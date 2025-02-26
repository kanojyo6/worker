<template>
	<view>
		<scroll-view class="orderPopup-background" scroll-y="true">
			<view v-for="person in offers" class="orderPopup-item">
				<view style="display: flex; align-items: center;">
					<!-- 头像 -->
					<image v-if="imageUrl" :src="imageUrl" mode="aspectFill" class="orderPopup-img"></image>
					<view class="orderPopup-img" style="background-color: #d7d7d7;"></view>
					<!-- 用户名 -->
					<text class="orderPopup-offersName">{{ person }}</text>
				</view>
				<view style="display: flex; align-items: center; justify-content: space-around; width: 300rpx; margin-right: 20rpx;">
					<!-- 忽略 -->
					<button @click="handleDisAgree" class="orderPopup-btn" style="background-color: red;">忽略</button>
					<button @click="handleAgree" class="orderPopup-btn" style="background-color: #42B880;">同意</button>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
	// 模拟数据
	const offers: string[] = ["admin", "admin", "admin", "admin", "admin", "admin", "admin", "admin", "admin"]
	const imageUrl = ref()
	
	
	// 操作方法
	const handleDisAgree = () => {
		uni.showLoading({ title: '操作中...' })
		uni.hideLoading()
		uni.showToast({
			title: '已忽略',
			icon: 'none'
		})
	}
	
	const handleAgree = () => {
		uni.showLoading({ title: '操作中...' })
		uni.hideLoading()
		uni.showToast({
			title: '已同意',
			icon: 'success'
		})
	}
</script>

<style>
.orderPopup-background {
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	height: 500rpx;
	padding-top: 30rpx;
	background-color: white;
	border-top-left-radius: 20rpx;
	border-top-right-radius: 20rpx;
}

.orderPopup-item {
	width: 100%;
	height: 70rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 20rpx;
}

.orderPopup-img {
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
}

.orderPopup-offersName {
	font-size: 26rpx;
	color: #000;
	margin-left: 20rpx;
}

.orderPopup-btn {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 120rpx;
	height: 70rpx;
	font-size: 26rpx;
	color: white;
	border-radius: 15rpx;
}
</style>
