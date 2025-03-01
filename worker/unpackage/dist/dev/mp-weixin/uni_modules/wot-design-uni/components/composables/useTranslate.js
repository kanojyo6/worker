"use strict";
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_locale_index = require("../../locale/index.js");
const useTranslate = (name) => {
  const prefix = name ? uni_modules_wotDesignUni_components_common_util.camelCase(name) + "." : "";
  const translate = (key, ...args) => {
    const currentMessages = uni_modules_wotDesignUni_locale_index.Locale.messages();
    const message = uni_modules_wotDesignUni_components_common_util.getPropByPath(currentMessages, prefix + key);
    return uni_modules_wotDesignUni_components_common_util.isFunction(message) ? message(...args) : message;
  };
  return { translate };
};
exports.useTranslate = useTranslate;
