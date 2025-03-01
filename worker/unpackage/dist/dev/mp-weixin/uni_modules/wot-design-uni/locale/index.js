"use strict";
const common_vendor = require("../../../common/vendor.js");
const uni_modules_wotDesignUni_locale_lang_zhCN = require("./lang/zh-CN.js");
const uni_modules_wotDesignUni_components_common_util = require("../components/common/util.js");
const lang = common_vendor.ref("zh-CN");
const messages = common_vendor.reactive({
  "zh-CN": uni_modules_wotDesignUni_locale_lang_zhCN.zhCN
});
const Locale = {
  messages() {
    return messages[lang.value];
  },
  use(newLang, newMessage) {
    lang.value = newLang;
    if (newMessage) {
      this.add({ [newLang]: newMessage });
    }
  },
  add(newMessages = {}) {
    uni_modules_wotDesignUni_components_common_util.deepAssign(messages, newMessages);
  }
};
exports.Locale = Locale;
