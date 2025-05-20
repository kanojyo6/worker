"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const stores_orderDetailPageStore = require("../stores/orderDetailPageStore.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "myOfferDetailPage",
  setup(__props) {
    const orderDetailStore = stores_orderDetailPageStore.useOrderDetailStore();
    const orderId = common_vendor.ref("");
    const orderApplicationId = common_vendor.ref("");
    const offerDetailInfo = common_vendor.computed(() => orderDetailStore.getOrderDetailInfo);
    const applicationStatus = common_vendor.computed(() => orderDetailStore.getApplicationStatus);
    common_vendor.onLoad(async (option) => {
      console.log("传入id为: ", option.id);
      console.log("传入applicationId为: ", option.applicationId);
      orderId.value = option.id;
      orderApplicationId.value = option.applicationId;
      common_vendor.index.showLoading({ title: "获取数据中" });
      try {
        await loadofferDetailInfo(option.id, option.applicationId);
      } catch (error) {
        console.error("请求详情时发生了错误: :", error);
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "请求错误",
          icon: "none"
        });
      }
    });
    const loadofferDetailInfo = async (id, applicationId) => {
      try {
        await orderDetailStore.fetchOrderDetailInfo(applicationId);
        await orderDetailStore.fetchApplicationStatus(id);
      } catch (e) {
        console.error("加载数据失败:", e);
        throw e;
      }
    };
    const showResult = () => {
      if (applicationStatus.value === "applied") {
        common_vendor.index.showModal({
          content: "申请中，请耐心等待结果"
        });
      } else if (applicationStatus.value === "accepted") {
        common_vendor.index.showModal({
          content: `已通过，联系方式：${offerDetailInfo.value.contactTypeName}  ${offerDetailInfo.value.contactInfo}`
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: offerDetailInfo.value.imageUrl === ""
      }, offerDetailInfo.value.imageUrl === "" ? {} : {
        b: offerDetailInfo.value.imageUrl
      }, {
        c: common_vendor.t(offerDetailInfo.value.publisherName),
        d: common_assets._imports_0,
        e: common_vendor.t(offerDetailInfo.value.location),
        f: common_vendor.t(offerDetailInfo.value.title),
        g: common_vendor.t(offerDetailInfo.value.salary),
        h: common_vendor.t(offerDetailInfo.value.salaryPeriod),
        i: common_vendor.t(offerDetailInfo.value.content),
        j: offerDetailInfo.value.status === "PUBLISHED"
      }, offerDetailInfo.value.status === "PUBLISHED" ? {
        k: common_vendor.o(showResult)
      } : {});
    };
  }
});
wx.createPage(_sfc_main);
