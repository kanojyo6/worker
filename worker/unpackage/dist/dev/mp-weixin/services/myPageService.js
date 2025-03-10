"use strict";
const common_vendor = require("../common/vendor.js");
const services_refreshTokenService = require("./refreshTokenService.js");
const baseUrl = "http://183.136.206.77:45212";
const requestMyOrdersInfo = async () => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseUrl + "/api/recruitments/my-published",
      method: "GET",
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
          const newToken = await services_refreshTokenService.refreshAccessToken();
          if (newToken) {
            common_vendor.index.setStorageSync("token", newToken);
            resolve(await requestMyOrdersInfo());
          }
        } else {
          reject("获取我的发布失败");
        }
      }
    });
  });
};
exports.requestMyOrdersInfo = requestMyOrdersInfo;
