/*
 * @Author: 黄灿民
 * @Date: 2020-12-07 23:12:57
 * @LastEditTime: 2021-01-01 15:12:41
 * @LastEditors: 黄灿民
 * @Description: 通用功能函数
 * @FilePath: \app\src\assets\js\util.js
 */
import messageBox from "@/components/MessageBox/index.js";
/**
 * @description: 统一localStorage和定义得到的经纬度
 * @param {String} geohash 定位(localStorage)的经纬度
 * @param {String} geoInline 传递中的经纬度
 * @return {String} 经纬度
 */
export function mergeLocation({ geohash, city }, geoInline) {
    return new Promise(resolve => {
        if (geoInline == geohash) {
            // console.log('地址一样')
            resolve(geohash);
        } else {
            messageBox(
                {
                    type:'confirm',
                    title: `检测到您目前所在城市是${city}`,
                    msg: '是否要切换'
                },
            ).then(() => {
                // console.log('切换到定位')
                resolve(geohash);
            }, () => {
                // console.log('不切换到定位')
                resolve(geoInline);
            })
        }
    })

}

/**
 * @description: 选项合并
 * @param {*} target 输出的合并对象
 */
export function merge(target) {
    for (let index = 1, lens = arguments.length; index < lens; index++) {
        let source = arguments[index]
        for (const key in source) {
            let value = source[key];
            value && (target[key] = value);
        }
    }
    return target;
}

/**
 * @description: 一个DOM元素是否到达另一个元素的位置
 * @param {HTMLElement} tarEle 目标元素
 * @param {HTMLElement} sourEle 运动元素
 * @return {Boolean} 
 */
export function isArrival(tarEle, sourEle) {
    let isArrivalTep = false;
    const { top: tarTop, height: tarHeight } = tarEle.getBoundingClientRect();
    // const { top: sourTop, height: SourHeight  } = sourEle.getBoundingClientRect();
    const { top: sourTop, } = sourEle.getBoundingClientRect();
    if (sourTop < tarTop + tarHeight +1) {
        isArrivalTep = true;
    }
    return isArrivalTep;
}

/**
 * @description: 防抖函数
 * @param {Function} fn
 * @param {*} waitTime
 */
export function debounce(fn, waitTime) {
    
    let timer=null;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, waitTime);
    }
}

