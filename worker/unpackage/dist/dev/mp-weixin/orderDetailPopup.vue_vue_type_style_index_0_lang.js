"use strict";
const common_vendor = require("./common/vendor.js");
const stores_orderDetailPageStore = require("./stores/orderDetailPageStore.js");
const services_orderDetailPageService = require("./services/orderDetailPageService.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "orderDetailPopup",
  setup(__props) {
    const applicatorsListStore = stores_orderDetailPageStore.useApplicatorsListStore();
    const applicators = common_vendor.computed(() => applicatorsListStore.getApplicatorList);
    const handleDisAgree = async (id) => {
      common_vendor.index.showLoading({ title: "操作中..." });
      try {
        await services_orderDetailPageService.ignoreApplicator(id);
        common_vendor.index.showToast({
          title: "已忽略",
          icon: "none"
        });
      } catch (e) {
        common_vendor.index.hideLoading();
        console.error(e);
        common_vendor.index.showToast({
          icon: "error",
          title: "请求出错"
        });
      }
    };
    const handleAgree = async (id) => {
      common_vendor.index.showLoading({ title: "操作中..." });
      try {
        await services_orderDetailPageService.agreeApplicator(id);
        common_vendor.index.showToast({
          title: "已同意",
          icon: "success"
        });
      } catch (e) {
        common_vendor.index.hideLoading();
        console.error(e);
        common_vendor.index.showToast({
          icon: "error",
          title: "请求出错"
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(applicators.value, (person, k0, i0) => {
          return common_vendor.e({
            a: person.applicantAvatar !== ""
          }, person.applicantAvatar !== "" ? {
            b: person.applicantAvatar
          } : {}, {
            c: common_vendor.t(person.applicantName),
            d: person.currentStatus === "applied"
          }, person.currentStatus === "applied" ? {
            e: common_vendor.o(($event) => handleDisAgree(person.id)),
            f: common_vendor.o(($event) => handleAgree(person.id))
          } : {
            g: common_vendor.t(person.currentStatusDescription)
          });
        })
      };
    };
  }
});
exports._sfc_main = _sfc_main;
