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
  }

}
