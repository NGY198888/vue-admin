import LocalStore from 'utils/LocalStore';
import router from '@/router';
import types from '../types';
const state = {
    token:''
}

// getters
const getters = {

}

// actions
const actions = {
 
}

// mutations
const mutations = {
  [types.auth_set_token] (state, { token }) {
     console.log('token',token);
     state.token=token;
     LocalStore.set("token",token);
     window.location.href="/"
  },
  [types.auth_clean_token] (state) {
    state.token=null;
    LocalStore.set("token",null);
    router.replace("login")
 },
}

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}