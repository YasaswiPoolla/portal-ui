import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//external imports
import BootstrapVue from "bootstrap-vue";
import Vuelidate from "vuelidate";
import VueSidebarMenu from "vue-sidebar-menu";
import VueApexCharts from "vue-apexcharts";
import VueFlatPickr from "vue-flatpickr-component";
import VueGoodTablePlugin from "vue-good-table";
import Multiselect from "vue-multiselect";
import PhotoGrid from "vue-photo-grid";

//css imports
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "&css/main.css";
import "&css/fonts.css";
import "&css/sidebar.css";
import "flatpickr/dist/flatpickr.css";
import "vue-good-table/dist/vue-good-table.css";
import "vue-multiselect/dist/vue-multiselect.min.css";

Vue.use(BootstrapVue);
Vue.use(Vuelidate);
Vue.use(VueSidebarMenu);
Vue.use(VueApexCharts);
Vue.use(VueGoodTablePlugin);
Vue.use(VueFlatPickr);
Vue.use(PhotoGrid);

Vue.component("apexchart", VueApexCharts);
Vue.component("multiselect", Multiselect);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
