<template>
  <div>
    <p class="p-0 m-0 text-info text-uppercase">
      Trade Mode:
    </p>
    <span
      class="text-uppercase "
      :class="[tradeMode ? 'text-buy' : 'text-sell']"
    >
      <b-form-checkbox
        name="check-button"
        @change="switchMode(), toTrade()"
        switch
        size="lg"
      >
        {{ tradeMode ? "Buy" : "Sell" }}
      </b-form-checkbox>
    </span>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: { 
    ...mapState({
      tradeMode: state => state.stocks.tradeMode
    })    
  },
  methods: {
    ...mapActions(["switchMode"]),
    toTrade() {
      const curLocation = this.$router.currentRoute.name;
      if (curLocation !== "stocks") {
        this.$router.push("/stocks");
      }
    }
  }
};
</script>