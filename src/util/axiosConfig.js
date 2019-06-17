/*
 * @Author:      changh
 * @DateTime:    2018
 * @Description: 请求路径
 */

// 默认地址
let base_url = 'https://szy.kiloxy.com'

if (process.env.NODE_ENV == 'production') {
  // 测试部使用的生产环境，上线时改为发布环境
  // base_url = 'http://192.168.10.186:8080'
  base_url = 'https://szy.kiloxy.com'
} else {
  // 开发环境
  base_url = '/api'
}

export const baseUrl = base_url

// 所有请求具体url链接
export const urls = {
  BASE_URL: base_url,
  // 登录
  in_theaters: 'movie/in_theaters',

  LOGIN: 'user-api/mlogin',

  // 获取客流量等统计数据
  GETBUSINESSDATEINFO: base_url + '/wechatMini/getBusinessDateInfo',

  // 获取客流量等统计数据
  GETBUSINESSBASEINFO: base_url + '/wechatMini/getBusinessBaseInfo',

  // 获取支付方式饼图数据  饼图一
  GETBILLINFOWITHOUTFREE: base_url + '/wechatMini/getBillInfoWithoutFree',

  // 收款方式
  GETBILLINFOWITHFREE: base_url + '/wechatMini/getBillInfoWithFree',

  // 会员卡信息
  GETRECHARGESUMINFO: base_url + '/wechatMini/getRechargeSumInfo',

  // 收款合计
  GETCASHFLOWSUMINFO: base_url + '/wechatMini/getCashFlowSumInfo',

  // 房间状态信息
  GETROOMSTATUSINFO: base_url + '/wechatMini/getRoomStatusInfo',

  GETROOMINFO: base_url + '/wechatMini/getRoomInfo',

  // 技师状态
  GETTECHNICIANQUEUE: base_url + '/wechatMini/getTechnicianQueue'

}

