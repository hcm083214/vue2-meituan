<!--
 * @Author: 黄灿民
 * @Date: 2020-12-08 11:09:57
 * @LastEditTime: 2020-12-08 22:02:34
 * @LastEditors: 黄灿民
 * @Description: 消息框弹窗
 * @FilePath: \app\src\components\MessageBox\MessageBox.vue
-->
<template>
  <transition name="message-box-fade">
    <section class="mask">
      <div class="message-box-content center">
        <p class="header">
          <span>{{title}}</span>
          <br />
          <span>{{msg}}</span>
        </p>
        <div class="footer">
            <span class='footer-btn' @click="confirm">确认</span>
            <span class='footer-btn' @click='cancel'>取消</span>
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        msg:{
            type: String,
            default: ''
        }
    },
    methods: {
        confirm() {
            this.defaultCallback('confirm');
            this.destroy()
        },
        cancel(){
            this.defaultCallback('cancel');
            this.destroy();
        }
    },
    // mounted () {
    //     console.log(this);
    // },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 2020;
  background-color: rgba(#000, 0.5);
  .message-box-content {
    background-color: #fff;
    width: 90vw;
    .header {
      @include sizeColor(0.65rem, #000);
      text-align: center;
      padding: 1rem 0;
      border-bottom: 1px solid #D8D8D8;
    }
    .footer{
        @include sizeColor(0.65rem, #FE8C00);
        .footer-btn{
            display: inline-block;
            width: 50%;
            text-align: center;
            padding: 0.6rem 0;
        }
    }
  }
  .center {
    @include center;
    position: fixed;
    top: 40%;
  }
}

.message-box-fade-enter-active,
.message-box-fade-leave-active {
  transition: opacity 0.3s;
}
.message-box-fade-enter,
.message-box-leave-enter {
  opacity: 0;
}
</style>