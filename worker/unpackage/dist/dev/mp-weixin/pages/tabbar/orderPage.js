"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_wd_img_cropper2 = common_vendor.resolveComponent("wd-img-cropper");
  _easycom_wd_img_cropper2();
}
const _easycom_wd_img_cropper = () => "../../uni_modules/wot-design-uni/components/wd-img-cropper/wd-img-cropper.js";
if (!Math) {
  _easycom_wd_img_cropper();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "orderPage",
  setup(__props) {
    const orderTypeIndex = common_vendor.ref(0);
    const orderTypeArr = ["技术类", "生活类", "家教类", "代办事", "校内兼职", "校外兼职", "实习", "买卖"];
    const orderTitle = common_vendor.ref("");
    const orderContent = common_vendor.ref("");
    const orderSalary = common_vendor.ref("");
    const orderTime = common_vendor.ref("");
    const orderChatTypeList = ["微信号", "手机号", "电子邮箱"];
    const orderChatType = common_vendor.ref(0);
    const orderChatNum = common_vendor.ref("");
    const orderAddress = common_vendor.ref("");
    const selectedImageSrc = common_vendor.ref("");
    const orderImage = common_vendor.ref("");
    const showimgCropper = common_vendor.ref(false);
    const getImg = () => {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: "compressed",
        success: (res) => {
          console.log("选择图片成功");
          const tempFilePath = res.tempFilePaths[0];
          selectedImageSrc.value = tempFilePath;
          showimgCropper.value = true;
        },
        fail() {
          console.log("选择图片失败");
        },
        complete() {
          console.log("结束");
        }
      });
    };
    const handleConfirm = (event) => {
      console.log("启用裁剪");
      const { tempFilePath } = event;
      orderImage.value = tempFilePath;
    };
    const handleCropCancel = (event) => {
      console.log("取消裁剪");
      common_vendor.index.showToast({
        icon: "none",
        title: "取消上传图片"
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
        m: common_vendor.f(orderChatTypeList, (item, index, i0) => {
          return {
            a: item,
            b: index === orderChatType.value
          };
        }),
        n: orderChatNum.value,
        o: common_vendor.o(($event) => orderChatNum.value = $event.detail.value),
        p: orderAddress.value,
        q: common_vendor.o(($event) => orderAddress.value = $event.detail.value),
        r: orderImage.value === ""
      }, orderImage.value === "" ? {} : {
        s: orderImage.value
      }, {
        t: common_vendor.o(getImg),
        v: common_vendor.o(handleSubmit),
        w: common_vendor.o(handleConfirm),
        x: common_vendor.o(handleCropCancel),
        y: common_vendor.o(($event) => showimgCropper.value = $event),
        z: common_vendor.p({
          ["img-src"]: selectedImageSrc.value,
          ["img-width"]: 600,
          ["img-height"]: 600,
          modelValue: showimgCropper.value
        })
      });
    };
  }
});
wx.createPage(_sfc_main);
