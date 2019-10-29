<template>
  <div class="font-sans" id="app">
    <navbar></navbar>
    <section
      class="bg-fluid min-h-screen h-full bg-fixed bg-center bg-no-repeat bg-cover py-32">
      <div class="max-w-6xl mx-auto w-full">
        <transition name="slide" mode="out-in">
          <router-view />
        </transition>
      </div>
    </section>
  </div>
</template>
<script>
import Navbar from '@/components/ui/Navbar.vue'
export default {
  components: {
    Navbar
  }
}
</script>
<style scoped>
.bg-fluid {
  background: url("https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg");
}
</style>
