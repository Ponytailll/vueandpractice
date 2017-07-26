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
