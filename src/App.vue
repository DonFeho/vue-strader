<template>
  <div id="app">
    <b-container class="m-0 p-0 bg-fluid" fluid>
      <app-navbar></app-navbar>
      <transition name="slide" mode="out-in">
        <router-view />
      </transition>
    </b-container>
  </div>
</template>

<script>
import Navbar from "@/ui/Navbar.vue";

export default {
  components: {
    appNavbar: Navbar
  },
  created() {
    this.$store.dispatch("initStocks");
  }
};
</script>

<style lang="scss">
@import "custom.scss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.bg-fluid {
  background: url("https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  min-height: 100vh;
  height: auto;
}
</style>
