<!--
 * @Author: 黄灿民
 * @Date: 2020-12-15 20:21:47
 * @LastEditTime: 2020-12-16 12:41:05
 * @LastEditors: 黄灿民
 * @Description: 评分组件
 * @FilePath: \app\src\components\Rank\Rank.vue
-->
<template>
  <div class="rank-wrapper">
    <div class="rank-default ">
      <svg
        class="icon grey_fill"
        aria-hidden="true"
        v-for="(i, index) in 5"
        :key="index"
      >
        <use xlink:href="#icon-start"></use>
      </svg>
    </div>
    <div class="ranking" :style="{width:`${ranking*3/5}rem`}">
      <div class="rank-default">
        <svg
          class="icon orange_fill"
          aria-hidden="true"
          v-for="(i, index) in 5"
          :key="index"
        >
          <use xlink:href="#icon-start"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Rank",
  props: {
    ranking: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
$width:3rem;
$height:1rem;
.rank-wrapper {
  position: relative;
  @include wh($width, $height);
  .rank-default {
    @include flex(center, center);
    @include wh($width, $height);
  }
  .grey_fill {
    z-index:10;
    fill: #d1d1d1;
  }
  .ranking {
    position: relative;
    top:-$height;
    height: 100%;
    overflow: hidden;
    .orange_fill {
      z-index:20;
      fill: #ff9a0d !important;
    }
  }
}
</style>