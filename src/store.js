import Vue from "vue";
import Vuex from "vuex";
import stocks from "./data/data";

Vue.use(Vuex);

const state = {
  funds: 50000,
  stocks: [],
  orders: [],
  tradeDay: 1,
  run: false,
  tradeMode: true
};
const mutations = {
  SET_STOCKS(state, stocks) {
    state.stocks = stocks;
  },
  SET_RUN(state) {
    state.run = !state.run;
  },
  SET_ORDER(state, order) {
    state.orders.unshift(order);
  },
  NEXT_DAY(state) {
    state.tradeDay += 1;
  },
  SWITCH_MODE(state) {
    state.tradeMode = !state.tradeMode;
  },
  SET_DAY(state, tradeDay) {
    state.tradeDay = tradeDay;
  },
  SET_FUNDS(state, funds) {
    state.funds = funds;
  },
  SET_ORDERS(state, orders) {
    state.orders = orders;
  },
  CHANGE_STOCKS(state, { stockId, stockQuantity, orderPrice, orderType }) {
    const record = state.stocks.find(el => el.id == stockId);
    if (orderType === "buy") {
      record.amount += stockQuantity;
      state.funds -= orderPrice;
    } else {
      record.amount -= stockQuantity;
      state.funds += orderPrice;
    }
  },
  MARKET_CHANGES(state) {
    state.stocks.forEach(stock => {
      stock.lastprice = stock.price;
      stock.price = Math.round(stock.price * (1 + Math.random() - 0.45));
      stock.delta = stock.price - stock.lastprice;
      return stock;
    });
  }
};

const actions = {
  changeStock: ({ commit }, order) => {
    commit("CHANGE_STOCKS", order);
  },
  initStocks: ({ commit }) => {
    commit("SET_STOCKS", stocks);
  },
  setOrder: ({ commit }, order) => {
    commit("SET_ORDER", order);
  },
  switchMode: ({ commit }) => {
    commit("SWITCH_MODE");
  },
  updateMarket: ({ commit }) => {
    commit("MARKET_CHANGES");
  },
  setRun: ({ commit }) => {
    commit("SET_RUN");
  },
  nextDay: ({ commit }) => {
    commit("NEXT_DAY");
  },

  setFunds: ({ commit }, funds) => {
    commit("SET_FUNDS", funds);
  },

  setOrders: ({ commit }, orders) => {
    commit("SET_ORDERS", orders);
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
  run: state => {
    return state.run;
  },
  funds: state => {
    return state.funds;
  },
  tradeDay: state => {
    return state.tradeDay;
  },
  tradeMode: state => {
    return state.tradeMode;
  },
  stocks: state => {
    return state.stocks;
  },
  orders: state => {
    return state.orders;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
