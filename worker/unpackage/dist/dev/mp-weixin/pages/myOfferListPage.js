"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "myOfferListPage",
  setup(__props) {
    common_vendor.ref(1);
    common_vendor.ref(1);
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
    const viewApplication = () => {
      common_vendor.index.navigateTo({ url: `/pages/myOfferDetailPage` });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(applications.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.price),
            c: common_vendor.t(item.duration),
            d: common_vendor.t(item.location),
            e: item.id,
            f: common_vendor.o(($event) => viewApplication(item.id), item.id)
          };
        }),
        b: common_assets._imports_0
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-feb72d08"]]);
wx.createPage(MiniProgramPage);
