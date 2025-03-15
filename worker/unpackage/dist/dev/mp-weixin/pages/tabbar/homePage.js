"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_homePageStore = require("../../stores/homePageStore.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "homePage",
  setup(__props) {
    const recommendedStore = stores_homePageStore.useRecommendedStore();
    const searchText = common_vendor.ref("");
    const imageUrl = [
      "/static/logos/home_icon_tech.png",
      "/static/logos/home_icon_life.png",
      "/static/logos/home_icon_teacher.png",
      "/static/logos/home_icon_standby.png",
      "/static/logos/home_icon_schoolin.png",
      "/static/logos/home_icon_schoolout.png",
      "/static/logos/hoem_icon_practice.png",
      "/static/logos/hoem_icon_buy.png"
    ];
    const categoryTitle = ["技术类", "生活类", "家教类", "代办事", "校内兼职", "校外兼职", "实习", "买卖"];
    const categoryTitleMap = [
      "TECH",
      "LIFESTYLE",
      "TUTORING",
      "ERRANDS",
      "CAMPUS_JOB",
      "OFF_CAMPUS_JOB",
      "INTERNSHIP",
      "TRADING"
    ];
    const handleSearch = () => {
      if (searchText.value === "") {
        return;
      }
      common_vendor.index.navigateTo({
        url: `/pages/components/searchCommendResultPage?searchValue=${searchText.value}`,
        animationType: "pop-in"
      });
    };
    const navigateToTypeDetail = (index) => {
      common_vendor.index.navigateTo({
        url: `/pages/typeDetailPage?type=${categoryTitleMap[index]}`,
        animationType: "pop-in"
      });
    };
    const navigateToOrderDetail = (orderId) => {
      common_vendor.index.navigateTo({
        url: `/pages/orderDetailPage?id=${orderId}`,
        animationType: "pop-in"
      });
    };
    const navigateToAddOrder = () => {
      common_vendor.index.switchTab({
        url: "/pages/tabbar/orderPage"
      });
    };
    const recommendData = common_vendor.computed(() => recommendedStore.getRecommendedOrder);
    common_vendor.onMounted(async () => {
      common_vendor.index.showLoading({ title: "获取数据中" });
      try {
        await loadRecommendedInfo();
      } catch (error) {
        console.error("请求推荐需求时发生了错误: :", error);
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "请求错误",
          icon: "none"
        });
      }
    });
    const loadRecommendedInfo = async () => {
      try {
        await recommendedStore.fetchRecommendedOrders(0, 20);
      } catch (error) {
        console.error("加载数据失败:", error);
        throw error;
      }
    };
    return (_ctx, _cache) => {
      return {
        a: searchText.value,
        b: common_vendor.o(($event) => searchText.value = $event.detail.value),
        c: common_vendor.o(handleSearch),
        d: common_vendor.o(navigateToAddOrder),
        e: common_vendor.f(imageUrl, (item, index, i0) => {
          return {
            a: item,
            b: common_vendor.t(categoryTitle[index]),
            c: common_vendor.o(($event) => navigateToTypeDetail(index))
          };
        }),
        f: common_vendor.f(recommendData.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.imageUrl == ""
          }, item.imageUrl == "" ? {} : {
            b: item.imageUrl
          }, {
            c: common_vendor.t(item.title.length > 9 ? item.title.slice(0, 8) + "..." : item.title),
            d: common_vendor.t(item.salaryPeriod > 9 ? item.salaryPeriod.slice(0, 8) + "..." : item.salaryPeriod),
            e: common_vendor.o(($event) => navigateToOrderDetail(item.id))
          });
        })
      };
    };
  }
});
wx.createPage(_sfc_main);
