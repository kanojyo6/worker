<template>
    <view v-if="isLoggedIn" class="myPage-background">
        <!-- 用户信息区域 -->
        <view class="myPage-userInfo">
            <view class="myPage-userNickname">
                {{ `Hi, ${userInfo.nickName || '未设置昵称'}` }}
            </view>
            <view class="myPage-userAvatarBg">
                <image 
                    v-if="userInfo.avatarUrl" 
                    :src="userInfo.avatarUrl"
                    mode="aspectFit" 
                    class="myPage-userAvatar"
                />
                <view v-else class="myPage-userAvatar"></view>
            </view>
        </view>

        <!-- 统计信息区域 -->
        <view class="myPage-selector">
            <view class="myPage-order">
                <view class="myPage-orderCount">{{orderCount}}</view>
                <view class="myPage-orderLabel">我的需求</view>
            </view>
            <view class="myPage-order">
                <view class="myPage-orderCount">{{applyCount}}</view>
                <view class="myPage-orderLabel">我的申请</view>
            </view>
        </view>

        <!-- 需求列表区域 -->
        <view class="myPage-section">
            <view class="myPage-sectionHeader">
                <text class="myPage-sectionTitle">我的需求</text>
                <text class="myPage-sectionMore" @click="navigateToOrders">更多</text>
            </view>
            <scroll-view scroll-x="true" class="myPage-orderList">
                <view 
                    v-for="order in orders" 
                    :key="order.id" 
                    class="myPage-myOrderItem"
                >
                    <view class="myPage-orderHeader">
                        <text class="myPage-orderTitle">{{order.title}}</text>
                        <text class="myPage-orderStatus">{{order.status}}</text>
                    </view>
                </view>
            </scroll-view>
        </view>

        <!-- 申请列表区域 -->
        <view class="myPage-section">
            <view class="myPage-sectionHeader">
                <text class="myPage-sectionTitle">我的申请</text>
                <text class="myPage-sectionMore" @click="navigateToApplications">更多</text>
            </view>
            <view class="myPage-applicationList">
                <view 
                    v-for="application in applications" 
                    :key="application.id" 
                    class="myPage-myOfferItem"
                    @click="viewApplication(application.id)"
                >
                    <view class="myPage-myOfferItem-Img"></view>
                    <view class="myPage-applicationInfo">
                        <text class="myPage-applicationTitle">{{application.title}}</text>
                        <text class="myPage-applicationPrice">{{application.price}}</text>
                    </view>
                    <view class="myPage-applicationMeta">
                        <text class="myPage-applicationDuration">{{application.duration}}</text>
                        <view class="myPage-applicationLocation">
                            <image src="/static/logos/icon_location@2x.png" mode="aspectFit" />
                            <text>{{application.location}}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
    
    <loginPageVue v-else></loginPageVue>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserInfoStore } from '@/stores/userInfo.js';
import loginPageVue from '../../components/loginPage.vue';

const userInfoStore = useUserInfoStore();

// 计算属性
const isLoggedIn = computed(() => userInfoStore.isLoggedIn);
const userInfo = computed(() => userInfoStore.getUserInfo);

// 状态数据
const orderCount = ref(0);
const applyCount = ref(0);
const orders = ref([]);
const applications = ref([]);

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
        // 这里可以添加获取订单和申请数据的接口调用
        // 暂时使用模拟数据
        orderCount.value = 1;
        applyCount.value = 1;
        orders.value = [{
            id: 1,
            title: '寻找：优衣库服装销售员',
            status: '招聘中'
        }];
        applications.value = [{
            id: 1,
            title: '万达优衣库招服务员',
            price: '10000元',
            duration: '4个月',
            location: '佛山南海区桂城',
            image: ''
        }];
    } catch (error) {
        console.error('加载数据失败:', error);
        throw error;
    }
};

// 页面跳转方法
const navigateToOrders = () => {
    uni.navigateTo({ url: '/pages/orders/list' });
};

