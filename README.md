# 前言

本项目在github开源项目[vue-ele](https://github.com/bailicangdu/vue2-elm)基础上进行改写，新增功能如下

1. 第一次载入界面实现自动定位，如果定位不准用户可以选择手动选择位置

后端接口使用github开源项目[node-ele](https://github.com/bailicangdu/node-elm)

# vue2 仿美团项目

技术栈：vue2.x + vuex + vue-router + svg + scss + swiper + flex

## todoList

- [ ] rem响应式布局
- [ ] 公用组件---顶部
- [ ] 公用组件---弹窗
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



### 公共组件---购物车悬浮框

组件被店铺列表详情/优惠菜品详情使用。进入以上两个页面后，该组件悬浮在窗口，5s后隐藏在侧边栏，mousemove重新悬浮，每当商品加入购物车，统计商品数量



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
   
      <img src='https://github.com/hcm083214/vue2-meituan/blob/main/src/assets/img/image-20210102135450857.png'>

![image-20210102135450857](\src\assets\img\image-20210102135450857.png)



### 首页服务列表

文件名：Home --- Service

轮播图的形式展示服务列表信息---swiper

vue的版本是vue-awesome-swiper

<img src='https://github.com/hcm083214/vue2-meituan/blob/main/src/assets/img/image-20210102135619770.png'>

![image-20210102135619770](\src\assets\img\image-20210102135619770.png)

### 服务列表详情

文件名：Merchant --- ServiceList

点击首页服务列表，跳转到详情页，页面展示各服务列表对应的商铺

可以按照服务分类，排序方式，筛选出符合条件的商铺，并进行展示

js功能：下拉菜单：根据美食分类，排序方式，筛选条件，来进行数据请求，渲染列表

下拉菜单，完全掌握css的定位相关知识，包括position：relative/absolute/fixed

<img src='https://github.com/hcm083214/vue2-meituan/blob/main/src/assets/img/image-20210102135659340.png'>

![image-20210102135659340](\src\assets\img\image-20210102135659340.png)



### 首页商铺列表

文件名：components --- ShopList --- ShopList

首页展示推荐商铺列表

经典图文混排，左图，右边商品信息详情

js功能：请求数据，渲染列表

<img src='https://github.com/hcm083214/vue2-meituan/blob/main/src/assets/img/image-20210102135751965.png'>

![image-20210102135751965](\src\assets\img\image-20210102135751965.png)



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

<img src='https://github.com/hcm083214/vue2-meituan/blob/main/src/assets/img/image-20210102135832394.png'>

![image-20210102135832394](\src\assets\img\image-20210102135832394.png)

#### 优惠菜品详情

文件位置：Merchant --- ShopDetail --- RecommendDetail

展示优惠菜品的菜单，实现添加到购物车和立即抢购功能

添加到购物车逻辑：先判断是否登录，如果没登录跳转到登录页面；如果登录，将要添加到购物车信息发送给后端，从后端得到的数据保存在vuex中

<img src='https://github.com/hcm083214/vue2-meituan/blob/main/src/assets/img/image-20210102135907176.png'>

![image-20210102135907176](\src\assets\img\image-20210102135907176.png)

#### 店铺详情

文件名：Merchant --- ShopDetail --- ShopInformation

点击商铺列表详情页面的**更多信息**，跳转到店铺详情，路由query保存商铺id

商铺详情：根据商铺id，请求数据，渲染商铺详情列表

<img src='https://github.com/hcm083214/vue2-meituan/blob/main/src/assets/img/image-20210102140023060.png'>

![image-20210102140023060](\src\assets\img\image-20210102140023060.png)

#### 店铺外卖

文件名：Merchant --- TakeOutDetail

点击商铺列表详情中的外卖，跳转到外卖页

导航栏有吸顶效果

图片懒加载

<img src='https://github.com/hcm083214/vue2-meituan/blob/main/src/assets/img/image-20210102140105801.png'>

![image-20210102140105801](\src\assets\img\image-20210102140105801.png)

### 购物车列表详情

文件名：Merchant --- ShopCartList

从store中获得购物车数据，显示购物车所有选购商品，进行商品结算

通过+ - 按钮调整选择数量，全选按钮，单选按钮

<img src='https://github.com/hcm083214/vue2-meituan/blob/main/src/assets/img/image-20210102140151246.png'>

![image-20210102140151246](\src\assets\img\image-20210102140151246.png)

### 付款页面

付款页面15min倒计时，支付方式选择

<img src='https://github.com/hcm083214/vue2-meituan/blob/main/src/assets/img/image-20210102140222956.png'>

![image-20210102140222956](\src\assets\img\image-20210102140222956.png)

### 登录页

登录页，验证账号密码，提交登录信息，将返回的token保存在localstorage中，axios拦截器每次请求带上token信息

因后端接口未开发token功能，只能直接将登录得到的信息放在local storage中

密码有显示和隐藏功能

<img src='https://github.com/hcm083214/vue2-meituan/blob/main/src/assets/img/image-20210102140406543.png'>

![image-20210102140406543](\src\assets\img\image-20210102140406543.png)

### 密码重置

<img src='https://github.com/hcm083214/vue2-meituan/blob/main/src/assets/img/image-20210102140745058.png'>

![image-20210102140745058](\src\assets\img\image-20210102140745058.png)

### 用户界面

