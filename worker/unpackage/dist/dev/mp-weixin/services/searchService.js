"use strict";
const common_vendor = require("../common/vendor.js");
const services_refreshTokenService = require("./refreshTokenService.js");
const baseUrl = "http://183.136.206.77:45212";
const requestSearchResult = async (keyword, page, size) => {
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
      url: baseUrl + "/api/recruitments/search",
      method: "GET",
      data: {
        keyword,
        page,
        size
      },
      header: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      success: async (res) => {
        var _a;
        if (res.statusCode === 200) {
          console.log("请求详情成功: ", res);
          const data = res.data;
          const responseData = data.content;
          resolve(responseData);
          common_vendor.index.hideLoading();
        } else if (res.statusCode === 403) {
          console.log("accessToken失效，尝试刷新");
          try {
            await services_refreshTokenService.refreshAccessToken();
            const retryResult = await requestSearchResult(keyword, page, size);
            resolve(retryResult);
          } catch (e) {
            reject(e);
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
exports.requestSearchResult = requestSearchResult;
