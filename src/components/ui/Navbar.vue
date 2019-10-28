<template>
  <nav class="flex items-center justify-between flex-wrap fixed w-full z-10 bg-dark text-left p-6">
      <div class="flex items-center text-white mr-6">
        <router-link tag="a" to="/" class="text-light hover:text-gold mr-2">
            <img style="width: 2rem; height: 2rem;" class="inline-block" alt="Vue logo" src="@/assets/logo.png"/>
            <span class="font-semibold text-xl tracking-tight text-white hiver:text-gold">Stock Trader</span>
          </router-link>
      </div>
      <div class="block sm:hidden">
        <el-button @click="toggle" type="primary" icon="el-icon-menu" class="sm:inline-block md:hidden lg:hidden xl:hidden float-right"></el-button>
      </div>
      <div :class="open ? 'block': 'hidden'" class="w-full flex-grow sm:flex sm:items-center sm:w-auto">
        <div class="text-sm sm:flex-grow">
          <router-link tag="a" to="/stocks" class="text-light hover:text-gold block mt-4 sm:inline-block sm:mt-0 mr-4">Trade Board</router-link>
          <router-link tag="a" to="/portfolio" class="text-light hover:text-gold block mt-4 sm:inline-block sm:mt-0 mr-4">Trade Log</router-link>
          <div class="mt-4 sm:inline-block sm:mt-0 mr-4">
            <trade></trade>
          </div>
          <div class="mt-4 sm:inline-block sm:mt-0 mr-4">
            <saveload></saveload>
          </div>
          <div class="mt-4 sm:inline-block sm:mt-0 mr-4 lg:float-right xl:float-right">
            <indicators></indicators>
          </div>
        </div>
        <div class="inline-block mt-4 sm:mt-0">
          <runbutton></runbutton>
        </div>
      </div>
  </nav>
</template>
<script>
import Trade from '@/components/ui/Trade.vue'
import Runbutton from '@/components/ui/Runbutton.vue'
import Saveload from '@/components/ui/Saveload.vue'
import Indicators from '@/components/ui/Indicators.vue'
export default {
  data () {
    return {
      open: false
    }
  },
  components: {
    Trade,
    Runbutton,
    Saveload,
    Indicators
  },
  methods: {
    toggle () {
      this.open = !this.open
    }
  }
}
</script>
