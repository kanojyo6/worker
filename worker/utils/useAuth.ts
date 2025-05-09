import {
  login as apiLogin,
  logout as apiLogout,
  refreshToken as apiRefreshToken,
  validateToken as apiValidateToken,
  getUserInfo as apiGetUserInfo
} from '../services/AuthService'; 
import type { UserInfo } from '../model/UserInfo';
import { reactive, computed, onMounted, onUnmounted } from 'vue'; 

const state = reactive({
  isAuthenticated: false,
  isLoading: true,
  userInfo: null as UserInfo | null,
});

let refreshPromise: Promise<any> | null = null;
let tokenRefreshTimerId: NodeJS.Timeout | null = null; 

export function useAuth() {
  const initAuth = async () => {
    if (!state.isLoading && state.isAuthenticated) {

    }
    state.isLoading = true; 

    try {
      const { valid } = await apiValidateToken(); 
      state.isAuthenticated = valid;

      if (valid) {
        try {
          const userInfo = await apiGetUserInfo(); 
          state.userInfo = userInfo;
        } catch (error) {
          console.error('加载用户信息失败 (initAuth):', error);
        }
      } else {
        state.userInfo = null;
      }
    } catch (error) {
      console.error('初始化认证失败:', error);
      state.isAuthenticated = false;
      state.userInfo = null;
    } finally {
      state.isLoading = false;
      if (state.isAuthenticated) {
        setupTokenRefresh();
      }
    }
  };

  const setupTokenRefresh = () => {
    if (tokenRefreshTimerId !== null) {
      clearTimeout(tokenRefreshTimerId);
      tokenRefreshTimerId = null;
    }

    const ACCESS_TOKEN = uni.getStorageSync('token');
    if (!ACCESS_TOKEN || !state.isAuthenticated) {
      console.log('Token 刷新未设置 - 用户未认证或无token');
      return;
    }

    const ACCESS_TOKEN_LIFETIME_MS = 30 * 60 * 1000;
    const REFRESH_BEFORE_EXPIRY_MS = 5 * 60 * 1000;
    const refreshDelay = ACCESS_TOKEN_LIFETIME_MS - REFRESH_BEFORE_EXPIRY_MS;

    if (refreshDelay <= 0) {
      console.warn('Token 刷新延迟计算错误或token即将过期，尝试立即刷新。');
      refreshTokenAndUpdateState().catch(e => console.error("立即刷新尝试失败 (setupTokenRefresh)", e));
      return;
    }

    tokenRefreshTimerId = setTimeout(async () => {
      try {
        console.log('定时任务: 自动刷新token...');
        await refreshTokenAndUpdateState();
      } catch (error) {
        console.error('定时任务: 自动刷新token失败:', error);
      }
    }, refreshDelay);

    console.log(`已设置token自动刷新，将在 ${refreshDelay / 60000} 分钟后执行`);
  };

  const handleLogin = async (code: string, phoneCode?: string): Promise<any> => {
    state.isLoading = true;
    try {
      const data = await apiLogin(code, phoneCode);
      const { access_token, refresh_token, user } = data;

      uni.setStorageSync('token', access_token);
      uni.setStorageSync('refresh_token', refresh_token);
      uni.setStorageSync('user', JSON.stringify(user));

      state.userInfo = user;
      state.isAuthenticated = true;

      setupTokenRefresh();

      return data;
    } catch (error) {
      console.error('登录失败:', error);
      state.userInfo = null;
      state.isAuthenticated = false;
      uni.removeStorageSync('token');
      uni.removeStorageSync('refresh_token');
      uni.removeStorageSync('user');
      throw error;
    } finally {
      state.isLoading = false;
    }
  };

  const handleLogout = async (): Promise<void> => {
    state.isLoading = true;
    try {
      await apiLogout();
    } catch (error) {
      console.error('API登出失败 (忽略错误，继续前端清理):', error);
    } finally {
      uni.removeStorageSync('token');
      uni.removeStorageSync('refresh_token');
      uni.removeStorageSync('user');

      state.userInfo = null;
      state.isAuthenticated = false;

      if (tokenRefreshTimerId !== null) {
        clearTimeout(tokenRefreshTimerId);
        tokenRefreshTimerId = null;
      }
      state.isLoading = false;
      console.log('用户已登出，状态已清除');
    }
  };

  const refreshTokenAndUpdateState = async (): Promise<any> => {
    if (refreshPromise) {
      return refreshPromise;
    }

    refreshPromise = new Promise(async (resolve, reject) => {
      try {
        const data = await apiRefreshToken();
        const { access_token, refresh_token, user } = data;

        uni.setStorageSync('token', access_token);
        uni.setStorageSync('refresh_token', refresh_token);

        if (user) {
          state.userInfo = user;
          uni.setStorageSync('user', JSON.stringify(user));
        }
        state.isAuthenticated = true;
        setupTokenRefresh();
        resolve(data);
      } catch (error) {
        console.error('刷新Token失败 (refreshTokenAndUpdateState):', error);
        state.isAuthenticated = false;
        state.userInfo = null;
        uni.removeStorageSync('token');
        uni.removeStorageSync('refresh_token');
        uni.removeStorageSync('user');
        if (tokenRefreshTimerId !== null) {
          clearTimeout(tokenRefreshTimerId);
          tokenRefreshTimerId = null;
        }
        reject(error);
      } finally {
        refreshPromise = null;
      }
    });
    return refreshPromise;
  };

  const validateTokenAndUpdateState = async (): Promise<boolean> => {
    try {
      const { valid } = await apiValidateToken();
      state.isAuthenticated = valid;
      if (!valid) {
        state.userInfo = null;
      }
      return valid;
    } catch (error) {
      console.error('验证Token失败 (validateTokenAndUpdateState):', error);
      state.isAuthenticated = false;
      state.userInfo = null;
      return false;
    }
  };

  const handleInterceptorTokenRefresh = async () => {
    console.log('Event: Interceptor刷新了Token，重新同步Auth状态...');
    state.isLoading = true;
    try {
      const storedToken = uni.getStorageSync('token');
      if (storedToken) {
        const { valid } = await apiValidateToken();
        state.isAuthenticated = valid;
        if (valid) {
          const storedUser = uni.getStorageSync('user');
          if (storedUser) {
            try {
                state.userInfo = JSON.parse(storedUser);
            } catch (e) {
                console.error("解析存储的用户信息失败, 重新获取:", e);
                state.userInfo = await apiGetUserInfo();
            }
          } else {
             state.userInfo = await apiGetUserInfo();
          }
          setupTokenRefresh();
        } else {
          state.userInfo = null;
          handleLogout();
        }
      } else {
        state.isAuthenticated = false;
        state.userInfo = null;
        if (tokenRefreshTimerId !== null) {
          clearTimeout(tokenRefreshTimerId);
          tokenRefreshTimerId = null;
        }
      }
    } catch (error) {
      console.error('Auth状态重新同步失败 (event tokenRefreshedByInterceptor):', error);
      state.isAuthenticated = false;
      state.userInfo = null;
    } finally {
        state.isLoading = false;
    }
  };

  const handleInterceptorTokenRefreshFailure = () => {
    console.log('Event: Interceptor报告Token刷新失败，重置Auth状态并准备登出...');
    state.isAuthenticated = false;
    state.userInfo = null;
    if (tokenRefreshTimerId !== null) {
      clearTimeout(tokenRefreshTimerId);
      tokenRefreshTimerId = null;
    }
  };

  onMounted(() => {
    initAuth();
    uni.$on('tokenRefreshedByInterceptor', handleInterceptorTokenRefresh);
    uni.$on('tokenRefreshFailedByInterceptor', handleInterceptorTokenRefreshFailure);
  });

  onUnmounted(() => {
    uni.$off('tokenRefreshedByInterceptor', handleInterceptorTokenRefresh);
    uni.$off('tokenRefreshFailedByInterceptor', handleInterceptorTokenRefreshFailure);
    if (tokenRefreshTimerId !== null) {
      clearTimeout(tokenRefreshTimerId);
    }
  });

  return {
    isAuthenticated: computed(() => state.isAuthenticated),
    isLoading: computed(() => state.isLoading),
    userInfo: computed(() => state.userInfo),
    login: handleLogin,
    logout: handleLogout,
    refreshToken: refreshTokenAndUpdateState,
    initAuth,
  };
}