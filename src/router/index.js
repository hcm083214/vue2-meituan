/*
 * @Author: 黄灿民
 * @Date: 2020-12-05 14:50:48
 * @LastEditTime: 2021-01-02 19:44:31
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \app\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home/Home.vue'
Vue.use(VueRouter)
// const demo =[
//   {
//     path:"/swiperDemo",
//     name:'swiperDemo',
//     component:() => import(/* webpackChunkName: "group-foo" */ '@/demo/vueAwesomeSwiper/SwiperDemo.vue')
//   },
//   {
//     path:'/swiperDemo1',
//     name:'swiperDemo1',
//     component:() => import(/* webpackChunkName: "group-foo" */ '@/demo/swiper/swiper.vue')
//   }
// ];
const routes = [
  // ...demo,
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/city/:city',
    name: 'city',
    component: Home
  },
  {
    path: '/location',
    name: "location",
    component: () => import(/* webpackChunkName: "group-foo" */ '@/views/Location/Location.vue')
  },
  {
    path: '/servicelist',
    name: 'servicelist',
    component: () => import(/* webpackChunkName: "group-foo" */ '@/views/Merchant/ServiceList.vue')
  },
  {
    path: '/shopdetail',
    name: 'shopdetail',
    component: () => import('@/views/Merchant/ShopDetail.vue')
  },
  {
    path: '/takeout',
    name: 'takeout',
    component: () => import('@/views/Merchant/TakeOutDetail.vue'),
    redirect: {
      name: 'menu'
    },
    children: [
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/Merchant/TakeOutDetail/Menu.vue')
      },
      {
        path: 'comment',
        name: 'comment',
        component: () => import('@/views/Merchant/TakeOutDetail/comment.vue')
      }
    ]
  },
  {
    path: '/shopinfomation',
    name: 'shopinfomation',
    component: () => import('@/views/Merchant/ShopDetail/ShopInfomation.vue')
  },
  {
    path: '/recommenddetail',
    name: 'recommenddetail',
    component: () => import('@/views/Merchant/ShopDetail/RecommendDetail/RecommendDetail.vue')
  },
  {
    path: '/shopcartlist',
    name: 'shopcartlist',
    component: () => import('@/views/Merchant/ShopCartList.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/shoppayment',
    name: 'shoppayment',
    component: () => import('@/views/Merchant/ShopPayment.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/Login.vue')
  },
  {
    path: '/resset',
    name: 'resset',
    component: () => import('@/views/Login/Resset.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/User/User.vue')
  },
  {
    path: '/userdetail',
    name: 'userdetail',
    component: () => import('@/views/User/UserDetail/UserDetail.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/deliveryaddress',
    name: 'deliveryaddress',
    component: () => import('@/views/User/UserDetail/DeliveryAddress.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/addaddress',
    name: 'addaddress',
    component: () => import('@/views/User/UserDetail/AddAddress.vue'),
    meta: {
      auth: true
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`)
    }
  } else {
    next();
  }
})

export default router
