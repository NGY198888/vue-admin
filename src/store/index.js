import Vue from 'vue'
import Vuex from 'vuex'
import types from './types';
// import cart from './modules/cart'
// import products from './modules/products'
// import createLogger from '../../../src/plugins/logger'
Vue.use(Vuex)
// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    // cart,
    // products
  },
  state: {
    loading: false,
  },
  getters: {

  },
  mutations: {
    [types.START_LOADING](state) {
        console.log("state",state);
        state.loading = true
    },
    [types.STOP_LOADING](state) {
        state.loading = false
    },
  },
  actions: {

  }
//   strict: debug,
//   plugins: debug ? [createLogger()] : []
})