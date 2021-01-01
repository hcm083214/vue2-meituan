<!--
 * @Author: 黄灿民
 * @Date: 2020-12-05 15:16:19
 * @LastEditTime: 2021-01-01 14:20:37
 * @LastEditors: 黄灿民
 * @Description: 首页：定位
 * @FilePath: \app\src\views\Home\Home.vue
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
    };
  },
  watch: {
    $route: {
      async handler() {},
      immediate: true,
    },
  },
  computed: {
    ...mapState(["selectionCityGeo"]),
  },
  methods: {
    async getLocationSuccess({ coords: { latitude, longitude } }) {
      const geohash = latitude + "," + longitude;
      const address = await msiteAddress(geohash);
      this.city = address.city;
      localStorage.setItem("geo", JSON.stringify(address));
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
  },
  async mounted() {
    const geo = JSON.parse(localStorage.getItem("geo"));
    if (geo) {
      this.getShopListsData();
      const geoInline = this.$route.params.city;
      let geoCity;
      if (this.selectionCityGeo) {
        geoCity = this.selectionCityGeo;
      } else {
        geoCity = await mergeLocation(geo, geoInline);
      }
      const address = await msiteAddress(geoCity);
      this.city = address.city;
      if (geoCity == geoInline) {
        this.$store.commit("changeGeo", geoCity);
        this.getShopListsData();
        this.$router.push({
          ...this.$route,
          params: {
            city: geoCity,
          },
        });
        return;
      }
      this.$store.commit("changeGeo", geo.geohash);
    } else {
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
    }
  },
};
</script>

<style lang="scss" scoped>
</style>