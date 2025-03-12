"use strict";
const common_vendor = require("../common/vendor.js");
const stores_myPageStore = require("../stores/myPageStore.js");
const size = 5;
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "myOrderListPage",
  setup(__props) {
    const myOrdersListStore = stores_myPageStore.useMyOrdersListStore();
    const page = common_vendor.ref(0);
    const orders = common_vendor.computed(() => myOrdersListStore.getMyOrdersList);
    const viewOrder = () => {
      common_vendor.index.navigateTo({
        url: "/pages/myOrderDetailPage"
      });
    };
    const loadMoreData = async () => {
      page.value += 1;
      try {
        await myOrdersListStore.fetchMyOrdersList(page.value, size);
      } catch (error) {
        console.error("加载数据失败:", error);
        throw error;
      }
    };
    common_vendor.onMounted(async () => {
      page.value = 0;
      myOrdersListStore.clear();
      common_vendor.index.showLoading({
        title: "获取数据中"
      });
      try {
        await myOrdersListStore.fetchMyOrdersList(page.value, size);
        common_vendor.index.hideLoading();
      } catch (error) {
        console.error("加载数据失败:", error);
        throw error;
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(orders.value, (order, k0, i0) => {
          return {
            a: common_vendor.t(order.title),
            b: common_vendor.t(order.typeName),
            c: common_vendor.t(order.salary),
            d: common_vendor.t(order.salartPeriod),
            e: common_vendor.t(order.content.length > 70 ? order.content.slice(0, 70) + "..." : order.content),
            f: common_vendor.t(order.contactTypeName),
            g: common_vendor.t(order.contactInfo),
            h: common_vendor.t(order.location),
            i: order.id,
            j: common_vendor.o(viewOrder, order.id)
          };
        }),
        b: common_vendor.o(loadMoreData)
      };
    };
  }
});
wx.createPage(_sfc_main);
