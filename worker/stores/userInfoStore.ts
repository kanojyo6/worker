import { defineStore } from 'pinia'
import { getUserInfo } from '../services/AuthService';
import { useAuth } from '../utils/useAuth';
import type { UserInfo } from '../model/UserInfo';

export const useUserInfoStore = defineStore('userInfo', {
	state: () : UserInfo => ({
		id: null,
		nickName: '',
		avatarUrl: '',
		phone: '',
		enabled: true,
		createTime: '',
		role: '',
		userLevel: '',
	}),

	getters: {
		getUserInfo: (state) : UserInfo => state,
		isAdmin: (state) => state.role
	},

	actions: {
		// 设置用户信息
		setUserInfo(userInfo: any) {
			if (userInfo !== undefined) {
				this.nickName = userInfo.nickName;
				this.avatarUrl = userInfo.avatarUrl;
			}

			console.log('用户信息更新成功:', this.getUserInfo);
		},

		// 从服务器获取用户信息
		async fetchUserInfo() {
			try {
				const auth = useAuth();

				if (auth.isAuthenticated.value) {
					const userInfo = await getUserInfo();
					this.setUserInfo(userInfo);
					return userInfo;
				} else {
					uni.hideLoading();
					uni.showToast({
						title: '未登录',
						icon: 'none'
					});
					throw new Error('未登录');
				}
			} catch (error) {
				console.error('获取用户信息失败:', error);
				throw error;
			}
		},

		// 清除用户信息
		clearUserInfo() {
			this.$reset();
		}
	}
})