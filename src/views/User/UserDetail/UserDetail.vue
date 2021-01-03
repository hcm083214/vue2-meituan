<!--
 * @Author: 黄灿民
 * @Date: 2021-01-02 15:16:26
 * @LastEditTime: 2021-01-02 18:58:51
 * @LastEditors: 黄灿民
 * @Description: 账号信息
 * @FilePath: \app\src\views\User\UserDetail\UserDetail.vue
-->
<template>
  <section class="userInfo-detail">
    <header-top :goback="true" :user="false" :search="false">
      <h3 slot="title">账户信息</h3>
    </header-top>
    <section class="usetInfo-detail-info">
      <ul class="info">
        <li class="info-item">
          <input type="file" class="avatar-upload" />
          <span>头像</span>
          <div class="info-item-right">
            <div class="img">
              <img
                :src="`http://elm.cangdu.org/img/${userInfo.avatar}`"
                alt=""
              />
            </div>
            <span>></span>
          </div>
        </li>
        <li class="info-item">
          <span>用户名</span>
          <div class="info-item-right">
            <div class="text">
              {{ userInfo.username }}
            </div>
            <span>></span>
          </div>
        </li>
        <router-link :to="{ name: 'deliveryaddress' }">
          <li class="info-item">
            <span>收货地址</span>
            <div class="info-item-right">
              <span>></span>
            </div>
          </li>
        </router-link>
      </ul>
    </section>
    <h4 class="userInfo-title">账号绑定</h4>
    <section class="usetInfo-detail-info m-t">
      <ul class="info" @click="changeMobileNum">
        <li class="info-item">
          <span>手机</span>
          <div class="info-item-right">
            <span>></span>
          </div>
        </li>
      </ul>
    </section>
    <h4 class="userInfo-title">安全设置</h4>
    <section class="usetInfo-detail-info m-t">
      <ul class="info">
        <router-link :to="{ name: 'resset' }">
          <li class="info-item">
            <span>登录密码</span>
            <div class="info-item-right">
              <div class="text">修改</div>
              <span>></span>
            </div>
          </li>
        </router-link>
      </ul>
    </section>
    <div class="userInfo-btn" @click="loginOut">退出登录</div>
  </section>
</template>

<script>
import HeaderTop from "@/components/Header/HeaderTop.vue";
import { signout } from "@/server/index.js";
import messageBox from "@/components/MessageBox/index.js";
export default {
  name: "UserDetail",
  components: { HeaderTop },
  data() {
    return {
      userInfo: {},
    };
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
  },
  methods: {
    async loginOut() {
      const confirmResult = await messageBox({
        type: "confirm",
        title: "是否要退出登录",
      });
      if (confirmResult) {
        await signout();
        localStorage.removeItem("userInfo");
        this.$router.push({ name: "user" });
      }
    },
    changeMobileNum() {
      messageBox({
        type: "alert",
        title: "无法修改，请在app中修改",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.userInfo-detail {
  .m-t {
    margin-top: 0 !important;
  }
  .userInfo-title {
    padding: 0.5rem 1rem;
    @include sizeColor(0.75rem, #333);
  }
  .usetInfo-detail-info {
    background-color: #fff;
    margin-top: 2.5rem;
    ul.info {
      @include sizeColor(0.75rem, #333);
      li.info-item {
        @include sizeColor(0.75rem, #333);
        position: relative;
        padding: 0.5rem 1rem;
        @include flex(space-between, center);
        border-bottom: 1px solid #dedede;
        .avatar-upload {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          display: block;
          height: 100%;
          opacity: 0;
        }
        .info-item-right {
          @include flex(center, center);
          .img {
            @include wh(2.5rem, 2.5rem);
            border-radius: 50%;
            overflow: hidden;
            margin-right: 0.5rem;
            img {
              width: 100%;
            }
          }
          .text {
            margin-right: 0.5rem;
          }
        }
      }
    }
  }
  .userInfo-btn {
    margin: 0 0.5rem;
    margin-top: 1.5rem;
    text-align: center;
    background-color: #d8584a;
    @include sizeColor(0.75rem, #fff);
    padding: 0.5rem 0;
    border-radius: 0.25rem;
  }
}
</style>