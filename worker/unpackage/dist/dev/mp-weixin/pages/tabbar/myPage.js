"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const stores_userInfo = require("../../stores/userInfo.js");
if (!Math) {
  loginPageVue();
}
const loginPageVue = () => "../components/loginPage.js";
const _sfc_main = {
  __name: "myPage",
  setup(__props) {
    const userInfoStore = stores_userInfo.useUserInfoStore();
    const isLoggedIn = common_vendor.computed(() => userInfoStore.isLoggedIn);
    const userInfo = common_vendor.computed(() => userInfoStore.getUserInfo);
    const orderCount = common_vendor.ref(1);
    const applyCount = common_vendor.ref(1);
    const orders = common_vendor.ref([{
      id: 1,
      title: "寻找：优衣库服装销售员",
      status: "实习",
      salary: "4000",
      duration: "3个月",
      description: "本人大学生放假，想兼职，赚点零用钱！放假，想兼职，赚点零用钱！本人大学生放假，想兼职，赚点零用钱！42B880你好",
      contact: "12345678900",
      location: "xx市 xx区 xx街道"
    }, {
      id: 1,
      title: "寻找：优衣库服装销售员",
      status: "实习",
      salary: "4000",
      duration: "3个月",
      description: "本人大学生放假，想兼职，赚点零用钱！放假，想兼职，赚点零用钱！本人大学生放假，想兼职，赚点零用钱！42B880你好",
      contact: "12345678900",
      location: "xx市 xx区 xx街道"
    }, {
      id: 1,
      title: "寻找：优衣库服装销售员",
      status: "实习",
      salary: "4000",
      duration: "3个月",
      description: "本人大学生放假，想兼职，赚点零用钱！放假，想兼职，赚点零用钱！本人大学生放假，想兼职，赚点零用钱！42B880你好",
      contact: "12345678900",
      location: "xx市 xx区 xx街道"
    }]);
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
      if (isLoggedIn.value) {
        try {
          await loadUserData();
        } catch (error) {
          console.error("加载用户数据失败:", error);
          common_vendor.index.showToast({
            title: "数据加载失败",
            icon: "none"
          });
        }
      }
    });
    const loadUserData = async () => {
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
    const viewOrder = () => {
      common_vendor.index.navigateTo({
        url: "/pages/myOrderDetailPage"
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
        f: common_vendor.t(orderCount.value || 1),
        g: common_vendor.t(applyCount.value || 1),
        h: common_vendor.o(navigateToOrders),
        i: common_vendor.f(orders.value, (order, k0, i0) => {
          return {
            a: common_vendor.t(order.title),
            b: common_vendor.t(order.status),
            c: common_vendor.t(order.salary),
            d: common_vendor.t(order.duration),
            e: common_vendor.t(order.description.length > 50 ? order.description.slice(0, 50) + "..." : order.description),
            f: common_vendor.t(order.contact),
            g: common_vendor.t(order.location),
            h: order.id,
            i: common_vendor.o(viewOrder, order.id)
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
            f: common_vendor.o(($event) => viewApplication(item.id), item.id)
          };
        }),
        l: common_assets._imports_0
      }) : {});
    };
  }
};
wx.createPage(_sfc_main);
