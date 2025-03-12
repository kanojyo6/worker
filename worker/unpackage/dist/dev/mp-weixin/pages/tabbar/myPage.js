"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const stores_userInfo = require("../../stores/userInfo.js");
const stores_myPageStore = require("../../stores/myPageStore.js");
if (!Math) {
  loginPageVue();
}
const loginPageVue = () => "../components/loginPage.js";
const _sfc_main = {
  __name: "myPage",
  setup(__props) {
    const userInfoStore = stores_userInfo.useUserInfoStore();
    const myOrdersStore = stores_myPageStore.useMyOrdersStore();
    const isLoggedIn = common_vendor.computed(() => userInfoStore.isLoggedIn);
    const userInfo = common_vendor.computed(() => userInfoStore.getUserInfo);
    const myOrders = common_vendor.computed(() => myOrdersStore.getMyOrders);
    const myOrdersCount = common_vendor.computed(() => myOrdersStore.getMyOrders.length);
    const applyCount = common_vendor.ref(1);
    const applications = common_vendor.ref([{
      id: 1,
      title: "万达优衣库招服务员",
      price: "10000元",
      duration: "4个月",
      location: "佛山南海区桂城"
    }, {
      id: 1,
      title: "万达优衣库招服务员",
      price: "10000元",
      duration: "4个月",
      location: "佛山南海区桂城"
    }, {
      id: 1,
      title: "万达优衣库招服务员",
      price: "10000元",
      duration: "4个月",
      location: "佛山南海区桂城"
    }]);
    common_vendor.onMounted(async () => {
      common_vendor.index.showLoading({ title: "获取用户数据" });
      await userInfoStore.fetchUserInfo();
      if (isLoggedIn.value) {
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
        common_vendor.index.hideLoading();
      } catch (error) {
        console.error("加载数据失败:", error);
        throw error;
      }
    };
    const navigateToOrders = () => {
      common_vendor.index.navigateTo({ url: "/pages/myOrderListPage" });
    };
    const navigateToApplications = () => {
      common_vendor.index.navigateTo({ url: "/pages/myOfferListPage" });
    };
    const viewApplication = () => {
      common_vendor.index.navigateTo({ url: `/pages/myOfferDetailPage` });
    };
    const navigateToOrderDetail = (orderId) => {
      common_vendor.index.navigateTo({
        url: `/pages/orderDetailPage?id=${orderId}`,
        animationType: "pop-in"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isLoggedIn.value
      }, isLoggedIn.value ? common_vendor.e({
        b: !userInfo.value.nickName
      }, !userInfo.value.nickName ? {} : {
        c: common_vendor.t(`Hi, ${userInfo.value.nickName}`)
      }, {
        d: !userInfo.value.avatarUrl
      }, !userInfo.value.avatarUrl ? {} : {
        e: userInfo.value.avatarUrl
      }, {
        f: common_vendor.t(myOrdersCount.value || 1),
        g: common_vendor.t(applyCount.value || 1),
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
            j: common_vendor.o(($event) => navigateToOrderDetail(order.id), order.id)
          };
        }),
        j: common_vendor.o(navigateToApplications),
        k: common_vendor.f(applications.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.price),
            c: common_vendor.t(item.duration),
            d: common_vendor.t(item.location),
            e: item.id,
            f: common_vendor.o(($event) => viewApplication(), item.id)
          };
        }),
        l: common_assets._imports_0
      }) : {});
    };
  }
};
wx.createPage(_sfc_main);
