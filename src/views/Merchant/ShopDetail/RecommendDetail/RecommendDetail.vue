<!--
 * @Author: 黄灿民
 * @Date: 2020-12-27 20:13:38
 * @LastEditTime: 2020-12-30 21:14:21
 * @LastEditors: 黄灿民
 * @Description: 推荐套餐详情
 * @FilePath: \app\src\views\Merchant\ShopDetail\RecommendDetail\RecommendDetail.vue
-->
<template>
  <section class="recomment-detail">
    <header-top :goback="true" :user="false" :search="false"></header-top>
    <section class="headers">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide
          v-for="(item, index) in recommendData"
          :key="item._id"
          :class="
            swiperItemActive == index
              ? 'swiper-item swiper-item-active'
              : 'swiper-item'
          "
        >
          <span @click="swiperItemActive = index">{{ item.name }}</span>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </section>
    <div class="h" v-if="recommendItem">
      <section class="recomment-shop pd">
        <h4>{{ recommendItem.name }}</h4>
        <div class="recomment-shop-description">
          <span>{{
            "商品很好," +
            recommendItem.description +
            ",月售" +
            recommendItem.month_sales
          }}</span>
          <span>评论数：{{ recommendItem.rating_count }}</span>
        </div>
        <div class="img">
          <img
            :src="'http://elm.cangdu.org/img/' + recommendItem.image_path"
            alt=""
          />
        </div>
        <div class="price">
          <span class="orign">￥{{ recommendItem.satisfy_count }}</span>
          <span class="discounts"
            >券后价￥{{
              recommendItem.satisfy_count - recommendItem.satisfy_rate
            }}</span
          >
        </div>
        <div class="coupon">
          <span>满100减5</span>
          <span>领券></span>
        </div>
      </section>
      <section class="recomment-shop pd a">
        <h4>到点吃套餐</h4>

        <dl>
          <dt>锅底1选一</dt>
          <dd><span>萝卜玉米牛肉汤</span> <span>￥25</span></dd>
          <dd><span>萝卜玉米牛肉汤</span> <span>￥25</span></dd>

          <dt>锅底1选一</dt>
          <dd><span>萝卜玉米牛肉汤</span> <span>￥25</span></dd>
          <dd><span>萝卜玉米牛肉汤</span> <span>￥25</span></dd>

          <dt>锅底1选一</dt>
          <dd><span>萝卜玉米牛肉汤</span> <span>￥25</span></dd>
          <dd><span>萝卜玉米牛肉汤</span> <span>￥25</span></dd>

          <dt>锅底1选一</dt>
          <dd><span>萝卜玉米牛肉汤</span> <span>￥25</span></dd>
          <dd><span>萝卜玉米牛肉汤</span> <span>￥25</span></dd>
        </dl>
      </section>
    </div>

    <footer class="recomment-detail-footer" v-if="recommendItem">
      <div class="price">
        <span class="orign">￥{{ recommendItem.satisfy_count }}</span>
      </div>
      <div class="shopping">
        <button class="btn left" @click="addShopping">加入购物车</button>
        <button class="btn right">立即抢购</button>
      </div>
    </footer>
    <shop-cart />
  </section>
</template>

<script>
import HeaderTop from "@/components/Header/HeaderTop.vue";
import { mapState } from "vuex";
import { foodMenu, checkout } from "@/server/index";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import ShopCart from "@/components/ShopCart/ShopCart.vue";

export default {
  name: "RecommendDetail",
  components: { HeaderTop, Swiper, SwiperSlide, ShopCart },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 3,
        spaceBetween: 30,
        freeMode: true,
        pagination: {
          el: ".swiper-pagination",
        },
      },
      recommendData: [],
      swiperItemActive: 0,
    };
  },
  computed: {
    ...mapState(["currentShopId", "selectionCityGeo"]),
    recommendItem() {
      return this.recommendData[this.swiperItemActive];
    },
  },
  async mounted() {
    let result = await foodMenu(this.currentShopId);
    this.recommendData = result
      .filter((item) => item.foods.length > 0)[0]
      .foods.splice(0, 5);
  },
  methods: {
    async addShopping() {
      const geohash = this.selectionCityGeo;
      const restaurant_id = this.currentShopId;
      const entities = [
        {
          attrs: [],
          extra: {},
          id: this.recommendItem._id,
          name: this.recommendItem.name,
          packing_fee: 5,
          price: this.recommendItem.satisfy_count,
          quantity: this.recommendItem.rating_count,
          sku_id: 100,
          specs: [1],
          stock: this.recommendItem.rating_count,
          image_path: this.recommendItem.image_path,
        },
      ];
      const result = await checkout(geohash, entities, restaurant_id);
      this.$store.commit("saveAlreadyShoppingFood", result);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.a {
  margin-top: 0.75rem;
  margin-bottom: 3.1rem;
}
.recomment-detail {
  .h {
    top: 0.2rem;
  }
  .pd {
    padding: 0 0.5rem;
  }
  .headers {
    margin-top: 2rem;
    .swiper-item {
      text-align: center;
      padding: 0.5rem 0;
      @include textOverFlow();
      span {
        padding: 0.45rem 0;
      }
    }
    .swiper-item-active {
      color: #f11111;
      span {
        border-bottom: 1px solid #f11111;
      }
    }
  }
  .recomment-shop {
    padding-bottom: 0.5rem;
    background-color: #fff;
    border-radius: 0.5rem;
    h4 {
      padding: 0.5rem 0;
    }
    .recomment-shop-description {
      padding-bottom: 0.25rem;
      @include flex(space-between, center);
      @include sizeColor(0.75rem, #333);
    }
    .img {
      width: 100%;
      overflow: hidden;
      max-height: 10rem;
      border-radius: 0.5rem;
      img {
        width: 100%;
      }
    }
    .price {
      .orign {
        @include sizeColor(1.2rem, #f11);
        margin-right: 0.5rem;
      }
      .discounts {
        @include sizeColor(0.8rem, #f14);
        background-color: rgb(248, 241, 201);
        padding: 0 0.2rem;
        border-radius: 0.2rem;
      }
    }
    .coupon {
      padding: 0.25rem 0;
      @include flex(space-between, center);
      @include sizeColor(0.75rem, #333);
    }
  }
  .recomment-detail-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #e9e9e9;
    height: 3rem;
    width: 100vw;
    @include flex(space-between, center);
    .price {
      margin-left: 1rem;
      .orign {
        @include sizeColor(1.2rem, #f14);
      }
    }
    .shopping {
      margin-right: 0.8rem;
      .btn {
        padding: 0.5rem 1rem;
        color: #fff;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.596);
      }
      .left {
        background-color: rgb(238, 125, 125);
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
      }
      .right {
        background-color: rgb(149, 125, 238);
        border-top-right-radius: 1rem;
        border-bottom-right-radius: 1rem;
      }
    }
  }
}
</style>