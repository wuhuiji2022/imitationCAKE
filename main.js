import App from './App'
import store from 'store/index.js'
// #ifndef VUE3
import Vue from 'vue'
// 引入uview组件库
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

// 挂载全局组件
import NavCustom from 'components/nav-custom.vue'
Vue.component('nav-custom',NavCustom)
import HomeTitle from 'components/home-title.vue'
Vue.component('home-title',HomeTitle)
import GoodItem from 'components/good-item.vue'
Vue.component('good-item',GoodItem)
import TabCustom from 'components/tab-custom.vue'
Vue.component('tab-custom',TabCustom)
// 处理了兼容问题的自定义导航栏
import cuCustom from 'colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

// 挂载全局异步请求方法
// import {$http,$get,$post} from 'utils/request.js'
// Vue.prototype.$http = $http
// Vue.prototype.$get = $get
// Vue.prototype.$post = $post
import * as request from 'utils/request.js'
// console.log(request);
for(let key in request){
	Vue.prototype[key] = request[key]
}

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store  //注入状态机
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif