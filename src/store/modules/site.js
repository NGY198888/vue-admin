import request from '@/utils/request';
import types from '../types';
import _ from 'lodash';
import router from '@/router';
const state = {
    menu:[],
    tabs:[],
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
  [types.site_add_tab] (state, { tab }) {
    let is= state.tabs.find((item)=>item.name==tab.name)
    if(!is){
      state.tabs.push(tab);
    }

    console.log('site_add_tab',state.tabs,tab);
 },
 [types.site_close_tab] (state, { route }) {
    _.remove(state.tabs, (item)=>{
        return item.route==route;
    });
    if(state.tabs.length>0){
      router.replace(state.tabs[state.tabs.length-1].route)
    }else{
      router.replace('/')
    }
   
  },
  [types.site_close_all_tab] (state) {
    state.tabs=[];
  },
}

export default {
//   namespaced: true,
  state,
  getters,
  actions,
  mutations
}