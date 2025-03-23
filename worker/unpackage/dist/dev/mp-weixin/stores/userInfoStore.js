"use strict";
const common_vendor = require("../common/vendor.js");
const services_AuthService = require("../services/AuthService.js");
const utils_useAuth = require("../utils/useAuth.js");
const useUserInfoStore = common_vendor.defineStore("userInfo", {
  state: () => ({
    id: null,
    nickName: "",
    avatarUrl: "",
    phone: "",
    enabled: true,
    createTime: "",
    role: "",
    userLevel: ""
  }),
  getters: {
    getUserInfo: (state) => state,
    isAdmin: (state) => state.role
  },
  actions: {
    // 设置用户信息
    setUserInfo(userInfo) {
      if (!userInfo)
        return;
      Object.keys(userInfo).forEach((key) => {
        if (userInfo[key] !== void 0) {
          this[key] = userInfo[key];
        }
      });
      console.log("用户信息更新成功:", this.getUserInfo);
    },
    // 从服务器获取用户信息
    async fetchUserInfo() {
      try {
        const auth = utils_useAuth.useAuth();
        if (auth.isAuthenticated.value) {
          const userInfo = await services_AuthService.getUserInfo();
          this.setUserInfo(userInfo);
          return userInfo;
        } else {
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: "未登录",
            icon: "none"
          });
          throw new Error("未登录");
        }
      } catch (error) {
        console.error("获取用户信息失败:", error);
        throw error;
      }
    },
    // 清除用户信息
    clearUserInfo() {
      this.$reset();
    }
  }
});
exports.useUserInfoStore = useUserInfoStore;
