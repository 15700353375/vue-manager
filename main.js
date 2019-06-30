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
// import './src/assets/vendor.js'

// font样式
// import './src/assets/fonts/iconfont.css'

// import './src/assets/css/common.less'
// import './src/assets/css/bottomBar.less'
// import './src/assets/css/menu.less'
// import './src/assets/css/memberInfo.less'
// import './src/assets/css/mine.less'
// import './src/assets/css/technician.less'
// import './src/assets/css/technicianInfo.less'
// import './src/assets/css/room.less'
// import './src/assets/css/getRoom.less'
// import './src/assets/css/planTechnician.less'

import {
  regeisterElementUI,
} from '@Util/registerUI'

regeisterElementUI()

import vSelect from 'vue-select'
Vue.component('v-select', vSelect)
import 'vue-select/dist/vue-select.css';

import  { ConfirmPlugin } from 'vux'
Vue.use(ConfirmPlugin)

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


