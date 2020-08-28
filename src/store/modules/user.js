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
   async [types.user_login] ({dispatch }, {username,password}) {
    request.post("/login",{username,password}).then((res)=>{
      dispatch(types.user_logined,res.data);
        // LocalStore.set("username",username);
        // commit(`${types.auth_set_token}`,res.data);
        // commit(types.user_load_user,{user});
    })
    
  },
  async [types.user_logined] ({ commit }, {user,token}) {
    LocalStore.set("username",user.username);
    commit(types.user_load_user,{user});
    commit(`${types.auth_set_token}`,{token});
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