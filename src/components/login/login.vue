<template>
  <div class="login-form">
      <div class="login-tab login-tab-l" @click="loginTab">账号登录</div>
      <div class="login-tab login-tab-r">扫码登录</div>
    <div class="login-content">
      <ul>
        <li>账号：<input type="text"/></li>
        <li> 密码：<input type="text"/></li>
      </ul>
    </div>
    <div class="login-button">
      <button @click="loginClick">登录</button>
    </div>
  </div>
</template>
<script>
  export default {
//    name: 'homePage',
    data () {
      return {
      }
    },
    methods:{
        loginTab:function () {

        },
        loginClick:function () {
          alert("登录成功")
      }
    }
  }
</script>
<style>
  @import "../../../css/public.css";
  .login-form{
    position: relative;
    z-index: 4;
    background: #dcdcdc;
    overflow: visible;
    width:600px;
    height: 346px;
    top: 100px;
    margin: 0 auto;
  }
  .login-tab{
    height: 54px;
    font-size: 18px;
    color: #a24040;
    font-family: "microsoft yahei";
    text-align: center;
    border-bottom: 1px solid #f4f4f4;
    position: absolute;
    /*background: #a24040;*/
    display: block;
    line-height: 54px;
  }
  .login-tab-l, .login-tab-r{
      width: 300px;
  }
  .login-tab-r{
      right: 0;
    border-left: 1px solid #f4f4f4;
  }
  .login-content{
    top: 100px;
    position: relative;
    /* left: 64px; */
    text-align: center
  }
  .login-content ul li{
    padding-bottom: 20px;
    padding-top: 20px;
  }
  .login-content ul li input{
    height: 20px;
    border-radius: 8px;
  }
  .login-button{
    top: 140px;
    position: relative;
    text-align: center
  }
</style>
