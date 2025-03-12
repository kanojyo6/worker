<template>
	<view class="myOrderListPage-background">
		<scroll-view style="width: 600rpx; height: 1350rpx; margin: 40rpx auto;" scroll-y="true" @scrolltolower="loadMoreData">
			<button
			    v-for="order in orders" 
			    :key="order.id" 
			    class="myOrderListPage-myOrderItem"
				@click="viewOrder"
			>
			    <view class="myOrderListPage-myOrderItem-content">
			        <view class="myOrderListPage-orderTitleRow">
			            <text class="myOrderListPage-orderTitle">{{order.title}}</text>
			            <text class="myOrderListPage-orderStatus">{{order.typeName}}</text>
			        </view>
			        <view class="myOrderListPage-orderDetail">
			            <text class="myOrderListPage-orderSalary" style="color: #42B880;">薪资 {{order.salary}}</text>
			            <text class="myOrderListPage-orderDuration">{{order.salartPeriod}}</text>
			        </view>
			        <view class="myOrderListPage-orderDescription">
			            {{order.content.length > 70 ? order.content.slice(0, 70) + '...' : order.content}}
			        </view>
			        <view class="myOrderListPage-orderFooter">
			            <text class="myOrderListPage-orderContact">联系  {{order.contactTypeName}}: {{order.contactInfo}}</text>
			            <text class="myOrderListPage-orderLocation">地址  {{order.location}}</text>
			        </view>
			    </view>
			</button>
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
	import { ref, computed, onMounted } from 'vue';
	import { useMyOrdersListStore } from '../stores/myPageStore'
	
	const myOrdersListStore = useMyOrdersListStore();
	
	// 分页状态
	const page = ref(0);
	const size = 5;
	
	// 状态数据
	const orders = computed(() => myOrdersListStore.getMyOrdersList);
	
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
			await myOrdersListStore.fetchMyOrdersList(page.value, size);
			uni.hideLoading()
		} catch (error) {
		    console.error('加载数据失败:', error);
		    throw error;
		}
	}
	
	onMounted(async () => {
		page.value = 0
		myOrdersListStore.clear()
		
		uni.showLoading({
			title: '获取数据中'
		})
		try {
			await myOrdersListStore.fetchMyOrdersList(page.value, size);
			uni.hideLoading();
		} catch (error) {
		    console.error('加载数据失败:', error);
		    throw error;
		}
	})
</script>

<style>
.myOrderListPage-background {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	min-height: 100vh;
	background: linear-gradient(#7FD8B3, white);
}

.myOrderListPage-myOrderItem {
	width: 90%;
	height: 500rpx;
	background: linear-gradient(#C7FFD8, #E5FFED);
	border-radius: 24rpx;
	display: inline-block;
	margin: 20rpx 30rpx;
	padding: 15rpx;
}

.myOrderListPage-myOrderItem-content {
	display: flex;
	width: 90%;
	height: 95%;
	margin: auto;
	flex-direction: column;
	padding: 10rpx;
}

.myOrderListPage-orderTitleRow {
	display: flex;
	justify-content: space-between;
}

.myOrderListPage-orderTitle {
	font-size: 36rpx;
	font-weight: bold;
}

.myOrderListPage-orderStatus {
	font-size: 36rpx;
	font-weight: bold;
	color: #42B880;
}

.myOrderListPage-orderDetail {
	display: flex;
	gap: 20rpx;
	margin-top: 14rpx;
	margin-bottom: 20rpx;
	justify-content: space-between;
}

.myOrderListPage-orderSalary,
.myOrderListPage-orderDuration {
	font-size: 32rpx;
	color: #666;
	font-weight: bold;
}

.myOrderListPage-orderDescription {
	font-size: 28rpx;
	color: #333;
	margin-bottom: 20rpx;
	min-height: 100rpx;
	text-align: left;
	white-space: normal;
	word-wrap: break-word; /* 确保长单词或URL也能换行 */
	line-height: 35rpx;
}

.myOrderListPage-orderFooter {
	font-size: 26rpx;
	color: #666;
	display: flex;
	flex-direction: column;
	align-items: start;
	font-weight: bold;
}

.myOrderListPage-orderContact {
	
}

.myOrderListPage-orderLocation {
	
}
</style>
