// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "./element/index"
import * as http from "@/api"
Vue.prototype.$get = http.get
Vue.prototype.$post = http.post
Vue.prototype.$put = http.put
Vue.prototype.$deleted = http.deleted
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
