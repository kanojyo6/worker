"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_useAuth = require("../../utils/useAuth.js");
const stores_userInfoStore = require("../../stores/userInfoStore.js");
const stores_myPageStore = require("../../stores/myPageStore.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "loginPage",
  setup(__props) {
    const auth = utils_useAuth.useAuth();
    const userInfoStore = stores_userInfoStore.useUserInfoStore();
    const myOrdersStore = stores_myPageStore.useMyOrdersStore();
    const myOffersStore = stores_myPageStore.useMyOffersStore();
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
    const login = async () => {
      try {
        common_vendor.index.showLoading({ title: "登录中..." });
        const userInfo = await getUserProfile();
        const code = await getLoginCode();
        await auth.login(code);
        await myOrdersStore.fetchMyOrders();
        await myOffersStore.fetchMyOffers();
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
});
wx.createComponent(_sfc_main);
