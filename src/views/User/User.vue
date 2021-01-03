<!--
 * @Author: 黄灿民
 * @Date: 2021-01-02 13:47:17
 * @LastEditTime: 2021-01-02 18:27:28
 * @LastEditors: 黄灿民
 * @Description: 用户界面
 * @FilePath: \app\src\views\User\User.vue
-->
<template>
  <section class="user-page">
    <header-top :goback="true" :user="false" :search="false">
      <h3 slot="title">我的</h3>
    </header-top>
    <router-link :to="{ name: 'userdetail' }">
      <section class="user-page-header">
        <div class="avatar" v-if="userInfo.avatar">
          <img :src="`http://elm.cangdu.org/img/${userInfo.avatar}`" alt="" />
        </div>
        <svg class="icon icon-large" aria-hidden="true" v-else>
          <use xlink:href="#icon-yonghu"></use>
        </svg>
        <div class="text">
          <p v-if="userInfo.avatar">{{ userInfo.username }}</p>
          <p v-else>登录/注册</p>
          <p>{{ userInfo.mobile ? "" : "未绑定手机" }}</p>
        </div>
        <div>></div>
      </section>

      <section class="user-page-info">
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </section>
    </router-link>
  </section>
</template>

<script>
import HeaderTop from "@/components/Header/HeaderTop.vue";
export default {
  components: { HeaderTop },
  name: "User",
  data() {
    return {
      userInfo: {},
    };
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.user-page {
  .user-page-header {
    @include sizeColor(1rem, #333);
    padding: 0.5rem 1rem;
    margin-top: 2.01rem;
    background-color: #ffd000;
    @include flex(flex-start, center);
    .icon-large {
      font-size: 2rem;
      margin-right: 0.5rem;
    }
    .avatar {
      @include wh(2.5rem, 2.5rem);
      border-radius: 50%;
      overflow: hidden;
      margin-right: 0.5rem;

      img {
        width: 100%;
      }
    }
    .text {
      width: calc(100% - 3rem);
      flex: 0 1 auto;
    }
  }
}
</style>