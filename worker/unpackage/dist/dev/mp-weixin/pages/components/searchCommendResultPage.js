"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const stores_searchStore = require("../../stores/searchStore.js");
const size = 20;
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "searchCommendResultPage",
  setup(__props) {
    const searchStore = stores_searchStore.useSearchStore();
    const searchText = common_vendor.ref("");
    const searchResult = common_vendor.computed(() => searchStore.getSearchResult);
    const page = common_vendor.ref(0);
    const navigateToOrderDetail = () => {
      common_vendor.index.navigateTo({
        url: "/pages/orderDetailPage",
        animationType: "pop-in"
      });
    };
    common_vendor.onLoad(async (option) => {
      searchText.value = option.searchValue;
      page.value = 0;
      common_vendor.index.showLoading({
        title: "获取数据中"
      });
      try {
        await loadOriginData();
      } catch (e) {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "请求错误",
          icon: "none"
        });
      }
    });
    const loadOriginData = async () => {
      try {
        searchStore.clear();
        await searchStore.fetchSearchResult(searchText.value, page.value, size);
      } catch (e) {
        console.error(e);
      }
    };
    const handleSearch = async () => {
      page.value = 0;
      common_vendor.index.showLoading({
        title: "获取数据中"
      });
      try {
        await loadOriginData();
      } catch (e) {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "请求错误",
          icon: "none"
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: searchText.value,
        b: common_vendor.o(($event) => searchText.value = $event.detail.value),
        c: common_assets._imports_0$1,
        d: common_vendor.o(handleSearch),
        e: common_vendor.f(searchResult.value, (item, k0, i0) => {
          return {};
        }),
        f: common_vendor.o(navigateToOrderDetail)
      };
    };
  }
});
wx.createPage(_sfc_main);
