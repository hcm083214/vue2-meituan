/*
 * @Author: 黄灿民
 * @Date: 2020-12-05 14:50:48
 * @LastEditTime: 2021-01-01 20:37:16
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \app\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectionCityGeo: '',
    alreadyShoppingFood: [],//加入购物车商品
    currentShopId: 1,//当前选择商铺id
    topHeaderHeight: 0,
    userInfo:{}//用户信息
  },
  mutations: {
    saveUserInfo(state,payload){
      state.userInfo = payload;
    },
    changeGeo(state, payload) {
      state.selectionCityGeo = payload;
    },
    saveAlreadyShoppingFood(state, payload) {
      state.alreadyShoppingFood = payload;
    },
    changeCurrentShopId(state, id) {
      state.currentShopId = id;
    },
    saveTopHeaderHeight(state, payload) {
      state.topHeaderHeight = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
