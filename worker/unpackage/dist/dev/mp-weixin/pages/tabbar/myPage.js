"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "myPage",
  setup(__props) {
    const userName = common_vendor.ref("贝利亚大王");
    const userAvatarUrl = common_vendor.ref("");
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userName.value === ""
      }, userName.value === "" ? {} : {
        b: common_vendor.t(`Hi, ${userName.value}`)
      }, {
        c: userAvatarUrl.value === ""
      }, userAvatarUrl.value === "" ? {} : {});
    };
  }
});
wx.createPage(_sfc_main);
