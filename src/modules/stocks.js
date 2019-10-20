import Vue from "vue";
import Vuex from "vuex";
import stocks from "../data/data";

Vue.use(Vuex);

const initialState = {
  funds: 50000,
  stocks: [],
  orders: [],
  tradeDay: 1,
  run: false,
  tradeMode: true
};

const mutations = {
  set_stocks(state, stocks) {
    state.stocks = stocks;
  },
  set_run(state) {
    state.run = !state.run;
  },
  set_order(state, order) {
    state.orders.unshift(order);
  },
  next_day(state) {
    state.tradeDay += 1;
  },
  buy_sell(state) {
    state.tradeMode = !state.tradeMode;
  },
  set_day(state, tradeDay) {
    state.tradeDay = tradeDay;
  },
  set_funds(state, funds) {
    state.funds = funds;
  },
  set_orders(state, orders) {
    state.orders = orders;
  },
  change_stocks(state, { stockId, stockQuantity, orderPrice, orderType }) {
    const record = state.stocks.find(el => el.id == stockId);
    if (orderType === "buy") {
      record.amount += stockQuantity;
      state.funds -= orderPrice;
    } else {
      record.amount -= stockQuantity;
      state.funds += orderPrice;
    }
  },
  market_changes(state) {
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
    commit("change_stocks", order);
  },
  initStocks: ({ commit }) => {
    commit("set_stocks", stocks);
  },
  setOrder: ({ commit }, order) => {
    commit("set_order", order);
  },
  switchMode: ({ commit }) => {
    commit("buy_sell");
  },
  updateMarket: ({ commit }) => {
    commit("market_changes");
  },
  setRun: ({ commit }) => {
    commit("set_run");
  },
  nextDay: ({ commit }) => {
    commit("next_day");
  },
  setFunds: ({ commit }, funds) => {
    commit("set_funds", funds);
  },
  setOrders: ({ commit }, orders) => {
    commit("set_orders", orders);
  },
  loadData: ({ commit }) => {
    Vue.http
      .get("data.json")
      .then(response => response.json())
      .then(data => {
        if (data) {
          commit("set_stocks", data.stocks);
          commit("set_day", data.tradeDay);
          commit("set_funds", data.funds);
          commit("set_orders", data.orders);
        }
      });
  }
};

const getters = {

};

export default {
  state: initialState,
  mutations,
  actions,
  getters
};
