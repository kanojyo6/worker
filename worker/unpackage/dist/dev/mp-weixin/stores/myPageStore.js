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
        const responseData = await services_myPageService.requestMyOrdersInfo(0, 3);
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
const useMyOrdersListStore = common_vendor.defineStore("myOrdersList", {
  state: () => ({
    myOrdersList: [],
    isLoading: false,
    error: null
  }),
  getters: {
    getMyOrdersList: (state) => state.myOrdersList
  },
  actions: {
    async fetchMyOrdersList(page, size) {
      this.isLoading = true;
      this.error = null;
      try {
        const responseData = await services_myPageService.requestMyOrdersInfo(page, size);
        this.myOrdersList.push(...responseData);
        console.log("将responseData存储到pinia中:", this.myOrdersList);
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    },
    // 清楚数据
    clear() {
      this.myOrdersList = [];
    }
  }
});
const useMyOffersStore = common_vendor.defineStore("myOffers", {
  state: () => ({
    myOffers: [],
    isLoading: false,
    error: null
  }),
  getters: {
    getMyOffers: (state) => state.myOffers
  },
  actions: {
    async fetchMyOffers() {
      this.isLoading = true;
      this.error = null;
      try {
        const responseData = await services_myPageService.requestMyOffersInfo(0, 3);
        this.myOffers = responseData;
        console.log("将responseData存储到pinia中:", this.myOffers);
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    }
  }
});
const useMyOffersListStore = common_vendor.defineStore("myOffersList", {
  state: () => ({
    myOffersList: [],
    isLoading: false,
    error: null
  }),
  getters: {
    getMyOffersList: (state) => state.myOffersList
  },
  actions: {
    async fetchMyOfffersList(page, size) {
      this.isLoading = true;
      this.error = null;
      try {
        const responseData = await services_myPageService.requestMyOffersInfo(page, size);
        this.myOffersList.push(...responseData);
        console.log("将responseData存储到pinia中:", this.myOffersList);
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    },
    // 清楚数据
    clear() {
      this.myOffersList = [];
    }
  }
});
exports.useMyOffersListStore = useMyOffersListStore;
exports.useMyOffersStore = useMyOffersStore;
exports.useMyOrdersListStore = useMyOrdersListStore;
exports.useMyOrdersStore = useMyOrdersStore;
