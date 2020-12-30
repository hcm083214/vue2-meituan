<!--
 * @Author: 黄灿民
 * @Date: 2020-12-12 16:29:57
 * @LastEditTime: 2020-12-14 14:56:15
 * @LastEditors: 黄灿民
 * @Description: 分类服务列表
 * @FilePath: \app\src\views\Merchant\ServiceLIst.vue
-->
<template>
  <section class="service-list">
    <header-top :goback="true" :user="false" :search="false">
      <h2 slot="title">{{ title }}</h2>
    </header-top>

    <ul class="service-selection">
      <li class="list-item">
        <div class="service-selection-item border-right">
          <h4
            :class="
              titleIsSel
                ? 'service-selection-default active'
                : 'service-selection-default'
            "
            @click="changeTitleSel"
          >
            <span v-show="titleIsSel">分类</span>
            <span v-show="!titleIsSel">{{ title }}</span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiala"></use>
            </svg>
          </h4>
        </div>

        <section class="service-selection-list" v-show="titleIsSel">
          <div class="mask"></div>
          <ul class="service-selection-list-category">
            <li
              v-for="cates in category"
              :key="cates.id"
              @click="changeCategorySelItem(cates.name)"
            >
              <!-- <img
                :src="
                  'https://fuss10.elemecdn.com/b/ff/' + cates.image_url + '.png'
                "
                alt=""
              /> -->
              <div
                :class="
                  categorySelItem == cates.name
                    ? 'category-content active'
                    : 'category-content'
                "
              >
                <span>{{ cates.name }}</span>
                <span>></span>
              </div>

              <ul
                class="service-selection-list-category-item"
                v-show="cates.name === categorySelItem"
              >
                <li
                  v-for="item in cates.sub_categories"
                  :key="item.id"
                  class="category-item-content"
                  @click="changeCategoryContent(cates)"
                >
                  <span>{{ item.name }}</span>
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </li>

      <li class="list-item">
        <div class="service-selection-item border-right">
          <h4
            :class="
              orderIsSel
                ? 'service-selection-default active'
                : 'service-selection-default'
            "
            @click="changeOrderSel"
          >
            <span v-show="orderIsSel">排序</span>
            <span v-show="!orderIsSel">排序</span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiala"></use>
            </svg>
          </h4>
        </div>

        <section class="service-selection-list" v-show="orderIsSel">
          <div class="mask"></div>
          <ul class="service-selection-list-category">
            <li class="order-content" @click="changeOrderContent">
              <svg class="icon icon-order" aria-hidden="true">
                <use xlink:href="#icon-meishi"></use>
              </svg>
              <div class="order-content-item">
                <span>智能排序</span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-sousuo"></use>
                </svg>
              </div>
            </li>

            <li class="order-content" @click="changeOrderContent">
              <svg class="icon icon-order" aria-hidden="true">
                <use xlink:href="#icon-meishi"></use>
              </svg>
              <div class="order-content-item">
                <span>距离最近</span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-sousuo"></use>
                </svg>
              </div>
            </li>

            <li class="order-content" @click="changeOrderContent">
              <svg class="icon icon-order" aria-hidden="true">
                <use xlink:href="#icon-meishi"></use>
              </svg>
              <div class="order-content-item">
                <span>销量最高</span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-sousuo"></use>
                </svg>
              </div>
            </li>

            <li class="order-content" @click="changeOrderContent">
              <svg class="icon icon-order" aria-hidden="true">
                <use xlink:href="#icon-meishi"></use>
              </svg>
              <div class="order-content-item">
                <span>起送价最低</span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-sousuo"></use>
                </svg>
              </div>
            </li>

            <li class="order-content" @click="changeOrderContent">
              <svg class="icon icon-order" aria-hidden="true">
                <use xlink:href="#icon-meishi"></use>
              </svg>
              <div class="order-content-item">
                <span>配送速度最快</span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-sousuo"></use>
                </svg>
              </div>
            </li>

            <li class="order-content" @click="changeOrderContent">
              <svg class="icon icon-order" aria-hidden="true">
                <use xlink:href="#icon-meishi"></use>
              </svg>
              <div class="order-content-item">
                <span>评分最高</span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-sousuo"></use>
                </svg>
              </div>
            </li>
          </ul>
        </section>
      </li>

      <li class="list-item">
        <div class="service-selection-item border-right">
          <h4
            :class="
              filterIsSel
                ? 'service-selection-default active'
                : 'service-selection-default'
            "
            @click="changeFilterSel"
          >
            <span v-show="filterIsSel">筛选</span>
            <span v-show="!filterIsSel">筛选</span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiala"></use>
            </svg>
          </h4>
        </div>

        <section class="service-selection-list" v-show="filterIsSel">
          <div class="mask"></div>
          <ul class="service-selection-list-category">
            <li class="filter-content">
              <h4>配送方式</h4>
              <ul class="content">
                <li
                  :class="[
                    activitySelArr[0].status ? 'active' : '',
                    'content-item',
                  ]"
                  v-for="item in delivery"
                  :key="item.id"
                  @click="changeFilterSelItem(item.id)"
                >
                  <span
                    :style="{ border: '1px solid #ccc', color: '#333' }"
                    v-if="!activitySelArr[0].status"
                    >送</span
                  >
                  <span v-else>v</span>
                  <span>{{ item.text }}</span>
                </li>
              </ul>
            </li>
            <li class="filter-content">
              <h4>商家属性（可以多选）</h4>
              <ul class="content">
                <li
                  :class="[
                    activitySelArr[index + 1].status ? 'active' : '',
                    'content-item',
                  ]"
                  v-for="(item, index) in activity"
                  :key="item.id"
                  @click="changeFilterSelItem(item.id)"
                >
                  <span
                    :style="{
                      border: '1px solid #' + item.icon_color,
                      color: '#' + item.icon_color,
                    }"
                    v-if="!activitySelArr[index + 1].status"
                  >
                    {{ item.icon_name }}
                  </span>
                  <span v-else>v</span>
                  <span>{{ item.name }}</span>
                </li>
              </ul>
            </li>
            <li class="btn-group">
              <button class="btn btn-clear" @click="filterClear">清空</button>
              <button class="btn btn-confirm" @click="filterConfirm">
                确定
                <span v-show="activitySelCount">{{ activitySelCount }}</span>
              </button>
            </li>
          </ul>
        </section>
      </li>
    </ul>
    <shop-list :list="shopListData" />
    <footer-bottom></footer-bottom>
  </section>
