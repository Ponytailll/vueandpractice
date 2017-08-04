<template>
  <div class="head">
    <div class="container" id="containerId">
      <header>
        <div class="row" id="topRow">
              <div class="head-left common-head vm">
                  <img src="../../images/gd-header/weChart.png">
                  <img src="../../images/gd-header/qq.png">
                  <img src="../../images/gd-header/weibo.png">
              </div>
              <div  class="head-right common-head vm">
                <div v-if="isLogin=true">
                <router-link to="/login"><span class="span-style herfTo" >登录</span></router-link>
                <router-link to="/regist"><span class="span-style herfTo">注册</span></router-link>
                </div>
                <!--<div v-else>-->
                  <!--<router-link to="/user"><span class="span-style herfTo">{{username}}</span></router-link>-->
                  <!--<span class="span-style herfTo po" @click="confirmQuit">退出</span>-->
                <!--</div>-->
              </div>
        </div>
      </header>
    </div>
  </div>
</template>
<script>
    export default {
      data(){
          return{
            username:"阿飞的小蝴蝶"
          }
      },
      methods:{
        confirmQuit:function () {
              alert("是否退出")
        }
      }
    }
</script>
<style scoped>
  @import "../../../css/public.css";
  .head{
    width: 100%;
    text-align: center;
    background: #1f272c;
    display: table;

  }
  .head header{
    background: #1f272c;
    width: 100%;
  }

  .herfTo{
    font-size: 13px;
    color: white;
    padding-left: 5px;
    padding-right: 5px;
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
    height: 52px;
    float: left;
    line-height: 52px;
  }
</style>
