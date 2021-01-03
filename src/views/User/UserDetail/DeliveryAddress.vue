<!--
 * @Author: 黄灿民
 * @Date: 2021-01-02 18:52:15
 * @LastEditTime: 2021-01-03 20:31:46
 * @LastEditors: 黄灿民
 * @Description: 收货地址
 * @FilePath: \app\src\views\User\UserDetail\DeliveryAddress.vue
-->
<template>
  <section class="delivery-address">
    <header-top :goback="true" :user="false" :search="false">
      <h3 slot="title">编辑地址</h3>
    </header-top>
    <section class="delivery-address-content">
      <ul class="addressList" v-if="address.length">
        <li v-for="(item, index) in address" :key="index">
          <p>姓名：{{item.name}}</p>
          <p>号码：{{item.phone}}</p>
        </li>
      </ul>
      <ul class="info">
        <router-link :to="{ name: 'addaddress' }">
          <li class="info-item">
            <span>新增地址</span>
            <div class="info-item-right">
              <span>></span>
            </div>
          </li>
        </router-link>
      </ul>
    </section>
  </section>
</template>

<script>
import HeaderTop from "@/components/Header/HeaderTop.vue";
import { getAddress } from "@/server/index.js";
export default {
  components: { HeaderTop },
  name: "DeliveryAddress",
  data() {
    return {
      address: [],
    };
  },
  async mounted() {
    const { id: userId } = JSON.parse(localStorage.getItem("userInfo"));
    this.address = await getAddress(userId);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.delivery-address-content {
  margin-top: 2.3rem;
  ul.addressList {
    padding: 0.25rem 1rem;
    background-color: #fff8c3;
    @include sizeColor(0.75rem, #333);
    li{
      border-bottom: 1px solid #eee;
      padding: 0.15rem;
    }
  }
  ul.info {
    background-color: #fff;
    @include sizeColor(0.75rem, #333);
    li.info-item {
      margin-top: 0.3rem;
      @include sizeColor(0.75rem, #333);
      position: relative;
      padding: 0.5rem 1rem;
      @include flex(space-between, center);
      border-bottom: 1px solid #dedede;
      .info-item-right {
        @include flex(center, center);
      }
    }
  }
}
</style>