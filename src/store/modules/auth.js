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
     router.push("/")
  },
}

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}