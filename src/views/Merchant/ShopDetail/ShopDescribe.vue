<!--
 * @Author: 黄灿民
 * @Date: 2020-12-22 19:58:30
 * @LastEditTime: 2020-12-24 20:14:08
 * @LastEditors: 黄灿民
 * @Description: 商铺描述信息
 * @FilePath: \app\src\views\Merchant\ShopDetail\ShopDescribe.vue
-->
<template>
  <section class="shop-describe" ref="des" :style="{'margin-left':` ${marginLR}rem`,'margin-right':` ${marginLR}rem`}"> 
    <div class="img">
      <img :src="`http://elm.cangdu.org/img/${imgPath}`" alt="" />
    </div>
    <h3>{{ title }}</h3>
    <div class="shop-info">
      <rank :ranking="rating" />
      <div class="info">
        <span>{{ rating }}分</span>
        <span>({{ rating_count }}人评)</span>
        <span>{{ `￥${parseInt(Math.random() * 100)}/人` }}</span>
      </div>
    </div>
    <div class="tag">
      <span> {{ promotion_info }}</span>
    </div>
    <div class="location">
      <div class="location-left">
        <div class="address">{{ address }}</div>
        <router-link class="fontBold" :to="{ name: 'takeout' ,query:{shopId}}"
        v-if="isShowTakeOut"
          >外卖 ></router-link
        >
        <div class="s">
          <span>营业时间：{{ opening_hours }}</span> <br />
          <router-link class="fontBold" :to="{name:'shopinfomation',query:{shopId}}">更多信息 ></router-link>
        </div>
      </div>

      <ul class="location-right">
        <li>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-car"></use>
          </svg>
          <span>打车</span>
        </li>
        <li>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-dianhua"></use>
          </svg>
          <span>联系商家</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import Rank from "@/components/Rank/Rank";
export default {
  name: "ShopDescribe",
  components: {
    Rank,
  },
  props: {
    isShowTakeOut:{
      type:Boolean,
      default:true,
    },
    shopDetailsData: {
      type: Array,
      default: () => [],
    },
    shopId: {
      type: Number,
      default: 1,
    },
    marginLR:{
      type:Number,
      default:0,
    }
  },
  computed: {
    title() {
      return this.shopDetailsData.length > 0
        ? this.shopDetailsData[0].name
        : "";
    },
    imgPath() {
      return this.shopDetailsData.length > 0
        ? this.shopDetailsData[0].image_path
        : "";
    },
    rating() {
      return this.shopDetailsData.length > 0
        ? this.shopDetailsData[0].rating
        : 0;
    },
    rating_count() {
      return this.shopDetailsData.length > 0
        ? this.shopDetailsData[0].rating_count
        : 0;
    },
    promotion_info() {
      return this.shopDetailsData.length > 0
        ? this.shopDetailsData[0].promotion_info
        : "";
    },
    address() {
      return this.shopDetailsData.length > 0
        ? this.shopDetailsData[0].address
        : "";
    },
    opening_hours() {
      return this.shopDetailsData.length > 0
        ? this.shopDetailsData[0].opening_hours[0]
        : "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.shop-describe {
   @include sizeColor(0.7rem, #333);
  margin-top: 2.2rem;
  border-radius: 10px;
  background-color: #fff;
  position: relative;
  z-index: 1;
  padding: 0.75rem;
  .img {
    margin: 0 auto;
    @include wh(100%, 10rem);
    overflow: hidden;
    font-size: 0;
    img {
      width: 100%;
    }
  }
  h3 {
    padding-top: 0.5rem;
  }
  .shop-info {
    width: 100%;
    @include flex(flex-start, center);
    .info {
      margin-left: 0.25rem;
      span:nth-child(3) {
        padding: 0 0.25rem;
      }
    }
  }
  .tag {
    padding: 0.75rem 0;
    span {
      padding: 0.25rem;
      background-color: rgb(230, 184, 184);
      color: rgb(248, 27, 64);
    }
  }
  .location {
    @include flex(flex-start, flex-start);

    .location-left {
      width: 60%;
      .fontBold {
        font-weight: bolder;
      }
      div {
        padding-top: 0.25rem;
      }
    }
  }
  .location-right {
    width: 40%;
    @include flex(center, center);
    padding-top: 0.5rem;
    li {
      svg {
        font-size: 1.5em;
      }
      span {
        margin-top: 0.25rem;
      }
      width: 50%;
      @include flex(center, center);
      flex-direction: column;
    }
  }
}
</style>