import request from '@/utils/request';
import types from '../types';
import LocalStore from 'utils/LocalStore';
const state = {
    user:{}
}

// getters
const getters = {
  
}

// actions
const actions = {
   async [types.user_login] ({ commit }, {username,password}) {
    request.post("/login",{username,password}).then((res)=>{
        LocalStore.set("username",username);
        commit(types.user_load_user,res.data);
        commit(`${types.auth_set_token}`,res.data);
    })
  },
}

// mutations
const mutations = {
  [types.user_load_user] (state, { user }) {
     state.user=user;
  },
}

export default {
//   namespaced: true,
  state,
  getters,
  actions,
  mutations
}