"use strict";
const common_vendor = require("./common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "orderDetailPopup",
  setup(__props) {
    const offers = ["admin", "admin", "admin", "admin", "admin", "admin", "admin", "admin", "admin"];
    const imageUrl = common_vendor.ref();
    const handleDisAgree = () => {
      common_vendor.index.showLoading({ title: "操作中..." });
      common_vendor.index.hideLoading();
      common_vendor.index.showToast({
        title: "已忽略",
        icon: "none"
      });
    };
    const handleAgree = () => {
      common_vendor.index.showLoading({ title: "操作中..." });
      common_vendor.index.hideLoading();
      common_vendor.index.showToast({
        title: "已同意",
        icon: "success"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(offers, (person, k0, i0) => {
          return common_vendor.e(imageUrl.value ? {
            a: imageUrl.value
          } : {}, {
            b: common_vendor.t(person)
          });
        }),
        b: imageUrl.value,
        c: common_vendor.o(handleDisAgree),
        d: common_vendor.o(handleAgree)
      };
    };
  }
});
exports._sfc_main = _sfc_main;