</template>

<script>
import HeaderTop from "@/components/Header/HeaderTop.vue";
import ShopList from "@/components/ShopList/ShopList";
import FooterBottom from "@/components/Footer/FooterBottom";
import {
  foodCategory,
  foodDelivery,
  foodActivity,
  shopList,
} from "@/server/index";
export default {
  name: "ServiceLIst",
  components: {
    HeaderTop,
    ShopList,
    FooterBottom,
  },
  data() {
    return {
      title: "",
      titleIsSel: false,
      orderIsSel: false,
      filterIsSel: false,
      category: [], //商铺分类列表
      categorySelItem: "",
      delivery: [], //配送方式
      activity: [], //商家属性活动列表
      activitySelArr: [],
      shopListData: [],
    };
  },
  methods: {
    async getShopListData(params) {
      const latitude = this.$store.state.selectionCityGeo.split(",")[0];
      const longitude = this.$store.state.selectionCityGeo.split(",")[1];
      const result = await shopList(latitude, longitude, params);
      this.shopListData = result.data;
    },
    changeTitleSel() {
      this.titleIsSel = !this.titleIsSel;
      this.orderIsSel = false;
      this.filterIsSel = false;
    },
    changeCategorySelItem(name) {
      this.categorySelItem = name;
    },
    changeOrderSel() {
      this.titleIsSel = false;
      this.orderIsSel = !this.orderIsSel;
      this.filterIsSel = false;
    },
    changeFilterSel() {
      this.titleIsSel = false;
      this.orderIsSel = false;
      this.filterIsSel = !this.filterIsSel;
    },
    changeFilterSelItem(id) {
      this.activitySelArr.forEach((item) => {
        item.id === id && (item.status = !item.status);
      });
    },
    changeCategoryContent(cates) {
      console.log(cates);
      this.titleIsSel = false;
      this.getShopListData();
    },
    changeOrderContent() {
      this.orderIsSel = false;
      this.getShopListData();
    },
    filterClear() {
      this.activitySelArr.forEach((item) => (item.status = false));
    },
    filterConfirm() {
      this.filterIsSel = false;
      this.getShopListData();
    },
  },
  computed: {
    activitySelCount() {
      return this.activitySelArr.filter((item) => item.status === true).length;
    },
  },
  async mounted() {
    this.getShopListData();
    this.title = this.$route.query.title;
    const latitude = this.$store.state.selectionCityGeo.split(",")[0];
    const longitude = this.$store.state.selectionCityGeo.split(",")[1];

    this.category = await foodCategory(latitude, longitude);
    this.categorySelItem = this.category[0].name;
    this.delivery = await foodDelivery(latitude, longitude);
    this.delivery.forEach((item) => {
      this.activitySelArr.push({
        status: false,
        id: item.id,
      });
    });
    this.activity = await foodActivity(latitude, longitude);
    this.activity.forEach((item) => {
      this.activitySelArr.push({
        status: false,
        id: item.id,
      });
    });
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.padding {
  padding: 0.4rem 0.5rem;
}
ul.service-selection {
  margin-top: 2rem;
  background-color: #fff;
  @include wh(100vw, 1.75rem);
  @include flex(center, center);
  @include sizeColor(0.75rem, #000);
  position: relative;

  li.list-item {
    width: 33%;
    .border-right {
      border-right: 1px solid #ccc;
    }
    .service-selection-item {
      h4 {
        text-align: center;
      }
      .active {
        @include sizeColor(0.75rem, #3190e8);
      }
    }
    .mask {
      top: 3.75rem;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(#000000, 0.5);
      position: fixed;
    }
    .service-selection-list {
      z-index: 2020;
      width: 100vw;
      position: absolute;
      left: 0;
      top: 1.75rem;
      ul.service-selection-list-category {
        background-color: #f1f1f1;
        width: 100%;
        position: absolute;
        .active {
          background-color: #fff;
        }
        .category-content {
          @include flex(space-between, center);
          @include sizeColor(0.75rem, #333);
          width: 50%;
          padding: 0.5rem;
        }
        li.order-content {
          background-color: #fff;
          padding: 0 0.5rem;
          @include flex(flex-start, center);
          .icon-order {
            width: 10%;
          }
          .order-content-item {
            width: 90%;
            padding: 0.5rem;
            @include flex(space-between, center);
            border-bottom: 1px solid #ccc;
          }
        }
        li.filter-content {
          background-color: #fff;
          padding: 0.25rem;
          h4 {
            padding-bottom: 0.25rem;
          }
          ul.content {
            .active {
              color: #3190e8;
            }
            li {
              margin-right: 0.2rem;
              margin-bottom: 0.2rem;
              border: 1px solid #eee;
              border-radius: 5%;
              width: 30%;
              padding: 0.25rem;
              float: left;
              span {
                // display: inline-block;
                // @include wh(auto,1.2rem);
                text-align: center;
                border-radius: 30%;
                padding: 1px 1.5px;
                margin-right: 0.25rem;
              }
            }
          }
          ul::after {
            content: "";
            display: block;
            clear: both;
          }
        }
        li.btn-group {
          @include flex(space-around, center);
          padding: 0.25rem;
          .btn {
            width: 45%;
            padding: 0.5rem 0;
            text-align: center;
          }
          .btn-clear {
            background-color: #fff;
            color: #000;
          }
          .btn-confirm {
            background-color: #56d176;
            color: #fff;
          }
        }
        li {
          width: 100%;
          .service-selection-list-category-item {
            overflow-y: auto;
            background-color: #fff;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 50%;
            .category-item-content {
              padding: 0.5rem 0;
              margin-left: 0.5rem;
              border-bottom: 1px solid #ccc;
            }
          }
        }
      }
    }
  }
}
</style>