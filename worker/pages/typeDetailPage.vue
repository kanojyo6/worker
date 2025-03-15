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
				<view @click="navigateToOrderDetail(item.id)" v-for="item in typeDetailListData" class="typeDetail-contentItem">
					<image v-if="item.imageUrl !== ''" :src="item.imageUrl" class="typeDetail-orderImage" mode="aspectFill"></image>
					<view v-else class="typeDetail-orderImage" style="background: #d7d7d7;"></view>
					<view class="typeDetail-orderMsg">
						<view style="font-size: 30rpx;">{{ item.title.length > 9 ? item.title.slice(0, 8) + '...' : item.title }}</view>
						<view style="font-size: 28rpx; color: #42B880; font-weight: bold;">{{ item.salaryPeriod > 9 ? item.salaryPeriod.slice(0, 8) + '...' : item.salaryPeriod }}</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
	import { computed, ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { useTypeDetailStore } from '../stores/typeDetailPageStore';
	
	const typeDetailStore = useTypeDetailStore()
	
	const searchText = ref('')
	
	// 分页变量
	const page = ref(0)
	const size = 20
	
	// 计算属性
	const typeDetailListData = computed(() => typeDetailStore.getTypeDetailInfo)
	
	// 处理点击详情
	const navigateToOrderDetail = (orderId: number) => {
		uni.navigateTo({
			url: `/pages/orderDetailPage?id=${orderId}`,
			animationType: 'pop-in'
		})
	}
	
	// 处理发需求跳转
	const navigateToAddOrder = () => {
		uni.switchTab({
			url: '/pages/tabbar/orderPage'
		})
	}
	
	onLoad(async (option) => {
		console.log('传入type为: ', option.type)
		uni.showLoading({ title: '获取数据中' })
		try{
			await loadTypeDetailInfo(option.type, page.value, size)
		}catch(error){
			//TODO handle the exception
			console.error('请求时发生了错误: ', error);
			uni.hideLoading();
			uni.showToast({
				title: '请求错误',
				icon: 'none'
			});
		}
	})
	
	const loadTypeDetailInfo = async (type: string, page: number, size: number) => {
		try{
			await typeDetailStore.fetchTyperDetailInfo(type, page, size)
		}catch(e){
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
		justify-content: space-between;
		align-items: left;
		flex-wrap: wrap;
		width: 100%;
		min-height: 93vh;
		padding-bottom: 30rpx;
		background-color: #f5f5f5;
	}
	
	.typeDetail-contentItem {
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