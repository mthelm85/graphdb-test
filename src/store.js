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
      naics: '',
      name3d: '',
      title3d: '',
      address3d: ''
    },
    bizEntity: {
      legalName: '',
      address: ''
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
    saveName3d (state, name) { state.estabInfo.name3d = name },
    saveTitle3d (state, title) { state.estabInfo.title3d = title },
    saveAddress3d (state, address) { state.estabInfo.address3d = address },
    saveLegalName (state, name) { state.bizEntity.legalName = name },
    saveBizEntAddress (state, address) { state.bizEntity.address = address }
  },

  actions: {

  }
})
