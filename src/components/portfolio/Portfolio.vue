<template>
  <b-container class="mt-5">
    <h2 class="pt-5 text-left text-light">Trade Log</h2>
    <hr />
    <b-row class="py-5">
      <app-order v-for="(order, index) in orders" :key="index" :order="order">
        {{ order }}
      </app-order>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import Order from "@/components/portfolio/Order.vue";

export default {
  components: {
    appOrder: Order
  },
  computed: {
    orders() {
      return this.$store.getters.orders;
    }
  }
};
</script>

<style lang="scss"></style>
