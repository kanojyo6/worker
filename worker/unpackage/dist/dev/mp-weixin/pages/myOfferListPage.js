"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const stores_myPageStore = require("../stores/myPageStore.js");
const size = 5;
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "myOfferListPage",
  setup(__props) {
    const myOffersListStore = stores_myPageStore.useMyOffersListStore();
    const page = common_vendor.ref(0);
    const offers = common_vendor.computed(() => myOffersListStore.getMyOffersList);
    const viewOrder = (orderId) => {
      common_vendor.index.navigateTo({
        url: `/pages/myOfferDetailPage?id=${orderId}`
      });
    };
    common_vendor.onMounted(async () => {
      page.value = 0;
      myOffersListStore.clear();
      common_vendor.index.showLoading({
        title: "获取数据中"
      });
      try {
        await myOffersListStore.fetchMyOfffersList(page.value, size);
        common_vendor.index.hideLoading();
      } catch (error) {
        console.error("加载数据失败:", error);
        throw error;
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(offers.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.imageUrl === ""
          }, item.imageUrl === "" ? {} : {
            b: item.imageUrl
          }, {
            c: common_vendor.t(item.requirementTitle.length > 5 ? item.requirementTitle.slice(0, 5) + ".." : item.requirementTitle),
            d: common_vendor.t(item.salary),
            e: common_vendor.t(item.salaryPeriod.length > 5 ? item.salaryPeriod.slice(0, 5) + ".." : item.salaryPeriod),
            f: common_vendor.t(item.location),
            g: item.id,
            h: common_vendor.o(($event) => viewOrder(item.id), item.id)
          });
        }),
        b: common_assets._imports_0
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-feb72d08"]]);
wx.createPage(MiniProgramPage);
