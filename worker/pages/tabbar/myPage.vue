<template>
    <view v-if="isLoggedIn" class="myPage-background">
        <scroll-view style="display: flex; width: 100%;">
            <!-- 用户信息 -->
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
                <view v-else class="myPage-userAvatar" style="background-color: #DADADA;"></view>
            </view>

            <!-- 统计信息 -->
            <view class="myPage-selector">
                <view class="myPage-order">
                    <view style="font-size: 36rpx; font-weight: bold; margin-bottom: 10rpx;">
                        {{orderCount}}
                    </view>
                    <view>我的需求</view>
                </view>
                <view class="myPage-order">
                    <view style="font-size: 36rpx; font-weight: bold; margin-bottom: 10rpx;">
                        {{applyCount}}
                    </view>
                    <view>我的申请</view>
                </view>
            </view>

            <!-- 我的需求列表 -->
            <view class="myPage-myOrder">
                <view class="myPage-sectionHeader">
                    <text class="myPage-sectionTitle">我的需求</text>
                    <text class="myPage-sectionMore" @click="navigateToOrders">更多</text>
                </view>
                <scroll-view 
                    scroll-x="true" 
                    class="myPage-orderList"
                >
                    <view 
                        v-for="order in orders" 
                        :key="order.id" 
                        class="myPage-myOrderItem"
                    >
                        <view class="myPage-myOrderItem-content">
                            <view class="myPage-orderHeader">
                                <text class="myPage-orderTitle">{{order.title}}</text>
                                <text class="myPage-orderStatus">{{order.status}}</text>
                            </view>
                            <!-- 其他订单信息 -->
                        </view>
                    </view>
                </scroll-view>
            </view>

            <!-- 我的申请列表 -->
            <view class="myPage-myOffer">
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
                        <view class="myPage-myOfferItem-Img" 
                              :style="{'background-image': `url(${application.image})`}">
                        </view>
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
        </scroll-view>
    </view>
    
    <!-- 未登录时显示登录页 -->
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
