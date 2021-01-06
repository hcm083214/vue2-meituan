<!--
 * @Author: 黄灿民
 * @Date: 2021-01-02 13:47:17
 * @LastEditTime: 2021-01-03 21:50:38
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
    </router-link>
    <section class="user-page-info">
      <ul class="info">
        <li>
          <p><span class="balance">0.00</span>元</p>
          <p>我的余额</p>
        </li>
        <li>
          <p><span class="discounts">3</span>个</p>
          <p>我的优惠</p>
        </li>
        <li>
          <p><span class="credits">0</span>分</p>
          <p>我的积分</p>
        </li>
      </ul>
    </section>

    <section class="user-page-content">
      <ul class="content">
        <li>
          <span>我的订单</span>
          <span>></span>
        </li>
        <li>
          <span>积分商城</span>
          <span>></span>
        </li>
        <li>
          <span>会员卡</span>
          <span>></span>
        </li>
      </ul>
    </section>

        <section class="user-page-content">
      <ul class="content">
        <li>
          <span>服务中心</span>
          <span>></span>
        </li>
        <li>
          <span>下载app</span>
          <span>></span>
        </li>
      </ul>
    </section>
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
  .user-page-info {
    background-color: #fff;
    ul.info {
      @include flex(flex-start, center);
      li {
        width: 33.3%;
        padding-bottom: 0.5rem;
        border-right: 1px solid #eee;
        p {
          text-align: center;
          padding-top: 0.5rem;
          font-size: 0.75rem;
          span {
            font-size: 1.5rem;
          }
          .balance {
            color: #f90;
          }
          .discounts {
            color: #ff5f3e;
          }
          .credits {
            color: #6ac20b;
          }
        }
      }
    }
  }
  .user-page-content {
    margin-top: 0.5rem;
    background-color: #fff;
    .content {
      li {
        margin-left: 1rem;
        padding: 0.5rem 0.25rem;
        border-bottom: 1px solid #eee;
        @include flex(space-between, center);
        @include sizeColor(0.9rem, #333);
      }
    }
  }
}
</style>