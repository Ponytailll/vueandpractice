<template>
  <div class="hello">
    <v-header></v-header>
    <v-article></v-article>
  </div>
</template>

<script>
  import header from './header/header.vue'
  import article from './article/article.vue'
export default {
  name: 'homePage',
  data () {
    return {
    }
  },
  components: {
    'v-header': header,
    'v-article': article,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
