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
    if (!state.isLoading)
      return;
    try {
      const { valid } = await services_AuthService.validateToken();
      state.isAuthenticated = valid;
      if (valid) {
        try {
          const userInfo = await services_AuthService.getUserInfo();
          state.userInfo = userInfo;
        } catch (error) {
          console.error("加载用户信息失败:", error);
        }
      }
    } catch (error) {
      console.error("初始化认证失败:", error);
      state.isAuthenticated = false;
    } finally {
      state.isLoading = false;
      setupTokenRefresh();
    }
  };
  const setupTokenRefresh = () => {
    if (tokenRefreshTimerId !== null) {
      clearTimeout(tokenRefreshTimerId);
    }
    const ACCESS_TOKEN = common_vendor.index.getStorageSync("token");
    if (!ACCESS_TOKEN || !state.isAuthenticated)
      return;
    const TOKEN_LIFETIME = 25 * 60 * 1e3;
    tokenRefreshTimerId = setTimeout(async () => {
      try {
        await refreshTokenAndUpdateState();
        setupTokenRefresh();
      } catch (error) {
        console.error("自动刷新token失败:", error);
      }
    }, TOKEN_LIFETIME);
    console.log("已设置token自动刷新");
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
      throw error;
    } finally {
      state.isLoading = false;
    }
  };
  const handleLogout = async () => {
    state.isLoading = true;
    try {
      await services_AuthService.logout();
      common_vendor.index.removeStorageSync("token");
      common_vendor.index.removeStorageSync("refresh_token");
      common_vendor.index.removeStorageSync("user");
      state.userInfo = null;
      state.isAuthenticated = false;
      if (tokenRefreshTimerId !== null) {
        clearTimeout(tokenRefreshTimerId);
        tokenRefreshTimerId = null;
      }
    } catch (error) {
      console.error("登出失败:", error);
      throw error;
    } finally {
      state.isLoading = false;
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
        resolve(data);
      } catch (error) {
        console.error("刷新Token失败:", error);
        state.isAuthenticated = false;
        state.userInfo = null;
        reject(error);
      } finally {
        refreshPromise = null;
      }
    });
    return refreshPromise;
  };
  const validateTokenAndUpdateState = async () => {
    try {
      const { valid } = await services_AuthService.validateToken();
      state.isAuthenticated = valid;
      return valid;
    } catch (error) {
      console.error("验证Token失败:", error);
      state.isAuthenticated = false;
      return false;
    }
  };
  common_vendor.onMounted(() => {
    initAuth();
  });
  return {
    // 状态
    isAuthenticated: common_vendor.computed(() => state.isAuthenticated),
    isLoading: common_vendor.computed(() => state.isLoading),
    userInfo: common_vendor.computed(() => state.userInfo),
    // 方法
    login: handleLogin,
    logout: handleLogout,
    refreshToken: refreshTokenAndUpdateState,
    validateToken: validateTokenAndUpdateState,
    initAuth
  };
}
exports.useAuth = useAuth;
