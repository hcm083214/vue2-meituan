# vue2 仿美团项目

技术栈：vue2.x + vuex + vue-router + svg + scss + swiper

## todoList

- [ ] rem响应式布局
- [ ] 公用组件---顶部
- [ ] 公用组件---弹窗
- [ ] 公用组件---导航条吸顶效果
- [ ] 公用组件---评分
- [ ] 定位功能，城市切换
- [ ] 首页服务列表
- [ ] 服务列表详情
- [ ] 首页商铺列表
- [ ] 店铺列表详情

## 实现思路

### rem响应式布局

html font-size大小随屏幕大小改变而改变，核心代码，[思路详解](https://juejin.cn/post/6844903671143088136)

/src/assets/js/rem.js

```js
document.documentElement.style.fontSize = document.documentElement.clientWidth / 720 + 'px'
```



### 公共组件---顶部

flex 3栏布局，常用项写在组件中，slot 插槽进行内容自定义

/src/components/HeaderTop.vue



### 公共组件---弹窗

待发表掘金博客





### 定位和城市切换

文件名：Location --- Location

1. 进入首页，进行定位，修改定位城市
   1. 如果能获得位置信息，直接修改定位城市
   2. 如果不能获得位置信息，跳转到城市选择页
2. 进入城市切换页面
   1. 获得定位信息，判断当前城市与定位城市是否一致，不一致是否进行修改
   2. 修改城市，跳转回首页
3. 重新切换到首页
   1. 判断当前城市与定位城市是否一致，不一致是否进行修改



### 首页服务列表

文件名：Home --- Service

轮播图的形式展示服务列表信息---swiper

vue的版本是vue-awesome-swiper



### 服务列表详情

文件名：Merchant --- ServiceList

点击首页服务列表，跳转到详情页，页面展示各服务列表对应的商铺

可以按照服务分类，排序方式，筛选出符合条件的商铺，并进行展示

js功能：下拉菜单：根据美食分类，排序方式，筛选条件，来进行数据请求，渲染列表

下拉菜单，完全掌握css的定位相关知识，包括position：relative/absolute/fixed



### 首页商铺列表

文件名：components --- ShopList --- ShopList

首页展示推荐商铺列表

经典图文混排，左图，右边商品信息详情

js功能：请求数据，渲染列表



### 店铺列表详情

文件名：Merchant --- ShopDetail

点击首页商铺，跳转到商铺详情页，路由query保存商铺id

顶部栏：当商铺信息快到达后，背景色变化并置顶

商铺信息：根据商铺id，请求数据，渲染商铺信息

- 点击外卖，跳转到外卖页

- 点击更多信息，跳转到商铺详情

内容页分为三个部分（三个组件）

1. 优惠菜品：经典图文混排，左图，右边商品信息详情，组件复用
2. 推荐菜品：[Free mode / No fixed positions ](https://github.com/surmon-china/surmon-china.github.io/tree/source/projects/vue-awesome-swiper/examples/15-freemode.vue)模式显示
3. 店铺评价：图文混排，上文字，下图片

内容页导航栏有吸顶效果，对应内容到达导航栏，改变active状态



#### 优惠菜品详情

文件位置：Merchant --- ShopDetail --- RecommendDetail

展示优惠菜品的菜单，实现添加到购物车和立即抢购功能

添加到购物车逻辑：先判断是否登录，如果没登录跳转到登录页面；如果登录，将要添加到购物车信息发送给后端，从后端得到的数据保存在vuex中



### 店铺详情

文件名：Merchant --- ShopDetail --- ShopInformation

点击商铺列表详情页面的**更多信息**，跳转到店铺详情，路由query保存商铺id

商铺详情：根据商铺id，请求数据，渲染商铺详情列表



### 店铺外卖

文件名：Merchant --- TakeOutDetail

点击商铺列表详情中的外卖，跳转到外卖页

导航栏有吸顶效果

图片懒加载



### 登录页

