<!--
 * @Author: 黄灿民
 * @Date: 2020-12-09 11:11:52
 * @LastEditTime: 2020-12-22 15:17:39
 * @LastEditors: 黄灿民
 * @Description: 首页服务列表
 * @FilePath: \app\src\views\Home\Service.vue
-->
<template>
  <section class="list">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide>
        <ul>
          <router-link
            :to="{ name: 'servicelist', query: { title: item.title } }"
            tag="li"
            v-for="item in shopList.slice(0, 8)"
            :key="item.id"
            class="list-item"
          >
            <div>
              <img
                :src="'https://fuss10.elemecdn.com' + item.image_url"
                alt=""
              />
            </div>
            <span>{{ item.title }}</span>
          </router-link>
        </ul>
      </swiper-slide>
      <swiper-slide>
        <ul>
          <router-link
            :to="{}"
            tag="li"
            v-for="item in shopList.slice(8)"
            :key="item.id"
            class="list-item"
          >
            <div>
              <img
                :src="'https://fuss10.elemecdn.com' + item.image_url"
                alt=""
              />
            </div>
            <span>{{ item.title }}</span>
          </router-link>
        </ul>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </section>
</template>

<script>
import "swiper/swiper-bundle.css";
// import '@/assets/css/swiper-bundle.min.css'
import { msiteFoodTypes } from "@/server/index";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

export default {
  name: "Service",
  data() {
    return {
      shopList: [],
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true, //允许分页点击跳转
          dynamicBullets: true,
        },
      },
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  async mounted() {
    const list = await msiteFoodTypes();
    this.shopList.push(...list);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.list {
  padding-top: 2rem;
  ul {
    padding-bottom: 0.5rem;
    background-color: #fff;
    .list-item {
      padding-top: 0.5rem;
      @include sizeColor(0.6rem, #333);
      text-align: center;
      width: 25%;
      float: left;
      img {
        width: 1.8rem;
      }
    }
  }
  ul::after {
    content: "";
    display: block;
    clear: both;
  }
}
</style>