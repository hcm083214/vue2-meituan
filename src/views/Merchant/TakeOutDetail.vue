/* eslint-disable vue/valid-template-root */
<!--
 * @Author: 黄灿民
 * @Date: 2020-12-23 20:14:05
 * @LastEditTime: 2020-12-27 18:44:59
 * @LastEditors: 黄灿民
 * @Description: 外卖详情
 * @FilePath: \app\src\views\Merchant\TakeOutDetail.vue
-->
<template>
  <section class="takeout">
    <header-top
      :goback="true"
      :user="false"
      :search="false"
      :class="isDesEleArrivalHeader ? '' : 'opacity'"
      ref="headerTop"
    >
      <h2 slot="title">{{ title }}</h2>
    </header-top>
    <section
      class="shop-cover"
      :style="{
        backgroundImage: `url(http://elm.cangdu.org/img/${imgPath})`,
      }"
    ></section>
    <shop-describe
      ref="des"
      :shopDetailsData="shopDetailsData"
      :shopId="currentShopId"
      :isShowTakeOut="false"
    />
    <!-- class="takeout-nav "  -->

    <nav class="sticky takeout-nav" ref="nav">
      <router-link :to="{ name: 'menu' }">点菜</router-link>
      <router-link :to="{ name: 'comment',query:{currentShopId} }">评价</router-link>
    </nav>
    <transition>
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
import HeaderTop from "@/components/Header/HeaderTop.vue";
import { shopDetails, foodMenu } from "@/server/index";
import { isArrival, debounce } from "@/assets/js/util.js";
import ShopDescribe from "./ShopDetail/ShopDescribe.vue";
import { mapState } from "vuex";
export default {
  name: "TakeOutDetail",
  components: { HeaderTop, ShopDescribe },
  data() {
    return {
      isDesEleArrivalHeader: false,
      isNavArrivalHeader: false,
      shopDetailsData: [],
      changeDisplayModeDebounce: null,
      headerClientRect: {},
      navClientRect: {},
      topHeaderHeight: 0,
    };
  },
  async mounted() {

    const shopId = +this.$route.query.shopId;
    shopId && this.$store.commit("changeCurrentShopId", shopId);
    this.shopDetailsData = await shopDetails(this.currentShopId);
    this.foodMenuData = await foodMenu(shopId);
    // this.ratingListData = await getRatingList(shopId);
    this.scrollHandler();
    this.topHeaderHeight =
      this.$refs.headerTop.$el.getBoundingClientRect().height +
      this.$refs.nav.getBoundingClientRect().height;

    this.topHeaderHeight &&
      this.$store.commit("saveTopHeaderHeight", this.topHeaderHeight);
  },
  computed: {
    ...mapState(["currentShopId"]),
    title() {
      return this.shopDetailsData.length > 0
        ? this.shopDetailsData[0].name
        : "";
    },
    imgPath() {
      return this.shopDetailsData.length > 0
        ? this.shopDetailsData[0].image_path
        : "";
    },
  },
  methods: {
    changeDisplayMode() {
      //直接用position：sticky就有吸顶效果
      const header = this.$refs.headerTop && this.$refs.headerTop.$el;
      const desEle = this.$refs.des && this.$refs.des.$el;
      const nav = this.$refs.nav;
      this.headerClientRect = header.getBoundingClientRect();
      this.navClientRect = nav.getBoundingClientRect();
      this.isDesEleArrivalHeader = isArrival(header, desEle);
      this.isNavArrivalHeader = isArrival(header, nav);
    },
    scrollHandler() {
      this.changeDisplayModeDebounce = debounce(this.changeDisplayMode, 50);
      window.addEventListener("scroll", this.changeDisplayModeDebounce);
    },
  },
  destroyed() {
    window.removeEventListener("scroll", this.changeDisplayModeDebounce);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.sticky {
  position: sticky;
  z-index: 2020;
  top: 2rem;
  left: 0rem;
  right: 0;
}
.opacity {
  background-image: linear-gradient(135deg, transparent 0%, transparent 100%);
  color: #fff;
}
.router-link-active {
  border-bottom: 2px solid #ffd000;
}
.takeout {
  .shop-cover {
    position: absolute;
    z-index: 0;
    @include wh(100vw, 12rem);
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(10px);
  }
  .takeout-nav {
    background-color: #fff;
    padding: 0.5rem 0.25rem;
    padding-bottom: 0;
    @include flex(space-around, center);
    a {
      display: inline-block;
      color: #999;
      padding-bottom: 0.5rem;
      width: 2rem;
      text-align: center;
    }
  }
}
</style>