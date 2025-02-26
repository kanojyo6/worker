<template>
	<view class="myOfferListPage-background">
		<scroll-view view class="myOffer-offerList">
			<button v-for="item in applications" :key="item.id" class="myOffer-myOfferItem"
				@click="viewApplication(item.id)">
				<view class="myOffer-myOfferItem-Img" style="background-color: #D7D7D7"></view>
				<view class="myOffer-offerMiddle">
					<text class="myOffer-offerTitle">{{item.title}}</text>
					<text class="myOffer-offerPrice">{{item.price}}</text>
				</view>
				<view class="myOffer-offerRight">
					<text class="myOffer-offerDuration">{{item.duration}}</text>
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
	import {
		ref,
		computed,
		onMounted
	} from 'vue';

	// 状态数据
	const orderCount = ref(1);
	const applyCount = ref(1);
	const applications = ref([{
	    id: 1,
	    title: '万达优衣库招服务员',
	    price: '10000元',
	    duration: '4个月',
	    location: '佛山南海区桂城'
	},{
	    id: 1,
	    title: '万达优衣库招服务员',
	    price: '10000元',
	    duration: '4个月',
	    location: '佛山南海区桂城'
	},{
	    id: 1,
	    title: '万达优衣库招服务员',
	    price: '10000元',
	    duration: '4个月',
	    location: '佛山南海区桂城'
	},{
	    id: 1,
	    title: '万达优衣库招服务员',
	    price: '10000元',
	    duration: '4个月',
	    location: '佛山南海区桂城'
	},{
	    id: 1,
	    title: '万达优衣库招服务员',
	    price: '10000元',
	    duration: '4个月',
	    location: '佛山南海区桂城'
	}]);
	
	// 页面跳转
	const viewApplication = () => {
	    uni.navigateTo({ url: `/pages/myOfferDetailPage` });
	};
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
		height: 110rpx;
		justify-content: space-around;
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
		height: 100%;
		justify-content: space-around;
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