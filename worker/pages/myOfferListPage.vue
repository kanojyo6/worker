<template>
	<view class="myOfferListPage-background">
		<scroll-view view class="myOffer-offerList">
			<button v-for="item in offers" :key="item.id" class="myOffer-myOfferItem"
				@click="viewOrder()">
				<view v-if="item.imageUrl === ''" class="myOffer-myOfferItem-Img" style="background-color: #D7D7D7"></view>
				<image v-else class="myOffer-myOfferItem-Img" mode="aspectFill" :src="item.imageUrl"></image>
				<view class="myOffer-offerMiddle">
					<text class="myOffer-offerTitle">{{item.requirementTitle}}</text>
					<text class="myOffer-offerPrice">{{item.salary}} 元</text>
				</view>
				<view class="myOffer-offerRight">
					<text class="myOffer-offerDuration">{{item.salaryPeriod}}</text>
					<view class="myOffer-offerLocation">
						<image src="/static/logos/icon_location@2x.png" mode="aspectFit" />
						<text>{{item.location}}</text>
					</view>
				</view>
			</button>
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
	import { ref, computed, onMounted } from 'vue';
	import { useMyOffersListStore } from '../stores/myPageStore'
	
	const myOffersListStore = useMyOffersListStore();
	
	// 分页状态
	const page = ref(0);
	const size = 5;
	
	// 状态数据
	const offers = computed(() => myOffersListStore.getMyOffersList);
	
	// 页面导航方法
	const viewOrder = () => {
		uni.navigateTo({
			url: '/pages/myOrderDetailPage'
		})
	}
	
	// 无限滚动刷新方法
	const loadMoreData = async () => {
		uni.showLoading({
			title: '加载中'
		})
		page.value += 1;
		try {
			await myOffersListStore.fetchMyOfffersList(page.value, size);
			uni.hideLoading()
		} catch (error) {
		    console.error('加载数据失败:', error);
		    throw error;
		}
	}
	
	onMounted(async () => {
		page.value = 0
		myOffersListStore.clear()
		
		uni.showLoading({
			title: '获取数据中'
		})
		try {
			await myOffersListStore.fetchMyOfffersList(page.value, size);
			uni.hideLoading();
		} catch (error) {
		    console.error('加载数据失败:', error);
		    throw error;
		}
	})
</script>

<style scoped>
	.myOfferListPage-background {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		min-height: 100vh;
		background: linear-gradient(#7FD8B3, white);
	}
	
	.myOffer-offerList {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 88%;
	}
	
	.myOffer-myOfferItem {
		width: 90%;
		height: 140rpx;
		padding: 3%;
		border-radius: 15rpx;
		margin: 30rpx auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: nowrap;
		background: #ffffff;
	}
	
	.myOffer-myOfferItem-Img {
		width: 120rpx;
		height: 120rpx;
		border-radius: 10rpx;
	}
	
	.myOffer-offerMiddle {
		display: flex;
		flex-direction: column;
		width: 200rpx;
		height: 90%;
		margin-bottom: 60rpx;
		justify-content: space-between;
		align-items: start;
	}
	
	.myOffer-offerTitle {
		font-size: 32rpx;
		font-weight: bold;
	}
	
	.myOffer-offerPrice {
		font-size: 32rpx;
		font-weight: bold;
		color: #42B880;
	}
	
	.myOffer-offerRight {
		display: flex;
		flex-direction: column;
		width: 190rpx;
		height: 130%;
		justify-content: space-between;
		align-items: flex-end;
	}
	
	.myOffer-offerDuration {
		font-size: 26rpx;
		font-weight: bold;
		color: #42B880;
	}
	
	.myOffer-offerLocation {
		display: flex;
		width: 100%;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: flex-end;
	}
	
	.myOffer-offerLocation image {
	    width: 30rpx;
	    height: 30rpx;
	}
	
	.myOffer-offerLocation text {
	    color: #919191;
	    margin-left: 10rpx;
	    font-size: 22rpx;
	}

</style>