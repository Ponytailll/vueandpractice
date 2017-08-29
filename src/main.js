// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import 'font-awesome/css/font-awesome.css'
import '../css/bootstrap.min.css'
import  './assets/bootstrap/bootstrap.min.js'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:router,
  template: '<App/>',
  components: { App }
})
