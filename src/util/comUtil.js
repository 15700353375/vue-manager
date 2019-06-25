/*
 * @Author:      changh
 * @DateTime:    2018
 * @Description: 公共方法
 */

// import _ from 'lodash'

export default {
  // 克隆
  clone (obj) {
    return JSON.parse(JSON.stringify(obj))
  },

  // 格式化时间
  formatTime (time, type) {
    let typeFin = type || 'YYYY-MM-DD HH:mm:ss'
    return Moment(time * 1000).format(typeFin)
  },

  // 格式化金额
  formatMoney (money) {
    return Number(money).toFixed(2)
  },

  // 格式化为数字去掉无用的0
  formatNumber (data) {
    if (data != 0 && !data) return
    return parseFloat(Number(data).toFixed(2))
  },
  // 格式化为百分比去掉无用的0
  formatPercent (data) {
    if (!data) return 0
    // if (data > 1) return 1
    return parseFloat((Number(data) * 100).toFixed(2))
  },

  getWxInfo () {
    // let current = app.$route.query.current
    // let userInfo = app.$route.query.userInfo

  // 测试数据
    let current = {
      'holderId': '1',
      'wxRoleType': '1',
      'storeName': '千思三只眼',
      'holderType': '1',
      'holdGroup': '1',
      'address': '成都市武侯区复城国际T4#1603',
      'fphone': '0825-12345678',
      'dzVipCardSupportFlag': 0,
      'sessionId': '734b52cf214943f3bdef84439737ac49'
    }
    let userInfo = {
      'nickName': '午後’品茶',
      'gender': 2,
      'language': 'zh_CN',
      'city': 'Florida',
      'province': 'Sichuan',
      'country': 'China',
      'avatarUrl': 'https://wx.qlogo.cn/mmopen/vi_32/nGTVF9QVb73vkuLaiak0ib4ZdIqqfcOlb26tgwKcOAQhkiaKj5kBNGhmZR522I4BYP9iaH5RJod9GPBcrul8eAHnlg/132'
    }
  // let current = {"holderId":"100","wxRoleType":"1","storeName":"千思","holderType":"1","holdGroup":"2","address":"成都市武侯区复城国际T4#1603","fphone":"0825-12345678","sessionId":"9294b9087de24f2693a822d8787f05d5"}
  // let userInfo = {"nickName":"俊俊","gender":1,"language":"en","city":"Kwong","province":"Sichuan","country":"China","avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/siaiaSLcF9HHrO392axMCicKaw8Gp6rmRzxAo89bjN4taBBP9nUQDfXlRy1SKtjIflyxiattT8hK9N4ltjfdqTXNSQ/132"}
    current = JSON.stringify(current)
    userInfo = JSON.stringify(userInfo)

    console.log(current, userInfo)
    if (current && userInfo) {
      localStorage.setItem('currentInfo', current)
      localStorage.setItem('userInfo', userInfo)
    }
  }

}
