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
    },
    //组件实例刚被创建，组件属性计算之前，如data属性等
    beforeCreate:function () {
      console.group('beforeCreate 创建前状态===============》');
      console.log("%c%s", "color:red" , "el     : " + this.$el); //undefined
      console.log("%c%s", "color:red","data   : " + this.$data); //undefined
      console.log("%c%s", "color:red","message: " + this.message)
    },
    //组件实例创建完成，属性已绑定，但DOM还未生成，$el属性还不存在
    created:function () {
      console.group('created 创建完毕状态===============》');
      console.log("%c%s", "color:red","el     : " + this.$el); //undefined
      console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化
      console.log("%c%s", "color:red","message: " + this.message); //已被初始化
    },
    //模板编译/挂载之前
    beforeMount:function () {
      console.group('beforeMount 挂载前状态===============》');
      console.log("%c%s", "color:red","el     : " + (this.$el)); //已被初始化
      console.log(this.$el);
      console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化
      console.log("%c%s", "color:red","message: " + this.message); //已被初始化
    },
    //模板编译/挂载之后
    mounted:function () {
      console.group('mounted 挂载结束状态===============》');
      console.log("%c%s", "color:red","el     : " + this.$el); //已被初始化
      console.log(this.$el);
      console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化
      console.log("%c%s", "color:red","message: " + this.message); //已被初始化
    },
    //组件更新之前
    beforeUpdate:function () {
      console.group('beforeUpdate 更新前状态===============》');
      console.log("%c%s", "color:red","el     : " + this.$el);
      console.log(this.$el);
      console.log("%c%s", "color:red","data   : " + this.$data);
      console.log("%c%s", "color:red","message: " + this.message);
    },
    updated: function () {
      console.group('updated 更新完成状态===============》');
      console.log("%c%s", "color:red","el     : " + this.$el);
      console.log(this.$el);
      console.log("%c%s", "color:red","data   : " + this.$data);
      console.log("%c%s", "color:red","message: " + this.message);
    },
    //for keep-alive,组件被激活时调用
    activated:function () {
      
    },
    //for keep-alive,组件被移除时调用
    deactivated:function () {

    },
    //组件销毁前调用
    beforeDestory:function () {
      console.group('beforeDestroy 销毁前状态===============》');
      console.log("%c%s", "color:red","el     : " + this.$el);
      console.log(this.$el);
      console.log("%c%s", "color:red","data   : " + this.$data);
      console.log("%c%s", "color:red","message: " + this.message);
    },
    //组件销毁后调用
    destoryed:function () {
      console.group('destroyed 销毁完成状态===============》');
      console.log("%c%s", "color:red","el     : " + this.$el);
      console.log(this.$el);
      console.log("%c%s", "color:red","data   : " + this.$data);
      console.log("%c%s", "color:red","message: " + this.message)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
