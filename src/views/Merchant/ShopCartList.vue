<!--
 * @Author: 黄灿民
 * @Date: 2021-01-01 18:02:08
 * @LastEditTime: 2021-01-03 21:14:22
 * @LastEditors: 黄灿民
 * @Description: 购物车列表详情
 * @FilePath: \app\src\views\Merchant\ShopCartList.vue
-->
<template>
  <section class="shop-cart-list">
    <header-top :goback="true" :user="false" :search="false">
      <h3 slot="title">购物车</h3>
    </header-top>
    <ul class="shop-cart-list-content">
      <li
        v-for="(item, index) in alreadyShoppingFood"
        :key="item.id"
        class="shop-cart-list-content-item"
      >
        <div class="form" @click="changeItemSelect(index)">
          <input
            type="checkbox"
            class="form-checkbox"
            v-model="item.isSelect"
          />
          <div :class="item.isSelect ? 'box selected' : 'box'"></div>
        </div>
        <div class="img">
          <img :src="`http://elm.cangdu.org/img/${item.image_path}`" alt="" />
        </div>
        <div class="text">
          <h4>{{ item.name }}</h4>
          <div class="price">
            <span class="unitPrice"> 单价:￥{{ item.price }}</span>
            <div class="count">
              <button class="minus btn" @click="minus(index)">-</button>
              <span class="counts">{{ item.count }}</span>
              <button class="add btn" @click="add(index)">+</button>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <footer class="shop-cart-list-footer">
      <div class="form" @click="changeAllSelect">
        <input type="checkbox" name="" id="" class="form-checkbox" />
        <div :class="isAllSelect ? 'box selected' : 'box'"></div>
        <span>全选</span>
      </div>
      <div class="account">
        <span class="total">￥{{ totalPrice }}</span>
        <router-link :to="{ name: 'shoppayment' }">
          <button class="btn">结算</button>
        </router-link>
      </div>
    </footer>
  </section>
</template>

<script>
import HeaderTop from "@/components/Header/HeaderTop.vue";
import { mapState } from "vuex";
// import { placeOrders } from "@/server/index";
export default {
  components: { HeaderTop },
  name: "ShopCartList",
  data() {
    return {
      totalPrice: 0,
      isAllSelect: false,
    };
  },
  computed: {
    ...mapState(["alreadyShoppingFood", "selectionCityGeo", "currentShopId"]),
  },
  methods: {
    minus(index) {
      this.totalPrice = 0;
      this.alreadyShoppingFood[index].count > 0
        ? this.alreadyShoppingFood[index].count--
        : 0;
      this.total();
    },
    add(index) {
      this.totalPrice = 0;
      this.alreadyShoppingFood[index].count++;
      this.total();
    },
    total() {
      this.totalPrice = 0;
      this.alreadyShoppingFood.forEach((item) => {
        if (!item.isSelect) return;
        this.totalPrice += item.price * item.count;
      });
    },
    changeItemSelect(index) {
      this.alreadyShoppingFood[index].isSelect = !this.alreadyShoppingFood[
        index
      ].isSelect;
      this.total();
    },
    changeAllSelect() {
      this.isAllSelect = !this.isAllSelect;
      this.alreadyShoppingFood.map((item) => {
        item.isSelect = true;
      });
      this.total();
    },
    // async confirm() {
    //   //下订单
    //   const { user_id: userId } = JSON.parse(localStorage.getItem("userInfo"));
    //   const orderInfo = {
    //     address_id: this.currentShopId + 1,
    //     restaurant_id: this.currentShopId + 2,

    //     geohash: this.selectionCityGeo,
    //     entities: this.alreadyShoppingFood,
    //   };
    //   let cartId = this.currentShopId;
    //   await placeOrders(orderInfo, userId, cartId);
    // },
  },
  mounted() {
    this.total();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";

.shop-cart-list {
  .form {
    position: relative;
    margin-left: 0.75rem;
    @include flex(flex-start, center);
    .form-checkbox {
      display: none;
    }
    .box {
      @include wh(0.75rem, 0.75rem);
      border: 1px solid #333;
      border-radius: 50%;
      margin-right: 0.75rem;
    }
    .selected {
      background-color: #f44;
      border: none;
    }
  }
  ul.shop-cart-list-content {
    margin: 0 1rem;
    margin-top: 2.5rem;

    li.shop-cart-list-content-item {
      padding: 0.5rem 0;
      @include flex(flex-start, center);
      background-color: #fff;
      margin-top: 0.5rem;

      .img {
        width: 4.5rem;
        margin-right: 0.75rem;
        img {
          width: 100%;
        }
      }
      .text {
        h4 {
          width: 100%;
          margin-bottom: 0.75rem;
          @include textOverFlow();
        }
        flex: 0 1 auto;
        width: calc(100% - 6rem);
        .price {
          @include flex(space-between, center);
          .unitPrice {
            @include sizeColor(0.75rem, #333);
          }

          .count {
            margin-right: 1rem;
            .btn {
              @include wh(1.25rem, 1rem);
            }
            .counts {
              @include wh(1.5rem, 1rem);
              display: inline-block;
              text-align: center;
              line-height: 1rem;
            }
          }
        }
      }
    }
  }
  .shop-cart-list-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #e9e9e9;
    height: 3rem;
    width: 100vw;
    padding: 0 1rem;
    @include flex(space-between, center);

    .account {
      .total {
        margin-right: 0.5rem;
      }
      .btn {
        padding: 0.5rem 1rem;
        color: #fff;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.596);
        background-color: rgb(238, 125, 125);
        border-radius: 1rem;
      }
    }
  }
}
</style>