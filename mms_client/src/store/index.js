import { createStore } from 'vuex'
// import createPersistedState from "vuex-persistedstate";

import Company from './modules/Company'
import Table from './modules/Table'
export default createStore({
  // plugins: [
  //   createPersistedState({ 
  //     storage: Window.sessionStorage,
  //     paths: ['Accounts']
  //   })
  // ],
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Company,
    Table,
  }
})
