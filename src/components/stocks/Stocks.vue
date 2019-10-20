<template>
  <b-container class="stocks-container">
    <h2 class="pt-5 text-left text-light">Stocks Trade Board</h2>
    <hr />
    <b-row class="">
      <stock v-for="stock in stocks" v-bind:key="stock.id" :stock="stock">
        {{ stock }}
      </stock>
    </b-row>
  </b-container>
</template>

<script>
import Stock from "@/components/stocks/Stock.vue";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    Stock
  },
  computed: {
    ...mapState({     
      tradeMode: state => state.stocks.tradeMode,
      stocks: state => state.stocks.stocks,
    }),   
  } 
};
</script>