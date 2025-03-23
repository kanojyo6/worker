import { reactive, computed, onMounted } from 'vue';
import { login, logout, refreshToken, validateToken, getUserInfo } from '../services/AuthService';
import type { UserInfo } from '../model/UserInfo'

// 创建一个单例状态对象
const state = reactive({
  isAuthenticated: false,
  isLoading: true,
  userInfo: null as UserInfo | null,
});

// 刷新token的Promise引用
let refreshPromise: Promise<any> | null = null;
// 刷新定时器ID
let tokenRefreshTimerId = null;

export function useAuth() {
  // 初始化认证状态
  const initAuth = async () => {
    if (!state.isLoading) return; // 防止重复初始化
    
    try {
      const { valid } = await validateToken();
      state.isAuthenticated = valid;
      
      if (valid) {
        try {
          const userInfo = await getUserInfo();
          state.userInfo = userInfo;
        } catch (error) {
          console.error('加载用户信息失败:', error);
        }
      }
    } catch (error) {
      console.error('初始化认证失败:', error);
      state.isAuthenticated = false;
    } finally {
      state.isLoading = false;
      setupTokenRefresh();
    }
  };

  // 设置token自动刷新
  const setupTokenRefresh = () => {
    // 清除之前的定时器
    if (tokenRefreshTimerId !== null) {
      clearTimeout(tokenRefreshTimerId);
    }

    const ACCESS_TOKEN = uni.getStorageSync('token');
    if (!ACCESS_TOKEN || !state.isAuthenticated) return;
    
    // 设置一个定时器，在token过期前5分钟自动刷新
    const REFRESH_BEFORE_EXPIRY = 5 * 60 * 1000; // 5分钟
    const TOKEN_LIFETIME = 25 * 60 * 1000; // 25分钟 (30-5)
    
    tokenRefreshTimerId = setTimeout(async () => {
      try {
        await refreshTokenAndUpdateState();
        // 刷新成功后再次设置定时器
        setupTokenRefresh();
      } catch (error) {
        console.error('自动刷新token失败:', error);
      }
    }, TOKEN_LIFETIME);
    
    console.log('已设置token自动刷新');
  };

  // 登录方法
  const handleLogin = async (code: string, phoneCode?: string): Promise<any> => {
    state.isLoading = true;
    try {
      const data = await login(code, phoneCode);
      const { access_token, refresh_token, user } = data;
      
      uni.setStorageSync('token', access_token);
      uni.setStorageSync('refresh_token', refresh_token);
      uni.setStorageSync('user', JSON.stringify(user));
      
      state.userInfo = user;
      state.isAuthenticated = true;
      
      // 设置自动刷新
      setupTokenRefresh();
      
      return data;
    } catch (error) {
      console.error('登录失败:', error);
      throw error;
    } finally {
      state.isLoading = false;
    }
  };

  // 登出方法
  const handleLogout = async (): Promise<void> => {
    state.isLoading = true;
    try {
      await logout();
      uni.removeStorageSync('token');
      uni.removeStorageSync('refresh_token');
      uni.removeStorageSync('user');
      
      state.userInfo = null;
      state.isAuthenticated = false;
      
      // 清除刷新定时器
      if (tokenRefreshTimerId !== null) {
        clearTimeout(tokenRefreshTimerId);
        tokenRefreshTimerId = null;
      }
    } catch (error) {
      console.error('登出失败:', error);
      throw error;
    } finally {
      state.isLoading = false;
    }
  };

  // 刷新Token并更新状态
  const refreshTokenAndUpdateState = async (): Promise<any> => {
    // 如果已经有一个刷新请求在进行中，直接返回该Promise
    if (refreshPromise) {
      return refreshPromise;
    }
    
    refreshPromise = new Promise(async (resolve, reject) => {
      try {
        const data = await refreshToken();
        const { access_token, refresh_token, user } = data;
        
        uni.setStorageSync('token', access_token);
        uni.setStorageSync('refresh_token', refresh_token);
        
        if (user) {
          state.userInfo = user;
          uni.setStorageSync('user', JSON.stringify(user));
        }
        
        state.isAuthenticated = true;
        resolve(data);
      } catch (error) {
        console.error('刷新Token失败:', error);
        // 如果刷新失败，清除状态
        state.isAuthenticated = false;
        state.userInfo = null;
        reject(error);
      } finally {
        refreshPromise = null;
      }
    });
    
    return refreshPromise;
  };

  // 验证Token
  const validateTokenAndUpdateState = async (): Promise<boolean> => {
    try {
      const { valid } = await validateToken();
      state.isAuthenticated = valid;
      return valid;
    } catch (error) {
      console.error('验证Token失败:', error);
      state.isAuthenticated = false;
      return false;
    }
  };

  // 初始化
  onMounted(() => {
    initAuth();
  });

  return {
    // 状态
    isAuthenticated: computed(() => state.isAuthenticated),
    isLoading: computed(() => state.isLoading),
    userInfo: computed(() => state.userInfo),
    
    // 方法
    login: handleLogin,
    logout: handleLogout,
    refreshToken: refreshTokenAndUpdateState,
    validateToken: validateTokenAndUpdateState,
    initAuth
  };
}