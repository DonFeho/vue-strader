<template>
  <div>
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
            <!-- <b-nav-item to="/about">About</b-nav-item> -->
            <b-nav-item-dropdown
              v-if="run"
              v-show="tradeDay > 1"
              text="Save / Load"
              right
            >
              <b-dropdown-item href="#" @click="loadData(), showAlert()">
                <strong class="text-dark">Load</strong>
              </b-dropdown-item>
              <b-dropdown-item href="#" @click="saveData(), showAlert()">
                <strong class="text-dark">Save</strong>
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#">
              <b-button
                size="md"
                :class="[run ? 'btn-success' : 'btn-danger']"
                class="btn"
                @click="run ? startTrade() : stopTrade(), (run = !run)"
              >
                {{ run ? "Run Trade" : "Stop Trade" }}
              </b-button>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <b-navbar
      id="control"
      type="dark"
      variant="dark"
      fixed="bottom"
      class="text-center"
    >
      <b-container>
        <b-navbar-nav class="mr-auto text-left">
          <b-nav-text class="">
            <transition name="fade" mode="out-in">
              <p class="text-info m-0">
                Balance:
                <transition name="slide" mode="out-in">
                  <h4 class="text-gold" :key="funds">$ {{ funds }}</h4>
                </transition>
              </p>
            </transition>
          </b-nav-text>
        </b-navbar-nav>
        <b-navbar-nav class="mx-auto">
          <b-nav-form class="text-center">
            <app-switch></app-switch>
          </b-nav-form>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-text class="p-0">
            <p class="text-info lead m-0 p-0 m-0">
              DAY
              <transition name="slide" mode="out-in">
                <h4 class="text-gold" :key="tradeDay">
                  {{ tradeDay }}
                </h4>
              </transition>
            </p>
          </b-nav-text>
        </b-navbar-nav>
      </b-container>
    </b-navbar>

    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="success"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
      style="position: absolute; top: 100px; right: 500px; width: 250px; height: 50px;"
    >
      <p>Data Fetched ...</p>
    </b-alert>
  </div>
</template>

<script>
import Switch from "@/ui/Switch.vue";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      run: true,
      dismissSecs: 2,
      dismissCountDown: 0
    };
  },
  components: {
    appSwitch: Switch
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
    }
  },
  methods: {
    ...mapActions({
      updateMarket: "updateMarket",
      nextDay: "nextDay",
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
    },

    startTrade() {
      this.marketSpeed = setInterval(() => {
        this.nextDay(), this.updateMarket();
      }, 5000);

      this.nextDay();
      this.updateMarket();
      this.run === false;
    },
    stopTrade() {
      clearInterval(this.marketSpeed);
    },

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    }
  }
};
</script>

<style lang="scss"></style>
