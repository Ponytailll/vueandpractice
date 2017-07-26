<template>
  <!--<div class="hello">-->
    <v-header></v-header>
  <!--</div>-->
</template>

<script>
  import header from './header/header.vue'
export default {
  name: 'homePage',
  data () {
    return {
    }
  },
  components: {
    'v-header': header,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
