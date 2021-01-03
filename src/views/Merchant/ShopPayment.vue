<!--
 * @Author: 黄灿民
 * @Date: 2021-01-01 21:02:23
 * @LastEditTime: 2021-01-03 21:06:11
 * @LastEditors: 黄灿民
 * @Description: 付款页面
 * @FilePath: \app\src\views\Merchant\ShopPayment.vue
-->
<template>
  <section class="payment">
    <header-top :goback="true" :user="false" :search="false">
      <h3 slot="title">在线支付</h3>
    </header-top>
    <section class="payment-content">
      <div class="payment-count-down">
        <p>支付剩余时间</p>
        <p>
          <span>00</span>: <span>{{ minute }}</span
          >: <span>{{ second }}</span>
        </p>
      </div>
      <div class="payment-content-title">选择支付方式</div>
      <ul class="payment-methods">
        <li @click="isActive = 'zhifubao'">
          <span>支付宝</span
          ><span
            :class="isActive == 'zhifubao' ? 'check active' : 'check'"
          ></span>
        </li>
        <li @click="isActive = 'weixin'">
          <span>微信</span
          ><span
            :class="isActive == 'weixin' ? 'check active' : 'check'"
          ></span>
        </li>
      </ul>
      <div class="payment-content-confirm" @click="confirm">确认支付</div>
    </section>
  </section>
</template>

<script>
import HeaderTop from "@/components/Header/HeaderTop.vue";
import msgBox from "@/components/MessageBox/index";

import { mapState } from "vuex";
export default {
  components: { HeaderTop },
  name: "ShopPayment",
  data() {
    return {
      minute: "15",
      second: "00",
      timer: null,
      countNum: 900, //倒计时15分钟
      isActive: "zhifubao",
    };
  },
  mounted() {
    this.confirm();
    this.timer = setInterval(() => {
      this.countNum > 0 ? this.countNum-- : 0;
      let minute = parseInt(this.countNum / 60);
      this.minute = minute > 10 ? minute : `0${minute}`;
      let second = parseInt(this.countNum % 60);
      this.second = second > 10 ? second : `0${second}`;
      if (minute == "00" && second == "00") {
        this.confirm();
      }
    }, 1000);
  },
  computed: {
    ...mapState(["alreadyShoppingFood", "selectionCityGeo", "currentShopId"]),
  },
  methods: {
    confirm() {
      msgBox({
        type: "alert",
        title: "此页面无法付款",
        msg: "请使用正版app",
      });
      setTimeout(async () => {

      }, 1500);
    },
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.payment {
  .payment-content {
    margin-top: 2.1rem;
    .payment-count-down {
      height: 8rem;
      @include flex(center, center);
      flex-wrap: wrap;
      flex-direction: column;
      background-color: #fff;
    }
    .payment-content-title {
      margin: 0.5rem 0;
      margin-left: 0.75rem;
    }
    ul.payment-methods {
      background-color: #fff;
      padding: 0.5rem 1rem;
      li {
        padding: 0.5rem 0;
        @include flex(space-between, center);
        .check {
          @include wh(1rem, 1rem);
          background-color: #ccc;
          border-radius: 50%;
        }
        .active {
          background-color: #0c0;
        }
      }
    }
    .payment-content-confirm {
      margin: 1.25rem 1rem;
      text-align: center;
      padding: 0.5rem;
      background-color: #0c0;
      color: #fff;
    }
  }
}
</style>