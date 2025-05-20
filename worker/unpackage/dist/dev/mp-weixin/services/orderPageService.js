"use strict";
const common_vendor = require("../common/vendor.js");
const baseUrl = "http://110.42.32.39:45212";
const submitOrder = async (recruitmentData, resetFormCallback, setSubmittingCallback) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: `${baseUrl}/api/recruitments`,
      method: "POST",
      data: recruitmentData,
      header: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + common_vendor.index.getStorageSync("token")
      },
      success: (res) => {
        var _a;
        if (res.statusCode === 200) {
          common_vendor.index.showToast({
            title: "发布成功",
            icon: "success"
          });
          resetFormCallback();
          setTimeout(() => {
            common_vendor.index.navigateBack();
          }, 1500);
        } else {
          const errorMsg = ((_a = res.data) == null ? void 0 : _a.message) || "发布失败，请重试";
          common_vendor.index.showToast({
            title: errorMsg,
            icon: "none"
          });
        }
      },
      fail: (err) => {
        console.error("发布招聘需求出错:", err);
        common_vendor.index.showToast({
          title: "网络错误，请检查网络后重试",
          icon: "none"
        });
      },
      complete: () => {
        setSubmittingCallback(false);
      }
    });
  });
};
exports.submitOrder = submitOrder;
