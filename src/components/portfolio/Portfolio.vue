<template>
  <div>
    <h2 class="text-xl text-left font-bold text-light">Trade Log</h2>
    <hr />
    <div class="flex flex-row flex-wrap items-stretch justify-center">
      <order v-for="order in orders" :key="order.id" :order="order">
      {{ order }}
    </order>
    </div>
  </div>
</template>

<script>
import Order from '@/components/portfolio/Order.vue'
import { mapState } from 'vuex'
export default {
  components: {
    Order
  },
  computed: {
    ...mapState({
      orders: state => state.stocks.orders
    })
  }
}
</script>
