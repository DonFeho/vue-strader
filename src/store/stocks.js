import Vue from 'vue'
import Vuex from 'vuex'
import $axios from '@/plugins/api.service.js'

import initStocks from '@/core/data'

Vue.use(Vuex)

const state = {
  funds: 50000,
  stocks: initStocks,
  orders: [],
  tradeDay: 1,
  run: false,
  tradeMode: true,
  loading: false
}

const mutations = {
  setLoading (state, value) {
    state.loading = value
  },
  setStocks (state, value) {
    state.stocks = value
  },
  setRun (state) {
    state.run = !state.run
  },
  buySell (state) {
    state.tradeMode = !state.tradeMode
  },
  setOrder (state, order) {
    state.orders.unshift(order)
  },
  nextDay (state) {
    state.tradeDay += 1
  },
  setLoaded (state, data) {
    state.tradeDay = data.tradeDay
    state.funds = data.funds
    state.orders = data.orders
    state.stocks = data.stocks
  },
  changeStocks (state, { stockId, stockQuantity, orderPrice, orderType }) {
    const record = state.stocks.find(el => el.id === stockId)
    if (orderType === 'buy') {
      record.amount += stockQuantity
      state.funds -= orderPrice
    } else {
      record.amount -= stockQuantity
      state.funds += orderPrice
    }
  },
  marketChanges (state) {
    state.stocks.forEach(stock => {
      stock.lastprice = stock.price
      stock.price = Math.round(stock.price * (1 + Math.random() - 0.45))
      stock.delta = stock.price - stock.lastprice
      return stock
    })
  }
}

const actions = {
  load ({ commit }) {
    commit('setLoading', true)
    return $axios.get('data.json')
      .then(({ data }) => {
        commit('setLoaded', data)
        commit('setLoading', false)
        Promise.resolve(data)
      })
      .catch(error => {
        Promise.reject(error)
        commit('setLoading', false)
      })
  }
}
export default {
  state,
  mutations,
  actions
}
