"use strict";
const common_vendor = require("../common/vendor.js");
const baseUrl = "http://183.136.206.77:45212";
const showAlert = () => {
  common_vendor.index.showModal({
    title: "提示",
    content: "登录已过期，请重新登陆",
    success: (res) => {
      if (res.confirm) {
        common_vendor.index.switchTab({ url: "/pages/tabbar/myPage" });
      } else {
        common_vendor.index.navigateBack();
      }
    }
  });
};
const refreshAccessToken = async () => {
  if (refreshPromise) {
    return refreshPromise;
  }
  refreshPromise = new Promise((resolve, reject) => {
    const REFRESH_TOKEN = common_vendor.index.getStorageSync("refresh_token");
    if (!REFRESH_TOKEN) {
      refreshPromise = null;
      reject("没有可用的刷新令牌");
      showAlert();
      return;
    }
    common_vendor.index.request({
      url: baseUrl + `/auth/token/refresh/miniapp`,
      method: "POST",
      header: { "Content-Type": "application/json" },
      data: { refresh_token: REFRESH_TOKEN },
      success: (res) => {
        var _a;
        if (res.statusCode === 200) {
          const { access_token, refresh_token } = res.data;
          common_vendor.index.setStorageSync("token", access_token);
          common_vendor.index.setStorageSync("refresh_token", refresh_token);
          resolve(res.data);
        } else {
          reject(((_a = res.data) == null ? void 0 : _a.message) || "刷新失败");
          showAlert();
        }
        refreshPromise = null;
      },
      fail: (error) => {
        console.error("刷新token请求失败:", error);
        reject("网络错误");
        refreshPromise = null;
        showAlert();
      }
    });
  });
  return refreshPromise;
};
const validateAccessToken = async () => {
  return new Promise((resolve, reject) => {
    const ACCESS_TOKEN = common_vendor.index.getStorageSync("token");
    if (ACCESS_TOKEN === "") {
      console.log("ACCESS_TOKEN为空");
      common_vendor.index.hideLoading();
      return;
    }
    common_vendor.index.request({
      url: baseUrl + `/auth/token/validate`,
      method: "GET",
      header: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + ACCESS_TOKEN
      },
      success: (res) => {
        var _a;
        if (res.statusCode === 200) {
          console.log("验证token成功: ", res);
          const responseData = res.data;
          resolve(responseData);
          common_vendor.index.hideLoading();
        } else {
          const errorMsg = ((_a = res.data) == null ? void 0 : _a.message) || "请求失败，请重试";
          common_vendor.index.showToast({
            title: errorMsg,
            icon: "none"
          });
        }
      },
      fail: (error) => {
        console.log("刷新token失败: ", error);
        common_vendor.index.showToast({
          title: "网络错误，请检查网络后重试",
          icon: "none"
        });
      }
    });
  });
};
let refreshPromise = null;
exports.refreshAccessToken = refreshAccessToken;
exports.validateAccessToken = validateAccessToken;
