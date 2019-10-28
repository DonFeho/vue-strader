import Vue from 'vue'
import axios from 'axios'

const $axios = axios.create({
  baseURL: 'https://vue-strader.firebaseio.com/'
})

Vue.prototype.$axios = $axios

export default $axios
