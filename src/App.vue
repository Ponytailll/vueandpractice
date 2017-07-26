<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view></router-view>
    <!--<v-header></v-header>-->
  </div>
</template>

<script>
import header from './components/header/header.vue'
import login from './components/login/login.vue'
import Vue from 'vue'
import $ from 'jquery'
import axios from 'axios'
import Vueaxios from 'vue-axios'

Vue.use(Vueaxios, axios)

export default {
  name: 'app',
  components: {
//    'v-header': header,
  }
}
</script>

<style>
#app {

}
</style>
