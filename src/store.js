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
    },
    estabInfo: {
      tradeName: '',
      address: '',
      numberEmployees: ''
    }
  },

  mutations: {
    saveCaseInfo (state, info) {
      state.caseInfo.caseID = info.caseID
      state.caseInfo.invOffice = info.invOffice
      state.caseInfo.whiName = info.whiName
      state.caseInfo.invStart = info.invStart
      state.caseInfo.invEnd = info.invEnd
    },
    saveEstabInfo (state, info) {
      state.estabInfo.tradeName = info.tradeName
      state.estabInfo.address = info.address
      state.estabInfo.numberEmployees = info.numberEmployees
    }
  },

  actions: {

  }
})
