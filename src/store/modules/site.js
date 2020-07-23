import request from '@/utils/request';
import types from '../types';
const state = {
    menu:[]
}

// getters
const getters = {
  
}

// actions
const actions = {
   async [types.site_feth_site] ({ commit }) {
    request.get("/site",{}).then((res)=>{
        commit(types.site_load_menu,res.data);
    })
  },
}

// mutations
const mutations = {
  [types.site_load_menu] (state, { menu }) {
     state.menu=menu;
  },
}

export default {
//   namespaced: true,
  state,
  getters,
  actions,
  mutations
}