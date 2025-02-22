"use strict";
const common_vendor = require("../common/vendor.js");
const stores_userInfo = require("../stores/userInfo.js");
const _sfc_main = {
  __name: "loginPage",
  setup(__props) {
    const userInfoStore = stores_userInfo.useUserInfoStore();
    const getUserProfile = () => {
      common_vendor.index.getUserProfile({
        desc: "获取用户信息",
        // 声明获取用户信息的用途
        success: (res) => {
          console.log("用户信息获取成功", res.userInfo);
          setTimeout(() => {
            userInfoStore.setData(res.userInfo.nickName, res.userInfo.avatarUrl);
          }, 500);
        },
        fail: (err) => {
          console.log("用户信息获取失败", err);
          if (err.errMsg === "getUserProfile:fail auth deny") {
            common_vendor.index.showToast({
              title: "您拒绝了授权",
              icon: "none"
            });
          }
        }
      });
    };
    const getLoginCode = () => {
      common_vendor.index.login({
        "provider": "weixin",
        "onlyAuthorize": true,
        success: (event) => {
          const {
            code,
            errMsg
          } = event;
          if (errMsg !== "login:ok") {
            common_vendor.index.showToast({
              title: "登录失败!",
              icon: "none"
            });
            return;
          }
          console.log("获取到临时凭证：", code);
        },
        fail: (err) => {
          console.log("失败", err);
        }
      });
    };
    const login = async () => {
      await getUserProfile();
      const {
        code
      } = await getLoginCode();
      common_vendor.index.request({
        url: "http://192.168.110.169:8080/login/wechat/miniapp",
        method: "POST",
        data: {
          code
        },
        success: (res) => {
          console.log("服务器返回结果：", res.data);
          if (res.data.success) {
            common_vendor.index.showToast({
              title: "登录成功",
              icon: "success"
            });
          } else {
            common_vendor.index.showToast({
              title: "登录失败",
              icon: "none"
            });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(login)
      };
    };
  }
};
wx.createComponent(_sfc_main);
