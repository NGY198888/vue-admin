const state = {
  token:''
}

// getters
const getters = {

}

// actions
const actions = {
checkout ({ commit, state }, products) {
  
},

addProductToCart ({ state, commit }, product) {
  
}
}

// mutations
const mutations = {
  pushProductToCart (state, { id }) {
    state.items.push({
      id,
      quantity: 1
    })
  },
}

export default {
namespaced: true,
state,
getters,
actions,
mutations
}