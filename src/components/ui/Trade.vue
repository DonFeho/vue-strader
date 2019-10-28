<template>
  <div>
    <p class="text-light hover:text-gold">
      Trade Mode:
      <el-switch
        class="ml-2"
        @change="buySell(), toTrade()"
        :value="tradeMode"
        active-color="#24c204"
        inactive-color="#9459d8"
      >
      </el-switch>
      <span class="ml-2"
        :class="[tradeMode ? 'text-buy' : 'text-sell']"
      >
        {{ tradeMode ? "Buy" : "Sell" }}
      </span>
    </p>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      tradeMode: state => state.stocks.tradeMode
    })
  },
  methods: {
    ...mapMutations(['buySell']),
    toTrade () {
      const curLocation = this.$router.currentRoute.name
      if (curLocation !== 'stocks') {
        this.$router.push('/stocks')
      }
    }
  }
}
</script>
