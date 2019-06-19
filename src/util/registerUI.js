import Vue from 'vue'
// 注册全局组件
import {
  ButtonTab,
  ButtonTabItem,
  Popover,
  Toast,
  ToastPlugin,
  XInput,
  Group,
  Cell,
  CellBox,
  Search,
  Scroller,
  XDialog,
  TransferDom,
  PopupRadio,
  Actionsheet,
  XSwitch,
  XButton
} from 'vux'

export function regeisterElementUI () {
  console.log(Toast)
  const components = [
    ButtonTab,
    ButtonTabItem,
    Popover,
    Toast,
    XInput,
    Group,
    Cell,
    CellBox,
    Search,
    Scroller,
    XDialog,
    PopupRadio,
    Actionsheet,
    XSwitch,
    XButton 
  ]
  components.map(item => {
    Vue.component(item.name, item)
  })
  Vue.use(ToastPlugin)
  Vue.directive('transfer-dom', TransferDom)
}
