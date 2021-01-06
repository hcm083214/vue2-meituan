/*
 * @Author: 黄灿民
 * @Date: 2020-12-07 10:18:33
 * @LastEditTime: 2021-01-04 20:21:48
 * @LastEditors: 黄灿民
 * @Description: vue cli自定义配置
 * @FilePath: \vue2-meituan\vue.config.js
 */
module.exports = {
    devServer:{
        proxy: {
            "/api": {
              target: "http://localhost:8001",
              pathRewrite: {"^/api" : ""}
            }
          }
    }
}