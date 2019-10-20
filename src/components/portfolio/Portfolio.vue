<template>
  <b-container class="mt-5">
    <h2 class="pt-5 text-left text-light">Trade Log</h2>
    <hr />
    <b-row class="py-5">
      <order v-for="(order, index) in orders" :key="index" :order="order">
        {{ order }}
      </order>
    </b-row>
  </b-container>
</template>
<script>
import Order from "@/components/portfolio/Order.vue";
import { mapState } from "vuex";
export default {
  components: {
    Order
  },
  computed: {
    ...mapState({
      orders: state => state.stocks.orders
    })    
  }
};
</script>
