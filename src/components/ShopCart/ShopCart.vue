<!--
 * @Author: 黄灿民
 * @Date: 2020-12-29 22:32:58
 * @LastEditTime: 2021-01-01 18:11:25
 * @LastEditors: 黄灿民
 * @Description: 悬浮购物车组件
 * @FilePath: \app\src\components\ShopCart\ShopCart.vue
-->
<template>
  <section
    @mouseenter="changeHideState"
    :class="isHide ? 'shop-cart shop-cart-hide' : 'shop-cart'"
  >
    <router-link :to="{ name: 'shopcartlist' }">
      <div class="icon-shop">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gouwuche"></use>
        </svg>
      </div>
      <span class="count" v-show="alreadyShoppingFood.length">{{
        alreadyShoppingFood.length
      }}</span>
    </router-link>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ShopCart",
  data() {
    return {
      isHide: false,
      timer: null,
    };
  },
  mounted() {
    this.hide();
  },
  methods: {
    hide() {
      this.timer = setTimeout(() => {
        this.isHide = true;
      }, 5000);
    },
    changeHideState() {
      this.isHide = false;
      this.hide();
    },
  },
  computed: {
    ...mapState(["alreadyShoppingFood"]),
  },
  destroyed() {
    this.timer = null;
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.shop-cart-hide {
  right: 0 !important;
  transform: translateX(20%);
}
.shop-cart {
  transition: all 0.5s;
  @include wh(2rem, 2rem);
  position: fixed;
  z-index: 2020;
  right: 1rem;
  bottom: 5rem;
  background-color: #fff;
  border-radius: 50%;
  .icon-shop {
    @include flex(center, center);
    @include wh(100%,100%);
    svg {
      @include wh(60%, 60%);
    }
  }
  .count {
    position: absolute;
    top: -20%;
    right: -10%;
    background-color: rgb(255, 44, 44);
    @include sizeColor(0.55rem, #fff);
    @include wh(1rem, 1rem);
    text-align: center;
    line-height: 1rem;
    border-radius: 50%;
  }
}
</style>