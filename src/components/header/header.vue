<template>
  <div class="agency-head">
    <div class="agency-international">
      <div class="agency-img">
        <img src="../.././assets/logo.jpg" >
        <p>苏知中心<br>知产管理</p>
      </div>
      <div class="agency-search">
        <ul class="agency-nav fl">
          <li class="fl">
            <a>查知产</a>
          </li>
          <li class="fl">
            <a>查企业</a>
          </li>
        </ul>
      </div>
      <div class="agency-BottomlastDiv">
        <div class="head-search fl">
          <input type="text" placeholder="搜索"/>
          <a>
            <i class="icofont "></i>
          </a>
        </div>
        <div class="head-login fl">
          <span class="icofont fl"></span>
          <router-link tag="a" to="/login">
            <span class="u-login fl" >登录</span>
          </router-link>
          <em class="fl">|</em>
          <router-link tag="a" to="/regist">
          <span class="u-reg fl">注册</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
      data(){
          return{}
      }
  }
</script>
<style>
  @import "../../../css/public.css";
  .agency-head{
    background: #d0d3d0;;
  }
  .agency-international {
    margin: auto;
    width: 1280px;
    display: flex;
  }
  .agency-img{
    width: 15%;
    height:70px;
  }
  .agency-img img{
    height: 70px;
    float: left;
  }
  .agency-img p{
    vertical-align: middle;
    margin-top:15px;
    color:#444444;
    font-size: 14px;
  }
  .agency-search{
    width: 60%;
    height: 70px;
  }
  .agency-nav {
    /*padding: 20px 0 0 38px;*/
    height: 40px;
    position: relative;
  }
  .agency-nav li {
    font-size: 20px;
    line-height: 30px;
    width: 63px;
    height: 30px;
    margin: 0 8px;
    text-align: center;
    position: relative;
  }
  .agency-nav li a{
    display: block;
    color: #444;
    font-size: 20px;
    line-height: 30px;
    cursor: pointer;
  }
  .agency-nav li a:hover{
    color: #f70;
  }
  .agency-BottomlastDiv {
    width:25% ;
    height: 70px;
    line-height: 70px;
  }
  .agency-BottomlastDiv li:first-child{
    padding-left: 68px;
  }
  .agency-BottomlastDiv li{
    padding-left: 20px;
    font-size: 15px;
    cursor: pointer;
  }
  .agency-BottomlastDiv li a:hover{
    color: #128bed;
  }
  .agency-BottomlastDiv li a:last-child{
    /*position: absolute;*/
  }
  .agency-BottomlastDiv li:last-child:hover .dropdown-content{
    display: block;
  }
  .head-search{
    position: relative;
    margin: 22px 15px 0 0;
    padding-left: 8px;
    height: 30px;
    width: 148px;
    border-radius: 100px;
    background: #e8e8e8;
  }
  .head-search input {
    display: block;
    font-size: 14px;
    background: 0 0;
    border: none;
    outline: 0;
    width: 116px;
    height: 30px;
    line-height: 30px;
    padding: 0 5px;
    float: left;
  }
  .head-search a {
    width: 22px;
    height: 30px;
    line-height: 30px;
    float: right;
    cursor: pointer;
  }
  .agency-head .icofont{
    display: inline-block;
    width: 18px;
    height: 20px;
    background: url(../.././assets/head-icos.png) no-repeat -500px -500px;
  }
  .agency-BottomlastDiv .icofont{
    background-position: 0 -74px;
  }
  .head-login .icofont{
      background-position: 0 -100px;
    }
  .head-login{
    padding-top: 28px;
    float: right;
  }
  .head-login span{
    font-size: 14px;
    cursor: pointer;
  }
  .head-login span:hover{
    color: #f70;
  }
  .head-login .u-login,.u-reg {
    display: inline-block;
    padding: 0 4px;
    line-height: 20px;
    color: #868686;
  }
  .head-login em{
    vertical-align: top;
    line-height: 20px;
    color: #868686;
  }
  .head-login .u-login,.u-reg {
    display: inline-block;
    padding: 0 4px;
    line-height: 20px;
    color: #868686;
  }

</style>
