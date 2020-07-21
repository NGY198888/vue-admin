import Vue from 'vue'
import Vuex from 'vuex'
import types from './types';
import auth from './modules/auth'
import user from './modules/user'
// import cart from './modules/cart'
// import products from './modules/products'
// import createLogger from '../../../src/plugins/logger'
Vue.use(Vuex)
// const debug = process.env.NODE_ENV !== 'production'
let loading = null;
export default new Vuex.Store({
  modules: {
   user,
   auth,
  },
  state: {
    loading: false,
  },
  getters: {

  },
  mutations: {
    [types.START_LOADING](state) {
        state.loading = true
        loading=Vue.prototype.$loading({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
    },
    [types.STOP_LOADING](state) {
        state.loading = false
        Vue.prototype.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loading.close();
        });
    },
  },
  actions: {

  }
//   strict: debug,
//   plugins: debug ? [createLogger()] : []
})