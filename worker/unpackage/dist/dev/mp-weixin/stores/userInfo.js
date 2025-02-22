"use strict";
const common_vendor = require("../common/vendor.js");
const useUserInfoStore = common_vendor.defineStore("userinfo", {
  // 定义状态，与后端 UserDTO 保持一致
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
    // 获取用户基本信息
    getUserInfo: (state) => ({
      nickName: state.nickName,
      avatarUrl: state.avatarUrl,
      phone: state.phone
    }),
    // 检查是否登录
    isLoggedIn: (state) => Boolean(state.id && state.enabled),
    // 检查是否是管理员
    isAdmin: (state) => state.role === "ADMIN"
  },
  actions: {
    // 设置用户信息
    setUserInfo(userInfo) {
      if (!userInfo)
        return;
      Object.keys(this.$state).forEach((key) => {
        if (userInfo[key] !== void 0) {
          this[key] = userInfo[key];
        }
      });
      console.log("用户信息更新成功:", this.getUserInfo);
    },
    // 从服务器获取用户信息
    async fetchUserInfo() {
      try {
        const accessToken = common_vendor.index.getStorageSync("access_token");
        if (!accessToken)
          throw new Error("未登录");
        const res = await common_vendor.index.request({
          url: "http://183.136.206.77:32222/api/users/me",
          method: "GET",
          header: {
            "Authorization": `Bearer ${accessToken}`
          }
        });
        if (res.statusCode === 200) {
          this.setUserInfo(res.data);
          return res.data;
        }
        throw new Error(res.data.message || "获取用户信息失败");
      } catch (error) {
        console.error("获取用户信息失败:", error);
        throw error;
      }
    },
    // 清除用户信息
    clearUserInfo() {
      this.$reset();
      common_vendor.index.removeStorageSync("access_token");
      common_vendor.index.removeStorageSync("refresh_token");
      common_vendor.index.removeStorageSync("user");
    }
  },
  // 状态持久化
  persist: {
    enabled: true,
    strategies: [{
      key: "user_store",
      storage: common_vendor.index.getStorageSync
    }]
  }
});
exports.useUserInfoStore = useUserInfoStore;
