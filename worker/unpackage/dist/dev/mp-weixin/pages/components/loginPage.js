"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_userInfo = require("../../stores/userInfo.js");
const stores_myPageStore = require("../../stores/myPageStore.js");
const _sfc_main = {
  __name: "loginPage",
  setup(__props) {
    const userInfoStore = stores_userInfo.useUserInfoStore();
    const myOrdersStore = stores_myPageStore.useMyOrdersStore();
    const getUserProfile = () => {
      return new Promise((resolve, reject) => {
        common_vendor.index.getUserProfile({
          desc: "用于完善会员资料",
          success: (res) => {
            console.log("用户信息获取成功", res.userInfo);
            userInfoStore.setUserInfo({
              nickName: res.userInfo.nickName,
              avatarUrl: res.userInfo.avatarUrl
            });
            resolve(res.userInfo);
          },
          fail: (err) => {
            console.log("用户信息获取失败", err);
            common_vendor.index.showToast({
              title: "需要授权才能使用",
              icon: "none"
            });
            reject(err);
          }
        });
      });
    };
    const getLoginCode = () => {
      return new Promise((resolve, reject) => {
        common_vendor.index.login({
          provider: "weixin",
          onlyAuthorize: true,
          success: (event) => {
            if (event.errMsg === "login:ok") {
              resolve(event.code);
            } else {
              reject(new Error("获取登录凭证失败"));
            }
          },
          fail: reject
        });
      });
    };
    const sendLoginRequest = (code, userInfo) => {
      return new Promise((resolve, reject) => {
        common_vendor.index.request({
          url: "http://183.136.206.77:45212/login/wechat/miniapp",
          method: "POST",
          header: {
            "content-type": "application/json"
          },
          data: {
            code,
            phoneCode: null
          },
          success: (res) => {
            if (res.statusCode === 200) {
              const { access_token, refresh_token, user } = res.data;
              common_vendor.index.setStorageSync("token", access_token);
              common_vendor.index.setStorageSync("refresh_token", refresh_token);
              userInfoStore.setUserInfo(user);
              resolve(res.data);
            } else {
              reject(new Error(res.data.message || "登录失败"));
            }
          },
          fail: reject
        });
      });
    };
    const login = async () => {
      try {
        common_vendor.index.showLoading({ title: "登录中..." });
        const userInfo = await getUserProfile();
        const code = await getLoginCode();
        await sendLoginRequest(code, userInfo);
        await myOrdersStore.fetchMyOrders();
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "登录成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.switchTab({
            url: "/pages/tabbar/myPage"
          });
        }, 1500);
      } catch (error) {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: error.message || "登录失败",
          icon: "none"
        });
        console.error("登录失败:", error);
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(login)
      };
    };
  }
};
wx.createComponent(_sfc_main);
