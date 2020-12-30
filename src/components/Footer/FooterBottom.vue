<!--
 * @Author: 黄灿民
 * @Date: 2020-12-12 10:23:28
 * @LastEditTime: 2020-12-12 14:57:47
 * @LastEditors: 黄灿民
 * @Description: 底部栏
 * @FilePath: \app\src\components\Footer\FooterBottom.vue
-->
<template>
  <footer class="footer">
    <div class="footer-item logo">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-meituan"></use>
      </svg>
    </div>
    <div class="footer-item">
        <svg class="icon big color" aria-hidden="true">
          <use xlink:href="#icon-faxian"></use>
        </svg>
      <span class="describe">发现</span>
    </div>
    <div class="footer-item">
      <svg class="icon color" aria-hidden="true">
        <use xlink:href="#icon-xiaoxi2"></use>
      </svg>
      <span class="describe">消息</span>
    </div>
    <div class="footer-item">
      <svg class="icon color" aria-hidden="true">
        <use xlink:href="#icon-yonghu"></use>
      </svg>
      <span class="describe">我的</span>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterBottom",
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2020;
  color: #ccc;
  background-color: #fff;
  border-top: 1px solid #ccc;
  @include wh(100vw, 2.5rem);
  @include sizeColor(1.5rem, #ccc);
  .logo {
    line-height: 2.5rem;
    font-size: 2rem;
  }
  .footer-item {
    text-align: center;
    @include wh(25%, 2.5rem);
    float: left;
    @include flex(center,center);
    flex-direction: column;
    .describe {
      @include sizeColor(0.65rem, #000);
    }
    .color{
      @include sizeColor(1.25rem,#333)
    }
  }
}
</style>