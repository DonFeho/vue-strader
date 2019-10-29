<template>
  <div>
    <div class="text-center py-2">
      <p class="text-2xl font-bold text-light px-4">
        {{ stats ? 'Trade Stats' : 'Trade Log' }}
      </p>
      <hr class="text-light my-2"/>
      <button @click="useStats(), sortOrders()" class="px-4 py-2 text-white bg-dark my-4 rounded-lg">
        {{ !stats ? 'Show Trade Stats' : 'Show All Orders' }}
      </button>
      
    </div>
    <!-- All orders -->
    <div v-show="total" class="px-4 flex flex-row flex-wrap items-stretch justify-center">
      <order v-for="order in orders" :key="order.id" :order="order">
        {{ order }}
      </order>
    </div>
    <!-- Stats  -->
    <div class="text-center">
     
      <div v-show="stats" class="flex flex-row flex-stretch items-center justify-center mx-auto">
        <p class="text-xl text-light my-2 mx-2">
          Total Buy:
          <span v-show="totalBuy > 0" class="text-gold font-semibold text-xl">
            $ {{ totalBuy }}
          </span>
        </p>
        <button @click="useBuy" class="mx-4 px-4 py-2 text-white bg-buy my-4 rounded-lg">
          Check Buy Stats
        </button>
        <button @click="useSell" class="mx-4 px-4 py-2 text-white bg-sell my-4 rounded-lg">
          Check Sell Stats
        </button>
        <p class="text-xl text-light my-2 mx-2">
          Total Sell:
          <span v-show="totalSell > 0" class="text-gold font-semibold text-xl">
            $ {{ totalSell }}
          </span>
        </p>
      </div>

      <div v-show="stats" class="mt-4 py-4">
        <p class="my-2 text-xl text-light"> Single Stock Selected Stats</p>

        <el-select v-model="selectStock" clearable placeholder="Select Stock" class="mt-2" @change="selectedStock">
          <el-option
            v-for="item in stocks"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>

        <div v-show="selectStock" class="inline">

          <span class="text-xl text-light my-2 mx-2">
            Assets:
            <span v-show="selectedStock" class="text-gold font-semibold text-xl">
              {{singleAsset.amount}} st. $ {{singleAsset.price}}
            </span>
          </span>

          <span class="text-xl text-light my-2 mx-2">
            Buy:
            <span v-show="selectedStock" class="text-buy font-semibold text-xl">
              $ {{ singleBuy }}
            </span>
          </span>
          <span class="text-xl text-light my-2 mx-2">
            Sell:
            <span v-show="selectedStock" class="text-sell font-semibold text-xl">
              $ {{ singleSell }}
            </span>
          </span>
          <span class="text-xl text-light my-2 mx-2">
            Result:
            <span v-show="selectedStock" class="text-gold font-semibold text-xl">
              $ {{ singleResult }}
            </span>
          </span>
        </div>
        <button v-show="selectStock" @click="selectedStock" class="mx-4 px-4 py-2 text-white bg-blue my-4 rounded-lg">
          Check Stock Stats
        </button>

        <div v-show="selectStock" class="px-4 flex flex-row flex-wrap items-stretch justify-center">
          <order v-for="order in singleStock" :key="order.id" :order="order">
            {{ order }}
          </order>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Order from '@/components/portfolio/Order.vue'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      totalBuy: 0,
      totalSell: 0,
      stats: false,
      total: true,
      buyStats: [],
      sellStats: [],
      selectStock: '',
      singleBuy: 0,
      singleSell: 0,
      singleResult: 0,
      singleStock: [],
      singleAsset: {
        amount: 0,
        price: 0
      }

    }
  },
  components: {
    Order
  },
  computed: {
    ...mapState({
      orders: state => state.stocks.orders,
      stocks: state => state.stocks.stocks
    })

  },
  methods: {
    useStats () {
      this.stats = !this.stats
      this.total = !this.total
    },
    sortOrders () {
      this.sellStats = []
      this.buyStats = []
      this.orders.forEach((order) => {
        if (order.orderType === 'sell') {
          this.sellStats.push(order)
        } else {
          this.buyStats.push(order)
        }
      })
    },
    selectedStock () {
      this.singleStock = []
      this.singleBuy = 0
      this.singleSell = 0
      this.singleResult = 0
      this.singleStock = this.orders.filter(order => {
        if (order.stockName === this.selectStock) {
          return true
        }
      })
      this.singleStock.forEach(order => {
        if (order.orderType === 'sell') {
          this.singleSell += order.orderPrice
        } else {
          this.singleBuy += order.orderPrice
        }
      })
      this.singleAsset = this.stocks.find(stock => stock.name === this.selectStock)
      this.singleResult = this.singleAsset.amount * this.singleAsset.price + this.singleSell - this.singleBuy
    },

   
    useBuy () {
      this.totalBuy = 0
      this.buyStats.forEach(order => {
        this.totalBuy += order.orderPrice
      })
    },
    useSell () {
      this.totalSell = 0
      this.sellStats.forEach(order => {
        this.totalSell += order.orderPrice
      })
    },

  }
}
</script>