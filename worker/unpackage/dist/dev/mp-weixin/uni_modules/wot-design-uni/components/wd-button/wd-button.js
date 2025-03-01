"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_base64 = require("../common/base64.js");
const uni_modules_wotDesignUni_components_wdButton_types = require("./types.js");
if (!Math) {
  wdIcon();
}
const wdIcon = () => "../wd-icon/wd-icon.js";
const __default__ = {
  name: "wd-button",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdButton_types.buttonProps,
  emits: [
    "click",
    "getuserinfo",
    "contact",
    "getphonenumber",
    "error",
    "launchapp",
    "opensetting",
    "chooseavatar",
    "agreeprivacyauthorization"
  ],
  setup(__props, { emit: __emit }) {
    const loadingIcon = (color = "#4D80F0", reverse = true) => {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42"><defs><linearGradient x1="100%" y1="0%" x2="0%" y2="0%" id="a"><stop stop-color="${reverse ? color : "#fff"}" offset="0%" stop-opacity="0"/><stop stop-color="${reverse ? color : "#fff"}" offset="100%"/></linearGradient></defs><g fill="none" fill-rule="evenodd"><path d="M21 1c11.046 0 20 8.954 20 20s-8.954 20-20 20S1 32.046 1 21 9.954 1 21 1zm0 7C13.82 8 8 13.82 8 21s5.82 13 13 13 13-5.82 13-13S28.18 8 21 8z" fill="${reverse ? "#fff" : color}"/><path d="M4.599 21c0 9.044 7.332 16.376 16.376 16.376 9.045 0 16.376-7.332 16.376-16.376" stroke="url(#a)" stroke-width="3.5" stroke-linecap="round"/></g></svg>`;
    };
    const props = __props;
    const emit = __emit;
    const hoverStartTime = common_vendor.ref(20);
    const hoverStayTime = common_vendor.ref(70);
    const loadingIconSvg = common_vendor.ref("");
    const loadingStyle = common_vendor.computed(() => {
      return `background-image: url(${loadingIconSvg.value});`;
    });
    common_vendor.watch(
      () => props.loading,
      () => {
        buildLoadingSvg();
      },
      { deep: true, immediate: true }
    );
    function handleClick(event) {
      if (!props.disabled && !props.loading) {
        emit("click", event);
      }
    }
    function handleGetAuthorize(event) {
      if (props.scope === "phoneNumber") {
        handleGetphonenumber(event);
      } else if (props.scope === "userInfo") {
        handleGetuserinfo(event);
      }
    }
    function handleGetuserinfo(event) {
      emit("getuserinfo", event.detail);
    }
    function handleConcat(event) {
      emit("contact", event.detail);
    }
    function handleGetphonenumber(event) {
      emit("getphonenumber", event.detail);
    }
    function handleError(event) {
      emit("error", event.detail);
    }
    function handleLaunchapp(event) {
      emit("launchapp", event.detail);
    }
    function handleOpensetting(event) {
      emit("opensetting", event.detail);
    }
    function handleChooseavatar(event) {
      emit("chooseavatar", event.detail);
    }
    function handleAgreePrivacyAuthorization(event) {
      emit("agreeprivacyauthorization", event.detail);
    }
    function buildLoadingSvg() {
      const { loadingColor, type, plain } = props;
      let color = loadingColor;
      if (!color) {
        switch (type) {
          case "primary":
            color = "#4D80F0";
            break;
          case "success":
            color = "#34d19d";
            break;
          case "info":
            color = "#333";
            break;
          case "warning":
            color = "#f0883a";
            break;
          case "error":
            color = "#fa4350";
            break;
          case "default":
            color = "#333";
            break;
        }
      }
      const svg = loadingIcon(color, !plain);
      loadingIconSvg.value = `"data:image/svg+xml;base64,${uni_modules_wotDesignUni_components_common_base64.encode(svg)}"`;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.loading
      }, _ctx.loading ? {
        b: common_vendor.s(loadingStyle.value)
      } : _ctx.icon ? {
        d: common_vendor.p({
          ["custom-class"]: "wd-button__icon",
          name: _ctx.icon,
          classPrefix: _ctx.classPrefix
        })
      } : {}, {
        c: _ctx.icon,
        e: _ctx.buttonId,
        f: `${_ctx.disabled || _ctx.loading ? "" : "wd-button--active"}`,
        g: common_vendor.s(_ctx.customStyle),
        h: common_vendor.n("is-" + _ctx.type),
        i: common_vendor.n("is-" + _ctx.size),
        j: common_vendor.n(_ctx.round ? "is-round" : ""),
        k: common_vendor.n(_ctx.hairline ? "is-hairline" : ""),
        l: common_vendor.n(_ctx.plain ? "is-plain" : ""),
        m: common_vendor.n(_ctx.disabled ? "is-disabled" : ""),
        n: common_vendor.n(_ctx.block ? "is-block" : ""),
        o: common_vendor.n(_ctx.loading ? "is-loading" : ""),
        p: common_vendor.n(_ctx.customClass),
        q: hoverStartTime.value,
        r: hoverStayTime.value,
        s: _ctx.disabled || _ctx.loading ? void 0 : _ctx.openType,
        t: _ctx.sendMessageTitle,
        v: _ctx.sendMessagePath,
        w: _ctx.sendMessageImg,
        x: _ctx.appParameter,
        y: _ctx.showMessageCard,
        z: _ctx.sessionFrom,
        A: _ctx.lang,
        B: _ctx.hoverStopPropagation,
        C: _ctx.scope,
        D: common_vendor.o(handleClick),
        E: common_vendor.o(handleGetAuthorize),
        F: common_vendor.o(handleGetuserinfo),
        G: common_vendor.o(handleConcat),
        H: common_vendor.o(handleGetphonenumber),
        I: common_vendor.o(handleError),
        J: common_vendor.o(handleLaunchapp),
        K: common_vendor.o(handleOpensetting),
        L: common_vendor.o(handleChooseavatar),
        M: common_vendor.o(handleAgreePrivacyAuthorization)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d858c170"]]);
wx.createComponent(Component);
