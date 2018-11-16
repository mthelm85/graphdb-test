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
      numberEmployees: '',
      naics: ''
    },
    bizEntity: {
      legalName: ''
    }
  },

  mutations: {
    saveCaseID (state, id) { state.caseInfo.caseID = id },
    saveInvOffice (state, office) { state.caseInfo.invOffice = office },
    saveWhiName (state, name) { state.caseInfo.whiName = name },
    saveInvStart (state, date) { state.caseInfo.invStart = date },
    saveInvEnd (state, date) { state.caseInfo.invEnd = date },
    saveTradeName (state, name) { state.estabInfo.tradeName = name },
    saveAddress (state, address) { state.estabInfo.address = address },
    saveNumberEmployees (state, number) { state.estabInfo.numberEmployees = number },
    saveNaics (state, naics) { state.estabInfo.naics = naics },
    saveLegalName (state, name) { state.bizEntity.legalName = name }
  },

  actions: {

  }
})
