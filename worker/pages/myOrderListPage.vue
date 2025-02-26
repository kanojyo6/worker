<template>
	<view class="myOrderListPage-background">
		<scroll-view style="width: 90%; margin: 40rpx auto;">
			<button
			    v-for="order in orders" 
			    :key="order.id" 
			    class="myOrderListPage-myOrderItem"
				@click="viewOrder"
			>
			    <view class="myOrderListPage-myOrderItem-content">
			        <view class="myOrderListPage-orderTitleRow">
			            <text class="myOrderListPage-orderTitle">{{order.title}}</text>
			            <text class="myOrderListPage-orderStatus">{{order.status}}</text>
			        </view>
			        <view class="myOrderListPage-orderDetail">
			            <text class="myOrderListPage-orderSalary" style="color: #42B880;">薪资 {{order.salary}}</text>
			            <text class="myOrderListPage-orderDuration">{{order.duration}}</text>
			        </view>
			        <view class="myOrderListPage-orderDescription">
			            {{order.description.length > 70 ? order.description.slice(0, 70) + '...' : order.description}}
			        </view>
			        <view class="myOrderListPage-orderFooter">
			            <text class="myOrderListPage-orderContact">联系  {{order.contact}}</text>
			            <text class="myOrderListPage-orderLocation">地址  {{order.location}}</text>
			        </view>
			    </view>
			</button>
		</scroll-view>
	</view>
</template>

<script setup>
	import { ref, computed, onMounted } from 'vue';
	
	// 状态数据
	const orderCount = ref(1);
	const applyCount = ref(1);
	const orders = ref([{
	    id: 1,
	    title: '寻找：优衣库服装销售员',
	    status: '实习',
	    salary: '4000',
	    duration: '3个月',
	    description: '本人大学生放假，想兼职，赚点零用钱！放假，想兼职，赚点零用钱！本人大学生放假，想兼职，赚点零用钱！42B880你好点零用钱！本人大学生放假，想兼职，赚点零用钱！42B880你好',
	    contact: '12345678900',
	    location: 'xx市 xx区 xx街道'
	}]);
	
	// 页面导航方法
	const viewOrder = () => {
		uni.navigateTo({
			url: '/pages/myOrderDetailPage'
		})
	}
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
	height: 100%;
	background: linear-gradient(#C7FFD8, #E5FFED);
	border-radius: 24rpx;
	display: inline-block;
	margin: 0rpx 20rpx;
	padding: 20rpx;
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
	margin-top: 40rpx;
}

.myOrderListPage-orderContact {
	
}

.myOrderListPage-orderLocation {
	
}
</style>
