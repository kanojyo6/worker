"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const utils_useAuth = require("../utils/useAuth.js");
const stores_orderDetailPageStore = require("../stores/orderDetailPageStore.js");
if (!Array) {
  const _component_uni_load_more = common_vendor.resolveComponent("uni-load-more");
  _component_uni_load_more();
}
if (!Math) {
  (orderDetailPopup + uniPopup)();
}
const uniPopup = () => "../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const orderDetailPopup = () => "./components/orderDetailPopup2.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "myOrderDetailPage",
  setup(__props) {
    const { isAuthenticated, isLoading: authIsLoading, userInfo } = utils_useAuth.useAuth();
    const orderDetailStore = stores_orderDetailPageStore.useOrderDetailStore();
    const applicatorsListStore = stores_orderDetailPageStore.useApplicatorsListStore();
    const orderId = common_vendor.ref("");
    const pageDataLoading = common_vendor.ref(true);
    const applicatorsLoading = common_vendor.ref(false);
    const pageError = common_vendor.ref(null);
    const showLoginPromptForData = common_vendor.ref(false);
    const orderDetailInfo = common_vendor.computed(() => orderDetailStore.orderDetailInfo);
    const applicatorsPopupRef = common_vendor.ref(null);
    const loadOrderDetail = async (id) => {
      if (!id) {
        pageError.value = "无效的订单ID";
        pageDataLoading.value = false;
        return;
      }
      pageDataLoading.value = true;
      pageError.value = null;
      showLoginPromptForData.value = false;
      try {
        await orderDetailStore.fetchOrderDetailInfo(id);
      } catch (error) {
        console.error("加载订单详情失败 (myOrderDetailPage):", error);
        pageError.value = error.message || "加载详情数据时发生错误。";
        if (!isAuthenticated.value) {
          showLoginPromptForData.value = true;
        }
      } finally {
        pageDataLoading.value = false;
        common_vendor.index.hideLoading();
      }
    };
    const handleViewApplications = async () => {
      if (authIsLoading.value) {
        common_vendor.index.showToast({ title: "正在检查登录状态...", icon: "none" });
        return;
      }
      if (!isAuthenticated.value) {
        common_vendor.index.showModal({
          title: "登录提示",
          content: "您需要登录后才能查看申请列表，是否立即前往登录页面？",
          success: (res) => {
            if (res.confirm) {
              goToLogin();
            }
          }
        });
        return;
      }
      applicatorsLoading.value = true;
      common_vendor.index.showLoading({ title: "获取申请数据中..." });
      try {
        await applicatorsListStore.fetchApplicatorList(orderId.value, 0);
        if (applicatorsPopupRef.value) {
          applicatorsPopupRef.value.open();
        }
      } catch (error) {
        console.error("获取申请列表失败 (myOrderDetailPage):", error);
        common_vendor.index.showToast({ title: error.message || "获取申请列表失败", icon: "none" });
      } finally {
        applicatorsLoading.value = false;
        common_vendor.index.hideLoading();
      }
    };
    const dismissApplicatorsPopup = () => {
      if (applicatorsPopupRef.value) {
        applicatorsPopupRef.value.close();
      }
    };
    const onImageError = (e) => {
      console.warn("图片加载失败:", e.detail.errMsg);
    };
    const retryLoadData = () => {
      if (orderId.value) {
        loadOrderDetail(orderId.value);
      }
    };
    const goToLogin = () => {
      common_vendor.index.navigateTo({ url: "/pages/login/login" });
    };
    common_vendor.onLoad(async (options) => {
      if (options && options.id) {
        orderId.value = options.id;
        console.log("页面加载，订单ID:", orderId.value);
        if (isAuthenticated.value || !authIsLoading.value) {
          await loadOrderDetail(orderId.value);
        } else {
          const unwatch = watch(authIsLoading, async (newAuthLoadingVal) => {
            if (!newAuthLoadingVal && isAuthenticated.value) {
              await loadOrderDetail(orderId.value);
              unwatch();
            } else if (!newAuthLoadingVal && !isAuthenticated.value) {
              pageDataLoading.value = false;
              showLoginPromptForData.value = true;
              unwatch();
            }
          });
        }
      } else {
        console.error("未提供订单ID");
        pageError.value = "未提供有效的订单ID。";
        pageDataLoading.value = false;
        common_vendor.index.hideLoading();
      }
    });
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(authIsLoading)
      }, common_vendor.unref(authIsLoading) ? {
        b: common_vendor.p({
          status: "loading",
          ["show-icon"]: true,
          iconType: "snow"
        })
      } : {}, {
        c: pageDataLoading.value && !common_vendor.unref(authIsLoading)
      }, pageDataLoading.value && !common_vendor.unref(authIsLoading) ? {
        d: common_vendor.p({
          status: "loading"
        })
      } : {}, {
        e: pageError.value && !common_vendor.unref(authIsLoading) && !pageDataLoading.value
      }, pageError.value && !common_vendor.unref(authIsLoading) && !pageDataLoading.value ? {
        f: common_vendor.t(pageError.value),
        g: common_vendor.o(retryLoadData)
      } : {}, {
        h: !pageDataLoading.value && !pageError.value && !common_vendor.unref(authIsLoading)
      }, !pageDataLoading.value && !pageError.value && !common_vendor.unref(authIsLoading) ? common_vendor.e({
        i: !orderDetailInfo.value.imageUrl
      }, !orderDetailInfo.value.imageUrl ? {} : {
        j: orderDetailInfo.value.imageUrl,
        k: common_vendor.o(onImageError)
      }, {
        l: common_vendor.t(orderDetailInfo.value.publisherName || "招聘方"),
        m: common_assets._imports_0,
        n: common_vendor.t(orderDetailInfo.value.location || "地点未知"),
        o: common_vendor.t(orderDetailInfo.value.title || "招聘标题"),
        p: common_vendor.t(orderDetailInfo.value.salary || "薪资面议"),
        q: common_vendor.t(orderDetailInfo.value.salaryPeriod || "周期未定"),
        r: common_vendor.t(orderDetailInfo.value.content || "暂无详细描述。"),
        s: common_vendor.t(applicatorsLoading.value ? "加载申请中..." : "查看申请"),
        t: common_vendor.o(handleViewApplications),
        v: common_vendor.unref(authIsLoading) || applicatorsLoading.value
      }) : {}, {
        w: !common_vendor.unref(isAuthenticated) && !common_vendor.unref(authIsLoading) && showLoginPromptForData.value
      }, !common_vendor.unref(isAuthenticated) && !common_vendor.unref(authIsLoading) && showLoginPromptForData.value ? {
        x: common_vendor.o(goToLogin)
      } : {}, {
        y: common_vendor.o(dismissApplicatorsPopup),
        z: common_vendor.p({
          ["order-id"]: orderId.value
        }),
        A: common_vendor.sr(applicatorsPopupRef, "ad800dc5-2", {
          "k": "applicatorsPopupRef"
        }),
        B: common_vendor.p({
          type: "bottom",
          ["background-color"]: "#fff"
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ad800dc5"]]);
wx.createPage(MiniProgramPage);
