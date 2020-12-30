/*
 * @Author: 黄灿民
 * @Date: 2020-12-22 21:52:03
 * @LastEditTime: 2020-12-22 22:03:38
 * @LastEditors: 黄灿民
 * @Description: 
 * @FilePath: \app\src\assets\js\mixin.js
 */
export const getImgPath = {
	methods: {
		//传递过来的图片地址需要处理后才能正常使用
		getImgPath(path) {
			let suffix;
			if (!path) {
				return '//elm.cangdu.org/img/default.jpg'
			}
			if (path.indexOf('jpeg') !== -1) {
				suffix = '.jpeg'
			} else {
				suffix = '.png'
			}
            let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix;
			return 'https://fuss10.elemecdn.com' + url
		},
	}

}