import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

import Company from './modules/Company'
import Menu from './modules/Menu'
import Order from './modules/Orders'
import Report from './modules/Report'
import Table from './modules/Table'
import Payments from './modules/Payments';
import Method from './modules/Method';
import Product from './modules/Product';
import User from './modules/User';
export default createStore({
  plugins: [
    createPersistedState({ 
      storage: Window.sessionStorage,
      paths: ['User']
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
    User,
    Company,
    Table,
    Order,
    Report,
    Menu,
    Payments,
    Method,
    Product
  }
})
