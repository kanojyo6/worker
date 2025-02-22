"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Math) {
  loginPageVue();
}
const loginPageVue = () => "../../components/loginPage.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "myPage",
  setup(__props) {
    const userName = common_vendor.ref("贝利亚大王");
    const userAvatarUrl = common_vendor.ref("");
    const userStatus = common_vendor.ref(0);
    const test = [1, 1, 1];
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userStatus.value === 1
      }, userStatus.value === 1 ? common_vendor.e({
        b: userName.value === ""
      }, userName.value === "" ? {} : {
        c: common_vendor.t(`Hi, ${userName.value}`)
      }, {
        d: userAvatarUrl.value === ""
      }, userAvatarUrl.value === "" ? {} : {}, {
        e: common_vendor.f(test, (item, k0, i0) => {
          return {};
        }),
        f: common_assets._imports_0
      }) : {});
    };
  }
});
wx.createPage(_sfc_main);
