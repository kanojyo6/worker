"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const stores_orderDetailPageStore = require("../stores/orderDetailPageStore.js");
if (!Math) {
  uniPopup();
}
const uniPopup = () => "../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "orderDetailPage",
  setup(__props) {
    common_vendor.ref("用户名称");
    common_vendor.ref("翻斗花园");
    const orderDetailStore = stores_orderDetailPageStore.useOrderDetailStore();
    const orderDetailInfo = common_vendor.computed(() => orderDetailStore.getOrderDetailInfo);
    const popup = common_vendor.ref(null);
    const handleSubmit = () => {
      console.log(popup.value);
      popup.value.open();
    };
    const dismissPopup = () => {
      popup.value.close();
    };
    common_vendor.onLoad(async (option) => {
      console.log("传入id为: ", option.id);
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
        j: orderDetailInfo.value.status === "PUBLISHED"
      }, orderDetailInfo.value.status === "PUBLISHED" ? {
        k: common_vendor.o(handleSubmit)
      } : {}, {
        l: common_assets._imports_1,
        m: common_vendor.o(dismissPopup),
        n: common_vendor.sr(popup, "3478b9a8-0", {
          "k": "popup"
        })
      });
    };
  }
});
wx.createPage(_sfc_main);
