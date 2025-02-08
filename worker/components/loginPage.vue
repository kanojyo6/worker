<template>
	<view class="loginPage-background">
		<view class="loginPage-avatar"></view>
		<button class="loginPage-loginBtn" @click="login">一键登录</button>
		<view style="font-size: 24rpx; color: #8c8c8c; margin-top: 20rpx;">登录后尽享更多权益</view>
	</view>
</template>

<script setup>
	import {
		useUserInfoStore
	} from '@/stores/userInfo.js'

	// 注册用户信息管理器
	const userInfoStore = useUserInfoStore()

	// 获取微信用户的基本信息
	const getUserProfile = () => {
		uni.getUserProfile({
			desc: '获取用户信息', // 声明获取用户信息的用途
			success: (res) => {
				console.log('用户信息获取成功', res.userInfo);
				// 这里可以处理获取到的用户信息，例如存储到全局状态或发送到服务器
				setTimeout(() => {
					userInfoStore.setData(res.userInfo.nickName, res.userInfo
						.avatarUrl)
				}, 500)
			},
			fail: (err) => {
				console.log('用户信息获取失败', err);
				// 处理失败情况，例如提示用户授权
				if (err.errMsg === 'getUserProfile:fail auth deny') {
					uni.showToast({
						title: '您拒绝了授权',
						icon: 'none'
					});
				}
			}
		});
	};

	// 获取临时登录凭证
	const getLogiuCode = () => {
		uni.login({
			"provider": "weixin",
			"onlyAuthorize": true,
			success: (event) => {
				const {
					code, errMsg
				} = event
				
				// 处理异常情况
				if (errMsg !== 'login:ok') {
					uni.showToast({
						title: '登录失败!',
						icon: 'none'
					});
					return
				}
				// 客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。
				console.log('获取到临时凭证：', code)
			},
			fail: (err) => {
				console.log('失败', err)
			}
		})
	}

	// 登录
	const login = async () => {
		const userInfo = getUserProfile()
		const loginCode = getLogiuCode()

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

	.loginPage-background {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		min-height: 100vh;
		background: linear-gradient(#7FD8B3, white);
	}

	.loginPage-avatar {
		width: 200rpx;
		height: 200rpx;
		border-radius: 500rpx;
		background: #d7d7d7;
		margin-top: 100rpx;
	}

	.loginPage-loginBtn {
		width: 55%;
		height: 80rpx;
		border-radius: 100rpx;
		background: #42B880;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		font-size: 32rpx;
		margin-top: 100rpx;
	}
</style>