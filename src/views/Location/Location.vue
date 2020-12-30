<!--
 * @Author: 黄灿民
 * @Date: 2020-12-06 23:46:45
 * @LastEditTime: 2020-12-09 10:45:52
 * @LastEditors: 黄灿民
 * @Description: 城市定位
 * @FilePath: \app\src\views\Location\Location.vue
-->
<template>
  <div class="location">
    <header-top :goback="true" :search="false">
      <div slot="title">选择城市</div>
      <div slot="gohome" class="gohome">
        <router-link :to="{ name: 'Home' }">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shouye"></use>
          </svg>
        </router-link>
        <router-link :to="{ name: 'Home' }">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-sousuo"></use>
          </svg>
        </router-link>
      </div>
    </header-top>

    <div class="location-content">
      <section class="location-city bc">
        <span>定位城市：{{ city }}</span>
      </section>

      <section class="hot-city">
        <div class="title"><span>热门城市</span></div>
        <ul class="table bc">
          <router-link
            :to="{
              name: 'city',
              params: { city: city.latitude + ',' + city.longitude },
            }"
            v-for="city in hotCity"
            :key="city.area_code"
          >
            <li>
              {{ city.name }}
            </li>
          </router-link>
        </ul>
      </section>

      <section class="group-city">
        <div class="title"><span>所有城市</span></div>
        <ul class="bc">
          <li class="little" v-for="item in groupCityKey" :key="item">
            <a :href="'#' + item">{{ item }}</a>
          </li>
        </ul>
        <ul class="table bc" v-for="(group, name) in groupCity" :key="name">
          <h4>
            <a :name="name">{{ name }}</a>
          </h4>
          <li v-for="city in group" :key="city.area_code">
            <router-link
              :to="{
                name: 'city',
                params: { city: city.latitude + ',' + city.longitude },
              }"
            >
              {{ city.name }}
            </router-link>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import HeaderTop from "@/components/Header/HeaderTop";
import { cityGuess } from "@/server/index";
export default {
  name: "Location",
  components: {
    HeaderTop,
  },
  data() {
    return {
      city: "定位中",
      hotCity: [],
      groupCity: {},
    };
  },
  computed: {
    groupCityKey() {
      return Object.keys(this.groupCity).sort();
    },
  },
  async mounted() {
    const geo = localStorage.getItem("geo");
    geo && (this.city = JSON.parse(geo).city);
    const citys = await cityGuess("hot");
    this.hotCity.push(...citys);
    const group = await cityGuess("group");
    this.groupCity = { ...group };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.location {
  .gohome {
    @include flex(space-around);
  }
  .location-content {
    @include sizeColor(0.8rem, #000);
    margin-top: 2.5rem;
    padding: 0 0.5rem;
    .bc {
      background-color: #fff;
    }
    .location-city {
      padding: 0.45rem;
    }
    .hot-city {
      margin-top: 0.5rem;
    }
    .title {
      padding: 0.5rem 0;
    }
    .table {
      min-height: 0.8rem;
      position: relative;
      overflow: hidden;
      z-index: 0;
      border-top: 1px solid #ddd8ce;
      h4 {
        float: left;
        @include wh(25%, 3.9rem);
        line-height: 4rem;
        text-align: center;
        border-bottom: 1px solid #ddd8ce;
      }
      li {
        color: #333;
        display: inline-block;
        width: 25%;
        height: 2rem;
        line-height: 2rem;
        font-size: 0.7rem;
        text-align: center;
        border-bottom: 1px solid #ddd8ce;
        margin-bottom: -1px;
        float: left;
        position: relative;
        z-index: 10;
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        a {
          color: #333;
        }
      }
    }
    .table::before {
      content: "";
      position: absolute;
      width: 25%;
      left: 25%;
      height: 100%;
      border-left: 1px solid #ddd8ce;
      border-right: 1px solid #ddd8ce;
      clear: both;
    }
    .table::after {
      content: "";
      position: absolute;
      width: 10%;
      left: 75%;
      height: 100%;
      border-left: 1px solid #ddd8ce;
      border-right: none;
      clear: both;
    }

    li.little {
      width: 20%;
      @include sizeColor(0.6rem, #fe8c00);
      height: 2rem;
      line-height: 2rem;
      display: inline-block;
      text-align: center;
    }
  }
}
</style>