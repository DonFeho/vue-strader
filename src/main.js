import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueResource from "vue-resource";
import store from "./store";
import BootstrapVue from "bootstrap-vue";

Vue.config.productionTip = false;

Vue.use(VueResource);
Vue.http.options.root = "https://vue-strader.firebaseio.com/";

Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
