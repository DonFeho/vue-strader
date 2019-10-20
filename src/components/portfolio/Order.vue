<template>
  <b-col class="mx-auto" sm="auto" md="6" lg="4" xl="4">
    <b-card
      :title="order.stockName"
      :img-src="order.stockImgsrc"
      img-alt="Image"
      img-height="80px"
      img-width="80px"
      img-left
      tag="h5"
      style="max-width: 22rem;"
      class="p-3 m-4 border-0 text-left stock-card text-light"
    >
      <b-card-text
        class=""
        :class="[order.orderType === 'buy' ? 'text-buy' : 'text-sell']"
      >
        {{ order.orderType }} {{ order.stockQuantity }} st. | $
        {{ order.stockPrice }}
      </b-card-text>
      <b-card-text class="text-dark">
        Total: $ {{ order.orderPrice }}
      </b-card-text>
    </b-card>
  </b-col>
</template>

<script>
export default {
  props: ["order"]
};
</script>
