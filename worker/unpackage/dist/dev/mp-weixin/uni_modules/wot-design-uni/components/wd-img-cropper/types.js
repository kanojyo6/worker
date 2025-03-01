"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const imgCropperProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 打开图片裁剪组件
   */
  modelValue: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 取消按钮文案
   */
  cancelButtonText: String,
  /**
   * 确认按钮文案
   */
  confirmButtonText: String,
  /**
   * 是否禁用旋转
   */
  disabledRotate: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /** canvas绘图参数 start **/
  /**
   * 目标文件的类型，wx.canvasToTempFilePath属性介绍
   */
  fileType: uni_modules_wotDesignUni_components_common_props.makeStringProp("png"),
  /**
   * 生成的图片质量 wx.canvasToTempFilePath属性介绍
   */
  quality: uni_modules_wotDesignUni_components_common_props.makeNumberProp(1),
  /**
   * 设置导出图片尺寸
   */
  exportScale: uni_modules_wotDesignUni_components_common_props.makeNumberProp(2),
  /** canvas绘图参数 end **/
  /**
   * 图片源路径
   */
  imgSrc: uni_modules_wotDesignUni_components_common_props.makeStringProp(""),
  /**
   * 图片宽
   */
  imgWidth: uni_modules_wotDesignUni_components_common_props.makeNumericProp(""),
  /**
   * 图片高
   */
  imgHeight: uni_modules_wotDesignUni_components_common_props.makeNumericProp(""),
  /**
   * 最大缩放
   */
  maxScale: uni_modules_wotDesignUni_components_common_props.makeNumberProp(3)
};
exports.imgCropperProps = imgCropperProps;
