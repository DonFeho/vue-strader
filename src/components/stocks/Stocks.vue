<template>
  <b-container class="stocks-container">
    <h2 class="pt-5 text-left text-light">Stocks Trade Board</h2>
    <hr />
    <b-row class="">
      <app-stock v-for="stock in stocks" v-bind:key="stock.id" :stock="stock">
        {{ stock }}
      </app-stock>
    </b-row>
  </b-container>
</template>

<script>
import Stock from "@/components/stocks/Stock.vue";
import { mapActions } from "vuex";

export default {
  components: {
    appStock: Stock
  },
  computed: {
    stocks() {
      return this.$store.getters.stocks;
    },
    tradeMode() {
      return this.$store.getters.tradeMode;
    }
  },
  methods: {
    ...mapActions({
      switchM: "switchMode"
    })
  }
};
</script>

<style lang="scss"></style>
