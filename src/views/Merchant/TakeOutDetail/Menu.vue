<!--
 * @Author: 黄灿民
 * @Date: 2020-12-24 20:56:07
 * @LastEditTime: 2020-12-27 18:58:18
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \app\src\views\Merchant\TakeOutDetail\Menu.vue
-->
<template>
  <section class="menu">
    <div class="menu-left">
      <ul class="menu-left-ul">
        <li
          v-for="(item, index) in foodMenuData"
          :key="item.id"
          :class="
            index == menuIndex
              ? 'menu_left_li textOverFlow active'
              : 'menu_left_li textOverFlow'
          "
          @click="menuIndex = index"
        >
          <img :src="getImgPath(item.icon_url)" v-if="item.icon_url" />
          <a :href="`#${item.name}`">{{ item.name }}</a>
        </li>
      </ul>
    </div>
    <div class="menu-right">
      <ul class="menu-right-ul" ref="foods">
        <li
          v-for="item in foodMenuData"
          :key="item.id"
          class="menu-right-ul-item"
        >
          <header class="headers sticky" :id="item.name">
            {{ item.name }}
          </header>
          <ul class="foods-item">
            <li
              v-for="(foods,index) in item.foods"
              :key="foods._id"
              class="textOverFlow"
            >
              <div class="foods-img">
                <img
                  :src="imgData[index] || '@/assets/logo.png'"
                  :data-src="foods.image_path"
                  alt=""
                  ref="imgs"
                  id="imgs"
                />
              </div>
              <!-- {{imgData[index] || '1111@/assets/logo.png'}} -->
              <div class="foods-desc">
                <h4 class="textOverFlow">{{ foods.name }}</h4>
                <p class="desc">{{ foods.description }}</p>
                <p class="tips">{{ foods.tips }}</p>
                <div class="sold">
                  <span>￥{{ foods.satisfy_rate }}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import { foodMenu } from "@/server/index";
import { getImgPath } from "@/assets/js/mixin.js";
import { debounce } from "@/assets/js/util.js";
export default {
  name: "Menu",
  mixins: [getImgPath],
  data() {
    return {
      menuHeight: 0,
      foodMenuData: [],
      menuIndex: 0,
      debounceShowImg: null,
      imgData: [],
    };
  },
  props: {},
  computed: {
    ...mapState(["currentShopId", "topHeaderHeight"]),
  },
  methods: {
    showImg() {
      // console.log("this.$refs.imgs1", this.$refs.imgs);
      const imgs = this.$refs.imgs;
      imgs && imgs.forEach((img,index) => {
        const { top } = img.getBoundingClientRect();
        if (top < document.documentElement.clientHeight) {
          // const imgPath = this.getImgPath(img.dataset.src);//https://elm.cangdu.org/img/
          const imgPath = `https://elm.cangdu.org/img/${img.dataset.src}`
          this.$set(this.imgData,index,imgPath);
        }
      });
    },
  },
  async mounted() {
    this.menuHeight = this.topHeaderHeight;
    this.foodMenuData = await foodMenu(this.currentShopId);
    this.showImg();
    this.debounceShowImg = debounce(this.showImg, 50);
    this.$refs.foods && this.$refs.foods.addEventListener("scroll", this.debounceShowImg);
  },
  destroyed() {
    this.$refs.foods && this.$refs.foods.removeEventListener("scroll", this.debounceShowImg);
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.sticky {
  position: sticky;
  top: 0;
}
.textOverFlow {
  @include textOverFlow();
}
.menu {
  @include flex(center, flex-start);
  overflow: auto;
  .menu-left {
    background-color: #f1f1f1;
    width: 30%;
    max-height: 579px;

    overflow: auto;
    .menu-left-ul {
      li {
        a {
          @include sizeColor(0.75rem, #333);
        }
        padding: 0 0.5rem;
        padding-bottom: 0.5rem;
      }
      li:nth-child(1) {
        padding-top: 0.5rem;
      }
      li.active {
        background-color: #fefefe;
      }
    }
  }
  .menu-right {
    max-height: 579px;
    width: 70%;
    background-color: #fff;
    .menu-right-ul {
      width: 100%;
      max-height: 579px;

      overflow: auto;
      li.menu-right-ul-item {
        .headers {
          background-color: #f1f1f1;
        }
        ul.foods-item {
          padding-top: 0.25rem;
          li {
            @include flex(flex-start, flex-start);
            padding-bottom: 0.25rem;
            .foods-img {
              width: 30%;
              img {
                width: 100%;
                font-size: 0;
              }
            }
            .foods-desc {
              padding-left: 0.5rem;
              width: 70%;
              h4 {
                padding-bottom: 0.25rem;
              }
              .desc {
                @include sizeColor(0.75rem, #999);
              }
              .tips {
                font-size: 0.5rem;
              }
              .sold {
                span:nth-child(1) {
                  color: #fe0900;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>