<template>
  <div
    class="p-4 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 mx-auto opacity-90 hover:opacity-100"
  >
    <div class="flex flex-row justify-center item-stretch">
      <img
        :src="order.stockImgsrc"
        :alt="order.stockName"
        class="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 mr-4 float-left block"
      >
      <div class="float-right text-center">
        <span class="text-light sm:text-sm md:text-md lg:text-lg  ">
          <strong> {{ order.stockName }} </strong>
        </span>
        <p
          class="font-extra-bold font-2xl"
          :class="[order.orderType === 'buy' ? 'text-buy font-bold' : 'text-sell font-bold']"
        >
          {{ order.orderType }}
        </p>
        <p class="text-light sm:text-sm md:text-md lg:text-lg  ">
            {{ order.stockQuantity }} st. | $
          {{ order.stockPrice }}
        </p>
        <p class="text-light font-bold sm:text-sm md:text-md lg:text-lg  ">
          Total: $ {{ order.orderPrice }}
        </p>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  props: ['order']
}
</script>