const navigateToApplications = () => {
    uni.navigateTo({ url: '/pages/applications/list' });
};

const viewApplication = (id) => {
    uni.navigateTo({ url: `/pages/applications/detail?id=${id}` });
};
</script>

<style>
/* 页面基础布局 */
.myPage-background {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    background-color: #f5f5f5;
    padding: 20rpx;
}

/* 用户信息区域 */
.myPage-userInfo {
    background: linear-gradient(135deg, #7FD8B3, #42B880);
    border-radius: 24rpx;
    padding: 40rpx 30rpx;
    margin-bottom: 30rpx;
}

.myPage-userNickname {
    color: #ffffff;
    font-size: 36rpx;
    font-weight: 600;
    margin-bottom: 20rpx;
}

.myPage-userAvatarBg {
    display: flex;
    justify-content: center;
    padding: 20rpx 0;
}

.myPage-userAvatar {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    border: 4rpx solid #ffffff;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

/* 统计信息区域 */
.myPage-selector {
    display: flex;
    background-color: #ffffff;
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.myPage-order {
    flex: 1;
    text-align: center;
    position: relative;
}

.myPage-order:first-child::after {
    content: '';
    position: absolute;
    right: 0;
    top: 20%;
    height: 60%;
    width: 2rpx;
    background-color: #e0e0e0;
}

.myPage-orderCount {
    font-size: 40rpx;
    font-weight: bold;
    color: #333333;
    margin-bottom: 12rpx;
}

.myPage-orderLabel {
    font-size: 28rpx;
    color: #666666;
}

/* 需求和申请列表区域 */
.myPage-section {
    background-color: #ffffff;
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.myPage-sectionHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;
}

.myPage-sectionTitle {
    font-size: 32rpx;
    font-weight: 600;
    color: #333333;
}

.myPage-sectionMore {
    font-size: 28rpx;
    color: #42B880;
}

/* 需求卡片样式 */
.myPage-orderList {
    white-space: nowrap;
    margin: 0 -30rpx;
    padding: 0 30rpx;
}

.myPage-myOrderItem {
    display: inline-block;
    width: 300rpx;
    padding: 20rpx;
    margin-right: 20rpx;
    background: linear-gradient(135deg, #ffffff, #f8f8f8);
    border-radius: 16rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.myPage-orderHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16rpx;
}

.myPage-orderTitle {
    font-size: 28rpx;
    color: #333333;
    font-weight: 500;
}

.myPage-orderStatus {
    font-size: 24rpx;
    color: #42B880;
    padding: 4rpx 12rpx;
    background-color: rgba(66, 184, 128, 0.1);
    border-radius: 100rpx;
}

/* 申请卡片样式 */
.myPage-myOfferItem {
    display: flex;
    padding: 20rpx;
    margin-bottom: 20rpx;
    background-color: #ffffff;
    border-radius: 16rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.myPage-myOfferItem-Img {
    width: 120rpx;
    height: 120rpx;
    border-radius: 12rpx;
    background-color: #f5f5f5;
    margin-right: 20rpx;
}

.myPage-applicationInfo {
    flex: 1;
    padding-right: 20rpx;
}

.myPage-applicationTitle {
    font-size: 28rpx;
    color: #333333;
    font-weight: 500;
    margin-bottom: 12rpx;
}

.myPage-applicationPrice {
    font-size: 32rpx;
    color: #42B880;
    font-weight: 600;
}

.myPage-applicationMeta {
    text-align: right;
}

.myPage-applicationDuration {
    font-size: 24rpx;
    color: #42B880;
    margin-bottom: 12rpx;
    display: block;
}

.myPage-applicationLocation {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 24rpx;
    color: #999999;
}

.myPage-applicationLocation image {
    width: 24rpx;
    height: 24rpx;
    margin-right: 8rpx;
}
</style>
