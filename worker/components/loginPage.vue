<template>
	<view class="loginPage-background">
		<view class="loginPage-avatar"></view>
		<button class="loginPage-loginBtn" @click="login">一键登录</button>
		<view style="font-size: 24rpx; color: #8c8c8c; margin-top: 20rpx;">登录后尽享更多权益</view>
	</view>
</template>

<script setup>
import { useUserInfoStore } from '@/stores/userInfo.js'

// 注册用户信息管理器
const userInfoStore = useUserInfoStore()

// 获取微信用户的基本信息
const getUserProfile = () => {
    return new Promise((resolve, reject) => {
        uni.getUserProfile({
            desc: '获取用户信息', // 声明获取用户信息的用途
            success: (res) => {
                console.log('用户信息获取成功', res.userInfo);
                // 将用户信息存储到状态管理器
                userInfoStore.setData(res.userInfo.nickName, res.userInfo.avatarUrl);
                resolve(res.userInfo);
            },
            fail: (err) => {
                console.log('用户信息获取失败', err);
                if (err.errMsg === 'getUserProfile:fail auth deny') {
                    uni.showToast({
                        title: '您拒绝了授权',
                        icon: 'none'
                    });
                }
                reject(err);
            }
        });
    });
};

// 获取临时登录凭证
const getLoginCode = () => {
    return new Promise((resolve, reject) => {
        uni.login({
            "provider": "weixin",
            "onlyAuthorize": true,
            success: (event) => {
                const { code, errMsg } = event;
                if (errMsg !== 'login:ok') {
                    uni.showToast({
                        title: '登录失败!',
                        icon: 'none'
                    });
                    reject(new Error('登录失败'));
                    return;
                }
                console.log('获取到临时凭证：', code);
                resolve(code);
            },
            fail: (err) => {
                console.log('获取登录凭证失败', err);
                reject(err);
            }
        });
    });
};

// 发送登录请求到服务器
const sendLoginRequest = (code, userInfo) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: 'http://183.136.206.77:32222/login/wechat/miniapp',
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            data: {
                code: code,
                // 暂时不发送手机号信息
                phoneCode: null
            },
            success: (res) => {
                console.log("服务器返回结果：", res);
                if (res.statusCode === 200) {
                    // 存储服务器返回的token
                    const { access_token, refresh_token, user } = res.data;
                    uni.setStorageSync('access_token', access_token);
                    uni.setStorageSync('refresh_token', refresh_token);
                    uni.setStorageSync('user', user);
                    
                    resolve(res.data);
                } else {
                    reject(new Error(res.data.message || '登录失败'));
                }
            },
            fail: (err) => {
                console.error('请求失败：', err);
                reject(err);
            }
        });
    });
};

// 登录主流程
const login = async () => {
    try {
        // 显示加载提示
        uni.showLoading({
            title: '登录中...'
        });

        // 1. 获取用户信息
        const userInfo = await getUserProfile();
        
        // 2. 获取登录凭证
        const code = await getLoginCode();
        
        // 3. 发送登录请求
        const loginResult = await sendLoginRequest(code, userInfo);
        
        // 4. 登录成功处理
        uni.hideLoading();
        uni.showToast({
            title: '登录成功',
            icon: 'success'
        });
        
        // 5. 登录成功后的跳转
        setTimeout(() => {
            uni.switchTab({
                url: '/pages/tabbar/myPage'
            });
        }, 1500);
        
    } catch (error) {
        // 错误处理
        uni.hideLoading();
        uni.showToast({
            title: error.message || '登录失败',
            icon: 'none'
        });
        console.error('登录失败：', error);
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