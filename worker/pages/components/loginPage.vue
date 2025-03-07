<template>
    <view class="loginPage-background">
        <view class="loginPage-avatar"></view>
        <button class="loginPage-loginBtn" @click="login">一键登录</button>
        <view style="font-size: 24rpx; color: #8c8c8c; margin-top: 20rpx;">登录后尽享更多权益</view>
    </view>
</template>

<script setup>
import { useUserInfoStore } from '@/stores/userInfo.js'
import { requestMyOrdersInfo } from '../../services/myPageService';
import { useMyOrdersStore } from '../../stores/myPageStore';

const userInfoStore = useUserInfoStore()
const myOrdersStore = useMyOrdersStore()

// 获取微信用户信息
const getUserProfile = () => {
    return new Promise((resolve, reject) => {
        uni.getUserProfile({
            desc: '用于完善会员资料',
            success: (res) => {
                console.log('用户信息获取成功', res.userInfo);
                userInfoStore.setUserInfo({
                    nickName: res.userInfo.nickName,
                    avatarUrl: res.userInfo.avatarUrl
                });
                resolve(res.userInfo);
            },
            fail: (err) => {
                console.log('用户信息获取失败', err);
                uni.showToast({
                    title: '需要授权才能使用',
                    icon: 'none'
                });
                reject(err);
            }
        });
    });
};

// 获取登录凭证
const getLoginCode = () => {
    return new Promise((resolve, reject) => {
        uni.login({
            provider: "weixin",
            onlyAuthorize: true,
            success: (event) => {
                if (event.errMsg === 'login:ok') {
                    resolve(event.code);
                } else {
                    reject(new Error('获取登录凭证失败'));
                }
            },
            fail: reject
        });
    });
};

// 发送登录请求
const sendLoginRequest = (code, userInfo) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: 'http://183.136.206.77:45212/login/wechat/miniapp',
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            data: {
                code: code,
                phoneCode: null
            },
            success: (res) => {
                if (res.statusCode === 200) {
                    const { access_token, refresh_token, user } = res.data;
                    uni.setStorageSync('token', access_token);
                    uni.setStorageSync('refresh_token', refresh_token);
                    userInfoStore.setUserInfo(user);
                    resolve(res.data);
                } else {
                    reject(new Error(res.data.message || '登录失败'));
                }
            },
            fail: reject
        });
    });
};

// 登录流程
const login = async () => {
    try {
        uni.showLoading({ title: '登录中...' });
        
        const userInfo = await getUserProfile();
        const code = await getLoginCode();
        await sendLoginRequest(code, userInfo);
		await myOrdersStore.fetchMyOrders();
        
        uni.hideLoading();
        uni.showToast({
            title: '登录成功',
            icon: 'success'
        });
		
		await userInfoStore.fetchUserInfo();
        
        // 登录成功后跳转
        setTimeout(() => {
            uni.switchTab({
                url: '/pages/tabbar/myPage'
            });
        }, 1500);
    } catch (error) {
        uni.hideLoading();
        uni.showToast({
            title: error.message || '登录失败',
            icon: 'none'
        });
        console.error('登录失败:', error);
    }
};
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