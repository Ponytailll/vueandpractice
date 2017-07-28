<template>
  <div class="hello">
    <v-gdHeader></v-gdHeader>
    <v-article></v-article>
  </div>
</template>

<script>
  import header from './header/header.vue'
  import article from './article/article.vue'
  import gdHeader from './header/gd-header.vue'
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
