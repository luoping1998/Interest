// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vueResource from 'vue-resource'
import axios from 'axios'
import App from './App'
import router from './router'


Vue.prototype.$axios = axios;
axios.defaults.withCredentials=true;

Vue.use(vueResource)
Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})