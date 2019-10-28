<template>
  <div>
    <div v-if="loading" class="fixed inset-0 w-full h-full" v-loading="loading" fullscreen target="body" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" ></div>
    <el-dropdown
        class="inline-block text-light"
        v-show="!run && tradeDay > 1"
    >
        <span class="el-dropdown-link">
            Load | Save <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="p-0">
            <el-dropdown-item>
                <a
                  class="text-dark"
                  href="#"
                  @click="load"
                > Load </a>
            </el-dropdown-item>
            <el-dropdown-item>
                <a
                  class="text-dark"
                  href="#"
                  @click="save"
                > Save </a>
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>

import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState({
      funds: state => state.stocks.funds,
      tradeDay: state => state.stocks.tradeDay,
      orders: state => state.stocks.orders,
      stocks: state => state.stocks.stocks,
      run: state => state.stocks.run,
      loading: state => state.stocks.loading
    })
  },
  methods: {
    ...mapActions(['load']),
    ...mapMutations(['setLoading']),
    save () {
      this.setLoading(true)
      const data = {
        funds: this.funds,
        stocks: this.stocks,
        tradeDay: this.tradeDay,
        orders: this.orders
      }
      this.$axios.put('data.json', data)
        .then(res => {
          this.setLoading(false)
        })
        .catch(error => {
          this.setLoading(false)
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #fff;
  }
  .el-icon-arrow-down {
    font-size: 14px;
  }
</style>
