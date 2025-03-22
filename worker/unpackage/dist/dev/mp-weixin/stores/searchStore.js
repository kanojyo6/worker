"use strict";
const common_vendor = require("../common/vendor.js");
const services_searchService = require("../services/searchService.js");
const useSearchStore = common_vendor.defineStore("search", {
  state: () => ({
    searchInfo: [],
    isLoading: false,
    error: null
  }),
  getters: {
    getSearchResult: (state) => state.searchInfo
  },
  actions: {
    async fetchSearchResult(keyword, page, size) {
      this.isLoading = true;
      this.error = null;
      try {
        const responseData = await services_searchService.requestSearchResult(keyword, page, size);
        this.searchInfo.push(...responseData);
        console.log("将responseData存储到pinia中:", this.searchInfo);
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    },
    // 清除数据
    clear() {
      this.searchInfo = [];
    }
  }
});
exports.useSearchStore = useSearchStore;
