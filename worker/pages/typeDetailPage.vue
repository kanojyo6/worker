<template>
	<view class="typeDetail-background">
		<!-- 头部 -->
		<view class="typeDetail-header">
			<view class="typeDetail-searcher">
				<input style="font-size: 28rpx;" placeholder="搜索…" confirm-type="search" v-model="searchText" />
				<button style="display: flex; justify-content: center; align-items: center; margin-right: -5rpx;">
					<image mode="aspectFit" src="/static/logos/home_icon_search@2x.png"
						style="width: 30rpx; height: 50rpx;"></image>
				</button>
			</view>
			<button @click="navigateToAddOrder" class="typeDetail-addOrderButton">
				<text style="color: white; font-size: 26rpx;">发需求</text>
			</button>
		</view>
		
		<!-- 金刚区 -->
		<scroll-view>
			<view class="typeDetail-content">
				<view @click="navigateToOrderDetail" v-for="item in typeDetailListData" class="typeDetail-contentItem">
					<view class="typeDetail-orderImage" style="background: #d7d7d7;"></view>
					<view class="typeDetail-orderMsg">
						<view style="font-size: 30rpx;">电脑维修</view>
						<view style="font-size: 28rpx; color: #42B880; font-weight: bold;">10000元</view>
					</view>
				</view>
				<view class="typeDetail-contentItem"></view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	const searchText = ref('')
	
	// 列表数组
	const typeDetailListData = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]
	
	// 点击进入详情页
	const navigateToOrderDetail = () => {
		uni.navigateTo({
			url: '/pages/orderDetailPage',
			animationType: 'pop-in'
		})
	}
	
	// 处理发需求跳转
	const navigateToAddOrder = () => {
		uni.switchTab({
			url: '/pages/tabbar/orderPage'
		})
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

	.typeDetail-background {
		width: 100%;
		min-height: 100vh;
		background-color: #7FD8B3;
		display: flex;
		flex-direction: column;
	}

	.typeDetail-header {
		display: flex;
		width: 95%;
		margin: 20rpx auto;
		justify-content: space-between;
		align-items: center;
		flex-wrap: nowrap;
	}

	.typeDetail-searcher {
		display: flex;
		width: 480rpx;
		height: 70rpx;
		padding-inline: 30rpx;
		justify-content: space-between;
		align-items: center;
		background: white;
		border-radius: 50rpx;
	}

	.typeDetail-addOrderButton {
		display: flex;
		width: 140rpx;
		height: 70rpx;
		justify-content: center;
		align-items: center;
		background: #42B880;
		border-radius: 50rpx;
	}
	
	.typeDetail-content {
		display: flex;
		justify-content: space-around;
		align-items: left;
		flex-wrap: wrap;
		width: 100%;
		min-height: 93vh;
		padding-bottom: 30rpx;
		background-color: #f5f5f5
	}
	
	.typeDetail-contentItem {
		width: 42%;
		height: 440rpx;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		margin-top: 30rpx;
		background: white;
	}
	
	.typeDetail-orderImage {
		width: 100%;
		height: 65%;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
	}
	
	.typeDetail-orderMsg {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		flex: 1;
		padding-left: 30rpx;
	}
</style>