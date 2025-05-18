"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_useAuth = require("../../utils/useAuth.js");
const stores_userInfoStore = require("../../stores/userInfoStore.js");
const stores_myPageStore = require("../../stores/myPageStore.js");
if (!Math) {
  loginPageVue();
}
const loginPageVue = () => "../components/loginPage.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "myPage",
  setup(__props) {
    const auth = utils_useAuth.useAuth();
    const userInfoStore = stores_userInfoStore.useUserInfoStore();
    const myOrdersStore = stores_myPageStore.useMyOrdersStore();
    const myOffersStore = stores_myPageStore.useMyOffersStore();
    const userInfo = common_vendor.computed(() => userInfoStore.getUserInfo);
    const myOrders = common_vendor.computed(() => myOrdersStore.getMyOrders);
    const myOrdersCount = common_vendor.computed(() => myOrdersStore.getMyOrders.length);
    const myApplications = common_vendor.computed(() => myOffersStore.getMyOffers);
    common_vendor.computed(() => myOffersStore.getMyOffers.length);
    common_vendor.onMounted(async () => {
      common_vendor.index.showLoading({
        title: "获取用户数据"
      });
      await userInfoStore.fetchUserInfo();
      if (auth.isAuthenticated.value) {
        try {
          await loadUserData();
        } catch (error) {
          console.error("加载用户数据失败:", error);
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: "数据加载失败",
            icon: "none"
          });
        }
      }
    });
    const loadUserData = async () => {
      try {
        await myOrdersStore.fetchMyOrders();
        await myOffersStore.fetchMyOffers();
        common_vendor.index.hideLoading();
      } catch (error) {
        console.error("加载数据失败:", error);
        throw error;
      }
    };
    const navigateToOrders = () => {
      common_vendor.index.navigateTo({
        url: "/pages/myOrderListPage"
      });
    };
    const navigateToApplications = () => {
      common_vendor.index.navigateTo({
        url: "/pages/myOfferListPage"
      });
    };
    const navigateToMyOfferDetail = (orderId) => {
      common_vendor.index.navigateTo({
        url: `/pages/myOfferDetailPage?id=${orderId}`
      });
    };
    const navigateToMyOrderDetail = (orderId) => {
      common_vendor.index.navigateTo({
        url: `/pages/myOrderDetailPage?id=${orderId}`,
        animationType: "pop-in"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(auth).isAuthenticated
      }, common_vendor.unref(auth).isAuthenticated ? common_vendor.e({
        b: !userInfo.value.nickName
      }, !userInfo.value.nickName ? {} : {
        c: common_vendor.t(`Hi, ${userInfo.value.nickName}`)
      }, {
        d: !userInfo.value.avatarUrl
      }, !userInfo.value.avatarUrl ? {} : {
        e: userInfo.value.avatarUrl
      }, {
        f: common_vendor.t(myOrdersCount.value || 1),
        g: common_vendor.t(1),
        h: common_vendor.o(navigateToOrders),
        i: common_vendor.f(myOrders.value, (order, k0, i0) => {
          return {
            a: common_vendor.t(order.title),
            b: common_vendor.t(order.typeName),
            c: common_vendor.t(order.salary),
            d: common_vendor.t(order.salartPeriod),
            e: common_vendor.t(order.content.length > 50 ? order.content.slice(0, 50) + "..." : order.content),
            f: common_vendor.t(order.contactTypeName),
            g: common_vendor.t(order.contactInfo),
            h: common_vendor.t(order.location),
            i: order.id,
            j: common_vendor.o(($event) => navigateToMyOrderDetail(order.id), order.id)
          };
        }),
        j: common_vendor.o(navigateToApplications),
        k: common_vendor.f(myApplications.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.imageUrl === ""
          }, item.imageUrl === "" ? {} : {
            b: item.imageUrl
          }, {
            c: common_vendor.t(item.requirementTitle ? item.requirementTitle.length > 5 ? item.requirementTitle.slice(0, 5) + ".." : item.requirementTitle : ""),
            d: common_vendor.t(item.salary),
            e: common_vendor.t(item.salaryPeriod ? item.salaryPeriod.length > 6 ? item.salaryPeriod.slice(0, 6) + ".." : item.salaryPeriod : ""),
            f: common_vendor.t(item.location),
            g: item.id,
            h: common_vendor.o(($event) => navigateToMyOfferDetail(item.id), item.id)
          });
        }),
        l: common_assets._imports_0
      }) : {});
    };
  }
});
wx.createPage(_sfc_main);
