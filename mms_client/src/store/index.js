import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

import Company from './modules/Company'
import Menu from './modules/Menu'
import Order from './modules/Orders'
import Report from './modules/Report'
import Table from './modules/Table'
import Payments from './modules/Payments';
import Method from './modules/Method';
export default createStore({
  plugins: [
    createPersistedState({ 
      storage: Window.sessionStorage,
      paths: ['Company']
    })
  ],
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
    Order,
    Report,
    Menu,
    Payments,
    Method
  }
})
