import Vue from 'vue'

Vue.directive('clickoutside', {
  bind (el, binding, vnode) {
    function documentHandler (e) {
      if (el.contains(e.target)) {
        $('#my-popover').fadeIn()
        if (e.target.className == 'vux-cell-box weui-cell') {
          $('#my-popover').fadeOut()
        }
      } else {
        $('#my-popover').fadeOut()
      }
      if (binding.expression) {
        binding.value(e)
      }
    }
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  unbind (el, binding) {
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
})