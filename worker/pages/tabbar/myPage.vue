<template>
	<view class="myPage-background">
		<scroll-view style="display: flex; width: 100%;">
			<!-- 用户名 -->
			<button v-if="userName === ''" class="myPage-userNickname">登录/注册</button>
			<view v-else class="myPage-userNickname">{{ `Hi, ${userName}` }}</view>
			<!-- 头像 -->
			<view class="myPage-userAvatarBg">
				<view v-if="userAvatarUrl === ''" class="myPage-userAvatar" style="background-color: #DADADA;"></view>
				<image v-else mode="aspectFit" class="myPage-userAvatar"></image>
			</view>



			<!-- 我的需求&我的申请 -->
			<view class="myPage-selector">
				<view class="myPage-order">
					<view style="font-size: 36rpx; font-weight: bold; margin-bottom: 10rpx;">1</view>
					<view>我的需求</view>
				</view>
				<view class="myPage-order">
					<view style="font-size: 36rpx; font-weight: bold; margin-bottom: 10rpx;">1</view>
					<view>我的申请</view>
				</view>
			</view>

			<!-- 我的需求 -->
			<view class="myPage-myOrder">
				<view style="display: flex; justify-content: space-between; margin: 24rpx auto; width: 90%;">
					<view style="font-size: 28rpx; font-weight: bold;">我的需求</view>
					<view style="font-size: 28rpx; color: white; font-weight: bold;">更多</view>
				</view>
				<scroll-view scroll-x="true" style="width: 95%; height: 75%; white-space: nowrap; margin: 0rpx auto;">
					<button class="myPage-myOrderItem">1</button>
					<button class="myPage-myOrderItem">1</button>
					<button class="myPage-myOrderItem">1</button>
					<button class="myPage-myOrderItem">1</button>
				</scroll-view>
			</view>

			<!-- 我的申请 -->
			<view class="myPage-myOffer">
				<view style="display: flex; justify-content: space-between; margin: 24rpx auto; width: 90%;">
					<view style="font-size: 28rpx; font-weight: bold;">我的申请</view>
					<view style="font-size: 28rpx; color: white; font-weight: bold;">更多</view>
				</view>
				<view style="display: flex; flex-direction: column; width: 100%; height: 90%;">
					<button class="myPage-myOfferItem"></button>
					<button class="myPage-myOfferItem"></button>
					<button class="myPage-myOfferItem"></button>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';

	// 用户头像
	const userName = ref('贝利亚大王')
	// 用户头像
	const userAvatarUrl = ref('')
</script>
<style>
	.myPage-background {
		display: flex;
		flex-direction: column;
		width: 100%;
		min-height: 100vh;
	}

	.myPage-userNickname {
		display: flex;
		align-items: center;
		justify-content: left;
		margin-left: 30rpx;
		margin-top: 50rpx;
		font-size: 32rpx;
		font-weight: bold;
	}

	.myPage-userAvatarBg {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding: 30rpx 0rpx;
	}

	.myPage-userAvatar {
		width: 150rpx;
		height: 150rpx;
		border-radius: 200rpx;
	}

	.myPage-selector {
		display: flex;
		flex-wrap: nowrap;
		width: 90%;
		height: 10%;
		margin: 0rpx auto;
	}

	.myPage-order {
		display: flex;
		width: 50%;
		height: 100%;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.myPage-myOrder {
		width: 100%;
		height: 500rpx;
		border-radius: 30rpx;
		margin-top: 40rpx;
		background: #a5e3c9;
		display: flex;
		flex-direction: column;
	}

	.myPage-myOrderItem {
		width: 55%;
		height: 100%;
		background: linear-gradient(#8ef1c8, #c7ffe8);
		border-radius: 24rpx;
		display: inline-block;
		margin: 0rpx 20rpx;
	}

	.myPage-myOffer {
		width: 100%;
		height: 600rpx;
		border-radius: 30rpx;
		margin-top: 40rpx;
		background: #a5e3c9;
		display: flex;
		flex-direction: column;
	}

	.myPage-myOfferItem {
		width: 90%;
		height: 40%;
		border-radius: 26rpx;
		margin: 14rpx auto;
		display: flex;
	}
</style>