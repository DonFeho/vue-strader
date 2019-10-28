import Vue from 'vue'
import Vuex from 'vuex'
// Modules
import stocks from './stocks'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    stocks
  }
})

// export const store = new Vuex.Store({
//   modules: {
//     stocks
//   }
// });
