import stocks from "../data/data";

const state = {
  funds: 50000,
  stocks: [],
  orders: []
};
const mutations = {
  SET_STOCKS(state, stocks) {
    state.stocks = stocks;
  },
  SET_ORDER(state, order) {
    state.orders.push(order);
  },
  SET_FUNDS(state, funds) {
    state.funds = funds;
  },
  SET_ORDERS(state, orders) {
    state.orders = orders;
  },

  // BUY_STOCKS(state, { stockId, stockQuantity, orderPrice }) {
  //   const record = state.stocks.find(el => el.id == stockId);
  //   record.amount += stockQuantity;
  //   state.funds -= orderPrice;
  // },
  // SELL_STOCKS(state, { stockId, stockQuantity, orderPrice }) {
  //   const record = state.stocks.find(el => el.id == stockId);
  //   record.amount -= stockQuantity;
  //   state.funds += orderPrice;
  // },
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
  buyStock: ({ commit }, order) => {
    commit("CHANGE_STOCKS", order);
  },
  sellStock: ({ commit }, order) => {
    commit("CHANGE_STOCKS", order);
  },
  setOrder: ({ commit }, order) => {
    commit("SET_ORDER", order);
  },
  initStocks: ({ commit }) => {
    commit("SET_STOCKS", stocks);
  },
  updateMarket: ({ commit }) => {
    commit("MARKET_CHANGES");
  },
  setFunds: ({ commit }, funds) => {
    commit("SET_FUNDS", funds);
  },
  setOrders: ({ commit }, orders) => {
    commit("SET_ORDERS", orders);
  }
};
const getters = {
  stocks: state => {
    return state.stocks;
  },
  orders: state => {
    return state.orders;
  },
  funds: state => {
    return state.funds;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
