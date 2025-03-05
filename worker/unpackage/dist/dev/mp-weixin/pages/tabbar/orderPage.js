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
const API_BASE_URL = "http://183.136.206.77:45212";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "orderPage",
  setup(__props) {
    const orderTypeIndex = common_vendor.ref(0);
    const orderTypeArr = ["技术类", "生活类", "家教类", "代办事", "校内兼职", "校外兼职", "实习", "买卖"];
    const recruitmentTypeMap = [
      "TECH",
      "LIFESTYLE",
      "TUTORING",
      "ERRANDS",
      "CAMPUS_JOB",
      "OFF_CAMPUS_JOB",
      "INTERNSHIP",
      "TRADING"
    ];
    const orderChatTypeIndex = common_vendor.ref("微信号");
    const chatTypeMap = ["微信号", "手机号", "电子邮箱"];
    const orderChatTypeMap = {
      "微信号": "WECHAT",
      "手机号": "PHONE",
      "电子邮箱": "EMAIL"
    };
    const orderTitle = common_vendor.ref("");
    const orderContent = common_vendor.ref("");
    const orderSalary = common_vendor.ref("");
    const orderTime = common_vendor.ref("");
    const orderChatNum = common_vendor.ref("");
    const orderAddress = common_vendor.ref("");
    const selectedImageSrc = common_vendor.ref("");
    const orderImage = common_vendor.ref("");
    const imageUrl = common_vendor.ref("");
    const showimgCropper = common_vendor.ref(false);
    const isUploading = common_vendor.ref(false);
    const isSubmitting = common_vendor.ref(false);
    const uploadStatus = common_vendor.ref(false);
    const uploadSuccess = common_vendor.ref(false);
    const uploadStatusText = common_vendor.ref("");
    const getImg = () => {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        success: (res) => {
          console.log("选择图片成功");
          const tempFilePath = res.tempFilePaths[0];
          selectedImageSrc.value = tempFilePath;
          showimgCropper.value = true;
        },
        fail: () => {
          console.log("选择图片失败");
          common_vendor.index.showToast({
            icon: "none",
            title: "选择图片失败"
          });
        }
      });
    };
    const handleConfirm = (event) => {
      console.log("启用裁剪");
      const { tempFilePath } = event;
      orderImage.value = tempFilePath;
      uploadImage(tempFilePath);
    };
    const handleCropCancel = () => {
      console.log("取消裁剪");
      common_vendor.index.showToast({
        icon: "none",
        title: "取消上传图片"
      });
    };
    const uploadImage = (filePath) => {
      isUploading.value = true;
      uploadStatus.value = true;
      uploadStatusText.value = "图片上传中...";
      const token = common_vendor.index.getStorageSync("token");
      if (!token) {
        uploadSuccess.value = false;
        uploadStatusText.value = "未登录，请先登录";
        isUploading.value = false;
        return;
      }
      common_vendor.index.uploadFile({
        url: `${API_BASE_URL}/api/recruitments/upload-image`,
        filePath,
        name: "file",
        header: {
          "Authorization": "Bearer " + token
        },
        success: (uploadRes) => {
          try {
            const data = JSON.parse(uploadRes.data);
            if (uploadRes.statusCode === 200 && data.imageUrl) {
              imageUrl.value = data.imageUrl;
              uploadSuccess.value = true;
              uploadStatusText.value = "图片上传成功";
              common_vendor.index.showToast({
                title: "图片上传成功",
                icon: "success"
              });
            } else {
              uploadSuccess.value = false;
              uploadStatusText.value = data.message || "图片上传失败";
              common_vendor.index.showToast({
                title: data.message || "图片上传失败",
                icon: "none"
              });
            }
          } catch (e) {
            uploadSuccess.value = false;
            uploadStatusText.value = "上传响应解析失败";
            console.error("上传响应解析失败:", e);
          }
        },
        fail: (err) => {
          uploadSuccess.value = false;
          uploadStatusText.value = "图片上传失败，请重试";
          console.error("图片上传失败:", err);
          common_vendor.index.showToast({
            title: "图片上传失败，请重试",
            icon: "none"
          });
        },
        complete: () => {
          isUploading.value = false;
        }
      });
    };
    const handleOrderTypeChange = (event) => {
      console.log("orderType改变：", event.detail.value);
      orderTypeIndex.value = parseInt(event.detail.value);
    };
    const handleChatTypeChange = (event) => {
      console.log("chatType改变：", event.detail.value);
      orderChatTypeIndex.value = event.detail.value;
    };
    const handleSubmit = () => {
      if (!orderTitle.value) {
        common_vendor.index.showToast({ title: "请输入需求标题", icon: "none" });
      }
      if (!orderContent.value) {
        common_vendor.index.showToast({ title: "请输入详细内容", icon: "none" });
      }
      if (!orderSalary.value) {
        common_vendor.index.showToast({ title: "请输入期望薪资", icon: "none" });
      }
      if (!orderChatNum.value) {
        common_vendor.index.showToast({ title: "请输入联系方式", icon: "none" });
      }
      if (!orderAddress.value) {
        common_vendor.index.showToast({ title: "请输入地址信息", icon: "none" });
      }
      if (orderImage.value && !imageUrl.value) {
        if (isUploading.value) {
          common_vendor.index.showToast({ title: "图片上传中，请稍候", icon: "none" });
        } else {
          common_vendor.index.showToast({ title: "图片未上传成功，请重试", icon: "none" });
        }
      }
      if (isSubmitting.value) {
        return;
      }
      isSubmitting.value = true;
      const recruitmentData = {
        title: orderTitle.value,
        content: orderContent.value,
        salary: parseFloat(orderSalary.value) || 0,
        salaryPeriod: orderTime.value,
        imageUrl: imageUrl.value,
        type: recruitmentTypeMap[orderTypeIndex.value],
        location: orderAddress.value,
        contactType: orderChatTypeMap[orderChatTypeIndex.value],
        contactInfo: orderChatNum.value,
        positionCount: 1,
        // 默认招聘人数
        companyName: "个人发布"
        // 可根据需要调整
      };
      console.log("提交的表单数据:", recruitmentData);
      const token = common_vendor.index.getStorageSync("token");
      if (!token) {
        isSubmitting.value = false;
        return common_vendor.index.showModal({
          title: "提示",
          content: "您尚未登录，请先登录",
          success: (res) => {
            if (res.confirm) {
              common_vendor.index.navigateTo({ url: "/pages/login/login" });
            }
          }
        });
      }
      common_vendor.index.request({
        url: `${API_BASE_URL}/api/recruitments`,
        method: "POST",
        data: recruitmentData,
        header: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        success: (res) => {
          var _a;
          if (res.statusCode === 200) {
            common_vendor.index.showToast({
              title: "发布成功",
              icon: "success"
            });
            resetForm();
            setTimeout(() => {
              common_vendor.index.navigateBack();
            }, 1500);
          } else {
            const errorMsg = ((_a = res.data) == null ? void 0 : _a.message) || "发布失败，请重试";
            common_vendor.index.showToast({
              title: errorMsg,
              icon: "none"
            });
          }
        },
        fail: (err) => {
          console.error("发布招聘需求出错:", err);
          common_vendor.index.showToast({
            title: "网络错误，请检查网络后重试",
            icon: "none"
          });
        },
        complete: () => {
          isSubmitting.value = false;
        }
      });
    };
    const resetForm = () => {
      orderTitle.value = "";
      orderContent.value = "";
      orderSalary.value = "";
      orderTime.value = "";
      orderChatNum.value = "";
      orderAddress.value = "";
      orderImage.value = "";
      imageUrl.value = "";
      orderTypeIndex.value = 0;
      uploadStatus.value = false;
    };
    common_vendor.onMounted(() => {
      const token = common_vendor.index.getStorageSync("token");
      if (!token) {
        common_vendor.index.showModal({
          title: "提示",
          content: "发布需求需要先登录，是否前往登录？",
          success: (res) => {
            if (res.confirm) {
              common_vendor.index.navigateTo({ url: "/pages/login/login" });
            } else {
              common_vendor.index.navigateBack();
            }
          }
        });
      }
    });
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
        m: common_vendor.f(chatTypeMap, (item, k0, i0) => {
          return {
            a: item,
            b: item === orderChatTypeIndex.value,
            c: common_vendor.t(item),
            d: item
          };
        }),
        n: common_vendor.o(handleChatTypeChange),
        o: orderChatNum.value,
        p: common_vendor.o(($event) => orderChatNum.value = $event.detail.value),
        q: orderAddress.value,
        r: common_vendor.o(($event) => orderAddress.value = $event.detail.value),
        s: orderImage.value === ""
      }, orderImage.value === "" ? {} : {
        t: orderImage.value
      }, {
        v: common_vendor.o(getImg),
        w: uploadStatus.value
      }, uploadStatus.value ? {
        x: common_vendor.t(uploadStatusText.value),
        y: uploadSuccess.value ? 1 : "",
        z: !uploadSuccess.value ? 1 : ""
      } : {}, {
        A: common_vendor.t(isSubmitting.value ? "发布中..." : "发布"),
        B: isSubmitting.value,
        C: common_vendor.o(handleSubmit),
        D: common_vendor.o(handleConfirm),
        E: common_vendor.o(handleCropCancel),
        F: common_vendor.o(($event) => showimgCropper.value = $event),
        G: common_vendor.p({
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
