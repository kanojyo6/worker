<template>
    <view v-if="isLoggedIn" class="myPage-background">
        <scroll-view style="display: flex; width: 100%;">
            <!-- 用户信息区域 -->
            <button v-if="!userInfo.nickName" class="myPage-userNickname">登录/注册</button>
            <view v-else class="myPage-userNickname">{{ `Hi, ${userInfo.nickName}` }}</view>
            
            <view class="myPage-userAvatarBg">
                <view 
                    v-if="!userInfo.avatarUrl" 
                    class="myPage-userAvatar" 
                    style="background-color: #DADADA;"
                ></view>
                <image 
                    v-else 
                    :src="userInfo.avatarUrl" 
                    mode="aspectFit" 
                    class="myPage-userAvatar"
                />
            </view>

            <!-- 统计区域 -->
            <view class="myPage-selector">
                <view class="myPage-order">
                    <view class="myPage-orderCount">{{orderCount || 1}}</view>
                    <view class="myPage-orderLabel">我的需求</view>
                </view>
                <view class="myPage-order">
                    <view class="myPage-orderCount">{{applyCount || 1}}</view>
                    <view class="myPage-orderLabel">我的申请</view>
                </view>
            </view>

            <!-- 我的需求区域 -->
            <view class="myPage-myOrder">
                <view class="myPage-header">
                    <text class="myPage-headerTitle">我的需求</text>
                    <text class="myPage-headerMore" @click="navigateToOrders">更多</text>
                </view>
                <scroll-view scroll-x="true"class="myPage-orderScroll">
                    <button 
                        v-for="order in orders" 
                        :key="order.id" 
                        class="myPage-myOrderItem"
						@click="viewOrder"
                    >
                        <view class="myPage-myOrderItem-content">
                            <view class="myPage-orderTitleRow">
                                <text class="myPage-orderTitle">{{order.title}}</text>
                                <text class="myPage-orderStatus">{{order.status}}</text>
                            </view>
                            <view class="myPage-orderDetail">
                                <text class="myPage-orderSalary" style="color: #42B880;">薪资 {{order.salary}}</text>
                                <text class="myPage-orderDuration">{{order.duration}}</text>
                            </view>
                            <view class="myPage-orderDescription">
                                {{order.description.length > 50 ? order.description.slice(0, 50) + '...' : order.description}}
                            </view>
                            <view class="myPage-orderFooter">
                                <text class="myPage-orderContact">联系  {{order.contact}}</text>
                                <text class="myPage-orderLocation">地址  {{order.location}}</text>
                            </view>
                        </view>
                    </button>
                </scroll-view>
            </view>

            <!-- 我的申请区域 -->
            <view class="myPage-myOffer">
                <view class="myPage-header">
                    <text class="myPage-headerTitle">我的申请</text>
                    <text class="myPage-headerMore" @click="navigateToApplications">更多</text>
                </view>
                <view class="myPage-offerList">
                    <button 
                        v-for="item in applications" 
                        :key="item.id" 
                        class="myPage-myOfferItem"
                        @click="viewApplication(item.id)"
                    >
                        <view class="myPage-myOfferItem-Img" 
                              :style="{'background-color': '#D7D7D7'}"
                        ></view>
                        <view class="myPage-offerMiddle">
                            <text class="myPage-offerTitle">{{item.title}}</text>
                            <text class="myPage-offerPrice">{{item.price}}</text>
                        </view>
                        <view class="myPage-offerRight">
                            <text class="myPage-offerDuration">{{item.duration}}</text>
                            <view class="myPage-offerLocation">
                                <image src="/static/logos/icon_location@2x.png" mode="aspectFit" />
                                <text>{{item.location}}</text>
                            </view>
                        </view>
                    </button>
                </view>
            </view>
        </scroll-view>
    </view>
    
    <loginPageVue v-else></loginPageVue>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserInfoStore } from '@/stores/userInfo.js';
import loginPageVue from '../components/loginPage.vue';

const userInfoStore = useUserInfoStore();

// 计算属性
const isLoggedIn = computed(() => userInfoStore.isLoggedIn);
const userInfo = computed(() => userInfoStore.getUserInfo);

// 状态数据
const orderCount = ref(1);
const applyCount = ref(1);
const orders = ref([{
    id: 1,
    title: '寻找：优衣库服装销售员',
    status: '实习',
    salary: '4000',
    duration: '3个月',
    description: '本人大学生放假，想兼职，赚点零用钱！放假，想兼职，赚点零用钱！本人大学生放假，想兼职，赚点零用钱！42B880你好',
    contact: '12345678900',
    location: 'xx市 xx区 xx街道'
}]);

const applications = ref([{
    id: 1,
    title: '万达优衣库招服务员',
    price: '10000元',
    duration: '4个月',
    location: '佛山南海区桂城'
}]);

