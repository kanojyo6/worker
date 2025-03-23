<template>
	<view>
		<scroll-view class="orderPopup-background" scroll-y="true">
			<view v-for="person in applicators" class="orderPopup-item">
				<view style="display: flex; align-items: center;">
					<!-- 头像 -->
					<image v-if="person.applicantAvatar !== ''" :src="person.applicantAvatar" mode="aspectFill"
						class="orderPopup-img"></image>
					<view v-else class="orderPopup-img" style="background-color: #d7d7d7;"></view>
					<!-- 用户名 -->
					<text class="orderPopup-offersName">{{ person.applicantName }}</text>
				</view>
				<view v-if="person.currentStatus === 'applied'" style="display: flex; align-items: center; justify-content: space-around; width: 300rpx; margin-right: 20rpx;">
					<button @click="handleDisAgree(person.id)" class="orderPopup-btn" style="background-color: red;">忽略</button>
					<button @click="handleAgree(person.id)" class="orderPopup-btn" style="background-color: #42B880;">同意</button>
				</view>
				<view v-else style="display: flex; align-items: center; justify-content: center; width: 300rpx; margin-right: 20rpx; font-size: 26rpx; color: gray;">
					{{ person.currentStatusDescription }}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import { useApplicatorsListStore } from '../../stores/orderDetailPageStore';
	import { agreeApplicator, ignoreApplicator } from '../../services/orderDetailPageService';

	const applicatorsListStore = useApplicatorsListStore()

	const applicators = computed(() => applicatorsListStore.getApplicatorList)


	// 操作方法
	const handleDisAgree = async (id: string) => {
		uni.showLoading({ title: '操作中...' })
		try {
			await ignoreApplicator(id)
			uni.showToast({
				title: '已忽略',
				icon: 'none'
			})
		} catch (e) {
			//TODO handle the exception
			uni.hideLoading()
			console.error(e)
			uni.showToast({
				icon: 'error',
				title: '请求出错'
			})
		}
	}

	// 同意
	const handleAgree = async (id : string) => {
		uni.showLoading({ title: '操作中...' })
		try {
			await agreeApplicator(id)
			uni.showToast({
				title: '已同意',
				icon: 'success'
			})
		} catch (e) {
			//TODO handle the exception
			uni.hideLoading()
			console.error(e)
			uni.showToast({
				icon: 'error',
				title: '请求出错'
			})
		}
	}
</script>

<style>
	.orderPopup-background {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		height: 500rpx;
		padding-top: 30rpx;
		background-color: white;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
	}

	.orderPopup-item {
		width: 100%;
		height: 70rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 20rpx;
	}

	.orderPopup-img {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.orderPopup-offersName {
		font-size: 26rpx;
		color: #000;
		margin-left: 20rpx;
	}

	.orderPopup-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 120rpx;
		height: 70rpx;
		font-size: 26rpx;
		color: white;
		border-radius: 15rpx;
	}
</style>