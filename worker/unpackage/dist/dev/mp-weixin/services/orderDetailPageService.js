"use strict";
const common_vendor = require("../common/vendor.js");
const services_refreshTokenService = require("./refreshTokenService.js");
const baseUrl = "http://183.136.206.77:45212";
const requestOrderDetailInfo = async (id) => {
  return new Promise((resolve, reject) => {
    const token = common_vendor.index.getStorageSync("token");
    if (token === "") {
      console.log("token无效");
      common_vendor.index.hideLoading();
      common_vendor.index.showToast({
        title: "token无效",
        icon: "none"
      });
      return;
    }
    common_vendor.index.request({
      url: baseUrl + `/api/recruitments/${id}`,
      method: "GET",
      header: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      success: async (res) => {
        var _a;
        if (res.statusCode === 200) {
          console.log("请求详情成功: ", res);
          const responseData = res.data;
          resolve(responseData);
          common_vendor.index.hideLoading();
        } else if (res.statusCode === 403) {
          console.log("accessToken失效，尝试刷新");
          const newToken = await services_refreshTokenService.refreshAccessToken();
          if (newToken) {
            resolve(await requestOrderDetailInfo(id));
          }
        } else {
          const errorMsg = ((_a = res.data) == null ? void 0 : _a.message) || "请求失败，请重试";
          common_vendor.index.showToast({
            title: errorMsg,
            icon: "none"
          });
        }
      },
      fail: (error) => {
        console.log("请求详情失败: ", error);
        common_vendor.index.showToast({
          title: "网络错误，请检查网络后重试",
          icon: "none"
        });
      }
    });
  });
};
exports.requestOrderDetailInfo = requestOrderDetailInfo;
