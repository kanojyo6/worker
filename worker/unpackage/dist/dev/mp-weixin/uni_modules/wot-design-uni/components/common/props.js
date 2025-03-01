"use strict";
const numericProp = [Number, String];
const makeRequiredProp = (type) => ({
  type,
  required: true
});
const makeBooleanProp = (defaultVal) => ({
  type: Boolean,
  default: defaultVal
});
const makeNumberProp = (defaultVal) => ({
  type: Number,
  default: defaultVal
});
const makeNumericProp = (defaultVal) => ({
  type: numericProp,
  default: defaultVal
});
const makeStringProp = (defaultVal) => ({
  type: String,
  default: defaultVal
});
const baseProps = {
  /**
   * 自定义根节点样式
   */
  customStyle: makeStringProp(""),
  /**
   * 自定义根节点样式类
   */
  customClass: makeStringProp("")
};
exports.baseProps = baseProps;
exports.makeBooleanProp = makeBooleanProp;
exports.makeNumberProp = makeNumberProp;
exports.makeNumericProp = makeNumericProp;
exports.makeRequiredProp = makeRequiredProp;
exports.makeStringProp = makeStringProp;
