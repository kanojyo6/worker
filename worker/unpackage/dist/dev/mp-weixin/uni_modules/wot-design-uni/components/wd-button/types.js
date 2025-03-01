"use strict";
const uni_modules_wotDesignUni_components_common_props = require("../common/props.js");
const buttonProps = {
  ...uni_modules_wotDesignUni_components_common_props.baseProps,
  /**
   * 幽灵按钮
   */
  plain: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 圆角按钮
   */
  round: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(true),
  /**
   * 禁用按钮
   */
  disabled: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 是否细边框
   */
  hairline: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 块状按钮
   */
  block: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 按钮类型，可选值：primary / success / info / warning / error / text / icon
   */
  type: uni_modules_wotDesignUni_components_common_props.makeStringProp("primary"),
  /**
   * 按钮尺寸，可选值：small / medium / large
   */
  size: uni_modules_wotDesignUni_components_common_props.makeStringProp("medium"),
  /**
   * 图标类名
   */
  icon: String,
  /**
   * 类名前缀，用于使用自定义图标，用法参考Icon组件
   */
  classPrefix: uni_modules_wotDesignUni_components_common_props.makeStringProp("wd-icon"),
  /**
   * 加载中按钮
   */
  loading: uni_modules_wotDesignUni_components_common_props.makeBooleanProp(false),
  /**
   * 加载图标颜色
   */
  loadingColor: String,
  /**
   * 开放能力
   */
  openType: String,
  /**
   * 指定是否阻止本节点的祖先节点出现点击态
   */
  hoverStopPropagation: Boolean,
  /**
   * 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文
   */
  lang: String,
  /**
   * 会话来源，open-type="contact"时有效
   */
  sessionFrom: String,
  /**
   * 会话内消息卡片标题，open-type="contact"时有效
   */
  sendMessageTitle: String,
  /**
   * 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
   */
  sendMessagePath: String,
  /**
   * 会话内消息卡片图片，open-type="contact"时有效
   */
  sendMessageImg: String,
  /**
   * 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
   */
  appParameter: String,
  /**
   * 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，open-type="contact"时有效
   */
  showMessageCard: Boolean,
  /**
   * 按钮的唯一标识，可用于设置隐私同意授权按钮的id
   */
  buttonId: String,
  /**
   * 支付宝小程序，当 open-type 为 getAuthorize 时有效。
   * 可选值：'phoneNumber' | 'userInfo'
   */
  scope: String
};
exports.buttonProps = buttonProps;
