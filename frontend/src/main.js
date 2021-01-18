import Vue from 'vue'
import VueRouter from 'vue-router';
import vuelidate from 'vuelidate'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import router from './router.js'
import store from './store'

Vue.use(Buefy);
Vue.use(VueRouter);
Vue.use(vuelidate);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuelidate,
  render: h => h(App),
}).$mount('#app')
