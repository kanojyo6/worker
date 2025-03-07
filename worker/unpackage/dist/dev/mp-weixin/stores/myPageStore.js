"use strict";
const common_vendor = require("../common/vendor.js");
const services_myPageService = require("../services/myPageService.js");
const useMyOrdersStore = common_vendor.defineStore("myOrders", {
  state: () => ({
    myOrders: [],
    isLoading: false,
    error: null
  }),
  getters: {
    getMyOrders: (state) => state.myOrders
  },
  actions: {
    async fetchMyOrders() {
      this.isLoading = true;
      this.error = null;
      try {
        const responseData = await services_myPageService.requestMyOrdersInfo();
        this.myOrders = responseData;
        console.log("将responseData存储到pinia中:", this.myOrders);
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    }
  }
});
exports.useMyOrdersStore = useMyOrdersStore;
