import { createStore } from 'vuex'


export default createStore({
  state: {
    imageFile: "",
    backgroundColor: "#FFFFFF",
  },
  getters: {
    getImageFile(state) { return state.imageFile },
    getBackgroundColor(state) { return state.backgroundColor }
  },
  mutations: {
    updateImageFile(state, status){ state.imageFile = status },
    updateBackgroundColor(state, status) { state.backgroundColor = status }
  },
  actions: {},
  modules: {}
});
