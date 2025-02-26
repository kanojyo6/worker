<template>
	<scroll-view>
		<view class="offerDetail-background">
			<view class="offerDetail-content" style="height: 1000rpx;">
				<!-- 图片 -->
				<view class="offerDetail-image" style="background: #DADADA;"></view>
				<!-- 用户信息 -->
				<view class="offerDetail-userMsg">
					<view style="display: flex; align-items: center;">
						<view class="offerDetail-avatar" style="background: #DADADA;"></view>
						<view style="margin-left: 20rpx;">{{ userName }}</view>
					</view>
					<view style="display: flex; align-items: center;">
						<image src="/static/logos/icon_location@2x.png" mode="aspectFit"
							style="width: 40rpx; height: 40rpx;"></image>
						<view style="color: #919191; margin-left: 10rpx; font-size: 26rpx;">{{ address }}</view>
					</view>
				</view>
				<!-- 订单信息 -->
				<view class="offerDetail-orderMsg">
					<view style="font-size: 38rpx; font-weight: bold;">万达优衣库招服务员</view>
					<view style="font-size: 38rpx; font-weight: bold; color: #42B880;">1000元</view>
					<view style="font-size: 30rpx; font-weight: bold; color: #42B880;">4个月</view>
				</view>
			</view>

			<!-- 兼职详情 -->
			<view class="offerDetail-content" style="margin-top: 30rpx; margin-bottom: 30rpx;">
				<text style="font-size: 45rpx; font-weight: bold; margin-left: 35rpx; margin-top: 35rpx;">兼职详情</text>
				<text style="font-size: 30rpx; margin-left: 35rpx; margin-top: 35rpx; margin-right: 35rpx;">
					你想在时尚氛围中开启兼职之旅吗？优衣库正在寻找热情活力的兼职伙伴！
					在这里，你将置身于潮流前线，接触到优衣库多样且高品质的时尚服饰。工作内容丰富有趣，包括整理陈列商品、为顾客提供专业贴心的服务等。
					我们提供具有竞争力的时薪，让你的付出得到实实在在的回报。还有舒适的工作环境和一群积极向上的同事，大家一起打造愉悦的购物氛围。
					工作时间灵活，可根据你的学业或生活安排协调，非常适合学生党或时间较为自由的伙伴。
					无论你有无销售经验，只要你热情开朗、责任心强，就有机会成为优衣库大家庭的一员。快来加入我们，一起开启时尚又充实的兼职生活吧！
					报名方式：[具体报名方式，如发送简历至邮箱、电话联系等]
				</text>
			</view>


			<button @click="handleSubmit" class="offerDetail-submitBtn">提交申请</button>
			<uni-popup ref="popup">

				<!-- 弹出层 -->
				<view>
					<view class="offerDetail-popup">
						<image src="/static/logos/icon_box_tips@3x.png" mode="aspectFit"
							style="width: 160rpx; height: 160rpx; margin-bottom: 60rpx;"></image>
						<view style="font-size: 34rpx; font-weight: bold;">是否确认提交</view>
						<view class="offerDetail-popup-btns">
							<button @click="dismissPopup" class="popup-btn"
								style="border: solid 2rpx #42B880; background: #fff; color: #42B880;">取消</button>
							<button class="popup-btn"
								style="border: solid 2rpx #42B880; background: #42b880; color: #fff;">确认</button>
						</view>
					</view>
				</view>

			</uni-popup>
		</view>
	</scroll-view>

</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import uniPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue'

	const userName = ref('用户名称')
	const address = ref('翻斗花园')

	// 控制弹出层
	const popup = ref(null)
	const handleSubmit = () => {
		console.log(popup.value)
		popup.value.open()
	}
	const dismissPopup = () => {
		popup.value.close()
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

	.offerDetail-background {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 90%;
		padding: 5%;
		height: 100%;
		background: linear-gradient(#7FD8B3, white);
	}

	.offerDetail-content {
		width: 100%;
		display: flex;
		flex-direction: column;
		background: white;
		border-radius: 30rpx;
	}

	.offerDetail-image {
		width: 100%;
		height: 60%;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
	}

	.offerDetail-userMsg {
		width: 90%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 30rpx 50rpx;
	}

	.offerDetail-avatar {
		width: 90rpx;
		height: 90rpx;
		border-radius: 100rpx;
	}

	.offerDetail-orderMsg {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-evenly;
		width: 85%;
		margin: auto;
	}

	.offerDetail-submitBtn {
		width: 95%;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		color: white;
		background: #42B880;
		margin-top: 40rpx;
		border-radius: 60rpx;
	}

	.offerDetail-popup {
		width: 460rpx;
		height: 660rpx;
		padding: 20rpx;
		background-color: #fff;
		margin: auto;
		border-radius: 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.offerDetail-popup-btns {
		width: 90%;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		margin-top: 70rpx;
	}

	.popup-btn {
		width: 180rpx;
		height: 70rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50rpx;
		font-size: 28rpx;
	}
</style>