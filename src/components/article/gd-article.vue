<template>
  <div class="container">
    <div class="row">
        <div class="head-left common-head vmcommon-head vm">
            <img src="../../images/gd-header/title-2.png">
        </div>
        <div id="nav_all" class="head-right common-head vm" >
          <span class="nav-right" v-for="nav in navs">{{nav.name}}</span>
        </div>
    </div>
  </div>
</template>
<script>
  export  default {
    data(){
      return{
        navs:[
          {name:"企业秀场"},{name:"大咖秀"},{name:"精英战队"},{name:"会员中心"},{name:"产品中心"},{name:"合作伙伴"}
        ]
      }
    }
  }
</script>
<style scoped>
  @import "../../../css/public.css";
  .nav-right{
    color:#333333;
    cursor: pointer;
    font-size: 16px;
    margin-left: 5px;
    margin-right: 5px;
  }
  .head-left img{
    vertical-align: middle;
    margin-right:18px;
  }
  .head-right{
    text-align: right;
    width:60%;

  }
  .common-head{
    height: 80px;
    float: left;
    line-height: 80px;
  }
</style>
