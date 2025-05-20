"use strict";
const common_vendor = require("../common/vendor.js");
const baseUrl = "http://110.42.32.39:45212";
const login = async (code, phoneCode) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: `${baseUrl}/login/wechat/miniapp`,
      method: "POST",
      header: { "Content-Type": "application/json" },
      data: { code, phoneCode: phoneCode || null },
      success: (res) => {
        var _a, _b;
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(new Error(((_a = res.data) == null ? void 0 : _a.message) || ((_b = res.data) == null ? void 0 : _b.msg) || "登录失败"));
        }
      },
      fail: (error) => {
        console.error("登录请求失败:", error);
        reject(new Error("网络错误或登录服务不可用"));
      }
    });
  });
};
const logout = async () => {
  const token = common_vendor.index.getStorageSync("token");
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: `${baseUrl}/login/logout/miniapp`,
      // Ensure this is your correct logout endpoint
      method: "POST",
      header: {
        "Content-Type": "application/json",
        ...token && { "Authorization": `Bearer ${token}` }
        // Add token if available
      },
      success: (res) => {
        var _a, _b;
        if (res.statusCode === 200 || res.statusCode === 204) {
          resolve(res.data);
        } else {
          reject(new Error(((_a = res.data) == null ? void 0 : _a.message) || ((_b = res.data) == null ? void 0 : _b.msg) || "登出失败"));
        }
      },
      fail: (error) => {
        console.error("登出请求失败:", error);
        reject(new Error("网络错误或登出服务不可用"));
      }
    });
  });
};
const refreshToken = async () => {
  return new Promise((resolve, reject) => {
    const REFRESH_TOKEN = common_vendor.index.getStorageSync("refresh_token");
    if (!REFRESH_TOKEN) {
      reject(new Error("没有可用的刷新令牌"));
      return;
    }
    common_vendor.index.request({
      url: `${baseUrl}/auth/token/refresh/miniapp`,
      method: "POST",
      header: { "Content-Type": "application/json" },
      data: { refresh_token: REFRESH_TOKEN },
      success: (res) => {
        var _a, _b;
        if (res.statusCode === 200 && res.data && res.data.access_token) {
          resolve(res.data);
        } else {
          reject(new Error(((_a = res.data) == null ? void 0 : _a.message) || ((_b = res.data) == null ? void 0 : _b.msg) || "刷新令牌失败"));
        }
      },
      fail: (error) => {
        console.error("刷新token请求失败:", error);
        reject(new Error("网络错误或刷新令牌服务不可用"));
      }
    });
  });
};
const validateToken = async () => {
  return new Promise((resolve) => {
    const ACCESS_TOKEN = common_vendor.index.getStorageSync("token");
    if (!ACCESS_TOKEN) {
      resolve({ valid: false });
      return;
    }
    common_vendor.index.request({
      url: `${baseUrl}/auth/token/validate`,
      method: "GET",
      header: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ACCESS_TOKEN}`
      },
      success: (res) => {
        var _a;
        if (res.statusCode === 200 && typeof ((_a = res.data) == null ? void 0 : _a.valid) === "boolean") {
          resolve({ valid: res.data.valid });
        } else {
          resolve({ valid: false });
        }
      },
      fail: (error) => {
        console.error("验证token请求失败:", error);
        resolve({ valid: false });
      }
    });
  });
};
const getUserInfo = async () => {
  return new Promise((resolve, reject) => {
    const ACCESS_TOKEN = common_vendor.index.getStorageSync("token");
    if (!ACCESS_TOKEN) {
      reject(new Error("未登录或Token无效 (getUserInfo)"));
      return;
    }
    common_vendor.index.request({
      url: `${baseUrl}/api/users/me`,
      // Ensure this is your correct user info endpoint
      method: "GET",
      header: {
        "Authorization": `Bearer ${ACCESS_TOKEN}`
      },
      success: (res) => {
        var _a, _b;
        if (res.statusCode === 200 && res.data) {
          resolve(res.data);
        } else {
          reject(new Error(((_a = res.data) == null ? void 0 : _a.message) || ((_b = res.data) == null ? void 0 : _b.msg) || "获取用户数据失败"));
        }
      },
      fail: (error) => {
        console.error("获取用户信息请求失败:", error);
        reject(new Error("网络错误或用户服务不可用"));
      }
    });
  });
};
exports.getUserInfo = getUserInfo;
exports.login = login;
exports.logout = logout;
exports.refreshToken = refreshToken;
exports.validateToken = validateToken;
