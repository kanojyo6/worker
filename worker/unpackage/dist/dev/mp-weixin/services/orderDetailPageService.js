"use strict";
const common_vendor = require("../common/vendor.js");
const baseUrl = "http://110.42.32.39:45212";
const requestOrderDetailInfo = async (id) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: `${baseUrl}/api/recruitments/${id}`,
      method: "GET",
      header: {
        "Content-Type": "application/json"
        // 'Authorization': 'Bearer ' + token // REMOVED - Handled by interceptor
      },
      success: (res) => {
        var _a, _b;
        if (res.statusCode === 200) {
          console.log("请求招聘详情成功: ", res.data);
          resolve(res.data);
        } else {
          const errorMsg = ((_a = res.data) == null ? void 0 : _a.message) || ((_b = res.data) == null ? void 0 : _b.msg) || `获取招聘详情失败 (${res.statusCode})`;
          console.error("获取招聘详情失败:", errorMsg, res);
          reject(new Error(errorMsg));
        }
      },
      fail: (error) => {
        console.error("获取招聘详情网络请求失败:", error);
        reject(new Error(error.errMsg || "网络错误，请检查网络后重试"));
      }
    });
  });
};
const requestApplicatorsList = async (requirementId, page) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: `${baseUrl}/api/applications/requirement/${requirementId}/not-ignored`,
      method: "GET",
      header: {
        "Content-Type": "application/json"
        // 'Authorization': 'Bearer ' + token // REMOVED - Handled by interceptor
      },
      data: {
        page,
        size: 20
      },
      success: (res) => {
        var _a, _b;
        if (res.statusCode === 200) {
          const data = res.data;
          console.log("请求申请列表成功: ", data.content);
          resolve(data.content || []);
        } else {
          const errorMsg = ((_a = res.data) == null ? void 0 : _a.message) || ((_b = res.data) == null ? void 0 : _b.msg) || `获取申请列表失败 (${res.statusCode})`;
          console.error("获取申请列表失败:", errorMsg, res);
          reject(new Error(errorMsg));
        }
      },
      fail: (error) => {
        console.error("获取申请列表网络请求失败:", error);
        reject(new Error(error.errMsg || "网络错误，请检查网络后重试"));
      }
    });
  });
};
const agreeApplicator = async (applicationId) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: `${baseUrl}/api/applications/${applicationId}/accept`,
      method: "POST",
      header: {
        "Content-Type": "application/json"
        // 'Authorization': 'Bearer ' + token // REMOVED - Handled by interceptor
      },
      success: (res) => {
        var _a, _b;
        if (res.statusCode === 200 || res.statusCode === 204) {
          console.log("同意申请成功: ", res.data);
          resolve(res.data);
        } else {
          const errorMsg = ((_a = res.data) == null ? void 0 : _a.message) || ((_b = res.data) == null ? void 0 : _b.msg) || `同意申请失败 (${res.statusCode})`;
          console.error("同意申请失败:", errorMsg, res);
          reject(new Error(errorMsg));
        }
      },
      fail: (error) => {
        console.error("同意申请网络请求失败:", error);
        reject(new Error(error.errMsg || "网络错误，请检查网络后重试"));
      }
    });
  });
};
const ignoreApplicator = async (applicationId) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: `${baseUrl}/api/applications/${applicationId}/ignore`,
      method: "POST",
      header: {
        "Content-Type": "application/json"
        // 'Authorization': 'Bearer ' + token // REMOVED - Handled by interceptor
      },
      success: (res) => {
        var _a, _b;
        if (res.statusCode === 200 || res.statusCode === 204) {
          console.log("忽略申请成功: ", res.data);
          resolve(res.data);
        } else {
          const errorMsg = ((_a = res.data) == null ? void 0 : _a.message) || ((_b = res.data) == null ? void 0 : _b.msg) || `忽略申请失败 (${res.statusCode})`;
          console.error("忽略申请失败:", errorMsg, res);
          reject(new Error(errorMsg));
        }
      },
      fail: (error) => {
        console.error("忽略申请网络请求失败:", error);
        reject(new Error(error.errMsg || "网络错误，请检查网络后重试"));
      }
    });
  });
};
const requestApplicationStatus = async (id) => {
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
      url: baseUrl + `/api/applications/${id}`,
      method: "GET",
      header: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      success: (res) => {
        var _a, _b;
        if (res.statusCode === 200 || res.statusCode === 204) {
          console.log("请求申请状态成功: ", res);
          const responseData = res.data;
          resolve(responseData.currentStatus);
          common_vendor.index.hideLoading();
        } else {
          const errorMsg = ((_a = res.data) == null ? void 0 : _a.message) || ((_b = res.data) == null ? void 0 : _b.msg) || `失败 (${res.statusCode})`;
          console.error("失败:", errorMsg, res);
          reject(new Error(errorMsg));
        }
      },
      fail: (error) => {
        console.error("失败:", error);
        reject(new Error(error.errMsg || "网络错误，请检查网络后重试"));
      }
    });
  });
};
exports.agreeApplicator = agreeApplicator;
exports.ignoreApplicator = ignoreApplicator;
exports.requestApplicationStatus = requestApplicationStatus;
exports.requestApplicatorsList = requestApplicatorsList;
exports.requestOrderDetailInfo = requestOrderDetailInfo;
