"use strict";
const common_vendor = require("../common/vendor.js");
const services_homePageService = require("../services/homePageService.js");
const useRecommendedStore = common_vendor.defineStore("recommended", {
  state: () => ({
    recommendedOrder: [],
    isLoading: false,
    error: null
  }),
  getters: {
    getRecommendedOrder: (state) => state.recommendedOrder
  },
  actions: {
    async fetchRecommendedOrders(page, size) {
      this.isLoading = true;
      this.error = null;
      try {
        const responseData = await services_homePageService.requestRecommendedInfo(page, size);
        this.recommendedOrder = responseData;
        console.log("将responseData存储到pinia中:", this.recommendedOrder);
      } catch (error) {
        this.error = error;
        console.log("发生请求错误：", error);
      } finally {
        this.isLoading = false;
      }
    }
  }
});
exports.useRecommendedStore = useRecommendedStore;
