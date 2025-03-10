"use strict";
const common_vendor = require("../common/vendor.js");
const baseUrl = "http://183.136.206.77:45212";
const refreshAccessToken = async () => {
  return new Promise((resolve, reject) => {
    const REFRESH_TOKEN = common_vendor.index.getStorageSync("refresh_token");
    console.log("refresh_token = ", REFRESH_TOKEN);
    if (REFRESH_TOKEN === "") {
      console.log("登录失效，请重新登陆");
      common_vendor.index.hideLoading();
      common_vendor.index.showToast({
        title: "登录失效，请重新登陆",
        icon: "none"
      });
      return;
    }
    common_vendor.index.request({
      url: baseUrl + `/auth/token/refresh/miniapp`,
      method: "POST",
      header: {
        "Content-Type": "application/json",
        "X-Refresh-Token": REFRESH_TOKEN
      },
      success: (res) => {
        var _a;
        if (res.statusCode === 200) {
          console.log("刷新token成功: ", res);
          const { access_token, refresh_token } = res.data;
          common_vendor.index.setStorageSync("token", access_token);
          common_vendor.index.setStorageSync("refresh_token", refresh_token);
          console.log("刷新成功：access_token: ", common_vendor.index.getStorageSync("token"));
          console.log("刷新成功：refresh_token: ", common_vendor.index.getStorageSync("refresh_token"));
          resolve(res.data);
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
exports.refreshAccessToken = refreshAccessToken;
exports.validateAccessToken = validateAccessToken;
