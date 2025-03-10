import { defineStore } from 'pinia'
import { validateAccessToken } from '../services/refreshTokenService';

export const useUserInfoStore = defineStore('userinfo', {
    // 定义状态，与后端 UserDTO 保持一致
    state: () => ({
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
        // 获取用户基本信息
        getUserInfo: (state) => ({
			id: state.id,
            nickName: state.nickName,
            avatarUrl: state.avatarUrl,
            phone: state.phone,
        }),
        
        // 检查是否登录
        isLoggedIn: (state) => Boolean(state.id && state.enabled),
        
        // 检查是否是管理员
        isAdmin: (state) => state.role === 'ADMIN',
    },

    actions: {
        // 设置用户信息
        setUserInfo(userInfo) {
            if (!userInfo) return;
            Object.keys(this.$state).forEach(key => {
                if (userInfo[key] !== undefined) {
                    this[key] = userInfo[key];
                }
            });
            console.log('用户信息更新成功:', this.getUserInfo);
        },

        // 从服务器获取用户信息
        async fetchUserInfo() {
            try {
				const { valid } = await validateAccessToken()
                if (valid) {
					const res = await uni.request({
					    url: 'http://183.136.206.77:45212/api/users/me',
					    method: 'GET',
					    header: {
					        'Authorization': 'Bearer ' + uni.getStorageSync('token')
					    }
					});
					
					if (res.statusCode === 200) {
					    this.setUserInfo(res.data);
					    return res.data;
					} else {
						throw new Error(res.data.message || '获取用户数据失败');
					} 	
				} else {
					uni.hideLoading()
					uni.showToast({
						title: '未登录',
						icon: 'none'
					})
					throw new Error('未登录')
				}

                
            } catch (error) {
                console.error('获取用户信息失败:', error);
                throw error;
            }
        },

        // 清除用户信息
        clearUserInfo() {
            this.$reset();
            uni.removeStorageSync('token');
            uni.removeStorageSync('refresh_token');
            uni.removeStorageSync('user');
        }
    },

    // 状态持久化
    persist: {
        enabled: true,
        strategies: [{
            key: 'user_store',
            storage: uni.getStorageSync,
        }]
    }
})
