"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_composables_useTranslate = require("../composables/useTranslate.js");
const uni_modules_wotDesignUni_components_wdImgCropper_types = require("./types.js");
if (!Math) {
  (wdIcon + wdButton)();
}
const wdIcon = () => "../wd-icon/wd-icon.js";
const wdButton = () => "../wd-button/wd-button.js";
const __default__ = {
  name: "wd-img-cropper",
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdImgCropper_types.imgCropperProps,
  emits: ["imgloaded", "imgloaderror", "cancel", "confirm", "update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {
    let CHANGE_TIME = null;
    let MOVE_THROTTLE = null;
    let MOVE_THROTTLE_FLAG = true;
    let INIT_IMGWIDTH = null;
    let INIT_IMGHEIGHT = null;
    const TOP_PERCENT = 0.85;
    const props = __props;
    const emit = __emit;
    const { translate } = uni_modules_wotDesignUni_components_composables_useTranslate.useTranslate("img-cropper");
    const imgAngle = common_vendor.ref(0);
    const isAnimation = common_vendor.ref(false);
    const picWidth = common_vendor.ref(0);
    const picHeight = common_vendor.ref(0);
    const cutWidth = common_vendor.ref(0);
    const cutHeight = common_vendor.ref(0);
    const offset = common_vendor.ref(20);
    const cutLeft = common_vendor.ref(0);
    const cutTop = common_vendor.ref(0);
    const canvasWidth = common_vendor.ref("");
    const canvasHeight = common_vendor.ref("");
    const canvasScale = common_vendor.ref(2);
    const imgScale = common_vendor.ref(1);
    const imgLeft = common_vendor.ref(common_vendor.index.getSystemInfoSync().windowWidth / 2);
    const imgTop = common_vendor.ref(common_vendor.index.getSystemInfoSync().windowHeight / 2 * TOP_PERCENT);
    const imgInfo = common_vendor.ref(null);
    const info = common_vendor.ref(common_vendor.index.getSystemInfoSync());
    const IS_TOUCH_END = common_vendor.ref(true);
    const movingPosRecord = common_vendor.ref([
      {
        x: "",
        y: ""
      },
      {
        x: "",
        y: ""
      }
    ]);
    const fingerDistance = common_vendor.ref("");
    const ctx = common_vendor.ref(null);
    const { proxy } = common_vendor.getCurrentInstance();
    common_vendor.watch(
      () => props.modelValue,
      (newValue) => {
        if (newValue) {
          INIT_IMGWIDTH = props.imgWidth;
          INIT_IMGHEIGHT = props.imgHeight;
          info.value = common_vendor.index.getSystemInfoSync();
          const tempCutSize = info.value.windowWidth - offset.value * 2;
          cutWidth.value = tempCutSize;
          cutHeight.value = tempCutSize;
          cutTop.value = (info.value.windowHeight * TOP_PERCENT - tempCutSize) / 2;
          cutLeft.value = offset.value;
          canvasScale.value = props.exportScale;
          canvasHeight.value = tempCutSize;
          canvasWidth.value = tempCutSize;
          initImageSize();
          initCanvas();
          props.imgSrc && loadImg();
        } else {
          resetImg();
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.watch(
      () => props.imgSrc,
      (newValue) => {
        newValue && loadImg();
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.watch(
      () => imgAngle.value,
      (newValue) => {
        if (newValue % 90) {
          imgAngle.value = Math.round(newValue / 90) * 90;
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    common_vendor.watch(
      () => isAnimation.value,
      (newValue) => {
        CHANGE_TIME && clearTimeout(CHANGE_TIME);
        if (newValue) {
          CHANGE_TIME = setTimeout(() => {
            revertIsAnimation(false);
            clearTimeout(CHANGE_TIME);
          }, 300);
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    const buttonStyle = common_vendor.computed(() => {
      const style = {
        position: "absolute",
        right: 0,
        // height: 32px;
        width: "56px",
        "border-radius": "16px",
        "font-size": "16px"
      };
      return uni_modules_wotDesignUni_components_common_util.objToStyle(style);
    });
    const imageStyle = common_vendor.computed(() => {
      const style = {
        width: picWidth.value ? uni_modules_wotDesignUni_components_common_util.addUnit(picWidth.value) : "auto",
        height: picHeight.value ? uni_modules_wotDesignUni_components_common_util.addUnit(picHeight.value) : "auto",
        transform: `translate(${uni_modules_wotDesignUni_components_common_util.addUnit(imgLeft.value - picWidth.value / 2)}, ${uni_modules_wotDesignUni_components_common_util.addUnit(imgTop.value - picHeight.value / 2)}) scale(${imgScale.value}) rotate(${imgAngle.value}deg)`,
        "transition-duration": (isAnimation.value ? 0.4 : 0) + "s"
      };
      return uni_modules_wotDesignUni_components_common_util.objToStyle(style);
    });
    function revertIsAnimation(animation) {
      isAnimation.value = animation;
    }
    function setRoate(angle) {
      if (!angle || props.disabledRotate)
        return;
      revertIsAnimation(true);
      imgAngle.value = angle;
      detectImgPosIsEdge();
    }
    function resetImg() {
      const { windowHeight, windowWidth } = common_vendor.index.getSystemInfoSync();
      imgScale.value = 1;
      imgAngle.value = 0;
      imgLeft.value = windowWidth / 2;
      imgTop.value = windowHeight / 2 * TOP_PERCENT;
    }
    function loadImg() {
      if (!props.imgSrc)
        return;
      common_vendor.index.getImageInfo({
        src: props.imgSrc,
        success: (res) => {
          imgInfo.value = res;
          computeImgSize();
          resetImg();
        },
        fail: () => {
        }
      });
    }
    function computeImgSize() {
      let tempPicWidth = picWidth.value;
      let tempPicHeight = picHeight.value;
      if (!INIT_IMGHEIGHT && !INIT_IMGWIDTH) {
        tempPicWidth = imgInfo.value.width;
        tempPicHeight = imgInfo.value.height;
        if (picWidth.value / picHeight.value > cutWidth.value / cutHeight.value) {
          tempPicHeight = cutHeight.value;
          tempPicWidth = imgInfo.value.width / imgInfo.value.height * cutHeight.value;
        } else {
          tempPicWidth = cutWidth.value;
          tempPicHeight = imgInfo.value.height / imgInfo.value.width * cutWidth.value;
        }
      } else if (INIT_IMGHEIGHT && !INIT_IMGWIDTH) {
        tempPicWidth = imgInfo.value.width / imgInfo.value.height * Number(INIT_IMGHEIGHT);
      } else if (!INIT_IMGHEIGHT && INIT_IMGWIDTH || INIT_IMGHEIGHT && INIT_IMGWIDTH) {
        tempPicHeight = imgInfo.value.height / imgInfo.value.width * Number(INIT_IMGWIDTH);
      }
      picWidth.value = tempPicWidth;
      picHeight.value = tempPicHeight;
    }
    function initCanvas() {
      if (!ctx.value) {
        ctx.value = common_vendor.index.createCanvasContext("wd-img-cropper-canvas", proxy);
      }
    }
    function initImageSize() {
      if (INIT_IMGWIDTH && typeof INIT_IMGWIDTH === "string" && INIT_IMGWIDTH.indexOf("%") !== -1) {
        const width = INIT_IMGWIDTH.replace("%", "");
        INIT_IMGWIDTH = info.value.windowWidth / 100 * Number(width);
        picWidth.value = INIT_IMGWIDTH;
      } else if (INIT_IMGWIDTH && typeof INIT_IMGWIDTH === "number") {
        picWidth.value = INIT_IMGWIDTH;
      }
      if (INIT_IMGHEIGHT && typeof INIT_IMGHEIGHT === "string" && INIT_IMGHEIGHT.indexOf("%") !== -1) {
        const height = props.imgHeight.replace("%", "");
        INIT_IMGHEIGHT = info.value.windowHeight / 100 * Number(height);
        picWidth.value = INIT_IMGHEIGHT;
      } else if (INIT_IMGHEIGHT && typeof INIT_IMGHEIGHT === "number") {
        picWidth.value = Number(INIT_IMGWIDTH);
      }
    }
    function detectImgPosIsEdge(scale) {
      const currentScale = scale || imgScale.value;
      let currentImgLeft = imgLeft.value;
      let currentImgTop = imgTop.value;
      let currentPicWidth = picWidth.value;
      let currentPicHeight = picHeight.value;
      if (imgAngle.value / 90 % 2) {
        currentPicWidth = picHeight.value;
        currentPicHeight = picWidth.value;
      }
      currentImgLeft = currentPicWidth * currentScale / 2 + cutLeft.value >= currentImgLeft ? currentImgLeft : currentPicWidth * imgScale.value / 2 + cutLeft.value;
      currentImgLeft = cutLeft.value + cutWidth.value - currentPicWidth * currentScale / 2 <= currentImgLeft ? currentImgLeft : cutLeft.value + cutWidth.value - currentPicWidth * currentScale / 2;
      currentImgTop = currentPicHeight * currentScale / 2 + cutTop.value >= currentImgTop ? currentImgTop : currentPicHeight * currentScale / 2 + cutTop.value;
      currentImgTop = cutTop.value + cutHeight.value - currentPicHeight * currentScale / 2 <= currentImgTop ? currentImgTop : cutTop.value + cutHeight.value - currentPicHeight * currentScale / 2;
      imgScale.value = currentScale;
      imgTop.value = currentImgTop;
      imgLeft.value = currentImgLeft;
    }
    function detectImgScaleIsEdge() {
      let tempPicWidth = picWidth.value;
      let tempPicHeight = picHeight.value;
      let tempImgScale = imgScale.value;
      if (imgAngle.value / 90 % 2) {
        tempPicWidth = picHeight.value;
        tempPicHeight = picWidth.value;
      }
      if (tempPicWidth * tempImgScale < cutWidth.value) {
        tempImgScale = cutWidth.value / tempPicWidth;
      }
      if (tempPicHeight * tempImgScale < cutHeight.value) {
        tempImgScale = cutHeight.value / tempPicHeight;
      }
      detectImgPosIsEdge(tempImgScale);
    }
    function throttle() {
      if (info.value.platform === "android") {
        MOVE_THROTTLE && clearTimeout(MOVE_THROTTLE);
        MOVE_THROTTLE = setTimeout(() => {
          MOVE_THROTTLE_FLAG = true;
        }, 1e3 / 40);
      } else {
        !MOVE_THROTTLE_FLAG && (MOVE_THROTTLE_FLAG = true);
      }
    }
    function handleImgTouchStart(event) {
      IS_TOUCH_END.value = false;
      if (event.touches.length === 1) {
        movingPosRecord.value[0] = {
          x: event.touches[0].clientX - imgLeft.value,
          y: event.touches[0].clientY - imgTop.value
        };
      } else {
        const width = Math.abs(event.touches[1].clientX - event.touches[0].clientX);
        const height = Math.abs(event.touches[1].clientY - event.touches[0].clientY);
        fingerDistance.value = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
      }
    }
    function handleImgTouchMove(event) {
      if (IS_TOUCH_END.value || !MOVE_THROTTLE_FLAG)
        return;
      throttle();
      if (event.touches.length === 1) {
        const { x, y } = movingPosRecord.value[0];
        const left = event.touches[0].clientX - Number(x);
        const top = event.touches[0].clientY - Number(y);
        imgLeft.value = left;
        imgTop.value = top;
        detectImgPosIsEdge();
      } else {
        const width = Math.abs(event.touches[1].clientX - event.touches[0].clientX);
        const height = Math.abs(event.touches[1].clientY - event.touches[0].clientY);
        const hypotenuse = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
        const scale = imgScale.value * (hypotenuse / Number(fingerDistance.value));
        imgScale.value = Math.min(scale, props.maxScale);
        detectImgScaleIsEdge();
        fingerDistance.value = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
      }
    }
    function handleImgTouchEnd() {
      IS_TOUCH_END.value = true;
    }
    function handleImgLoaded(res) {
      emit("imgloaded", res);
    }
    function handleImgLoadError(err) {
      emit("imgloaderror", err);
    }
    function handleRotate() {
      setRoate(imgAngle.value - 90);
    }
    function handleCancel() {
      emit("cancel");
      emit("update:modelValue", false);
    }
    function handleConfirm() {
      draw();
    }
    function canvasToImage() {
      const { fileType, quality, exportScale } = props;
      common_vendor.index.canvasToTempFilePath(
        {
          width: cutWidth.value * exportScale,
          height: Math.round(cutHeight.value * exportScale),
          destWidth: cutWidth.value * exportScale,
          destHeight: Math.round(cutHeight.value * exportScale),
          fileType,
          quality,
          canvasId: "wd-img-cropper-canvas",
          success: (res) => {
            const result = { tempFilePath: res.tempFilePath, width: cutWidth.value * exportScale, height: cutHeight.value * exportScale };
            emit("confirm", result);
          },
          complete: () => {
            emit("update:modelValue", false);
          }
        },
        proxy
      );
    }
    function draw() {
      if (!props.imgSrc)
        return;
      const draw2 = () => {
        const width = picWidth.value * imgScale.value * props.exportScale;
        const height = picHeight.value * imgScale.value * props.exportScale;
        const x = imgLeft.value - cutLeft.value;
        const y = imgTop.value - cutTop.value;
        ctx.value.translate(x * props.exportScale, y * props.exportScale);
        if (!props.disabledRotate) {
          ctx.value.rotate(imgAngle.value * Math.PI / 180);
        }
        ctx.value.drawImage(props.imgSrc, -width / 2, -height / 2, width, height);
        ctx.value.restore();
        ctx.value.draw(false, () => {
          canvasToImage();
        });
      };
      canvasHeight.value = cutHeight.value;
      canvasWidth.value = cutWidth.value;
      draw2();
    }
    function preventTouchMove() {
    }
    __expose({
      revertIsAnimation,
      setRoate,
      resetImg
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.modelValue
      }, _ctx.modelValue ? common_vendor.e({
        b: common_vendor.n(`wd-img-cropper__cut--top ${IS_TOUCH_END.value ? "" : "is-hightlight"}`),
        c: common_vendor.s(`height: ${cutTop.value}px;`),
        d: common_vendor.n(`wd-img-cropper__cut--left ${IS_TOUCH_END.value ? "" : "is-hightlight"}`),
        e: common_vendor.s(`width: ${cutLeft.value}px; height: ${cutWidth.value}px;`),
        f: common_vendor.s(`width: ${cutWidth.value}px; height: ${cutHeight.value}px;`),
        g: common_vendor.n(`wd-img-cropper__cut--right ${IS_TOUCH_END.value ? "" : "is-hightlight"}`),
        h: common_vendor.n(`wd-img-cropper__cut--bottom ${IS_TOUCH_END.value ? "" : "is-hightlight"}`),
        i: isAnimation.value,
        j: _ctx.imgSrc,
        k: common_vendor.s(imageStyle.value),
        l: common_vendor.o(handleImgTouchStart),
        m: common_vendor.o(handleImgTouchMove),
        n: common_vendor.o(handleImgTouchEnd),
        o: common_vendor.o(handleImgLoadError),
        p: common_vendor.o(handleImgLoaded),
        q: common_vendor.s(`width: ${Number(canvasWidth.value) * canvasScale.value}px; height: ${Number(canvasHeight.value) * canvasScale.value}px;`),
        r: !_ctx.disabledRotate
      }, !_ctx.disabledRotate ? {
        s: common_vendor.o(handleRotate),
        t: common_vendor.p({
          ["custom-class"]: "wd-img-cropper__rotate",
          name: "rotate"
        })
      } : {}, {
        v: common_vendor.t(_ctx.cancelButtonText || common_vendor.unref(translate)("cancel")),
        w: common_vendor.o(handleCancel),
        x: common_vendor.t(_ctx.confirmButtonText || common_vendor.unref(translate)("confirm")),
        y: common_vendor.o(handleConfirm),
        z: common_vendor.p({
          size: "small",
          ["custom-style"]: buttonStyle.value
        }),
        A: common_vendor.n(`wd-img-cropper ${_ctx.customClass}`),
        B: common_vendor.s(_ctx.customStyle),
        C: common_vendor.o(preventTouchMove)
      }) : {});
    };
  }
});
const block0 = (Component2) => {
  if (!Component2.wxsCallMethods) {
    Component2.wxsCallMethods = [];
  }
  Component2.wxsCallMethods.push("revertIsAnimation");
};
if (typeof block0 === "function")
  block0(_sfc_main);
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dc21a62d"]]);
wx.createComponent(Component);
