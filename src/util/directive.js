import Vue from 'vue'

Vue.directive('clickoutside', {
  bind (el, binding, vnode) {
    function documentHandler (e) {
      // alert(e.target)
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
    // document.addEventListener('click', documentHandler)
    document.addEventListener('touchend', documentHandler)
  },
  unbind (el, binding) {
    document.removeEventListener('touchend', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
})
