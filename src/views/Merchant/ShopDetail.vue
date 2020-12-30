<!--
 * @Author: 黄灿民
 * @Date: 2020-12-14 15:08:43
 * @LastEditTime: 2020-12-30 20:16:08
 * @LastEditors: 黄灿民
 * @Description: 店铺详情页
 * @FilePath: \app\src\views\Merchant\ShopDetail.vue
-->
<template>
  <section class="shop-detail">
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
      :shopId="shopId"
      :marginLR="0.75"
    />
    <div class="h">
      <ul
        ref="context"
        :class="isContextEleArrivalHeader ? 'header fixed' : 'header'"
      >
        <li :class="contextActive === 'list' ? 'active' : ''">优惠<i></i></li>
        <li :class="contextActive === 'recommend' ? 'active' : ''">
          菜品 <i></i>
        </li>
        <li :class="contextActive === 'comment' ? 'active' : ''">
          评价 <i></i>
        </li>
      </ul>

      <shop-list
        :title="'到店套餐'"
        :list="discounts"
        :isSold="true"
        ref="list"
      />

      <shop-recommend :recommend="recommend" ref="recommend" />

      <shop-comment :ratingListData="ratingListData" ref="comment" />

      
    </div>
    <shop-cart />
  </section>
</template>

<script>
import ShopList from "@/components/ShopList/ShopList";
import ShopRecommend from "./ShopDetail/ShopRecommend.vue";
import { shopDetails, foodMenu, getRatingList } from "@/server/index";
import { isArrival, debounce } from "@/assets/js/util.js";
import ShopComment from "./ShopDetail/ShopComment.vue";
import ShopDescribe from "./ShopDetail/ShopDescribe.vue";
import HeaderTop from '@/components/Header/HeaderTop.vue';
import ShopCart from '../../components/ShopCart/ShopCart.vue';
export default {
  name: "ShopDetail",
  components: {
    ShopList,
    ShopRecommend,
    ShopComment,
    ShopDescribe,
    HeaderTop,
    ShopCart,
  },
  data() {
    return {
      shopDetailsData: [],
      isDesEleArrivalHeader: false,
      isContextEleArrivalHeader: false,
      contextActive: "list",
      changeDisplayModeDebounce: null,
      foodMenuData: [],
      discounts: [],
      recommend: [],
      ratingListData: [],
      shopId: 1,
    };
  },
  computed: {
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
  async mounted() {
    const shopId = this.$route.query.shopId;
    this.shopId = +shopId;
    this.shopDetailsData = await shopDetails(shopId);
    this.foodMenuData = await foodMenu(shopId);
    this.ratingListData = await getRatingList(shopId);
    this.scrollHandler();
  },
  methods: {
    changeDisplayMode() {
      const header = this.$refs.headerTop && this.$refs.headerTop.$el;
      const desEle = this.$refs.des && this.$refs.des.$el;
      const contextEle = this.$refs.context;
      this.isDesEleArrivalHeader = isArrival(header, desEle);
      this.isContextEleArrivalHeader = isArrival(header, contextEle);

      const recommend = this.$refs.recommend && this.$refs.recommend.$el;
      let isRecommendArrivalContext = isArrival(contextEle, recommend);

      const comment = this.$refs.comment && this.$refs.comment.$el;
      let isCommentArrivalContext = isArrival(contextEle, comment);
      if (isCommentArrivalContext) {
        this.contextActive = "comment";
      } else if (!isCommentArrivalContext && isRecommendArrivalContext) {
        this.contextActive = "recommend";
      } else if (!isCommentArrivalContext && !isRecommendArrivalContext) {
        this.contextActive = "list";
      }
    },
    scrollHandler() {
      this.changeDisplayModeDebounce = debounce(this.changeDisplayMode, 50);
      window.addEventListener("scroll", this.changeDisplayModeDebounce);
    },
  },
  watch: {
    foodMenuData(newValue, oldValue) {
      this.discounts = newValue
        .filter((item) => item.foods.length > 0)[0]
        .foods.splice(0, 5);
      this.recommend = newValue
        .filter((item) => item.foods.length > 0)[1]
        .foods.splice(0, 10);
      console.log(oldValue);
    },
  },
  destroyed() {
    window.removeEventListener("scroll", this.changeDisplayModeDebounce);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.opacity {
  background-image: linear-gradient(135deg, transparent 0%, transparent 100%);
  color: #fff;
}
.shop-detail {
  @include sizeColor(0.7rem, #333);
  width: 100vw;
  z-index: 1;
  position: relative;
  .shop-cover {
    position: absolute;
    z-index: 0;
    @include wh(100vw, 12rem);
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(10px);
  }
  .h {
    padding: 0 0.75rem;
    position: relative;
    top: 0rem;

    ul.header {
      background-color: #f0efed;
      @include flex(flex-start, center);
      padding: 0.75rem 0;
      li {
        margin-left: 0.25rem;
        margin-right: 0.75rem;
        position: relative;
      }
      li.active {
        color: #f00;
        i {
          width: 70%;
          position: absolute;
          bottom: -0.25rem;
          left: 50%;
          transform: translateX(-50%);
          border-top: 1px solid #f00;
        }
      }
    }

    .fixed {
      position: sticky;
      top: 2rem;
      left: 0rem;
      right: 0;
      z-index: 2020;
    }
  }
}
</style>