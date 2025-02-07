"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "orderPage",
  setup(__props) {
    const orderTypeIndex = common_vendor.ref(0);
    const orderTypeArr = ["技术类", "生活类", "家教类", "代办事", "校内兼职", "校外兼职", "实习", "买卖"];
    const orderTitle = common_vendor.ref("");
    const orderContent = common_vendor.ref("");
    const orderSalary = common_vendor.ref("");
    const orderTime = common_vendor.ref("");
    const orderChatNum = common_vendor.ref();
    const orderAddress = common_vendor.ref("");
    const orderImage = common_vendor.ref();
    const getImg = () => {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: "compressed",
        success: (res) => {
          console.log("选择图片成功");
          orderImage.value = res.tempFilePaths;
        },
        fail() {
          console.log("选择图片失败");
        },
        complete() {
          console.log("结束");
        }
      });
    };
    const handleOrderTypeChange = (event) => {
      console.log("orderType改变：", event.detail.value);
      orderTypeIndex.value = event.detail.value;
    };
    const handleSubmit = (event) => {
      console.log("form发生了提交事件，携带数据为: " + JSON.stringify(event.detail.value));
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(orderTypeArr[orderTypeIndex.value]),
        b: common_vendor.o(handleOrderTypeChange),
        c: orderTypeIndex.value,
        d: orderTypeArr,
        e: orderTitle.value,
        f: common_vendor.o(($event) => orderTitle.value = $event.detail.value),
        g: orderContent.value,
        h: common_vendor.o(($event) => orderContent.value = $event.detail.value),
        i: orderSalary.value,
        j: common_vendor.o(($event) => orderSalary.value = $event.detail.value),
        k: orderTime.value,
        l: common_vendor.o(($event) => orderTime.value = $event.detail.value),
        m: orderChatNum.value,
        n: common_vendor.o(($event) => orderChatNum.value = $event.detail.value),
        o: orderAddress.value,
        p: common_vendor.o(($event) => orderAddress.value = $event.detail.value),
        q: orderImage.value === null
      }, orderImage.value === null ? {} : {
        r: orderImage.value
      }, {
        s: common_vendor.o(getImg),
        t: common_vendor.o(handleSubmit)
      });
    };
  }
});
wx.createPage(_sfc_main);
