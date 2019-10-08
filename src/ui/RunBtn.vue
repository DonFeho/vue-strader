<template>
  <b-button
    size="md"
    :class="[!run ? 'btn-success' : 'btn-danger']"
    class="btn"
    @click="!run ? startTrade() : stopTrade(), runTime()"
  >
    {{ !run ? "Run Trade" : "Stop Trade" }}
  </b-button>
</template>
<script>
import { mapActions } from "vuex";

export default {
  computed: {
    tradeDay() {
      return this.$store.getters.tradeDay;
    },
    stocks() {
      return this.$store.getters.stocks;
    },
    run() {
      return this.$store.getters.run;
    }
  },
  methods: {
    ...mapActions({
      updateMarket: "updateMarket",
      nextDay: "nextDay",
      runTime: "setRun"
    }),
    startTrade() {
      this.marketSpeed = setInterval(() => {
        this.nextDay(), this.updateMarket();
      }, 5000);

      this.nextDay();
      this.updateMarket();
    },
    stopTrade() {
      clearInterval(this.marketSpeed);
    }
  }
};
</script>
