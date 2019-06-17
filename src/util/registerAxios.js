/*
 * @Author:      changh
 * @DateTime:    2018-12-30
 * @Description: 统一请求或返回API层
 */

import Vue from 'vue'
import axios from 'axios'

// 强制退出的操作
function getOut () {
  window.app.Toast.text('sessionId失效，请重新登录')
  // token失效时-强制跳转到绑定登录页面
  wx.miniProgram.reLaunch({
    url: '/pages/index/index',
    success: function () {
      console.log('success')
    },
    fail: function () {
      console.log('fail')
    },
    complete: function () {
      console.log('complete')
    }
  })
}

// 统一处理成功请求返回值
function resolveSuccessRes (res) {
  if (res.status == 200) {
    if (res.data.code == 1) {
      return res.data
    } else if (res.data.code == -1) {
      // sessionId失效 通知小程序
      getOut()
    } else {
      window.app.Toast.text(res.data.msg)
    }
  } else {
    // 表示网络正常，服务器拒绝
    window.app.Toast.text(res.statusText)
    // return res.data;
  }
}

// 统一处理失败请求返回值
function resolveFailRes (status) {
  if (status >= 500) {
    window.app.Toast.text('服务器错误，请稍后重试')
  } else if (status >= 400 && status < 500) {
    if (status == 404) {
      window.app.Toast.text('网络错误，请稍后重试')
    } else {
      window.app.Toast.text('客户端错误，请联系工作人员')
    }
  } else if (status >= 300 && status < 400) {
    window.app.Toast.text('请求发生重定向，请联系工作人员')
  }
}

// post请求
let post = function (url, params) {
  let currentInfo = localStorage.getItem('currentInfo')
  currentInfo = JSON.parse(currentInfo)
  let sessionId = null
  if (currentInfo) {
    sessionId = currentInfo.sessionId
  }
  // 验证权限
  if (sessionId) {
    params = {...params, sessionId: sessionId}
    let requestData = params || {}

    return axios.post(url, requestData)
                .then((res) => {
                  return resolveSuccessRes(res)
                }).catch((error) => {
                  resolveFailRes(error.response.status)
                })
  } else {
    // 权限不足，跳转至小程序登陆
    getOut()
  }
}

// 初始化axios
axios.defaults.headers.post['Content-Type'] = 'json'
axios.defaults.timeout = 60000

// ajax请求,挂在到Vue中
Vue.prototype.$ajaxPost = post

