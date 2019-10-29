<template>
  <div class="container mx-auto">
    <h2 class="text-xl text-left font-bold text-light px-4">Stocks Trade Board</h2>
    <hr />
    <div class="px-2 flex flex-row flex-wrap items-stretch content-center justify-center">
      <stock v-for="stock in stocks" :key="stock.id" :stock="stock" />
    </div>
  </div>
</template>
<script>
import Stock from '@/components/stocks/Stock.vue'
import { mapState } from 'vuex'
export default {
  components: {
    Stock
  },
  computed: {
    ...mapState({
      tradeMode: state => state.stocks.tradeMode,
      stocks: state => state.stocks.stocks
    })
  }
}
</script>
