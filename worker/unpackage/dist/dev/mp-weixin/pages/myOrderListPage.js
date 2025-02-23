"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "myOrderListPage",
  setup(__props) {
    common_vendor.ref(1);
    common_vendor.ref(1);
    const orders = common_vendor.ref([{
      id: 1,
      title: "寻找：优衣库服装销售员",
      status: "实习",
      salary: "4000",
      duration: "3个月",
      description: "本人大学生放假，想兼职，赚点零用钱！放假，想兼职，赚点零用钱！本人大学生放假，想兼职，赚点零用钱！42B880你好点零用钱！本人大学生放假，想兼职，赚点零用钱！42B880你好",
      contact: "12345678900",
      location: "xx市 xx区 xx街道"
    }]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(orders.value, (order, k0, i0) => {
          return {
            a: common_vendor.t(order.title),
            b: common_vendor.t(order.status),
            c: common_vendor.t(order.salary),
            d: common_vendor.t(order.duration),
            e: common_vendor.t(order.description.length > 70 ? order.description.slice(0, 70) + "..." : order.description),
            f: common_vendor.t(order.contact),
            g: common_vendor.t(order.location),
            h: order.id
          };
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
