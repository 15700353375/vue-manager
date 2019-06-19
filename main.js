import Vue from 'vue'
import App from './src/App.vue'
import VueRouter from 'vue-router'
import routes from './src/routers'
import moment from 'moment'
import $ from 'jquery'
import _ from 'lodash';
import registerAxios from '@Util/registerAxios'
import directive from '@Util/directive'
// 环境配置
Vue.config.productionTip = false

import {
  regeisterElementUI,
} from '@Util/registerUI'

regeisterElementUI()




Vue.use(VueRouter)

// 引入路由
const router = new VueRouter({
  linkActiveClass: 'red',
  routes
})


const app = new Vue({
  el: '#app',
  router,
  components: {
    App: App
  },
  template: '<App/>'
})


// 设置全局变量
window.$ = $
window.Moment = moment
window.app = app
window._ = _;


// 绑定全局底部提示
Vue.prototype.bottomToast= (text)=> {
  app.$vux.toast.show({
    type: 'text',
    time: '2000',
    position: 'bottom',
    text: text,
  })
}

// 绑定全局中间提示
Vue.prototype.Toast= (text)=> {
  app.$vux.toast.show({
    type: 'text',
    time: '2000',
    text: text,
  })
}


