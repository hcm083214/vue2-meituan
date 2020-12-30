<!--
 * @Author: 黄灿民
 * @Date: 2020-12-22 15:06:01
 * @LastEditTime: 2020-12-22 15:20:47
 * @LastEditors: 黄灿民
 * @Description: swiper使用demo,这种方法不行
 * @FilePath: \app\src\demo\swiper\swiper.vue
-->
<template>
  <swiper
    :slides-per-view="3"
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>

  </swiper>
</template>
<script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    methods: {
      onSwiper(swiper) {
        console.log(swiper)
      },
      onSlideChange() {
        console.log('slide change')
      },
    },
  };
</script>