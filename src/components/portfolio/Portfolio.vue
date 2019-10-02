<template>
  <div class="container py-5">
    <app-stock v-for="stock in stocks" :key="stock.id" :stock="stock">
      {{ stock }}</app-stock
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Stock from "@/components/portfolio/Stock.vue";

export default {
  computed: {
    ...mapGetters({
      stocks: "stockPortfolio"
    })
  },
  components: {
    appStock: Stock
  }
};
</script>
