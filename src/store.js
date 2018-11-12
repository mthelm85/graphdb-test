import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    caseInfo: {
      caseID: '',
      invOffice: '',
      whiName: '',
      invStart: '',
      invEnd: ''
    }
  },
  mutations: {
    saveCaseInfo (state, info) {
      state.caseInfo.caseID = info.caseID
      state.caseInfo.invOffice = info.invOffice
      state.caseInfo.whiName = info.whiName
      state.caseInfo.invStart = info.invStart
      state.caseInfo.invEnd = info.invEnd
    }
  },
  actions: {

  }
})
