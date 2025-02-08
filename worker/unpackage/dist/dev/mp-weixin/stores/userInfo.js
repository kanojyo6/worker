"use strict";
const common_vendor = require("../common/vendor.js");
const useUserInfoStore = common_vendor.defineStore("userinfo", {
  state: () => {
    return {
      nickName: "",
      avatarUrl: ""
    };
  },
  getters: {
    app_nickName: (state) => state.nickName,
    app_avatarUrl: (state) => state.avatarUrl
  },
  actions: {
    // 设置数据
    async setData(nickName, avatarUrl) {
      this.nickName = nickName, this.avatarUrl = avatarUrl;
      console.log("设置数据完成：", this.nickName, this.avatarUrl);
    },
    // 获取数据
    getData() {
      return this.userInfo, this.avatarUrl;
    }
  }
});
exports.useUserInfoStore = useUserInfoStore;
