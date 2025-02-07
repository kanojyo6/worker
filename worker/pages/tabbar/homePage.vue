<template>
	<view class="homePage-background">
		<!-- 头部页面 -->
		<view class="homePage-header">
			<view class="homePage-searcher">
				<input style="font-size: 28rpx;" placeholder="搜索…" confirm-type="search" v-model="searchText" />
				
			</view>
			<button @click="navigateToAddOrder" class="homePage-addOrderButton">
				<text style="color: white; font-size: 26rpx;">发需求</text>
			</button>
		</view>
		
		<scroll-view style="display: flex; width: 95%;">
			<!-- 分类页面 -->
			<view class="homePage-category">
				<button @click="navigateToTypeDetail" v-for="item in imageUrl" class="categoryItem">
					<image :src="item" mode="aspectFit" style="width: 50rpx; height: 50rpx;"></image>
				</button>
			</view>
			
			<!-- 分页推荐 -->
			<view style="display: flex; align-items: start; font-size: 40rpx; font-weight: bold; margin-top: 40rpx;">为你推荐</view>
			<view class="recommendView">
				<button @click="navigateToOrderDetail" v-for="item in recommendData" class="recommendItem">
					<view v-if="item.orderImgUrl == ''" class="recommendItem-Img" style="background: #DADADA;"></view>
					<image v-else class="recommendItem-Img" :src="item.orderImgUrl"></image>
					<view class="recommendItem-Text">
						<text style="font-size: 34rpx; color: #000;">{{ item.orderTitle }}</text>
						<text style="font-size: 34rpx; color: #42B880; font-weight: bold;">{{ item.orderTime }}</text>
					</view>
				</button>
			</view>
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { recommendModel } from '../../model/recommendModel';


const searchText = ref('')

const imageUrl = [
	'/static/logos/home_icon_tech.png',
	'/static/logos/home_icon_life.png',
	'/static/logos/home_icon_teacher.png',
	'/static/logos/home_icon_standby.png',
	'/static/logos/home_icon_schoolin.png',
	'/static/logos/home_icon_schoolout.png',
	'/static/logos/hoem_icon_practice.png',
	'/static/logos/hoem_icon_buy.png'
]

// 处理分类详情
const navigateToTypeDetail = () => {
	uni.navigateTo({
		url: '/pages/typeDetailPage',
		animationType:'pop-in'
	})
}

// 处理点击详情
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

// 模拟推送订单数据
const recommendData = ref<recommendModel[]>([
	{
		orderId: 1,
		orderTitle: '万达优衣库招人',
		orderSalary: 100,
		orderTime: '6个月',
		orderImgUrl: '',
		orderDescription: '111111111',
		orderStatus: 0,
		orderCategory: '校外兼职'
	},
	{
		orderId: 1,
		orderTitle: '万达优衣库招人',
		orderSalary: 100,
		orderTime: '6个月',
		orderImgUrl: '',
		orderDescription: '111111111',
		orderStatus: 0,
		orderCategory: '校外兼职'
	},
	{
		orderId: 1,
		orderTitle: '万达优衣库招人',
		orderSalary: 100,
		orderTime: '6个月',
		orderImgUrl: '',
		orderDescription: '111111111',
		orderStatus: 0,
		orderCategory: '校外兼职'
	},
	{
		orderId: 1,
		orderTitle: '万达优衣库招人',
		orderSalary: 100,
		orderTime: '6个月',
		orderImgUrl: '',
		orderDescription: '111111111',
		orderStatus: 0,
		orderCategory: '校外兼职'
	},
	{
		orderId: 1,
		orderTitle: '万达优衣库招人',
		orderSalary: 100,
		orderTime: '6个月',
		orderImgUrl: '',
		orderDescription: '111111111',
		orderStatus: 0,
		orderCategory: '校外兼职'
	},
	{
		orderId: 1,
		orderTitle: '万达优衣库招人',
		orderSalary: 100,
		orderTime: '6个月',
		orderImgUrl: '',
		orderDescription: '111111111',
		orderStatus: 0,
		orderCategory: '校外兼职'
	},
	{
		orderId: 1,
		orderTitle: '万达优衣库招人',
		orderSalary: 100,
		orderTime: '6个月',
		orderImgUrl: '',
		orderDescription: '111111111',
		orderStatus: 0,
		orderCategory: '校外兼职'
	}
])


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
	
	.homePage-background {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		min-height: 100vh;
		background: linear-gradient(#7FD8B3, white);
	}
	  
	.homePage-header {
		display: flex;
		width: 95%;
		margin-top: 20rpx;
		justify-content: space-between;
		align-items: center;
		flex-wrap: nowrap;
	}
	
	.homePage-searcher {
		display: flex;
		width: 480rpx;
		height: 70rpx;
		padding-inline: 30rpx;
		justify-content: space-between;
		align-items: center;
		background: white;
		border-radius: 50rpx;
	}
	
	.homePage-addOrderButton {
		display: flex;
		width: 140rpx;
		height: 70rpx;
		justify-content: center;
		align-items: center;
		background: #42B880;
		border-radius: 50rpx;
	}
	
	.homePage-category {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		height: 300rpx;
		justify-content: space-around;
		margin-top: 40rpx;
		border-radius: 30rpx;
		background: white;
	}
	
	.categoryItem {
		width: 25%;
		height: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 30rpx;
	}
	
	.recommendView {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	
	.recommendItem {
		width: 48%;
		height: 480rpx;
		padding: 0rpx;
		margin: 30rpx 0rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 20rpx;
	}
	
	.recommendItem-Img {
		width: 100%;
		height: 66%;
	}
	
	.recommendItem-Text {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: start;
		flex: 1;
		margin-left: -30rpx;
	}
</style>
