<template>
  <div class="container py-5">
    <div class="row">
      <app-stock v-for="stock in stocks" v-bind:key="stock.id" :stock="stock">
        {{ stock }}</app-stock
      >
    </div>
  </div>
</template>

<script>
import Stock from "@/components/stocks/Stock.vue";
export default {
  components: {
    appStock: Stock
  },
  computed: {
    stocks() {
      return this.$store.getters.stocks;
    }
  }
};
</script>
