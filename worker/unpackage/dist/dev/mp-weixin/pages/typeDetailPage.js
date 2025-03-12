"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const stores_typeDetailPageStore = require("../stores/typeDetailPageStore.js");
const size = 20;
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "typeDetailPage",
  setup(__props) {
    const typeDetailStore = stores_typeDetailPageStore.useTypeDetailStore();
    const searchText = common_vendor.ref("");
    const page = common_vendor.ref(0);
    const typeDetailListData = common_vendor.computed(() => typeDetailStore.getTypeDetailInfo);
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
    common_vendor.onLoad(async (option) => {
      console.log("传入type为: ", option.type);
      common_vendor.index.showLoading({ title: "获取数据中" });
      try {
        await loadTypeDetailInfo(option.type, page.value, size);
      } catch (error) {
        console.error("请求时发生了错误: ", error);
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "请求错误",
          icon: "none"
        });
      }
    });
    const loadTypeDetailInfo = async (type, page2, size2) => {
      try {
        await typeDetailStore.fetchTyperDetailInfo(type, page2, size2);
      } catch (e) {
        console.error("加载数据失败:", e);
        throw e;
      }
    };
    return (_ctx, _cache) => {
      return {
        a: searchText.value,
        b: common_vendor.o(($event) => searchText.value = $event.detail.value),
        c: common_assets._imports_0$1,
        d: common_vendor.o(navigateToAddOrder),
        e: common_vendor.f(typeDetailListData.value, (item, k0, i0) => {
          return {};
        }),
        f: common_vendor.o(navigateToOrderDetail)
      };
    };
  }
});
wx.createPage(_sfc_main);
