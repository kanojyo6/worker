"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "homePage",
  setup(__props) {
    const searchText = common_vendor.ref("");
    const imageUrl = [
      "/static/logos/home_icon_tech.png",
      "/static/logos/home_icon_life.png",
      "/static/logos/home_icon_teacher.png",
      "/static/logos/home_icon_standby.png",
      "/static/logos/home_icon_schoolin.png",
      "/static/logos/home_icon_schoolout.png",
      "/static/logos/hoem_icon_practice.png",
      "/static/logos/hoem_icon_buy.png"
    ];
    const navigateToTypeDetail = () => {
      common_vendor.index.navigateTo({
        url: "/pages/typeDetailPage",
        animationType: "pop-in"
      });
    };
    const navigateToOrderDetail = () => {
      common_vendor.index.navigateTo({
        url: "/pages/orderDetailPage",
        animationType: "pop-in"
      });
    };
    const navigateToAddOrder = () => {
      common_vendor.index.switchTab({
        url: "/pages/tabbar/orderPage"
      });
    };
    const recommendData = common_vendor.ref([
      {
        orderId: 1,
        orderTitle: "万达优衣库招人",
        orderSalary: 100,
        orderTime: "6个月",
        orderImgUrl: "",
        orderDescription: "111111111",
        orderStatus: 0,
        orderCategory: "校外兼职"
      },
      {
        orderId: 1,
        orderTitle: "万达优衣库招人",
        orderSalary: 100,
        orderTime: "6个月",
        orderImgUrl: "",
        orderDescription: "111111111",
        orderStatus: 0,
        orderCategory: "校外兼职"
      },
      {
        orderId: 1,
        orderTitle: "万达优衣库招人",
        orderSalary: 100,
        orderTime: "6个月",
        orderImgUrl: "",
        orderDescription: "111111111",
        orderStatus: 0,
        orderCategory: "校外兼职"
      },
      {
        orderId: 1,
        orderTitle: "万达优衣库招人",
        orderSalary: 100,
        orderTime: "6个月",
        orderImgUrl: "",
        orderDescription: "111111111",
        orderStatus: 0,
        orderCategory: "校外兼职"
      },
      {
        orderId: 1,
        orderTitle: "万达优衣库招人",
        orderSalary: 100,
        orderTime: "6个月",
        orderImgUrl: "",
        orderDescription: "111111111",
        orderStatus: 0,
        orderCategory: "校外兼职"
      },
      {
        orderId: 1,
        orderTitle: "万达优衣库招人",
        orderSalary: 100,
        orderTime: "6个月",
        orderImgUrl: "",
        orderDescription: "111111111",
        orderStatus: 0,
        orderCategory: "校外兼职"
      },
      {
        orderId: 1,
        orderTitle: "万达优衣库招人",
        orderSalary: 100,
        orderTime: "6个月",
        orderImgUrl: "",
        orderDescription: "111111111",
        orderStatus: 0,
        orderCategory: "校外兼职"
      }
    ]);
    return (_ctx, _cache) => {
      return {
        a: searchText.value,
        b: common_vendor.o(($event) => searchText.value = $event.detail.value),
        c: common_vendor.o(navigateToAddOrder),
        d: common_vendor.f(imageUrl, (item, k0, i0) => {
          return {
            a: item
          };
        }),
        e: common_vendor.o(navigateToTypeDetail),
        f: common_vendor.f(recommendData.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.orderImgUrl == ""
          }, item.orderImgUrl == "" ? {} : {
            b: item.orderImgUrl
          }, {
            c: common_vendor.t(item.orderTitle),
            d: common_vendor.t(item.orderTime)
          });
        }),
        g: common_vendor.o(navigateToOrderDetail)
      };
    };
  }
});
wx.createPage(_sfc_main);
