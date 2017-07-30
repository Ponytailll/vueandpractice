<template>
  <div class="head">
    <div class="container" id="containerId">
      <header>
        <div class="row" id="topRow">
              <div class="head-left vm">
                  <img src="../../images/gd-header/weChart.png">
                  <img src="../../images/gd-header/qq.png">
                  <img src="../../images/gd-header/weibo.png">
              </div>
              <div  class="head-right vm">

              </div>
        </div>
      </header>
    </div>
  </div>
</template>
<style scoped>
  @import "../../../css/public.css";
  /*@import "../../assets/bootstrap/bootstrap.min.css";*/
  .vm{
    vertical-align: middle;
  }
  .head{
    width: 100%;
    text-align: center;
    background: #1f272c;
    display: table;
    height: 52px;
  }
  .head header{
    background: #1f272c;
    width: 100%;
  }
  .head-left{
    display: table-cell;
    text-align: left;
    width:60%;
  }
  .head-left img{
    vertical-align: middle;
    margin-right:18px;
  }
  .head-right{
    display: table-cell;
    text-align: right;
    width:40%;
    /*margin-right: 0px;*/
  }
</style>
