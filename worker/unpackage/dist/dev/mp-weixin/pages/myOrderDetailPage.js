"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const stores_orderDetailPageStore = require("../stores/orderDetailPageStore.js");
if (!Math) {
  (orderDetailPopup + uniPopup)();
}
const uniPopup = () => "../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const orderDetailPopup = () => "./components/orderDetailPopup2.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "myOrderDetailPage",
  setup(__props) {
    const orderDetailStore = stores_orderDetailPageStore.useOrderDetailStore();
    const applicatorsListStore = stores_orderDetailPageStore.useApplicatorsListStore();
    const orderId = common_vendor.ref("");
    const orderDetailInfo = common_vendor.computed(() => orderDetailStore.getOrderDetailInfo);
    const popup = common_vendor.ref(null);
    const handleSubmit = async () => {
      try {
        popup.value.open("bottom");
        common_vendor.index.showLoading({
          title: "获取数据中"
        });
        await applicatorsListStore.fetchApplicatorList(orderId.value, 0);
      } catch (e) {
        console.error(e);
      }
    };
    common_vendor.onLoad(async (option) => {
      console.log("传入id为: ", option.id);
      orderId.value = option.id;
      common_vendor.index.showLoading({ title: "获取数据中" });
      try {
        await loadOrderDetailInfo(option.id);
      } catch (error) {
        console.error("请求详情时发生了错误: :", error);
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "请求错误",
          icon: "none"
        });
      }
    });
    const loadOrderDetailInfo = async (id) => {
      try {
        await orderDetailStore.fetchOrderDetailInfo(id);
      } catch (e) {
        console.error("加载数据失败:", e);
        throw e;
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: orderDetailInfo.value.imageUrl === ""
      }, orderDetailInfo.value.imageUrl === "" ? {} : {
        b: orderDetailInfo.value.imageUrl
      }, {
        c: common_vendor.t(orderDetailInfo.value.publisherName),
        d: common_assets._imports_0,
        e: common_vendor.t(orderDetailInfo.value.location),
        f: common_vendor.t(orderDetailInfo.value.title),
        g: common_vendor.t(orderDetailInfo.value.salary),
        h: common_vendor.t(orderDetailInfo.value.salaryPeriod),
        i: common_vendor.t(orderDetailInfo.value.content),
        j: common_vendor.o(handleSubmit),
        k: common_vendor.sr(popup, "b6efe8aa-0", {
          "k": "popup"
        })
      });
    };
  }
});
wx.createPage(_sfc_main);
