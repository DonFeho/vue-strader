<template>
  <button
    :class="[!run ? 'bg-buy hover:bg-buy-dark' : 'bg-danger hover:bg-danger-dark']"
    class="py-2 px-4 text-light border-none rounded-lg"
    @click="!run ? startTrade() : stopTrade(), setRun()"
  >
    {{ !run ? "Run" : "Stop" }}
  </button>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      run: state => state.stocks.run,
      tradeMode: state => state.stocks.tradeMode,
      stocks: state => state.stocks.stocks
    })
  },
  methods: {
    ...mapMutations(['marketChanges', 'nextDay', 'setRun']),
    startTrade () {
      this.marketSpeed = setInterval(() => {
        this.nextDay()
        this.marketChanges()
      }, 5000)
      this.nextDay()
      this.marketChanges()
    },
    stopTrade () {
      clearInterval(this.marketSpeed)
    }
  }
}
</script>
