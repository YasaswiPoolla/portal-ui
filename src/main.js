import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//external imports
import BootstrapVue from "bootstrap-vue";
import Vuelidate from "vuelidate";
import VueSidebarMenu from "vue-sidebar-menu";

//css imports
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "&css/main.css";
import "&css/fonts.css";
import "&css/sidebar.css";

Vue.use(BootstrapVue);
Vue.use(Vuelidate);
Vue.use(VueSidebarMenu);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
