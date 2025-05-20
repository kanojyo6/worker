"use strict";
const common_vendor = require("../common/vendor.js");
const services_AuthService = require("./AuthService.js");
const baseUrl = "http://110.42.32.39:45212";
const requestMyOrdersInfo = async (page, size) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseUrl + "/api/recruitments/my-published",
      method: "GET",
      data: {
        page,
        size
      },
      header: {
        "content-type": "application/json",
        "Authorization": "Bearer " + common_vendor.index.getStorageSync("token")
      },
      success: async (res) => {
        if (res.statusCode === 200) {
          try {
            const data = res.data;
            const responseData = data.content.map((item) => {
              return {
                id: item.id,
                imageUrl: item.imageUrl,
                publisherId: item.publisherId,
                publisherName: item.publisherName,
                location: item.location,
                type: item.type,
                typeName: item.typeName,
                title: item.title,
                salary: item.salary,
                salaryPeriod: item.salaryPeriod,
                status: item.status,
                statusName: item.statusName,
                content: item.content,
                contactType: item.contactType,
                contactTypeName: item.contactTypeName,
                contactInfo: item.contactInfo
              };
            });
            console.log("获取我的发布成功", responseData);
            resolve(responseData);
          } catch (error) {
            console.log("解析数据失败:", error);
            reject("解析数据失败");
          }
        } else if (res.statusCode === 403) {
          console.log("accessToken失效，尝试刷新");
          try {
            const newToken = await services_AuthService.refreshToken();
            common_vendor.index.setStorageSync("token", newToken);
            const retryResult = await requestMyOrdersInfo(page, size);
            resolve(retryResult);
          } catch (e) {
            reject(e);
          }
        } else {
          reject("获取我的发布失败");
        }
      }
    });
  });
};
const requestMyOffersInfo = async (page, size) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseUrl + "/api/applications/my-applications",
      method: "GET",
      data: {
        page,
        size
      },
      header: {
        "content-type": "application/json",
        "Authorization": "Bearer " + common_vendor.index.getStorageSync("token")
      },
      success: async (res) => {
        if (res.statusCode === 200) {
          try {
            const data = res.data;
            const responseData = data.content.map((item) => {
              return {
                id: item.id,
                requirementId: item.requirementId,
                requirementTitle: item.requirementTitle,
                location: item.location,
                salary: item.salary,
                salaryPeriod: item.salaryPeriod,
                contactInfo: item.contactInfo,
                contactType: item.contactType,
                contactTypeName: item.contactTypeName,
                imageUrl: item.imageUrl
              };
            });
            console.log("获取我的申请成功", responseData);
            resolve(responseData);
          } catch (error) {
            console.log("解析数据失败:", error);
            reject("解析数据失败");
          }
        } else if (res.statusCode === 403) {
          console.log("accessToken失效，尝试刷新");
          try {
            const newToken = await services_AuthService.refreshToken();
            common_vendor.index.setStorageSync("token", newToken);
            const retryResult = await requestMyOffersInfo(page, size);
            resolve(retryResult);
          } catch (e) {
            reject(e);
          }
        } else {
          reject("获取我的申请失败");
        }
      }
    });
  });
};
exports.requestMyOffersInfo = requestMyOffersInfo;
exports.requestMyOrdersInfo = requestMyOrdersInfo;
