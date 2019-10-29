<template>
  <div
    v-if="tradeMode || stock.amount > 0"
    class="p-4 flex flex-col sm:flex-shrink-1 sm:w-4/5 md:w-1/2 lg:w-1/3 xl:w-1/3 stock-card bg-blue opacity-85 hover:opacity-100"
    :class="[stock.amount > 0 ? 'rounded-tl-card-tl rounded-br-card-br shadow-card opacity-100' : 'rounded-tl-cardrev-tl']"
  >
    <div class="md:w-70 mb-2">
      <img
        :src="stock.imgSrc"
        :alt="stock.name"
        class="w-32 h-32 mr-4 float-left block"
      >
      <span class="text-light fotn-semibold text-2xl tracking-wide">
        <strong> {{ stock.name }} </strong>
      </span>
      <p class="text-gold fotn-semibold text-2xl tracking-wide">
        <transition name="fade" mode="out-in">
          <span class="text-stock" :key="stock.amount">
            <strong> {{ stock.amount }} </strong>
          </span>
        </transition>
        <span class="text-gray-300">
          {{ stock.amount > 0 ? "stocks" : "stock" }}
        </span>
      </p>
    </div>
    <div class="text-center">
      <p class="text-light">
        Today Price:
        <transition name="fade" mode="out-in">
          <strong class="text-gold font-bold text-xl" :key="stock.price">
            $ {{ stock.price }}
          </strong>
        </transition>
      </p>
      <p
        v-show="tradeDay > 1"
        class="text-light"
      >
        Last Price:
        <transition name="fade" mode="out-in">
          <strong class="text-lg text-light" :key="stock.lastprice">
            $ {{ stock.lastprice }}
          </strong>
        </transition>
      </p>
      <p
        v-show="tradeDay > 1"
        class="text-light"
      >
        Delta Price:
        <transition name="fade" mode="out-in">
          <strong
            class="text-lg"
            :key="stock.delta"
            :class="[stock.delta > 0 || stock.delta === 0
              ? 'text-buy'
              : 'text-danger'
            ]"
          >
            $ {{ stock.delta }}
          </strong>
        </transition>
      </p>
      <form class="my-3">
        <input
          type="number"
          class="p-1 mr-2 w-20"
          placeholder="Quantity"
          v-model="quantity"
          :min="0"
        />
        <!-- ACTION BTN -->
        <button
          v-show="tradeMode"
          class="py-2 px-4 text-light border-none rounded-lg"
          @click="pushOrder('buy')"
          :disabled="noFunds || quantity <= 0"
          :class="[noFunds
            ? 'bg-danger hover:bg-danger-dark'
            : 'bg-buy hover:bg-buy-dark']"
        >
          {{ noFunds ? "No Funds" : "BUY" }}
        </button>
        <button
          v-show="!tradeMode"
          class="py-2 px-4 text-light border-none rounded-lg"
          @click="pushOrder('sell')"
          :disabled="noStocks || quantity <= 0"
          :class="[noStocks
            ? 'bg-danger hover:bg-danger-dark'
            : 'bg-sell hover:bg-sell-dark']"
        >
          {{ noStocks ? "No Stocks" : "SELL" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import uuid from 'uuid'
export default {
  props: ['stock'],
  data () {
    return {
      quantity: null
    }
  },
  computed: {
    ...mapState({
      funds: state => state.stocks.funds,
      tradeMode: state => state.stocks.tradeMode,
      tradeDay: state => state.stocks.tradeDay
    }),
    noFunds () {
      return this.quantity * this.stock.price > this.funds
    },
    noStocks () {
      return this.quantity > this.stock.amount
    }
  },
  methods: {
    ...mapMutations(['setOrder', 'changeStocks']),
    pushOrder (type) {
      const order = {
        id: uuid.v4(),
        stockId: this.stock.id,
        stockImgsrc: this.stock.imgSrc,
        stockName: this.stock.name,
        stockPrice: this.stock.price,
        stockQuantity: Number.parseInt(this.quantity, 0),
        orderPrice: Number.parseInt(this.stock.price * this.quantity, 0),
        orderType: type
      }
      this.setOrder(order)
      this.changeStocks(order)
      this.quantity = null
    }
  }
}
</script>
