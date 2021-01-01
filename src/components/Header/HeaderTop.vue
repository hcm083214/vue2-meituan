<!--
 * @Author: 黄灿民
 * @Date: 2020-12-05 15:24:33
 * @LastEditTime: 2021-01-01 14:54:50
 * @LastEditors: 黄灿民
 * @Description: 公共样式，头部组件，后退，搜素，用户常驻，其他通过插槽
 * @FilePath: \app\src\components\Header\HeaderTop.vue
-->
<template>
  <header class="navbar">
    <section class="navbar-left">
      <slot name="location"></slot>
      <div class="goback" @click="$router.go(-1)" v-if="goback">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
        <span>返回</span>
      </div>
    </section>

    <slot name="title"></slot>
    <section class="navbar-center" v-if="search">
      <svg class="icon icon-search" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      <span class="search">请输入商家名、品类或者商圈...</span>
    </section>

    <section class="navbar-right">
      <div class="info" v-if="user">
        <div v-if="!userInfo">
          <router-link :to="{ name: 'login' }">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yonghu"></use>
            </svg>
          </router-link>
        </div>

        <div class="avatar" v-else>
          <router-link :to="{ name: '' }">
            <img :src="`http://elm.cangdu.org/img/${userInfo.avatar}`" alt="" />
          </router-link>
        </div>
      </div>
      <slot name="gohome"></slot>
    </section>
  </header>
</template>

<script>
export default {
  name: "HeaderTop",
  props: {
    goback: {
      type: Boolean,
      default: false,
    },
    search: {
      type: Boolean,
      default: true,
    },
    user: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      userInfo: "",
    };
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
  },
  // computed: {
  //   ...mapState(["userInfo"]),
  // },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.navbar {
  @include sizeColor(0.75rem, #000);
  position: fixed;
  z-index: 2020;
  top: 0;
  left: 0;
  right: 0;
  background-image: linear-gradient(135deg, #ffd000 0%, #ffbd00 100%);
  @include wh(100vw, 2rem);
  @include flex(space-between);
  .navbar-left {
    @include wh(4.5rem, auto);
    padding-left: 0.75rem;
  }
  .navbar-center {
    flex: 1 1 auto;
    background-color: rgba(#fff, 0.9);
    border-radius: 0.5rem;
    @include flex();
    padding: 0.15rem;
    .icon-search {
      padding: 0 0.25rem;
      @include sizeColor(1rem, #999);
    }
    .search {
      @include sizeColor(0.6rem, #999);
    }
  }
  .navbar-right {
    @include wh(3rem, auto);
    padding-right: 0.75rem;
    .info {
      @include flex(flex-end);
      .avatar {
        @include wh(1.25rem, 1.25rem);
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>