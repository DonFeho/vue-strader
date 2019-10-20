<template>
  <b-button
    size="md"
    :class="[!run ? 'btn-success' : 'btn-danger']"
    class="btn"
    @click="!run ? startTrade() : stopTrade(), setRun()"
  >
    {{ !run ? "Run Trade" : "Stop Trade" }}
  </b-button>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      run: state => state.stocks.run,
      tradeMode: state => state.stocks.tradeMode,
      stocks: state => state.stocks.stocks
    })     
  },
  methods: {
    ...mapActions(["updateMarket", "nextDay", "setRun"]),
    startTrade() {
      this.marketSpeed = setInterval(() => {
        this.nextDay(), this.updateMarket();
      }, 5000)
      this.nextDay()
      this.updateMarket()
    },
    stopTrade() {
      clearInterval(this.marketSpeed);
    }
  }
};
</script>
