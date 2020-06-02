import Vue from 'vue'
import Vuex from "vuex";
import App from './App.vue'
import store from "./store";

Vue.config.productionTip = false
Vue.prototype.$eventHub = new Vue(); // Global event bus
Vue.prototype.STORAGE_KEY = "SNIPPET-TODO";
Vuex.Store.prototype.STORAGE_KEY = "SNIPPET-TODO";

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
