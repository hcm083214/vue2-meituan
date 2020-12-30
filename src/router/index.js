/*
 * @Author: 黄灿民
 * @Date: 2020-12-05 14:50:48
 * @LastEditTime: 2020-12-30 21:57:17
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
    path:'/location',
    name:"location",
    component:() => import(/* webpackChunkName: "group-foo" */ '@/views/Location/Location.vue')
  },
  {
    path:'/servicelist',
    name:'servicelist',
    component:() => import(/* webpackChunkName: "group-foo" */ '@/views/Merchant/ServiceList.vue')
  },
  {
    path:'/shopdetail',
    name:'shopdetail',
    component:()=>import('@/views/Merchant/ShopDetail.vue')
  },
  {
    path:'/takeout',
    name:'takeout',
    component:()=>import('@/views/Merchant/TakeOutDetail.vue'),
    redirect:{
      name:'menu'
    },
    children:[
      {
        path:'menu',
        name:'menu',
        component:()=>import('@/views/Merchant/TakeOutDetail/Menu.vue')
      },
      {
        path:'comment',
        name:'comment',
        component:()=>import('@/views/Merchant/TakeOutDetail/comment.vue')
      }
    ]
  },
  {
    path:'/shopinfomation',
    name:'shopinfomation',
    component:()=>import('@/views/Merchant/ShopDetail/ShopInfomation.vue')
  },
  {
    path:'/recommenddetail',
    name:'recommenddetail',
    component:()=>import('@/views/Merchant/ShopDetail/RecommendDetail/RecommendDetail.vue')
  }
  
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
