<template>
  <div id="app">
    <b-container class="m-0 p-0 bg-fluid" fluid>
      <navbar></navbar>
      <transition name="slide" mode="out-in">
        <router-view />
      </transition>
    </b-container>
  </div>
</template>
<script>
import Navbar from "@/ui/Navbar.vue";
import { mapActions } from 'vuex';
export default {
  components: {
    Navbar
  },
  created() {  
    this.initStocks();  
  },
  methods: {
    ...mapActions(['initStocks'])
  }
};
</script>

