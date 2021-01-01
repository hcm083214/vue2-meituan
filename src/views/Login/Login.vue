<!--
 * @Author: 黄灿民
 * @Date: 2020-12-30 22:00:15
 * @LastEditTime: 2021-01-01 15:34:04
 * @LastEditors: 黄灿民
 * @Description: 登录页
 * @FilePath: \app\src\views\Login\Login.vue
-->
<template>
  <section class="login">
    <header-top :goback="true" :user="false" :search="false">
      <h2 slot="title">账号登录</h2>
    </header-top>
    <section class="content">
      <div class="title">欢迎登录美团</div>
      <div class="form">
        <div class="form-group">
          <input
            type="text"
            class="user"
            placeholder="账号"
            v-model="username"
          />
        </div>
      </div>
      <div class="form">
        <div class="form-group">
          <input
            type="password"
            class="pwd"
            placeholder="密码"
            v-if="!isShowPwd"
            v-model="password"
          />
          <input
            type="text"
            class="showPwd"
            placeholder="密码"
            v-model="password"
            v-else
          />
        </div>
        <div class="control">
          <div
            :class="!isBtnShowPwd ? 'bar' : 'bar bar-show'"
            @click="changePwdShow"
          >
            <div class="btn"></div>
            <span v-if="!isBtnShowPwd">显示</span>
            <span v-else>隐藏</span>
          </div>
        </div>
      </div>
      <div class="form">
        <div class="form-group">
          <input
            type="text"
            v-model="captcha_code"
            class="verification"
            placeholder="验证码"
          />
        </div>
        <div class="verificationImg" @click="freshVerification">
          <img :src="verificationImg.code" alt="" />
          <div class="text">
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </div>
    </section>
    <footer class="login-footer">
      <p class="text">温馨提示：未注册过的账号，登录时将自动注册</p>
      <p class="text">注册过的用户可凭账号密码登录</p>
      <button class="btn" @click="login">登录</button>
      <p class="reset">
        <router-link :to="{ name: 'resset' }">重置密码？</router-link>
      </p>
    </footer>
  </section>
</template>

<script>
import HeaderTop from "@/components/Header/HeaderTop.vue";
import { getcaptchas, accountLogin } from "@/server/index.js";
import msgBox from "@/components/MessageBox/index";
export default {
  components: { HeaderTop },
  data() {
    return {
      isShowPwd: false,
      isBtnShowPwd: false,
      username: "",
      password: "",
      captcha_code: "",
      verificationImg: "",
      userInfo: {},
    };
  },
  methods: {
    changePwdShow() {
      this.isBtnShowPwd = !this.isBtnShowPwd;
      this.isShowPwd = !this.isShowPwd;
    },
    async freshVerification() {
      this.verificationImg = await getcaptchas();
    },
    async login() {
      let username = this.username;
      let password = this.password;
      let captcha_code = this.captcha_code;
      this.userInfo = await accountLogin(username, password, captcha_code);
      if (this.userInfo.username) {
        localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
        this.$store.commit("saveUserInfo", this.userInfo);
        const redirect = this.$router.query && this.$router.query.redirect;
        redirect
          ? this.$router.push(redirect)
          : this.$router.push({ name: "Home" });
      } else {
        msgBox({
          type:'alert',
          title:'登录失败',
          msg:this.userInfo.message,
        });
      }
    },
  },
  async mounted() {
    this.verificationImg = await getcaptchas();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.login {
  margin-top: 2.1rem;
  .content {
    background-color: #fff;
    padding: 1rem 1.5rem;
    .title {
      margin: 0 auto;
    }
    .form {
      @include flex(space-between, center);
      position: relative;
      padding: 0.5rem 0;
      border-bottom: 1px solid #eee;
      .form-group {
        input {
          width: 8rem;
          height: 1.5rem;
        }
        .showPwd {
          position: absolute;
          top: 0;
          left: 0;
          transform: translateY(50%);
        }
      }
      .control {
        .bar {
          @include wh(4rem, 1.5rem);
          @include sizeColor(0.75rem, #333);
          background-color: #f3f3f3;
          line-height: 1.5rem;
          text-align: center;
          position: relative;
          transition: all 0.5s;
          .btn {
            position: absolute;
            top: 0;
            left: 0;
            @include wh(1rem, 1.5rem);
            background-color: #999;
            transition: all 0.5s;
          }
        }
        .bar-show {
          background-color: #1f1;
          .btn {
            transform: translateX(300%);
          }
        }
      }
      .verificationImg {
        @include flex(flex-start, center);
        img {
          margin-right: 0.25rem;
        }
        .text {
          p {
            @include sizeColor(0.75rem, #333);
          }
          p:nth-of-type(2) {
            color: #09f;
          }
        }
      }
    }
  }
  .login-footer {
    padding: 0.5rem 1rem;
    p.text {
      @include sizeColor(0.5rem, #f33);
      padding-top: 0.5rem;
    }
    .btn {
      margin-top: 0.5rem;
      padding: 0.5rem 0;
      width: 100%;
      background-color: #4cd964;
      color: #fff;
      border-radius: 0.25rem;
    }
    p.reset {
      text-align: right;
      padding-top: 1rem;
      @include sizeColor(0.75rem, #33f);
    }
  }
}
</style>