"use strict";
const common_vendor = require("../common/vendor.js");
const baseUrl = "http://110.42.32.39:45212";
const requestRecommendedInfo = async (page, size) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseUrl + "/api/recruitments/recommended",
      data: {
        page,
        size
      },
      method: "GET",
      header: {
        "Content-Type": "application/json"
      },
      success: (res) => {
        var _a;
        if (res.statusCode === 200) {
          console.log("请求推荐需求信息成功: ", res);
          const data = res.data;
          const responseData = data.content.map((item) => {
            return {
              id: item.id,
              imageUrl: item.imageUrl,
              title: item.title,
              salaryPeriod: item.salaryPeriod
            };
          });
          resolve(responseData);
          common_vendor.index.hideLoading();
        } else {
          const errorMsg = ((_a = res.data) == null ? void 0 : _a.message) || "请求失败，请重试";
          common_vendor.index.showToast({
            title: errorMsg,
            icon: "none"
          });
        }
      },
      fail: (error) => {
        console.log("请求推荐需求信息失败: ", error);
        common_vendor.index.showToast({
          title: "网络错误，请检查网络后重试",
          icon: "none"
        });
      }
    });
  });
};
exports.requestRecommendedInfo = requestRecommendedInfo;
