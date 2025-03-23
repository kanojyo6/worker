"use strict";
const common_vendor = require("../common/vendor.js");
const services_orderDetailPageService = require("../services/orderDetailPageService.js");
const useOrderDetailStore = common_vendor.defineStore("orderDetail", {
  state: () => ({
    orderDetailInfo: {
      applicationCount: 0,
      companyName: "",
      contactInfo: "",
      contactType: "",
      contactTypeName: "",
      content: "",
      id: "",
      imageUrl: "",
      location: "",
      publisherId: 0,
      publisherName: "",
      salary: 0,
      salaryPeriod: "",
      status: "",
      statusName: "",
      title: "",
      type: "",
      typeName: ""
    },
    isLoading: false,
    error: null
  }),
  getters: {
    getOrderDetailInfo: (state) => state.orderDetailInfo
  },
  actions: {
    async fetchOrderDetailInfo(id) {
      this.isLoading = true;
      this.error = null;
      try {
        const responseData = await services_orderDetailPageService.requestOrderDetailInfo(id);
        this.orderDetailInfo = responseData;
        console.log("将responseData存储到pinia中:", this.orderDetailInfo);
      } catch (error) {
        this.error = error;
        console.log("发生请求错误：", error);
      } finally {
        this.isLoading = false;
      }
    }
  }
});
const useApplicatorsListStore = common_vendor.defineStore("applicatorList", {
  state: () => ({
    applicatorList: [],
    isLoading: false,
    error: null
  }),
  getters: {
    getApplicatorList: (state) => state.applicatorList
  },
  actions: {
    async fetchApplicatorList(id, page) {
      this.isLoading = true;
      this.error = null;
      try {
        const responseData = await services_orderDetailPageService.requestApplicatorsList(id, page);
        this.applicatorList = responseData;
        console.log("将responseData存储到pinia中:", this.applicatorList);
      } catch (error) {
        this.error = error;
        console.log("发生请求错误：", error);
      } finally {
        this.isLoading = false;
      }
    }
  }
});
exports.useApplicatorsListStore = useApplicatorsListStore;
exports.useOrderDetailStore = useOrderDetailStore;
