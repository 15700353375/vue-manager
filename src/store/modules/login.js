const state = {
  userInfo: {}
}

const getters = {}

const mutations = {
  setUserInfo (state, userInfo) {
    // 变更状态
    state.userInfo = userInfo
  }
}

export default {
  login: {
    namespaced: true,
    state,
    getters,
    mutations
  }
}

