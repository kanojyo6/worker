"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const stores_orderDetailPageStore = require("../stores/orderDetailPageStore.js");
const services_applicationService = require("../services/applicationService.js");
if (!Math) {
  uniPopup();
}
const uniPopup = () => "../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "orderDetailPage",
  setup(__props) {
    const orderDetailStore = stores_orderDetailPageStore.useOrderDetailStore();
    const orderId = common_vendor.ref("");
    const orderDetailInfo = common_vendor.computed(() => orderDetailStore.getOrderDetailInfo);
    const popup = common_vendor.ref(null);
    const handleSubmit = () => {
      console.log(popup.value);
      popup.value.open();
    };
    const dismissPopup = () => {
      popup.value.close();
    };
    const addApplication = async () => {
      common_vendor.index.showLoading({ title: "提交申请中" });
      try {
        await services_applicationService.application(orderId.value);
        common_vendor.index.showToast({
          icon: "success",
          title: "已发送申请"
        });
        popup.value.close();
      } catch (e) {
        console.error("提交申请发生了错误: :", e);
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "请求错误",
          icon: "none"
        });
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
        j: orderDetailInfo.value.status === "PUBLISHED"
      }, orderDetailInfo.value.status === "PUBLISHED" ? {
        k: common_vendor.o(handleSubmit)
      } : {}, {
        l: common_assets._imports_1,
        m: common_vendor.o(dismissPopup),
        n: common_vendor.o(addApplication),
        o: common_vendor.sr(popup, "e8a81d92-0", {
          "k": "popup"
        })
      });
    };
  }
});
wx.createPage(_sfc_main);
