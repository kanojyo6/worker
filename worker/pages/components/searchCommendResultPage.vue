<template>
	<view class="searchCommendRes-background">
		<!-- 头部 -->
		<view class="searchCommendRes-header">
			<view class="searchCommendRes-searcher">
				<input style="font-size: 28rpx;" placeholder="搜索…" confirm-type="search" v-model="searchText" />
				<button @click="handleSearch" style="display: flex; justify-content: center; align-items: center; margin-right: -5rpx;">
					<image mode="aspectFit" src="/static/logos/home_icon_search@2x.png"
						style="width: 30rpx; height: 50rpx;"></image>
				</button>
			</view>
		</view>
		<scroll-view>
			<view class="searchCommendRes-content">
				<view @click="navigateToOrderDetail" v-for="item in searchResult" class="searchCommendRes-contentItem">
					<view class="searchCommendRes-orderImage" style="background: #d7d7d7;"></view>
					<view class="searchCommendRes-orderMsg">
						<view style="font-size: 30rpx;">电脑维修</view>
						<view style="font-size: 28rpx; color: #42B880; font-weight: bold;">10000元</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
	import { computed, ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { useSearchStore } from '../../stores/searchStore';
	
	// 注册store;
	const searchStore = useSearchStore()
	
	// 搜索框内容绑定
	const searchText = ref<string>('')
	// 搜索结果
	const searchResult = computed(() => searchStore.getSearchResult)
	
	// 分页变量
	const page = ref<number>(0)
	const size: number = 20
	
	// 点击进入详情页
	const navigateToOrderDetail = () => {
		uni.navigateTo({
			url: '/pages/orderDetailPage',
			animationType: 'pop-in'
		})
	}
	
	onLoad(async (option) => {
		searchText.value = option.searchValue;
		page.value = 0;
		uni.showLoading({
			title: '获取数据中'
		})
		try{
			await loadOriginData()
		}catch(e){
			//TODO handle the exception
			uni.hideLoading()
			uni.showToast({
				title: '请求错误',
				icon: 'none'
			})
		}
	})
	
	// 加载第一页数据
	const loadOriginData = async () => {
		try{
			searchStore.clear()
			await searchStore.fetchSearchResult(searchText.value, page.value, size)
		}catch(e){
			//TODO handle the exception
			console.error(e)
		}
	}
	
	// 页面内重新搜索
	const handleSearch = async () => {
		page.value = 0;
		uni.showLoading({
			title: '获取数据中'
		})
		try{
			await loadOriginData()
		}catch(e){
			//TODO handle the exception
			uni.hideLoading()
			uni.showToast({
				title: '请求错误',
				icon: 'none'
			})
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

	.searchCommendRes-background {
		width: 100%;
		min-height: 100vh;
		background-color: #7FD8B3;
		display: flex;
		flex-direction: column;
	}

	.searchCommendRes-header {
		display: flex;
		width: 95%;
		margin: 20rpx auto;
		justify-content: space-between;
		align-items: center;
		flex-wrap: nowrap;
	}

	.searchCommendRes-searcher {
		display: flex;
		width: 800rpx;
		height: 70rpx;
		padding-inline: 30rpx;
		justify-content: space-between;
		align-items: center;
		background: white;
		border-radius: 50rpx;
	}

	.searchCommendRes-addOrderButton {
		display: flex;
		width: 140rpx;
		height: 70rpx;
		justify-content: center;
		align-items: center;
		background: #42B880;
		border-radius: 50rpx;
	}
	
	.searchCommendRes-content {
		display: flex;
		justify-content: space-between;
		align-items: left;
		flex-wrap: wrap;
		width: 100%;
		min-height: 93vh;
		padding-bottom: 30rpx;
		background-color: #f5f5f5;
	}
	
	.searchCommendRes-contentItem {
		width: 42%;
		height: 440rpx;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		margin-top: 30rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		background: white;
	}
	
	.searchCommendRes-orderImage {
		width: 100%;
		height: 65%;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
	}
	
	.searchCommendRes-orderMsg {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		flex: 1;
		padding-left: 30rpx;
	}
</style>
