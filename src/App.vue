<template>
  <div id="app">
    <div class="container-fluid m-0 p-0">
      <app-navbar></app-navbar>
      <div class="container">
        <transition name="slide" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import Navbar from "@/components/ui/Navbar.vue";

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
#app {
  font-family: "Montserat" sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;
}
body {
  font-family: "Montserat" sans-serif;
}

.bg-sell {
  background: darkslateblue;
}
.bg-buy {
  background: darkslategray;
}

.slide-enter-active {
  animation: slide-in 0.2s ease-out forwards;
}

.slide-leave-active {
  animation: slide-out 0.2s ease-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateY(-35px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slide-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-35px);
    opacity: 0;
  }
}
</style>
