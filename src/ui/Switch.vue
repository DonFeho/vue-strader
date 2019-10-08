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
        @change="switchM(), toTrade()"
        switch
        size="lg"
      >
        {{ tradeMode ? "Buy" : "Sell" }}
      </b-form-checkbox>
    </span>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  computed: {
    tradeMode() {
      return this.$store.getters.tradeMode;
    }
  },
  methods: {
    ...mapActions({
      switchM: "switchMode"
    }),
    toTrade() {
      const cLoc = this.$router.currentRoute.name;
      if (cLoc !== "stocks") {
        this.$router.push("/stocks");
      }
    }
  }
};
</script>

<style lang="scss"></style>
