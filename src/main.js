import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from './plugins/vuetify'
import Vuetify, {
  VStepper,
  VSlider
} from 'vuetify/lib'



// Make BootstrapVue available throughout your project
//Vue.use(BootstrapVue)

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  components: {
  VStepper,
  VSlider
  
  },
})


new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
