"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const iconProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 使用的图标名字，可以使用链接图片
   */
  name: uni_modules_wotDesignUni_components_common_props.makeRequiredProp(String),
  /**
   * 图标的颜色
   */
  color: String,
  /**
   * 图标的字体大小
   */
  size: String,
  /**
   * 类名前缀，用于使用自定义图标
   */
  classPrefix: uni_modules_wotDesignUni_components_common_props.makeStringProp("wd-icon")
};
exports.iconProps = iconProps;
