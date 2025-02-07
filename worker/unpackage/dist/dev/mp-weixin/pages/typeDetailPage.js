"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "typeDetailPage",
  setup(__props) {
    const searchText = common_vendor.ref("");
    const typeDetailListData = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    const navigateToOrderDetail = () => {
      common_vendor.index.navigateTo({
        url: "/pages/orderDetailPage",
        animationType: "pop-in"
      });
    };
    const navigateToAddOrder = () => {
      common_vendor.index.switchTab({
        url: "/pages/tabbar/orderPage"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: searchText.value,
        b: common_vendor.o(($event) => searchText.value = $event.detail.value),
        c: common_assets._imports_0$1,
        d: common_vendor.o(navigateToAddOrder),
        e: common_vendor.f(typeDetailListData, (item, k0, i0) => {
          return {};
        }),
        f: common_vendor.o(navigateToOrderDetail)
      };
    };
  }
});
wx.createPage(_sfc_main);
