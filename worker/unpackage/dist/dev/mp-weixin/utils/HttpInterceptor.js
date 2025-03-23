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
        request.reject(new Error("Token刷新失败"));
      }
    });
    pendingRequests = [];
  };
  common_vendor.index.addInterceptor("request", {
    invoke(options) {
      if (options.url && !options.url.includes("/login/") && !options.url.includes("/auth/token/refresh/")) {
        const token = common_vendor.index.getStorageSync("token");
        if (token) {
          if (!options.header) {
            options.header = {};
          }
          options.header["Authorization"] = `Bearer ${token}`;
        }
      }
      return options;
    },
    success(response) {
      return response;
    },
    fail(error) {
      console.error("请求失败:", error);
      return error;
    },
    complete(res) {
      if (res.statusCode === 401) {
        const refreshTokenPromise = new Promise((resolve, reject) => {
          if (isRefreshing) {
            pendingRequests.push({ resolve, reject });
            return;
          }
          isRefreshing = true;
          services_AuthService.refreshToken().then((data) => {
            const newToken = data.access_token;
            common_vendor.index.setStorageSync("token", newToken);
            common_vendor.index.setStorageSync("refresh_token", data.refresh_token);
            processPendingRequests(true, newToken);
            resolve(newToken);
          }).catch((error) => {
            processPendingRequests(false);
            common_vendor.index.showModal({
              title: "提示",
              content: "登录已过期，请重新登陆",
              success: (result) => {
                if (result.confirm) {
                  common_vendor.index.switchTab({ url: "/pages/tabbar/myPage" });
                } else {
                  common_vendor.index.navigateBack();
                }
              }
            });
            reject(error);
          }).finally(() => {
            isRefreshing = false;
          });
        });
        if (res.config && typeof res.config === "object") {
          return refreshTokenPromise.then((newToken) => {
            const newConfig = { ...res.config };
            if (!newConfig.header)
              newConfig.header = {};
            newConfig.header["Authorization"] = `Bearer ${newToken}`;
            return common_vendor.index.request(newConfig);
          });
        }
      }
      return res;
    }
  });
};
exports.setupHttpInterceptor = setupHttpInterceptor;
