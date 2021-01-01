/*
 * @Author: 黄灿民
 * @Date: 2020-12-08 11:32:40
 * @LastEditTime: 2021-01-01 15:28:46
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \app\src\components\MessageBox\index.js
 */
import Vue from 'vue';
import messageBoxCmp from './MessageBox.vue';
// import { merge } from "@/assets/js/util.js";

const defaults = {
    title: '',
    msg: ''
}
const asyncObj = {};
function defaultCallback(action) {
    if (action === 'confirm') {
        asyncObj.resolve(action)
    } else if (action === 'cancel') {
        asyncObj.reject(action)
    }
}
let cmp;//弹窗组件
function destroy() {
    document.body.removeChild(cmp.$el);
    cmp.$destroy();
}
const messageBox = function (options) {
    const props = Object.assign(defaults, options);
    const MBCmp = Vue.extend(messageBoxCmp);
    cmp = new MBCmp().$mount();
    const cmpOptions = { ...props, defaultCallback, destroy }
    for (const key in cmpOptions) {
        cmp[key] = cmpOptions[key];
    }
    document.body.appendChild(cmp.$el);
    return new Promise((resolve, reject) => {
        asyncObj.resolve = resolve;
        asyncObj.reject = reject;
    })
}
// messageBox.destroy = function () {
//     // 给组件实例添加销毁方法
//     const cmp = vm.$children[0];
//     cmp.remove = () => {
//         document.body.removeChild(vm.$el);
//         vm.$destroy();
//     };
// }
export default messageBox;

