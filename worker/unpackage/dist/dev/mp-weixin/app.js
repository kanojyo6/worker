"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const utils_HttpInterceptor = require("./utils/HttpInterceptor.js");
if (!Math) {
  "./pages/tabbar/homePage.js";
  "./pages/tabbar/orderPage.js";
  "./pages/tabbar/myPage.js";
  "./pages/orderDetailPage.js";
  "./pages/typeDetailPage.js";
  "./pages/myOrderListPage.js";
  "./pages/myOrderDetailPage.js";
  "./pages/myOfferListPage.js";
  "./pages/myOfferDetailPage.js";
  "./pages/components/orderDetailPopup.js";
  "./pages/components/searchCommendResultPage.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
    common_vendor.index.getStorageSync("token");
    common_vendor.index.getStorageSync("refresh_token");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
utils_HttpInterceptor.setupHttpInterceptor();
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(common_vendor.createPinia());
  return {
    app,
    Pinia: common_vendor.Pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
