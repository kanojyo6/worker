"use strict";
const common_vendor = require("../../common/vendor.js");
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
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userStatus.value === 1
      }, userStatus.value === 1 ? common_vendor.e({
        b: userName.value === ""
      }, userName.value === "" ? {} : {
        c: common_vendor.t(`Hi, ${userName.value}`)
      }, {
        d: userAvatarUrl.value === ""
      }, userAvatarUrl.value === "" ? {} : {}) : {});
    };
  }
});
wx.createPage(_sfc_main);
