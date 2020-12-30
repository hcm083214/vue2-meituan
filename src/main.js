/*
 * @Author: 黄灿民
 * @Date: 2020-12-05 14:50:48
 * @LastEditTime: 2020-12-22 18:01:14
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \app\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/js/rem.js'
import '@/assets/js/iconfont.js'
import messageBox from "@/components/MessageBox/index.js";
import "@/assets/css/swiper-bundle.min.css";



Vue.config.productionTip = false
Vue.prototype.$messageBox = messageBox;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
