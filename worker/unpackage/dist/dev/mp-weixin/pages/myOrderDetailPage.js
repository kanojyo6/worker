"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
if (!Math) {
  (orderDetailPopup + uniPopup)();
}
const uniPopup = () => "../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const orderDetailPopup = () => "./components/orderDetailPopup2.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "myOrderDetailPage",
  setup(__props) {
    const userName = common_vendor.ref("用户名称");
    const address = common_vendor.ref("翻斗花园");
    const popup = common_vendor.ref(null);
    const handleSubmit = () => {
      console.log(popup.value);
      popup.value.open("bottom");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(userName.value),
        b: common_assets._imports_0,
        c: common_vendor.t(address.value),
        d: common_vendor.o(handleSubmit),
        e: common_vendor.sr(popup, "4d447bdc-0", {
          "k": "popup"
        })
      };
    };
  }
});
wx.createPage(_sfc_main);
