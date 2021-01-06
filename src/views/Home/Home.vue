<!--
 * @Author: 黄灿民
 * @Date: 2020-12-05 15:16:19
 * @LastEditTime: 2021-01-05 22:53:46
 * @LastEditors: 黄灿民
 * @Description: 首页：定位
 * @FilePath: \vue2-meituan\src\views\Home\Home.vue
-->
<template>
  <div>
    <header-top :user="true">
      <div slot="location" class="position">
        <router-link :to="{ name: 'location' }">
          <span>{{ city }}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiangxia"></use>
          </svg>
        </router-link>
      </div>
    </header-top>
    <service-list />
    <shop-list
      title="猜你喜欢"
      :list="shopLists"
      :marginTop="0.75"
      :paddingBottom="2"
    ></shop-list>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
import HeaderTop from "@/components/Header/HeaderTop";
import FooterBottom from "@/components/Footer/FooterBottom";
import ShopList from "@/components/ShopList/ShopList";
import ServiceList from "@/views/Home/Service";
import { msiteAddress, shopList } from "@/server/index";
import { mergeLocation } from "@/assets/js/util.js";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    HeaderTop,
    ServiceList,
    ShopList,
    FooterBottom,
  },
  data() {
    return {
      city: "定位",
      shopListTitle: "猜你喜欢",
      shopLists: [],
      geoInline: "", //用户选择的城市的经纬度
      geoCity: "", //保存用户最终确认的定位城市的经纬度（系统定位和用户选择二选一的结果）
    };
  },
  watch: {
    $route: {
      async handler() {},
      immediate: true,
    },
  },
  computed: {
    ...mapState(["selectionCityGeo"]), //保存在localStorage中最终的定位城市信息（系统定位和用户选择二选一的结果）
  },
  methods: {
    location() {
      if ("geolocation" in navigator) {
        /* 地理位置服务可用 */
        navigator.geolocation.getCurrentPosition(
          this.getLocationSuccess,
          this.getLocationFail
        );
      } else {
        /* 地理位置服务不可用 */
        this.$router.push({
          name: "location",
        });
      }
    },
    async getLocationSuccess({ coords: { latitude, longitude } }) {
      const geohash = latitude + "," + longitude;
      const address = await msiteAddress(geohash);
      this.city = address.city;
      localStorage.setItem("geo", JSON.stringify(address));
      this.getShopListsData();
    },
    getLocationFail() {
      this.$router.push({
        name: "location",
      });
    },
    async getShopListsData() {
      const cityFromRouter = this.$route.params.city;
      const cityFromLocalStorage = JSON.parse(localStorage.getItem("geo"))
        .geohash;
      const city = cityFromRouter || cityFromLocalStorage;
      const latitude = city.split(",")[0];
      const longitude = city.split(",")[1];
      const shopLists = await shopList(latitude, longitude);
      this.shopLists = shopLists.data;
    },
    async changeLocationCity() {
      this.geoInline = this.$route.params.city; //用户选择的城市的经纬度
      const geo = JSON.parse(localStorage.getItem("geo")); //保存定位的结果
      if (this.geoInline) {
        this.geoCity = await mergeLocation(geo, this.geoInline);
      }
      const address = await msiteAddress(this.geoCity);
      this.city = address.city;
      this.$store.commit("changeGeo", this.geoCity);
      this.$router.push({
        ...this.$route,
        params: {
          city: this.geoCity,
        },
      });
    },
  },
  async mounted() {
    this.location(); //定位
    this.changeLocationCity();
    this.getShopListsData();
  },
};
</script>

<style lang="scss" scoped>
</style>