<!--
 * @Author: 黄灿民
 * @Date: 2020-12-22 20:42:51
 * @LastEditTime: 2020-12-23 19:07:49
 * @LastEditors: 黄灿民
 * @Description: 商铺评论
 * @FilePath: \app\src\views\Merchant\ShopDetail\ShopComment.vue
-->
<template>
  <section class="comment">
    <header class="comment-header">
      <h3>餐厅评价</h3>
      <div class="comment-header-right">更多评价（106条）></div>
    </header>
    <div class="comment-tip">
      <span class="comment-tip-text">消费后写评价赚积分，最高可抵现10元</span>
    </div>
    <div class="comment-tags"></div>
    <div class="comment-context" v-for="item in ratingListData" :key="item._id">
      <div class="comment-context-avatar">
        <img :src="getImgPath(item.avatar)" alt="" />
      </div>
      <div class="comment-context-details">
        <div class="comment-context-details-header">
          <span class="user">{{ item.username }}</span>
          <span class="time">{{ item.rated_at }}</span>
        </div>
        <rank :ranking="item.rating_star" />
        <div class="comment-context-details-text">
          <span>商铺评价：{{ item.rating_text || "未作评价" }}</span>
          <span>派送评价：{{ item.time_spent_desc || "未作评价" }}</span>
        </div>
        <ul
          class="comment-context-details-image"
          v-if="item.item_ratings.length"
        >
            <li
              class="image-item"
              v-for="images in item.item_ratings"
              :key="images._id"
            >
              <img :src="getImgPath(images.image_hash)" alt="" v-if="images.image_hash"/>
            </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import Rank from "@/components/Rank/Rank.vue";
import { getImgPath } from "@/assets/js/mixin.js";
export default {
  components: { Rank },
  name: "ShopComment",
  mixins: [getImgPath],
  props: {
    ratingListData: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.comment {
  background-color: #fff;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  padding: 0 0.5rem;
  .comment-header {
    @include flex(space-between, center);
    padding: 0.5rem 0;
    .comment-header-right {
      padding-right: 0.5rem;
    }
  }
  .comment-tip {
    padding: 0.25rem 0;
    .comment-tip-text {
      padding: 0.2rem 0.35rem;
      background-color: #f7efd8;
      color: #ec6a00e3;
    }
  }
  .comment-context {
    padding-top: 0.5rem;

    @include flex(flex-start, flex-start);
    .comment-context-avatar {
      @include wh(2rem, auto);
      font-size: 0;
      margin-right: 2vw;
      overflow: hidden;
      border-radius: 50%;
      img {
        width: 100%;
      }
    }
    .comment-context-details {
      width: 85vw;
      flex: 0 1 auto;
      .comment-context-details-header {
        @include flex(space-between, center);
        .time {
          color: #999;
          margin-right: 0.5rem;
        }
      }
      .comment-context-details-text {
        @include flex(flex-start, flex-start);
        flex-direction: column;
      }
      .comment-context-details-image {
        margin: 0.25rem auto;
        @include flex(space-around, center);
        width: 100%;
        .image-item {
          margin: 0 0.15rem;
          width: 33%;
          img {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>