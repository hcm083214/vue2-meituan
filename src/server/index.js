/*
 * @Author: 黄灿民
 * @Date: 2020-12-07 16:01:17
 * @LastEditTime: 2020-12-31 22:42:03
 * @LastEditors: 黄灿民
 * @Description: api接口
 * @FilePath: \app\src\server\index.js
 */
import axios from "axios";
class Http {
    constructor(options) {
        this.options = Object.assign({
            baseURL: '/api'
        }, options)
    }
    httpRequest() {
        const instance = axios.create(this.options);
        this.interceptors(instance);
        return instance;
    }
    interceptors(instance) {
        instance.interceptors.request.use(config => {
            return config;
        })
        instance.interceptors.response.use(response => {
            return response.data
        })
    }
}
const http = new Http();
const httpRequest = http.httpRequest();

/**
 * @description: 获取城市列表
 * @param {String} type guess：定位城市，  hot：热门城市， group：所有城市
 * @return {*}
 */
export async function cityGuess(type) {
    const result = await httpRequest.get('/v1/cities', {
        params: {
            type
        },
    });
    return result;
}
/**
 * @description: 根据经纬度获得详细城市信息
 * @param {string} geohash 经纬度 pois/31.22967,121.4762
 * @return {*}
 */
export async function msiteAddress(geohash) {
    const result = await httpRequest.get('/v2/pois/' + geohash);
    return result;
}

/**
 * @description: 获得服务分类列表
 * @param {*}
 * @return {*}
 */
export async function msiteFoodTypes() {
    const result = await httpRequest.get('/v2/index_entry');
    return result;
}
/**
 * @description: 获取商铺列表
 * @param {*} latitude 纬度 必须
 * @param {*} longitude 经度 必须
 * @param {*} offset 跳过多少条数据，默认0
 * @param {*} limit 跳过多少条数据，默认20
 * @param {*} restaurant_category_id 餐馆分类id
 * @param {*} restaurant_category_ids 餐馆分类id
 * @param {*} order_by 排序方式id： 1：起送价、2：配送速度、3:评分、4: 智能排序(默认)、5:距离最近、6:销量最高
 * @param {*} delivery_mode 配送方式id
 * @param {*} support_ids 餐馆支持特权的id
 * @return {*}
 */
import shopListData from "@/assets/api/shopListApi.js"; //后端此数据没写，自己造的数据
export async function shopList(latitude, longitude, option) {
    const options = Object.assign({
        offset: 0,
        restaurant_category_id: '',
        restaurant_category_ids: '',
        order_by: 1,
        delivery_mode: '',
        support_ids: []
    }, option)
    let supportStr = '';
    options.support_ids.forEach(item => {
        if (item.status) {
            supportStr += '&support_ids[]=' + item.id;
        }
    });
    await httpRequest.get('/shopping/restaurants', {
        params: {
            latitude,
            longitude,
            offset: options.offset,
            limit: '20',
            'extras[]': 'activities',
            keyword: '',
            restaurant_category_id: options.restaurant_category_id,
            'restaurant_category_ids[]': options.restaurant_category_ids,
            order_by: options.order_by,
            'delivery_mode[]': options.delivery_mode + supportStr
        }
    });
    // console.log("🚀 ~ file: index.js ~ line 102 ~ result", result, shopListData)
    return { data: shopListData };
}

/**
 * @description: 获取所有商铺分类列表
 * @param {*} latitude 经度
 * @param {*} longitude 纬度
 * @return {*}
 */
export async function foodCategory(latitude, longitude) {
    const result = await httpRequest.get('/shopping/v2/restaurant/category', {
        params: {
            latitude, longitude
        }
    })
    return result;
}

/**
 * @description: 获取配送方式
 * @param {*} latitude 经度
 * @param {*} longitude 纬度
 * @return {*}
 */
export async function foodDelivery(latitude, longitude) {
    const result = await httpRequest.get('/shopping/v1/restaurants/delivery_modes', {
        params: {
            latitude, longitude
        }
    })
    return result;
}

/**
 * @description: 商家属性活动列表
 * @param {*} latitude 经度
 * @param {*} longitude 纬度
 * @return {*}
 */
export async function foodActivity(latitude, longitude) {
    const result = await httpRequest.get('/shopping/v1/restaurants/activity_attributes', {
        params: {
            latitude, longitude
        }
    })
    return result;
}

/**
 * @description: 餐馆详情
 * @param {*} shopId
 * @return {*}
 */
import shopDetailData from "@/assets/api/shopDetailListApi.js";
export async function shopDetails(shopId) {
    await httpRequest.get('/shopping/restaurant/' + shopId);
    const result = shopDetailData.filter(item => item.id == shopId);
    return result;
}

/**
 * @description: 获取shop页面菜单列表
 * @param {number} restaurant_id 商铺id
 * @return {*}
 */
import foodMenuData from "@/assets/api/foodMenuApi.js";
export async function foodMenu(restaurant_id) {
    await httpRequest.get('/shopping/v2/menu', {
        params: { restaurant_id }
    })
    return foodMenuData;
}

/**
 * @description: 获得shop页面评价
 * @param {*} restaurant_id
 * @return {*}
 */
import ratingListData from "@/assets/api/ratingListApi.js";
export async function getRatingList(restaurant_id) {
    await httpRequest.get('ugc/v2/restaurants/' + restaurant_id + '/ratings')
    return ratingListData;
}

/**
 * @description: 加入购物车
 * @param {string} geohash
 * @param {array} entities
 * @param {number} restaurant_id
 * @return {*}
 */
let result = [];
export async function checkout(geohash, entities, restaurant_id) {
    await httpRequest.post('/v1/carts/checkout', {
        come_from: "web",
        geohash,
        entities,
        restaurant_id,
    })
    if (result.length > 0) {
        let isExist = result.some(item => item.id === entities[0].id);
        // console.log("🚀 ~ file: index.js ~ line 210 ~ checkout ~ isExist", isExist)
        !isExist && result.push(...entities);
    } else {
        result.push(...entities);
    }

    return result;
}

/**
 * @description: 获得图片验证码
 */
export async function getcaptchas(){
   const result = await httpRequest.post('/v1/captchas');
   return result;
}

/**
 * @description: 账号密码登录
 * @param {*} username
 * @param {*} password
 * @param {*} captcha_code
 * @return {*}
 */
export async function accountLogin(username, password, captcha_code){
    const result = await httpRequest.post('/v2/login',{
        username, password, captcha_code
    })
    return result;
}

/**
 * @description: 修改密码
 * @param {*} username
 * @param {*} oldpassWord
 * @param {*} newpassword
 * @param {*} confirmpassword
 * @param {*} captcha_code
 * @return {*}
 */
export async function changePassword(username, oldpassWord, newpassword, confirmpassword, captcha_code){
    const result = await httpRequest.post('/v2/changepassword',{
        username, oldpassWord, newpassword, confirmpassword, captcha_code
    })
    return result;
}
