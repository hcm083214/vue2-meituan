<!--
 * @Author: 黄灿民
 * @Date: 2020-12-23 20:24:35
 * @LastEditTime: 2020-12-24 19:12:47
 * @LastEditors: 黄灿民
 * @Description: 商铺信息
 * @FilePath: \app\src\views\Merchant\ShopDetail\ShopInfomation.vue
-->
<template>
  <section class="shop-infomation">
    <header-top :goback="true" :user="false" :search="false">
      <h2 slot="title">商家详情</h2>
    </header-top>
    <div class="h">
      <div class="shop-props">
        <h3>活动与属性</h3>
        <ul class="shop-props_ul" v-if="shopDetailsData[0].activities.length">
          <li v-for="item in shopDetailsData[0].activities" :key="item.id">
            <span
              class="text"
              :style="{ backgroundColor: '#' + item.icon_color }"
              >{{ item.icon_name }}</span
            >
            <span>{{ item.description }}(APP专享)</span>
          </li>
        </ul>
        <ul class="shop-props_ul">
          <li v-for="item in shopDetailsData[0].supports" :key="item.id">
            <span
              class="text"
              :style="{ backgroundColor: '#' + item.icon_color }"
              >{{ item.icon_name }}</span
            >
            <span>{{ item.description }}(APP专享)</span>
          </li>
        </ul>
      </div>

      <div class="shop-props">
        <h3>食品监督安全公示</h3>
        <ul class="shop-props_ul">
          <li>
            <span>监督检查结果：</span>
            <span class="shop_status_well" v-if="shopDetailsData[0].status == 1"
              >良好</span
            >
            <span class="shop_status_bad" v-else>差</span>
          </li>
          <li>
            <span>检查日期：</span>
            <span>{{
              shopDetailsData[0].identification.identificate_date &&
              shopDetailsData[0].identification.identificate_date.split("T")[0]
            }}</span>
          </li>
        </ul>
      </div>

      <div class="shop-props">
        <h3>商家信息</h3>
        <ul class="shop-props_ul">
          <li>{{ shopDetailsData[0].name }}</li>
          <li>地址：{{ shopDetailsData[0].address }}</li>
          <li>营业时间：[{{ shopDetailsData[0].opening_hours[0] }}]</li>
          <li class="space-between" @click="showImage(shopDetailsData[0].license.business_license_image)">
            <span>营业执照</span>
            <span>></span>
          </li>
          <li class="space-between" @click="showImage(shopDetailsData[0].license.catering_service_license_image)">
            <span>餐饮服务许可证</span>
            <span>></span>
          </li>
        </ul>
      </div>
    </div>
    <div class="mask" v-show="isVisibe" @click.prevent="isVisibe = false">
      <img :src="`http://elm.cangdu.org/img/167543e555722785.jpeg`" alt="" />
    </div>
  </section>
</template>

<script>
import HeaderTop from "@/components/Header/HeaderTop.vue";
import { shopDetails } from "@/server/index";
export default {
  name: "ShopInfomation",
  components: { HeaderTop },
  data() {
    return {
      shopDetailsData: [],
      isVisibe: false,
      imgPath:'',
    };
  },
  async mounted() {
    const shopId = this.$route.query.shopId;
    this.shopDetailsData = await shopDetails(shopId);
  },
  methods: {
      showImage(imgPath) {
          this.imgPath = imgPath;
          console.log("🚀 ~ file: ShopInfomation.vue ~ line 102 ~ showImage ~ imgPath", imgPath)
          this.isVisibe = true;
      }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.shop-infomation {
  .shop-props {
    border-radius: 0.5rem;
    margin-top: 0.5rem;
    background-color: #fff;
    padding: 0 0.75rem;
    padding-bottom: 0.5rem;
    h3 {
      font-size: 1rem;
      padding: 0.5rem 0;
      border-bottom: 1px solid #f1f1f1;
    }
    .shop-props_ul {
      li {
        padding: 0.25rem 0;
        font-size: 0.75rem;
        .text {
          margin-right: 0.5rem;
          color: #fff;
          padding: 0.05rem 0.2rem;
        }
      }
      li.space-between {
        @include flex(space-between, center);
      }
    }
  }
  .mask {
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 101;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    img{
        width:100%;
        position: absolute;
        top:50%;
        transform: translateY(-50%);
    }
  }
}
</style>