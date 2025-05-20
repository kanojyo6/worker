"use strict";
const common_vendor = require("../common/vendor.js");
const services_AuthService = require("../services/AuthService.js");
const setupHttpInterceptor = () => {
  let isRefreshing = false;
  let pendingRequests = [];
  const processPendingRequests = (isSuccess, token) => {
    pendingRequests.forEach((request) => {
      if (isSuccess && token) {
        request.resolve(token);
      } else {
        request.reject(new Error("Token刷新失败 (processPendingRequests)"));
      }
    });
    pendingRequests = [];
  };
  common_vendor.index.addInterceptor("request", {
    invoke(options) {
      const NO_AUTH_URLS = ["/login/wechat/miniapp", "/auth/token/refresh/miniapp"];
      let requiresAuth = true;
      if (options.url) {
        requiresAuth = !NO_AUTH_URLS.some((noAuthUrl) => options.url.includes(noAuthUrl));
      }
      if (requiresAuth) {
        const token = common_vendor.index.getStorageSync("token");
        if (token) {
          if (!options.header) {
            options.header = {};
          }
          options.header["Authorization"] = `Bearer ${token}`;
        } else {
          console.warn(`请求 ${options.url} 需要认证，但未找到token。`);
        }
      }
      return options;
    },
    success(response) {
      return response;
    },
    fail(error) {
      console.error("请求网络失败或执行错误:", error);
      return error;
    },
    complete(res) {
      if (res && res.statusCode === 401) {
        const originalRequestConfig = res.config;
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            pendingRequests.push({ resolve, reject, config: originalRequestConfig });
          });
        }
        isRefreshing = true;
        return new Promise((resolveRequest, rejectRequest) => {
          services_AuthService.refreshToken().then((data) => {
            const newToken = data.access_token;
            common_vendor.index.setStorageSync("token", newToken);
            common_vendor.index.setStorageSync("refresh_token", data.refresh_token);
            if (data.user) {
              common_vendor.index.setStorageSync("user", JSON.stringify(data.user));
            }
            common_vendor.index.$emit("tokenRefreshedByInterceptor");
            processPendingRequests(true, newToken);
            if (originalRequestConfig && typeof originalRequestConfig === "object") {
              const newConfig = { ...originalRequestConfig };
              if (!newConfig.header)
                newConfig.header = {};
              newConfig.header["Authorization"] = `Bearer ${newToken}`;
              common_vendor.index.request(newConfig).then((retryResponse) => resolveRequest(retryResponse)).catch((retryError) => rejectRequest(retryError));
            } else {
              resolveRequest(res);
            }
          }).catch((refreshError) => {
            console.error("Interceptor: Token刷新失败:", refreshError);
            common_vendor.index.removeStorageSync("token");
            common_vendor.index.removeStorageSync("refresh_token");
            common_vendor.index.removeStorageSync("user");
            common_vendor.index.$emit("tokenRefreshFailedByInterceptor");
            processPendingRequests(false);
            common_vendor.index.showModal({
              title: "提示",
              content: "登录已过期，请重新登录",
              showCancel: false,
              success: (modalResult) => {
                if (modalResult.confirm) {
                  common_vendor.index.reLaunch({ url: "/pages/login/login" });
                }
              }
            });
            rejectRequest(refreshError);
          }).finally(() => {
            isRefreshing = false;
          });
        });
      }
      return res;
    }
  });
  console.log("HTTP拦截器已设置");
};
exports.setupHttpInterceptor = setupHttpInterceptor;
