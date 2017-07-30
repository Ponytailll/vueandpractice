<template>
  <div class="hello">
    <v-gdHeader></v-gdHeader>
    <v-gdArticle></v-gdArticle>
  </div>
</template>

<script>
  import header from './header/header.vue'
  import article from './article/article.vue'
  import gdHeader from './header/gd-header.vue'
  import gdArticle from './article/gd-article.vue'
  export default {
  name: 'homePage',
  data () {
    return {
    }
  },
  components: {
    'v-header': header,
    'v-article': article,
    'v-gdHeader': gdHeader,
    'v-gdArticle':gdArticle
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
