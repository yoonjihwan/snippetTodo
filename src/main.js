import Vue from 'vue'
import Vuex from "vuex";
import App from './App.vue'
import store from "./store";
import Toasted from 'vue-toasted';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.config.productionTip = false
Vue.prototype.$eventHub = new Vue(); // Global event bus
Vue.use(Toasted, {
  duration: 4000
})

Vue.prototype.STORAGE_KEY = "SNIPPET-TODO";
Vuex.Store.prototype.STORAGE_KEY = "SNIPPET-TODO";

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
