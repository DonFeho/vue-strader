<template>
  <div>
    <!-- Top Menu -->
    <b-navbar id="main" toggleable="lg" type="dark" variant="dark" fixed="top">
      <b-container>
        <b-navbar-brand>
          <img
            style="width: 2rem; height: 2rem;"
            alt="Vue logo"
            src="../assets/logo.png"
          />
          <span class="text-gold"> Stock Trader</span>
        </b-navbar-brand>
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
              <b-dropdown-item href="#" @click="loadData">
                Load
              </b-dropdown-item>
              <b-dropdown-item href="#" @click="saveData">
                Save
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#">
              <!-- RUN Trade btn -->
              <app-run></app-run>
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
        <b-navbar-nav class="mr-auto text-center">
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

        <!-- TradeMod Switch -->
        <b-navbar-nav class="mx-auto">
          <app-switch></app-switch>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-text class="p-0 text-info">
            DAY
            <transition name="slide" mode="out-in">
              <h4 class="text-gold" :key="tradeDay">
                <strong> {{ tradeDay }} </strong>
              </h4>
            </transition>
          </b-nav-text>
        </b-navbar-nav>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import Switch from "@/ui/Switch.vue";
import RunBtn from "@/ui/RunBtn.vue";
import { mapActions } from "vuex";

export default {
  components: {
    appSwitch: Switch,
    appRun: RunBtn
  },
  computed: {
    funds() {
      return this.$store.getters.funds;
    },
    tradeDay() {
      return this.$store.getters.tradeDay;
    },
    stocks() {
      return this.$store.getters.stocks;
    },
    run() {
      return this.$store.getters.run;
    }
  },
  methods: {
    ...mapActions({
      setData: "loadData"
    }),
    saveData() {
      const data = {
        funds: this.$store.getters.funds,
        stocks: this.$store.getters.stocks,
        tradeDay: this.$store.getters.tradeDay,
        orders: this.$store.getters.orders
      };
      this.$http.put("data.json", data);
    },

    loadData() {
      this.setData();
    }
  }
};
</script>

<style lang="scss"></style>
