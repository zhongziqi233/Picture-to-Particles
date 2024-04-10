import { createStore } from 'vuex'


export default createStore({
  state: {
    imageFile: "",
    // particles: [],
    backgroundColor: "#000000",
  },
  getters: {
    getImageFile(state) { return state.imageFile },
    // getParticles(state) { return state.particles },
    getBackgroundColor(state) { return state.backgroundColor }
  },
  mutations: {
    updateImageFile(state, status){ state.imageFile = status },
    // updateParticles(state, status){ state.particles = status },
    updateBackgroundColor(state, status) { state.backgroundColor = status }
  },
  actions: {},
  modules: {}
});
