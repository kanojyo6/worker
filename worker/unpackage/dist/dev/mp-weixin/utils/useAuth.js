"use strict";
const common_vendor = require("../common/vendor.js");
const services_AuthService = require("../services/AuthService.js");
const state = common_vendor.reactive({
  isAuthenticated: false,
  isLoading: true,
  userInfo: null
});
let refreshPromise = null;
let tokenRefreshTimerId = null;
function useAuth() {
  const initAuth = async () => {
    if (!state.isLoading && state.isAuthenticated)
      ;
    state.isLoading = true;
    try {
      const { valid } = await services_AuthService.validateToken();
      state.isAuthenticated = valid;
      if (valid) {
        try {
          const userInfo = await services_AuthService.getUserInfo();
          state.userInfo = userInfo;
        } catch (error) {
          console.error("加载用户信息失败 (initAuth):", error);
        }
      } else {
        state.userInfo = null;
      }
    } catch (error) {
      console.error("初始化认证失败:", error);
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
    const ACCESS_TOKEN = common_vendor.index.getStorageSync("token");
    if (!ACCESS_TOKEN || !state.isAuthenticated) {
      console.log("Token 刷新未设置 - 用户未认证或无token");
      return;
    }
    const ACCESS_TOKEN_LIFETIME_MS = 30 * 60 * 1e3;
    const REFRESH_BEFORE_EXPIRY_MS = 5 * 60 * 1e3;
    const refreshDelay = ACCESS_TOKEN_LIFETIME_MS - REFRESH_BEFORE_EXPIRY_MS;
    tokenRefreshTimerId = setTimeout(async () => {
      try {
        console.log("定时任务: 自动刷新token...");
        await refreshTokenAndUpdateState();
      } catch (error) {
        console.error("定时任务: 自动刷新token失败:", error);
      }
    }, refreshDelay);
    console.log(`已设置token自动刷新，将在 ${refreshDelay / 6e4} 分钟后执行`);
  };
  const handleLogin = async (code, phoneCode) => {
    state.isLoading = true;
    try {
      const data = await services_AuthService.login(code, phoneCode);
      const { access_token, refresh_token, user } = data;
      common_vendor.index.setStorageSync("token", access_token);
      common_vendor.index.setStorageSync("refresh_token", refresh_token);
      common_vendor.index.setStorageSync("user", JSON.stringify(user));
      state.userInfo = user;
      state.isAuthenticated = true;
      setupTokenRefresh();
      return data;
    } catch (error) {
      console.error("登录失败:", error);
      state.userInfo = null;
      state.isAuthenticated = false;
      common_vendor.index.removeStorageSync("token");
      common_vendor.index.removeStorageSync("refresh_token");
      common_vendor.index.removeStorageSync("user");
      throw error;
    } finally {
      state.isLoading = false;
    }
  };
  const handleLogout = async () => {
    state.isLoading = true;
    try {
      await services_AuthService.logout();
    } catch (error) {
      console.error("API登出失败 (忽略错误，继续前端清理):", error);
    } finally {
      common_vendor.index.removeStorageSync("token");
      common_vendor.index.removeStorageSync("refresh_token");
      common_vendor.index.removeStorageSync("user");
      state.userInfo = null;
      state.isAuthenticated = false;
      if (tokenRefreshTimerId !== null) {
        clearTimeout(tokenRefreshTimerId);
        tokenRefreshTimerId = null;
      }
      state.isLoading = false;
      console.log("用户已登出，状态已清除");
    }
  };
  const refreshTokenAndUpdateState = async () => {
    if (refreshPromise) {
      return refreshPromise;
    }
    refreshPromise = new Promise(async (resolve, reject) => {
      try {
        const data = await services_AuthService.refreshToken();
        const { access_token, refresh_token, user } = data;
        common_vendor.index.setStorageSync("token", access_token);
        common_vendor.index.setStorageSync("refresh_token", refresh_token);
        if (user) {
          state.userInfo = user;
          common_vendor.index.setStorageSync("user", JSON.stringify(user));
        }
        state.isAuthenticated = true;
        setupTokenRefresh();
        resolve(data);
      } catch (error) {
        console.error("刷新Token失败 (refreshTokenAndUpdateState):", error);
        state.isAuthenticated = false;
        state.userInfo = null;
        common_vendor.index.removeStorageSync("token");
        common_vendor.index.removeStorageSync("refresh_token");
        common_vendor.index.removeStorageSync("user");
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
  const handleInterceptorTokenRefresh = async () => {
    console.log("Event: Interceptor刷新了Token，重新同步Auth状态...");
    state.isLoading = true;
    try {
      const storedToken = common_vendor.index.getStorageSync("token");
      if (storedToken) {
        const { valid } = await services_AuthService.validateToken();
        state.isAuthenticated = valid;
        if (valid) {
          const storedUser = common_vendor.index.getStorageSync("user");
          if (storedUser) {
            try {
              state.userInfo = JSON.parse(storedUser);
            } catch (e) {
              console.error("解析存储的用户信息失败, 重新获取:", e);
              state.userInfo = await services_AuthService.getUserInfo();
            }
          } else {
            state.userInfo = await services_AuthService.getUserInfo();
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
      console.error("Auth状态重新同步失败 (event tokenRefreshedByInterceptor):", error);
      state.isAuthenticated = false;
      state.userInfo = null;
    } finally {
      state.isLoading = false;
    }
  };
  const handleInterceptorTokenRefreshFailure = () => {
    console.log("Event: Interceptor报告Token刷新失败，重置Auth状态并准备登出...");
    state.isAuthenticated = false;
    state.userInfo = null;
    if (tokenRefreshTimerId !== null) {
      clearTimeout(tokenRefreshTimerId);
      tokenRefreshTimerId = null;
    }
  };
  common_vendor.onMounted(() => {
    initAuth();
    common_vendor.index.$on("tokenRefreshedByInterceptor", handleInterceptorTokenRefresh);
    common_vendor.index.$on("tokenRefreshFailedByInterceptor", handleInterceptorTokenRefreshFailure);
  });
  common_vendor.onUnmounted(() => {
    common_vendor.index.$off("tokenRefreshedByInterceptor", handleInterceptorTokenRefresh);
    common_vendor.index.$off("tokenRefreshFailedByInterceptor", handleInterceptorTokenRefreshFailure);
    if (tokenRefreshTimerId !== null) {
      clearTimeout(tokenRefreshTimerId);
    }
  });
  return {
    isAuthenticated: common_vendor.computed(() => state.isAuthenticated),
    isLoading: common_vendor.computed(() => state.isLoading),
    userInfo: common_vendor.computed(() => state.userInfo),
    login: handleLogin,
    logout: handleLogout,
    refreshToken: refreshTokenAndUpdateState,
    initAuth
  };
}
exports.useAuth = useAuth;