// 页面加载时获取数据
onMounted(async () => {
    if (isLoggedIn.value) {
        try {
            await loadUserData();
        } catch (error) {
            console.error('加载用户数据失败:', error);
            uni.showToast({
                title: '数据加载失败',
                icon: 'none'
            });
        }
    }
});

// 加载用户数据
const loadUserData = async () => {
    try {
        // 实际项目中这里应该调用后端API
        console.log('Loading user data...');
    } catch (error) {
        console.error('加载数据失败:', error);
        throw error;
    }
};

// 页面导航方法
const navigateToOrders = () => {
    uni.navigateTo({ url: '/pages/myOrderListPage' });
};

const navigateToApplications = () => {
    uni.navigateTo({ url: '/pages/myOfferListPage' });
};

const viewApplication = () => {
    uni.navigateTo({ url: `/pages/myOfferDetailPage` });
};

const viewOrder = () => {
	uni.navigateTo({
		url: '/pages/myOrderDetailPage'
	})
}
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

.myPage-orderCount {
    font-size: 36rpx;
    font-weight: bold;
    margin-bottom: 10rpx;
}

.myPage-orderLabel {
    font-size: 28rpx;
    color: #333;
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

.myPage-header {
    display: flex;
    justify-content: space-between;
    margin: 24rpx auto;
    width: 90%;
}

.myPage-headerTitle {
    font-size: 28rpx;
    font-weight: bold;
}

.myPage-headerMore {
    font-size: 28rpx;
    color: white;
    font-weight: bold;
}

.myPage-orderScroll {
    width: 95%;
    height: 75%;
    white-space: nowrap;
    margin: 0rpx auto;
}

.myPage-myOrderItem {
    width: 70%;
    height: 100%;
    background: linear-gradient(#C7FFD8, #E5FFED);
    border-radius: 24rpx;
    display: inline-block;
    margin: 0rpx 20rpx;
	padding: 20rpx;
}

.myPage-myOrderItem-content {
    display: flex;
    width: 90%;
    height: 95%;
    margin: auto;
    flex-direction: column;
    padding: 10rpx;
}

.myPage-orderTitleRow {
    display: flex;
    justify-content: space-between;
}

.myPage-orderTitle {
    font-size: 30rpx;
    font-weight: bold;
}

.myPage-orderStatus {
    font-size: 28rpx;
    font-weight: bold;
    color: #42B880;
}

.myPage-orderDetail {
    display: flex;
    gap: 20rpx;
	margin-top: 20rpx;
    margin-bottom: 20rpx;
	justify-content: space-between;

}

.myPage-orderSalary,
.myPage-orderDuration {
    font-size: 28rpx;
    color: #666;
	font-weight: bold;
}

.myPage-orderDescription {
    font-size: 24rpx;
    color: #333;
    margin-bottom: 20rpx;
	min-height: 100rpx;
	text-align: left;
	white-space: normal;
	word-wrap: break-word; /* 确保长单词或URL也能换行 */
	line-height: 35rpx;
}

.myPage-orderFooter {
    font-size: 26rpx;
    color: #666;
	display: flex;
	flex-direction: column;
	align-items: start;
	font-weight: bold;
	margin-top: 40rpx;
}

.myPage-myOffer {
    width: 100%;
    min-height: 300rpx;
    border-radius: 30rpx;
    margin-top: 40rpx;
    background: #a5e3c9;
    display: flex;
    flex-direction: column;
    margin-bottom: 20rpx;
    padding-bottom: 20rpx;
}

.myPage-offerList {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 88%;
}

.myPage-myOfferItem {
    width: 90%;
    height: 140rpx;
    padding: 3%;
    border-radius: 15rpx;
    margin: 10rpx auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    background: #ffffff;
}

.myPage-myOfferItem-Img {
    width: 120rpx;
    height: 120rpx;
    border-radius: 10rpx;
}

.myPage-offerMiddle {
    display: flex;
    flex-direction: column;
    height: 110rpx;
    justify-content: space-around;
    align-items: start;
}

.myPage-offerTitle {
    font-size: 32rpx;
    font-weight: bold;
}

.myPage-offerPrice {
    font-size: 32rpx;
    font-weight: bold;
    color: #42B880;
}

.myPage-offerRight {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-around;
    align-items: flex-end;
}

.myPage-offerDuration {
    font-size: 26rpx;
    font-weight: bold;
    color: #42B880;
}

.myPage-offerLocation {
    display: flex;
    width: 100%;
    flex-wrap: nowrap;
    align-items: center;
}

.myPage-offerLocation image {
    width: 30rpx;
    height: 30rpx;
}

.myPage-offerLocation text {
    color: #919191;
    margin-left: 10rpx;
    font-size: 22rpx;
}
</style>
