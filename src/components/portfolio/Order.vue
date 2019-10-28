<template>
  <div
    class="p-4 w-1/4 flex-none stock-card mx-auto opacity-90 hover:opacity-100"
  >
    <div class="stock-head">
      <img
        :src="order.stockImgsrc"
        :alt="order.stockName"
        class="w-24 h-24 mr-4 float-left block"
      >
      <span class="text-light">
        <strong> {{ order.stockName }} </strong>
      </span>
      <p
        class="font-extra-bold font-2xl"
        :class="[order.orderType === 'buy' ? 'text-buy font-bold' : 'text-sell font-bold']"
      >
        {{ order.orderType }}
      </p>
      <p class="text-light">
         {{ order.stockQuantity }} st. | $
        {{ order.stockPrice }}
      </p>
      <p class="text-light font-bold">
        Total: $ {{ order.orderPrice }}
      </p>

    </div>

  </div>

</template>

<script>
export default {
  props: ['order']
}
</script>
