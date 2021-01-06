<!--
 * @Author: 黄灿民
 * @Date: 2020-12-10 16:03:04
 * @LastEditTime: 2021-01-06 09:23:19
 * @LastEditors: 黄灿民
 * @Description: 商品列表
 * @FilePath: \vue2-meituan\src\components\ShopList\ShopList.vue
-->
<template>
  <section
    class="shop-list"
    :style="{
      marginTop: marginTop + 'rem',
      paddingBottom: paddingBottom + 'rem',
    }"
  >
    <h3 class="title" v-if="!!title">{{ title }}</h3>

    <router-link
      :to="{ name: 'shopdetail', query: { shopId: item.id } }"
      tag="div"
      class="shop-list-item"
      v-for="item in list"
      :key="item.id"
    >
      <div class="img">
        <div class="tag" v-if="item.attributes && item.attributes.length>0">
          {{
            item.attributes[0].icon_name == "新"
              ? "新品"
              : item.attributes[0].icon_name
          }}
        </div>
        <img :src="'http://elm.cangdu.org/img/' + item.image_path" alt="" />
      </div>
      <div class="shop-list-item-detail">
        <h4 class="list-title">
          {{ item.name }}

          <div class="list-sub-title" v-if="!!item.category">
            {{ item.category }}
          </div>
        </h4>
        <div class="list-price">
          <div class="price">
            <span class="strong">{{ parseInt(Math.random() * 300) }}元</span>
            <span>门市价：{{ parseInt(300 * Math.random() * 0.1) }}元</span>
          </div>
          <div class="sold-count" v-if="!!item.recent_order_num">
            已售{{ item.recent_order_num }}
          </div>
        </div>
      </div>
      <div class="shop-for-sold" v-if="isSold">
        <router-link :to="{name:'recommenddetail'}">
          <button class="btn">抢购</button>
        </router-link>
        
      </div>
    </router-link>
  </section>
</template>

<script>
export default {
  name: "ShopLIst",
  props: {
    title: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
      default: () => [],
    },
    marginTop: {
      type: Number,
      default: 0,
    },
    paddingBottom: {
      type: Number,
      default: 0,
    },
    isSold: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.shop-list {
  background-color: #fff;
  margin-top: 0.75rem;
  border-bottom: 1px solid #ddd8ce;
  padding-left: 0.5rem;
  padding-bottom: 2rem;
  width: 100%;
  .title {
    font-size: 1rem;
    padding: 0.25rem 0;
  }
  .shop-list-item {
    position: relative;
    width: 100%;
    border-top: 1px solid #ddd8ce;
    padding: 0.5rem 0;
    @include flex(flex-start, flex-start);
    .img {
      position: relative;
      width: 25%;
      font-size: 0;
      .tag {
        font-size: 0.6rem;
        position: absolute;
        top: 0.15rem;
        left: 0.15rem;
        padding: 0.15rem 0.25rem;
        background-color: rgba(#ddd8ce, 0.6);
        border-radius: 0.15rem;
        color: #fff;
      }
      img {
        width: 100%;
      }
    }
    .shop-list-item-detail {
      width: 75%;
      flex: 0 1 auto;
      padding-top: 0.2rem;
      padding-left: 0.5rem;
      padding-right: 1rem;
      @include sizeColor(0.75rem, #000);
      .list-title {
        width: 6rem;
        @include textOverFlow();
        padding-bottom: 1.25rem;
      }
      .list-sub-title {
        width: 6rem;
        @include textOverFlow();
        @include sizeColor(0.65rem, #666);
      }
      .list-price {
        @include flex(space-between, center);
        @include sizeColor(0.65rem, #666);
        .price {
          .strong {
            @include sizeColor(0.85rem, #f60);
            padding-right: 0.25rem;
          }
        }
        .sold-count {
          margin-left: 2.75rem;
        }
      }
    }
    .shop-for-sold {
      position: absolute;
      height: 100%;
      top: 1.5rem;
      right: 1rem;
      .btn {
        width: 3rem;
        text-align: center;
        height: 1.5rem;
        line-height: 1.5rem;
        background-color: #f90;
        color: #fff;
      }
    }
  }
}
</style>