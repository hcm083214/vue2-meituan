/*
 * @Author: 黄灿民
 * @Date: 2020-12-06 18:00:55
 * @LastEditTime: 2020-12-06 18:09:14
 * @LastEditors: 黄灿民
 * @Description: html font-size 随屏幕大小变化
 * @FilePath: \app\src\assets\js\rem.js
 */
(function(doc,win){
    var docEl = doc.documentElement;
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    var recalc = function(){
        var clientWidth = docEl.clientWidth;
        if(!clientWidth) return;
        docEl.style.fontSize = 40 * (clientWidth / 750) + 'px';
    }
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document,window)