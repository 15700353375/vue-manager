/**
 * @Author:    changh
 * @DateTime:    2019
 * @Description: 路由
 */

const room = r => require.ensure([], () => r(require('@Src/view/room/room')), 'room')
const technician = r => require.ensure([], () => r(require('@Src/view/technician/technician')), 'technician')
const menu = r => require.ensure([], () => r(require('@Src/view/menu/menu')), 'menu')
const mine = r => require.ensure([], () => r(require('@Src/view/mine/mine')), 'mine')
const memberInfo = r => require.ensure([], () => r(require('@Src/view/menu/memberInfo')), 'memberInfo')

export default [
  {
    path: '/room',
    name: 'room',
    component: room,
    meta: {
      title: '房间列表',
      type: 1
    }
  },
  {
    path: '/technician',
    name: 'technician',
    component: technician,
    meta: {
      title: '技师列表',
      type: 1
    }
  },
  {
    path: '/menu',
    name: 'menu',
    component: menu,
    meta: {
      title: '功能列表',
      type: 1
    }
  },
  {
    path: '/mine',
    name: 'mine',
    component: mine,
    meta: {
      title: '我的',
      type: 1
    }
  },
  {
    path: '/memberInfo',
    name: 'memberInfo',
    component: memberInfo,
    meta: {
      title: '会员信息'
    }
  }
]
