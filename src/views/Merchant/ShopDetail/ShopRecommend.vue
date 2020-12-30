<!--
 * @Author: 黄灿民
 * @Date: 2020-12-22 20:17:53
 * @LastEditTime: 2020-12-22 20:40:51
 * @LastEditors: 黄灿民
 * @Description: 商铺推荐菜
 * @FilePath: \app\src\views\Merchant\ShopDetail\ShopRecommend.vue
-->
<template>
  <section class="recommend">
    <header class="recommend-header">
      <h3>推荐菜</h3>
      <div class="recommend-header-right">查看更多 ></div>
    </header>
    <div class="recommend-subheader">
      大众点评 - 网友推荐 （<span>{{ recommend.length }}</span
      >）
    </div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="item in recommend" :key="item._id">
        <div class="recomment-item">
          <div class="recomment-item-img">
            <img :src="'http://elm.cangdu.org/img/' + item.image_path" alt="" />
          </div>
          <div class="recomment-item-title">
            {{ item.name }}
          </div>
          <div class="recommet-item-amount">{{ item.month_sales }}人推荐</div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="recommend-footer">
      <div>图册菜单</div>
      <div class="recommend-footer-right">共2张 ></div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
export default {
  name: "ShopRecommend",
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    recommend: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 5,
        freeMode: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.recommend {
  background-color: #fff;
  margin-top: 0.5rem;
  border-radius: 0.5rem;
  padding-left: 0.5rem;
  .recommend-header,
  .recommend-footer {
    @include flex(space-between, center);
    padding: 0.5rem 0;
    .recommend-header-right,
    .recommend-footer-right {
      padding-right: 0.5rem;
    }
  }
  .recommend-subheader {
    padding: 0.25rem 0;
  }
  .swiper {
    .recomment-item {
      width: 25vw;
      .recomment-item-img {
        width: 100%;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .recomment-item-title {
        width: 100%;
        @include textOverFlow();
      }
    }
  }
}
</style>