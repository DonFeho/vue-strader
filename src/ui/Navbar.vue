<template>
  <div>
    <!-- Top Menu -->
    <b-navbar id="main" toggleable="lg" type="dark" variant="dark" fixed="top">
      <b-container>
        <b-navbar-brand>
          <img style="width: 2rem; height: 2rem;" alt="Vue logo" src="../assets/logo.png"/>
          <span class="text-gold"> Stock Trader</span>
        </b-navbar-brand>
        <!-- Main Nav -->
        <b-navbar-toggle target="nav-collapse-top"></b-navbar-toggle>
        <b-collapse id="nav-collapse-top" is-nav>
          <b-navbar-nav class="mx-auto">
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item to="/stocks">Trade Board</b-nav-item>
            <b-nav-item to="/portfolio">Trade Log</b-nav-item>            
            <b-nav-item-dropdown
              v-show="!run && tradeDay > 1"
              text="Save / Load"
              right
            >
              <b-dropdown-item href="#" @click="loadData"> Load </b-dropdown-item>
              <b-dropdown-item href="#" @click="saveData"> Save </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
          <!-- RUN Trade btn -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#">
              <runbtn></runbtn>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <!-- Bootom Menu -->
    <b-navbar
      id="control"
      type="dark"
      variant="dark"
      fixed="bottom"
      class="text-center"
    >
      <b-container>
        <!-- DAY -->
        <b-navbar-nav class="mr-auto">
          <b-nav-text class="p-0 text-info">
            DAY
            <transition name="slide" mode="out-in">
              <h4 class="text-gold" :key="tradeDay">
                <strong> {{ tradeDay }} </strong>
              </h4>
            </transition>
          </b-nav-text>
        </b-navbar-nav>
        <!-- TradeMod Switch -->
        <b-navbar-nav class="mx-auto">
          <Trade></Trade>
        </b-navbar-nav>
        <!-- Balance -->
        <b-navbar-nav class="ml-auto text-center">
          <b-nav-text class="text-info m-0">
            BALANCE
            <h4 class="text-gold">
              $
              <transition name="slide" mode="out-in">
                <strong :key="funds"> {{ funds }} </strong>
              </transition>
            </h4>
          </b-nav-text>
        </b-navbar-nav>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import Trade from "@/ui/Trade.vue";
import Runbtn from "@/ui/Runbtn.vue";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    Trade,
    Runbtn
  },
  computed: {
    ...mapState({
      funds: state => state.stocks.funds,
      tradeDay: state => state.stocks.tradeDay,
      orders: state => state.stocks.orders,
      stocks: state => state.stocks.stocks,
      run: state => state.stocks.run       
    })
  },
  methods: {
    ...mapActions(["loadData"]),
    saveData() {
      const data = {
        funds: this.funds,
        stocks: this.stocks,
        tradeDay: this.tradeDay,
        orders: this.orders
      };
      this.$http.put("data.json", data);
    }    
  }
};
</script>
