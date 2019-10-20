import Vue from "vue";
import VueResource from "vue-resource";
import BootstrapVue from "bootstrap-vue";

Vue.use(BootstrapVue);

Vue.use(VueResource);
Vue.http.options.root = "https://vue-strader.firebaseio.com/";