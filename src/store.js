import Vue from "vue";
import Vuex from "vuex";
import stocks from "./modules/stocks";

Vue.use(Vuex);

const state = {
  tradeDay: 1,
  tradeMode: true
};

const mutations = {
  NEXT_DAY(state) {
    state.tradeDay += 1;
  },
  SWITCH_MODE(state) {
    state.tradeMode = !state.tradeMode;
  },
  SET_DAY(state, tradeDay) {
    state.tradeDay = tradeDay;
  }
};

const actions = {
  nextDay: ({ commit }) => {
    commit("NEXT_DAY");
  },
  switchMode: ({ commit }) => {
    commit("SWITCH_MODE");
  },
  loadData: ({ commit }) => {
    Vue.http
      .get("data.json")
      .then(response => response.json())

      .then(data => {
        if (data) {
          const stocks = data.stocks;
          const tradeDay = data.tradeDay;
          const funds = data.funds;
          const orders = data.orders;
          commit("SET_STOCKS", stocks);
          commit("SET_DAY", tradeDay);
          commit("SET_FUNDS", funds);
          commit("SET_ORDERS", orders);
        }
      });
  }
};

const getters = {
  tradeDay: state => {
    return state.tradeDay;
  },
  tradeMode: state => {
    return state.tradeMode;
  }
};
export default new Vuex.Store({
  modules: [stocks],
  state,
  mutations,
  actions,
  getters
});
