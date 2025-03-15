"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "searchCommendResultPage",
  setup(__props) {
    const searchText = common_vendor.ref("");
    common_vendor.ref(0);
    const navigateToOrderDetail = () => {
      common_vendor.index.navigateTo({
        url: "/pages/orderDetailPage",
        animationType: "pop-in"
      });
    };
    common_vendor.onLoad(async (option) => {
      searchText.value = option.searchValue;
    });
    return (_ctx, _cache) => {
      return {
        a: searchText.value,
        b: common_vendor.o(($event) => searchText.value = $event.detail.value),
        c: common_assets._imports_0$1,
        d: common_vendor.f([1, 1, 1, 1, 1, 1, 1, 1, 1], (item, k0, i0) => {
          return {};
        }),
        e: common_vendor.o(navigateToOrderDetail)
      };
    };
  }
});
wx.createPage(_sfc_main);
