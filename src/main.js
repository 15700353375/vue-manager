import Vue from 'vue'
import App from './App.vue'
// font样式
import '@Src/assets/css/memberInfo.less'
import './assets/vender.js'
import VueRouter from 'vue-router'
import routes from './routers'
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
// 测试数据
let current = {"holderId":"1","wxRoleType":"1","storeName":"千思三只眼","holderType":"1","holdGroup":"1","address":"成都市武侯区复城国际T4#1603","fphone":"0825-12345678","dzVipCardSupportFlag":0,"sessionId":"06e83cb965d94ecc8ca6cba17311d68b"}
let userInfo = {"nickName":"午後’品茶","gender":2,"language":"zh_CN","city":"Florida","province":"Sichuan","country":"China","avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/nGTVF9QVb73vkuLaiak0ib4ZdIqqfcOlb26tgwKcOAQhkiaKj5kBNGhmZR522I4BYP9iaH5RJod9GPBcrul8eAHnlg/132"}
// let current = {"holderId":"100","wxRoleType":"1","storeName":"千思","holderType":"1","holdGroup":"2","address":"成都市武侯区复城国际T4#1603","fphone":"0825-12345678","sessionId":"9294b9087de24f2693a822d8787f05d5"}
// let userInfo = {"nickName":"俊俊","gender":1,"language":"en","city":"Kwong","province":"Sichuan","country":"China","avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/siaiaSLcF9HHrO392axMCicKaw8Gp6rmRzxAo89bjN4taBBP9nUQDfXlRy1SKtjIflyxiattT8hK9N4ltjfdqTXNSQ/132"}
current = JSON.stringify(current)
userInfo = JSON.stringify(userInfo)

console.log(current,userInfo)
if(current && userInfo){
  localStorage.setItem('currentInfo', current)
  localStorage.setItem('userInfo', userInfo)
}


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