<template>
  <nav class="navbar navbar-expand-md navbar-light bg-dark">
    <div class="container">
      <ul class="collapse navbar-collapse">
        <router-link to="/" class="navbar-brand text-info">
          FSTrader</router-link
        >
        <ul class="navbar-nav mr-auto">
          <router-link
            to="/portfolio"
            activeClass="active"
            tag="li"
            class="nav-link"
            ><a>Portfolio</a>
          </router-link>
          <router-link
            to="/stocks"
            activeClass="active"
            tag="li"
            class="nav-link"
            ><a>Stocks</a>
          </router-link>
          <router-link
            to="/about"
            activeClass="active"
            tag="li"
            class="nav-link"
            ><a>About</a>
          </router-link>
        </ul>
        <strong class="navbar-text mr-auto text-light">
          Funds: {{ funds | currency }}
        </strong>
        <ul class="navbar-nav ml-auto px-3">
          <li class="nav-item">
            <a class="nav-link text-light" href="#" @click="endDay">EndDay</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-light" href="#" @click="saveData">
              Save
            </a>
          </li>
          <li class="nav-item ">
            <a class="nav-link text-light" href="#" @click="loadData">
              Load
            </a>
          </li>         
        </ul>
        <form class="form-inline">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapActions } from "vuex";

export default {
  computed: {
    funds() {
      return this.$store.getters.funds;
    }
  },
  methods: {
    ...mapActions({
      randomizeStocks: "randomizeStocks",
      fetchData: "loadData"
    }),

    endDay() {
      this.randomizeStocks();
    },    

    saveData() {
      const data = {
        funds: this.$store.getters.funds,
        stockPortfolio: this.$store.getters.stockPortfolio,
        stocks: this.$store.getters.stocks
      };

      this.$http.put("data.json", data);
    },
    loadData() {
      this.fetchData();
    }
  }
};
</script>

<style lang="scss">
nav {
  padding: 2rem;
  a {
    color: white;
    &:hover {
      color: rgb(155, 110, 27);
      text-decoration: none;
    }
  }
}
</style>
