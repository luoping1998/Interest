// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vueResource from 'vue-resource'
import store from './store'

import App from './App'
import router from './router'
import wvue from 'wvue-ui'

Vue.use(vueResource)
Vue.config.productionTip = false
/* eslint-disable no-new */

Vue.http.interceptors.push((request, next) => {
    let timeout;
    if (request._timeout) {
        timeout = setTimeout(() => {
            next(request.respondWith(request.body, {
                 status: 408,
                 statusText: '请求超时'
            }));
            
        }, request._timeout);
    }
    next((response) => {
　　　　console.log(response.status);
　　　　return response;
    })
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})