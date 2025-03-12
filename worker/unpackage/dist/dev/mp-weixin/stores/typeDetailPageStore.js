"use strict";
const common_vendor = require("../common/vendor.js");
const services_typeDetailPageService = require("../services/typeDetailPageService.js");
const useTypeDetailStore = common_vendor.defineStore("typeDetail", {
  state: () => ({
    typeDetailInfo: [],
    isLoading: false,
    error: null
  }),
  getters: {
    getTypeDetailInfo: (state) => state.typeDetailInfo
  },
  actions: {
    async fetchTyperDetailInfo(type, page, size) {
      this.isLoading = true;
      this.error = null;
      try {
        const responseData = await services_typeDetailPageService.requestTypeDetailInfo(type, page, size);
        this.typeDetailInfo = responseData;
        console.log("将responseData存储到pinia中:", this.typeDetailInfo);
      } catch (error) {
        this.error = error;
        console.log("发生请求错误：", error);
      } finally {
        this.isLoading = false;
      }
    }
  }
});
exports.useTypeDetailStore = useTypeDetailStore;
