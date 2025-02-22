<template>
	<view v-if="userStatus === 1" class="myPage-background">
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
					<button class="myPage-myOrderItem">
						<view class="myPage-myOrderItem-content">
							<view style="display: flex; flex-wrap: nowrap; justify-content: space-between;">
								<!-- 需求标题 & 需求状态 -->
								<view style="font-size: 26rpx; font-weight: bold;">寻找：优衣库服装销售员</view>
								<view style="font-size: 26tpx; font-weight: bold; color: #42B880;">招聘中</view>
							</view>
						</view>
					</button>
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
				<view style="display: flex; flex-direction: column; width: 100%; height: 88%;">
					<!-- 项目内容 -->
					<button v-for="item in test" class="myPage-myOfferItem">
						<!-- 图片 -->
						<view class="myPage-myOfferItem-Img" style="background: #D7D7D7;"></view>
						<!-- 中间 -->
						<view style="display: flex; flex-direction: column; height: 100%; justify-content: space-between; align-items: start; margin-left: -20rpx;">
							<view style="font-size: 27rpx; font-weight: bold;">万达优衣库招服务员</view>
							<view style="font-size: 32rpx; font-weight: bold; color: #42B880;">10000元</view>
						</view>
						<!-- 右边 -->
						<view style="display: flex; flex-direction: column; height: 100%; justify-content: space-between; align-items: flex-end;">
							<view style="font-size: 26rpx; font-weight: bold; color: #42B880;">4个月</view>
							<view style="display: flex; width: 100%; flex-wrap: nowrap;">
								<image src="/static/logos/icon_location@2x.png" mode="aspectFit"
									style="width: 30rpx; height: 30rpx;"></image>
								<view style="color: #919191; margin-left: 10rpx; font-size: 22rpx;">佛山南海区桂城</view>
							</view>
						</view>
					</button>
				</view>
			</view>
		</scroll-view>
	</view>
	
	<!-- 如果未登录，则显示登录页面 -->
	<loginPageVue v-else></loginPageVue>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import loginPageVue from '../../components/loginPage.vue';

	// 用户头像
	const userName = ref('贝利亚大王')
	// 用户头像
	const userAvatarUrl = ref('')
	
	// 登录状态
	const userStatus = ref(0)
	
	const test = [1, 1, 1]
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
		height: 550rpx;
		border-radius: 30rpx;
		margin-top: 40rpx;
		background: #a5e3c9;
		display: flex;
		flex-direction: column;
	}

	.myPage-myOrderItem {
		width: 65%;
		height: 100%;
		background: linear-gradient(#8ef1c8, #c7ffe8);
		border-radius: 24rpx;
		display: inline-block;
		margin: 0rpx 20rpx;
	}
	
	.myPage-myOrderItem-content {
		display: flex;
		width: 95%;
		height: 95%;
		margin: auto;
		flex-direction: column;
	}

	.myPage-myOffer {
		width: 100%;
		height: 640rpx;
		border-radius: 30rpx;
		margin-top: 40rpx;
		background: #a5e3c9;
		display: flex;
		flex-direction: column;
		margin-bottom: 20rpx;
		padding-bottom: 20rpx;
	}

	.myPage-myOfferItem {
		width: 90%;
		height: 50%;
		padding: 3%;
		border-radius: 15rpx;
		margin: 14rpx auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: nowrap;
	}
	
	.myPage-myOfferItem-Img {
		width: 120rpx;
		height: 120rpx;
		border-radius: 10rpx;
	}
</style>