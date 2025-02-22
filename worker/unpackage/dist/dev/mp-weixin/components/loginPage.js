"use strict";
const common_vendor = require("../common/vendor.js");
const stores_userInfo = require("../stores/userInfo.js");
const _sfc_main = {
  __name: "loginPage",
  setup(__props) {
    const userInfoStore = stores_userInfo.useUserInfoStore();
    const getUserProfile = () => {
      return new Promise((resolve, reject) => {
        common_vendor.index.getUserProfile({
          desc: "获取用户信息",
          // 声明获取用户信息的用途
          success: (res) => {
            console.log("用户信息获取成功", res.userInfo);
            userInfoStore.setData(res.userInfo.nickName, res.userInfo.avatarUrl);
            resolve(res.userInfo);
          },
          fail: (err) => {
            console.log("用户信息获取失败", err);
            if (err.errMsg === "getUserProfile:fail auth deny") {
              common_vendor.index.showToast({
                title: "您拒绝了授权",
                icon: "none"
              });
            }
            reject(err);
          }
        });
      });
    };
    const getLoginCode = () => {
      return new Promise((resolve, reject) => {
        common_vendor.index.login({
          "provider": "weixin",
          "onlyAuthorize": true,
          success: (event) => {
            const { code, errMsg } = event;
            if (errMsg !== "login:ok") {
              common_vendor.index.showToast({
                title: "登录失败!",
                icon: "none"
              });
              reject(new Error("登录失败"));
              return;
            }
            console.log("获取到临时凭证：", code);
            resolve(code);
          },
          fail: (err) => {
            console.log("获取登录凭证失败", err);
            reject(err);
          }
        });
      });
    };
    const sendLoginRequest = (code, userInfo) => {
      return new Promise((resolve, reject) => {
        common_vendor.index.request({
          url: "http://183.136.206.77:32222/login/wechat/miniapp",
          method: "POST",
          header: {
            "content-type": "application/json"
          },
          data: {
            code,
            // 暂时不发送手机号信息
            phoneCode: null
          },
          success: (res) => {
            console.log("服务器返回结果：", res);
            if (res.statusCode === 200) {
              const { access_token, refresh_token, user } = res.data;
              common_vendor.index.setStorageSync("access_token", access_token);
              common_vendor.index.setStorageSync("refresh_token", refresh_token);
              common_vendor.index.setStorageSync("user", user);
              resolve(res.data);
            } else {
              reject(new Error(res.data.message || "登录失败"));
            }
          },
          fail: (err) => {
            console.error("请求失败：", err);
            reject(err);
          }
        });
      });
    };
    const login = async () => {
      try {
        common_vendor.index.showLoading({
          title: "登录中..."
        });
        const userInfo = await getUserProfile();
        const code = await getLoginCode();
        const loginResult = await sendLoginRequest(code, userInfo);
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
        console.error("登录失败：", error);
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
