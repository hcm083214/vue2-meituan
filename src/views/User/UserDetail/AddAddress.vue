<!--
 * @Author: 黄灿民
 * @Date: 2021-01-02 19:38:23
 * @LastEditTime: 2021-01-03 20:48:20
 * @LastEditors: 黄灿民
 * @Description: 添加地址
 * @FilePath: \app\src\views\User\UserDetail\AddAddress.vue
-->
<template>
  <section class="add-address">
    <header-top :goback="true" :user="false" :search="false">
      <h3 slot="title">新增地址</h3>
    </header-top>
    <section class="add-address-content">
      <ul class="info">
        <li class="info-item">
          <input type="text" v-model="name" placeholder="请填写你的姓名" />
        </li>
        <li class="info-item">
          <input
            type="text"
            v-model="address"
            placeholder="请输入小区/写字楼/学校等"
          />
        </li>
        <li class="info-item">
          <input
            type="text"
            v-model="address_detail"
            placeholder="请填写详细送餐地址"
          />
        </li>
        <li class="info-item">
          <input
            type="text"
            v-model="phone"
            placeholder="请填写能够联系到您的手机号"
          />
        </li>
        <li class="info-item">
          <input
            type="text"
            v-model="phone_bk"
            placeholder="备用联系电话（选填）"
          />
        </li>
      </ul>
    </section>
    <div class="address-confirm" @click="addAddress">新增地址</div>
  </section>
</template>

<script>
import HeaderTop from "@/components/Header/HeaderTop.vue";
import { postAddAddress } from "@/server/index";
import { mapState } from "vuex";
export default {
  name: "AddAddress",
  components: { HeaderTop },
  data() {
    return {
      name: "",
      address: "",
      address_detail: "",
      phone: "",
      phone_bk: "",
    };
  },
  computed: {
    ...mapState(["selectionCityGeo"]),
  },
  methods: {
    async addAddress() {
      let addressInfo = {
        name: this.name,
        address: this.address,
        address_detail: this.address_detail,
        phone: this.phone,
        phone_bk: this.phone_bk,
        geohash: this.selectionCityGeo,
        sex: 1,
        tag: "常用地址",
        tag_type: 2,
      };
      let { user_id: userId } = JSON.parse(localStorage.getItem("userInfo"));
      await postAddAddress(addressInfo, userId);
    },
  },
};
</script>

<style lang="scss" scoped>
.add-address {
  .add-address-content {
    margin-top: 2.1rem;
    background-color: #fff;
    ul.info {
      padding: 0.5rem;
      li.info-item {
        border-radius: 0.25rem;
        overflow: hidden;
        margin: 0.5rem 0;
        background-color: #f2f2f2;
        input {
          padding: 0.25rem 0.5rem;
          width: 100%;
          font-size: 0.75rem;
          background: #f2f2f2;
          height: 1.5rem;
        }
      }
    }
  }
  .address-confirm {
    margin: 1rem 0.75rem;
    text-align: center;
    background-color: #4cd964;
    color: #fff;
    padding: 0.5rem 0;
    border-radius: 0.25rem;
  }
}
</style>