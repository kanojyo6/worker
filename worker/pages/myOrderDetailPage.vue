<template>
	<scroll-view scroll-y class="page-container">
	  <view v-if="authIsLoading" class="loading-overlay">
		<view class="loading-content">
		  <uni-load-more status="loading" :show-icon="true" iconType="snow"></uni-load-more>
		  <text>检查登录状态...</text>
		</view>
	  </view>
  
	  <view class="orderDetail-background">
		<view v-if="pageDataLoading && !authIsLoading" class="loading-indicator content-box">
		  <uni-load-more status="loading"></uni-load-more>
		  <text>加载详情中...</text>
		</view>
  
		<view v-if="pageError && !authIsLoading && !pageDataLoading" class="error-message-box content-box">
		  <text>抱歉，加载数据失败：</text>
		  <text>{{ pageError }}</text>
		  <button @click="retryLoadData" class="retry-button">重试</button>
		</view>
  
		<template v-if="!pageDataLoading && !pageError && !authIsLoading">
		  <view class="orderDetail-content" style="min-height: 500rpx;">
			<view v-if="!orderDetailInfo.imageUrl" class="orderDetail-image placeholder-image"></view>
			<image v-else class="orderDetail-image" :src="orderDetailInfo.imageUrl" mode="aspectFill" @error="onImageError"></image>
			
			<view class="orderDetail-userMsg">
			  <view class="user-info-left">
				<view class="orderDetail-avatar placeholder-avatar"></view>
				<view class="username">{{ orderDetailInfo.publisherName || '招聘方' }}</view>
			  </view>
			  <view class="location-info">
				<image src="/static/logos/icon_location@2x.png" mode="aspectFit" class="location-icon"></image>
				<view class="location-text">{{ orderDetailInfo.location || '地点未知' }}</view>
			  </view>
			</view>
			
			<view class="orderDetail-orderMsg">
			  <view class="title-text">{{ orderDetailInfo.title || '招聘标题' }}</view>
			  <view class="salary-text">{{ orderDetailInfo.salary || '薪资面议' }}元</view>
			  <view class="period-text">{{ orderDetailInfo.salaryPeriod || '周期未定' }}</view>
			</view>
		  </view>
  
		  <view class="orderDetail-content detail-section">
			<text class="section-title">兼职详情</text>
			<text class="detail-text">{{ orderDetailInfo.content || '暂无详细描述。' }}</text>
		  </view>
  
		  <button @click="handleViewApplications" class="orderDetail-submitBtn" :disabled="authIsLoading || applicatorsLoading">
			{{ applicatorsLoading ? '加载申请中...' : '查看申请' }}
		  </button>
		</template>
		
		<view v-if="!isAuthenticated && !authIsLoading && showLoginPromptForData" class="login-prompt-box content-box">
		  <text>您需要登录才能查看此内容。</text>
		  <button @click="goToLogin" class="login-button-prompt">前往登录</button>
		</view>
  
		<uni-popup ref="applicatorsPopupRef" type="bottom" background-color="#fff">
		  <orderDetailPopup :order-id="orderId" @close="dismissApplicatorsPopup" />
		</uni-popup>
	  </view>
	</scroll-view>
  </template>
  
  <script setup lang="ts">
  import { computed, ref, onMounted } from 'vue';
  import { onLoad } from '@dcloudio/uni-app';
  import { useAuth } from '@/utils/useAuth'; // Ensure path is correct
  import { useOrderDetailStore, useApplicatorsListStore } from '../stores/orderDetailPageStore'; // Ensure path is correct
  import uniPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue';
  import orderDetailPopup from './components/orderDetailPopup.vue'; // Ensure path to your popup component is correct
  
  // --- Authentication ---
  const { isAuthenticated, isLoading: authIsLoading, userInfo } = useAuth();
  
  // --- Pinia Stores ---
  const orderDetailStore = useOrderDetailStore();
  const applicatorsListStore = useApplicatorsListStore();
  
  // --- Page State ---
  const orderId = ref<string>('');
  const pageDataLoading = ref<boolean>(true); // For loading order detail specifically
  const applicatorsLoading = ref<boolean>(false); // For loading applicators list
  const pageError = ref<string | null>(null);
  const showLoginPromptForData = ref<boolean>(false); // Controls visibility of login prompt if data load fails due to auth
  
  // --- Computed Properties ---
  const orderDetailInfo = computed(() => orderDetailStore.orderDetailInfo); // Assuming store has `orderDetailInfo` directly
  
  // --- Popup Control ---
  const applicatorsPopupRef = ref<InstanceType<typeof uniPopup> | null>(null);
  
  // --- Methods ---
  const loadOrderDetail = async (id: string) => {
	if (!id) {
	  pageError.value = "无效的订单ID";
	  pageDataLoading.value = false;
	  return;
	}
	pageDataLoading.value = true;
	pageError.value = null;
	showLoginPromptForData.value = false;
  
	try {
	  // The API call within fetchOrderDetailInfo will be handled by the interceptor
	  // for authentication headers and token refresh.
	  await orderDetailStore.fetchOrderDetailInfo(id);
	} catch (error: any) {
	  console.error('加载订单详情失败 (myOrderDetailPage):', error);
	  pageError.value = error.message || '加载详情数据时发生错误。';
	  // Check if the error is due to lack of authentication (e.g. interceptor failed refresh and redirected, or a specific auth error)
	  // This is a basic check; more specific error handling might be needed based on actual error objects.
	  if (!isAuthenticated.value) {
		  showLoginPromptForData.value = true;
	  }
	} finally {
	  pageDataLoading.value = false;
	  uni.hideLoading(); // Ensure any global loading is hidden
	}
  };
  
  const handleViewApplications = async () => {
	if (authIsLoading.value) {
	  uni.showToast({ title: '正在检查登录状态...', icon: 'none' });
	  return;
	}
  
	if (!isAuthenticated.value) {
	  uni.showModal({
		title: '登录提示',
		content: '您需要登录后才能查看申请列表，是否立即前往登录页面？',
		success: (res) => {
		  if (res.confirm) {
			goToLogin();
		  }
		}
	  });
	  return;
	}
  
	applicatorsLoading.value = true;
	uni.showLoading({ title: '获取申请数据中...' });
	try {
	  // The API call within fetchApplicatorList will be handled by the interceptor.
	  await applicatorsListStore.fetchApplicatorList(orderId.value, 0); // Assuming page 0 for initial load
	  if (applicatorsPopupRef.value) {
		applicatorsPopupRef.value.open();
	  }
	} catch (error: any) {
	  console.error('获取申请列表失败 (myOrderDetailPage):', error);
	  uni.showToast({ title: error.message || '获取申请列表失败', icon: 'none' });
	} finally {
	  applicatorsLoading.value = false;
	  uni.hideLoading();
	}
  };
  
  const dismissApplicatorsPopup = () => {
	if (applicatorsPopupRef.value) {
	  applicatorsPopupRef.value.close();
	}
  };
  
  const onImageError = (e: any) => {
	console.warn('图片加载失败:', e.detail.errMsg);
	// Optionally set a placeholder if the bound imageUrl fails
	// For example, by changing a reactive property that orderDetailInfo.imageUrl might point to,
	// or by having a local ref for the image src and updating that.
	// This example assumes the placeholder is handled by the v-if/v-else on the image tag.
  };
  
  const retryLoadData = () => {
	if (orderId.value) {
	  loadOrderDetail(orderId.value);
	}
  };
  
  const goToLogin = () => {
	// Adjust the path to your login page
	uni.navigateTo({ url: '/pages/login/login' });
  };
  
  // --- Lifecycle Hooks ---
  onLoad(async (options: any) => {
	if (options && options.id) {
	  orderId.value = options.id;
	  console.log('页面加载，订单ID:', orderId.value);
	  // Initial data load.
	  // `authIsLoading` will be true initially from useAuth.
	  // We wait for auth to settle, then load data.
	  // A watcher on isAuthenticated or a more sophisticated flow might be needed
	  // if initAuth itself is very long. For now, assuming initAuth is quick.
	  if (isAuthenticated.value || !authIsLoading.value) { // If already authenticated or auth check finished
		  await loadOrderDetail(orderId.value);
	  } else {
		  // If auth is still loading, we can wait or show a specific prompt.
		  // For now, the authLoading overlay will cover this.
		  // Alternatively, use a watcher for isAuthenticated to trigger loadOrderDetail once auth is true.
		  const unwatch = watch(authIsLoading, async (newAuthLoadingVal) => {
			  if (!newAuthLoadingVal && isAuthenticated.value) { // Auth finished and user is authenticated
				  await loadOrderDetail(orderId.value);
				  unwatch(); // Stop watching after first trigger
			  } else if (!newAuthLoadingVal && !isAuthenticated.value) { // Auth finished, user not authenticated
				  pageDataLoading.value = false;
				  showLoginPromptForData.value = true; // Prompt to login to see details
				  unwatch();
			  }
		  });
	  }
	} else {
	  console.error('未提供订单ID');
	  pageError.value = '未提供有效的订单ID。';
	  pageDataLoading.value = false;
	  uni.hideLoading();
	}
  });
  
  onMounted(() => {
	// Any additional setup after component is mounted
  });
  </script>
  
  <style scoped>
  /* Scoped styles for myOrderDetailPage.vue */
  .page-container {
	min-height: 100vh;
	background: linear-gradient(to bottom, #7FD8B3 0%, #7FD8B3 15%, white 30%, white 100%);
  }
  
  .loading-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(255, 255, 255, 0.85);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 9999;
  }
  .loading-content { /* For auth loading */
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 30rpx;
	background-color: #fff;
	border-radius: 15rpx;
	box-shadow: 0 4rpx 20rpx rgba(0,0,0,0.1);
  }
  .loading-indicator.content-box { /* For page data loading */
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 40rpx;
	background-color: #fff;
	border-radius: 30rpx;
	margin: 30rpx 0;
	min-height: 200rpx;
  }
  .error-message-box.content-box, .login-prompt-box.content-box {
	background-color: #fff;
	padding: 40rpx;
	margin: 30rpx 0;
	border-radius: 30rpx;
	text-align: center;
	color: #e53935;
  }
  .login-prompt-box.content-box text {
	display: block;
	margin-bottom: 20rpx;
	color: #333;
  }
  .retry-button, .login-button-prompt {
	background-color: #42B880;
	color: white;
	padding: 15rpx 40rpx;
	border-radius: 40rpx;
	font-size: 28rpx;
	margin-top: 20rpx;
	border: none;
  }
  .retry-button:active, .login-button-prompt:active {
	background-color: #3aa070;
  }
  
  
  .orderDetail-background {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 92%; /* Slightly reduced width */
	padding: 30rpx 0 120rpx 0; /* Adjusted padding */
	margin: 0 auto;
  }
  
  .orderDetail-content {
	width: 100%;
	display: flex;
	flex-direction: column;
	background: white;
	border-radius: 24rpx; /* Slightly smaller radius */
	box-shadow: 0px 6rpx 18rpx rgba(0, 0, 0, 0.07);
	margin-bottom: 30rpx; /* Added margin between content blocks */
  }
  .orderDetail-content:last-child {
	margin-bottom: 0;
  }
  
  
  .orderDetail-image {
	width: 100%;
	height: 450rpx;
	border-top-left-radius: 24rpx;
	border-top-right-radius: 24rpx;
	background-size: cover;
	background-position: center;
  }
  .placeholder-image {
	background-color: #DADADA; /* Placeholder background */
	display: flex;
	align-items: center;
	justify-content: center;
	/* Optional: Add an icon or text for placeholder */
  }
  .placeholder-image::before {
   content: "图片加载中";
   color: #999;
   font-size: 28rpx;
  }
  
  
  .orderDetail-userMsg {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 25rpx 30rpx;
  }
  .user-info-left {
	display: flex;
	align-items: center;
  }
  .orderDetail-avatar {
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
	margin-right: 20rpx;
  }
  .placeholder-avatar {
	background-color: #E0E0E0;
  }
  .username {
	font-size: 30rpx;
	color: #333;
	font-weight: 500;
  }
  .location-info {
	display: flex;
	align-items: center;
  }
  .location-icon {
	width: 32rpx;
	height: 32rpx;
	margin-right: 8rpx;
  }
  .location-text {
	color: #888;
	font-size: 24rpx;
  }
  
  .orderDetail-orderMsg {
	display: flex;
	flex-direction: column;
	padding: 10rpx 30rpx 30rpx 30rpx;
	gap: 8rpx;
  }
  .title-text {
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
	line-height: 1.4;
  }
  .salary-text {
	font-size: 36rpx;
	font-weight: bold;
	color: #42B880;
  }
  .period-text {
	font-size: 28rpx;
	font-weight: 500;
	color: #42B880;
  }
  
  .detail-section {
	padding: 30rpx;
  }
  .section-title {
	font-size: 40rpx; /* Adjusted size */
	font-weight: bold;
	display: block;
	margin-bottom: 25rpx; /* Increased margin */
	color: #333;
  }
  .detail-text {
	font-size: 28rpx; /* Adjusted size */
	line-height: 1.7; /* Increased line height */
	color: #555;
	white-space: pre-wrap; /* Preserve line breaks from content */
  }
  
  .orderDetail-submitBtn {
	width: 90%;
	max-width: 650rpx;
	height: 90rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 32rpx;
	color: white;
	background: #42B880;
	margin: 50rpx auto 30rpx auto; /* Adjusted margin */
	border-radius: 45rpx;
	line-height: 90rpx;
	box-shadow: 0 5rpx 12rpx rgba(66, 184, 128, 0.35);
	border: none; /* Ensure no default border */
  }
  .orderDetail-submitBtn:active {
	background: #36a46a; /* Darker shade on active */
  }
  .orderDetail-submitBtn[disabled] {
	background-color: #b0e0c8;
	color: #f0f8f4;
	box-shadow: none;
	opacity: 0.8;
  }
  
  /* Styles for the popup content component if needed, or they can be in orderDetailPopup.vue */
  /* For uni-popup itself, you might control its container style via its props or globally */
  
  /* Global button reset if not already done in App.vue or global style */
  button::after {
	border: none;
  }
  button { /* More specific reset for buttons within this page if needed */
	margin: 0;
	padding: 0;
	border-radius: 0; /* Reset if you want to control all button radius specifically */
	background-color: transparent; /* Reset if you want to control all button bg specifically */
	line-height: normal; /* Reset line height */
  }
  </style>