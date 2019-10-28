<template>
    <div>
        <!-- Indicators -->
        <span class="text-lg text-gold mr-3">
          DAY:
          <transition name="fade" mode="out-in">
            <span class="text-stock" :key="tradeDay">
              <strong class="text-xl font-semibold">
                {{ tradeDay }}
              </strong>
            </span>
          </transition>
        </span>
        <span class="text-lg text-gold mr-3">
          $
          <transition name="fade" mode="out-in">
            <strong class="text-xl font-semibold" :key="funds">
              {{ funds }}
            </strong>
          </transition>
        </span>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      funds: state => state.stocks.funds,
      tradeDay: state => state.stocks.tradeDay,
      run: state => state.stocks.run
    })
  }
}
</script>
