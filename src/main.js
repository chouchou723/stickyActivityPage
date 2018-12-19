// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'lib-flexible'
// import axios from 'axios';
Vue.config.productionTip = false
Vue.mixin({
  data(){
    return {
      apiUrl: process.env.API_ROOT
      // apiUrl:''
    }
  }
  })
// Vue.prototype.$axios = axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
