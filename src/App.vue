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
</style>
