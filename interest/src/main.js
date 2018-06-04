// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vueResource from 'vue-resource'

import App from './App'
import router from './router'
import wvue from 'wvue-ui'

Vue.use(vueResource)
Vue.config.productionTip = false
Vue.use(wvue)
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
