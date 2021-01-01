<!--
 * @Author: 黄灿民
 * @Date: 2020-12-31 17:14:37
 * @LastEditTime: 2020-12-31 22:48:02
 * @LastEditors: 黄灿民
 * @Description: 密码重置
 * @FilePath: \app\src\views\Login\Resset.vue
-->
<template>
  <section class="resset">
    <header-top :goback="true" :user="false" :search="false">
      <h2 slot="title">密码重置</h2>
    </header-top>
    <section class="content">
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
            type="text"
            class="user"
            placeholder="旧密码"
            v-model="oldpassWord"
          />
        </div>
      </div>
      <div class="form">
        <div class="form-group">
          <input
            type="text"
            class="user"
            placeholder="请输入新密码"
            v-model="newpassword"
          />
        </div>
      </div>
      <div class="form">
        <div class="form-group">
          <input
            type="text"
            class="user"
            placeholder="请确认新密码"
            v-model="confirmpassword"
          />
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
      <button class="btn" @click="changePwd">确认修改</button>
    </footer>
  </section>
</template>

<script>
import HeaderTop from "@/components/Header/HeaderTop.vue";
import { getcaptchas, changePassword } from "@/server/index.js";

export default {
  components: { HeaderTop },
  data() {
    return {
      username: "",
      oldpassWord: "",
      newpassword: "",
      confirmpassword: "",
      captcha_code: "",
      verificationImg: "",
    };
  },
  methods: {
    async freshVerification() {
      this.verificationImg = await getcaptchas();
    },
    async changePwd() {
      console.log("111");
      let username = this.username;
      let oldpassWord = this.oldpassWord;
      let newpassword = this.newpassword;
      let confirmpassword = this.confirmpassword;
      let captcha_code = this.captcha_code;
      await changePassword(
        username,
        oldpassWord,
        newpassword,
        confirmpassword,
        captcha_code
      );
    },
  },
  async mounted() {
    this.verificationImg = await getcaptchas();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.resset {
  margin-top: 2.1rem;
  .content {
    background-color: #fff;
    padding: 1rem 1.5rem;
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
  .login-footer {
    padding: 0.5rem 1rem;
    .btn {
      margin-top: 0.5rem;
      padding: 0.5rem 0;
      width: 100%;
      background-color: #4cd964;
      color: #fff;
      border-radius: 0.25rem;
    }
  }
}
</style>