<template>
    <section>
      <div id="myCarousel" class="carousel slide">
        <!-- 轮播（Carousel）指标 -->
        <ol class="carousel-indicators" >
          <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>
        <!-- 轮播（Carousel）项目 -->
        <div  class="carousel-inner">
          <div class="item active">
            <img src="http://172.28.184.75:9091/api/file/show?key=upload_f58cb854c5c2fdd34c68c6e13040e399">
          </div>
          <div class="item ">
            <img src="http://172.28.184.75:9091/api/file/show?key=upload_e2d736ce21c91c36a45df23b371fb25b">
          </div>
        </div>
        <!-- 轮播（Carousel）导航 -->
        <a class="prev hidden-xs" href="#myCarousel" data-slide="prev">
          <i id="faLeft" class="fa fa-chevron-left"></i>
        </a>
        <a class="next hidden-xs" href="#myCarousel" data-slide="next">
          <i id="faRight" class="fa fa-chevron-right"></i>
        </a>
      </div>
    </section>
</template>
<script>

   export default{
       data(){
           return{}
       },
     mounted:function () {
       let height = $(".carousel-inner").width() * (723/1920);
       console.log(height);
       $(".carousel-inner").height(height);
     }
   }
</script>
<style scoped>
  @import "../../../css/bootstrap.min.css";
  #myCarousel .prev, #myCarousel .next {
    position: absolute;
    top: 50%;
    background-color: #FF5F01;
    color: #fff;
    display: inline-block;
    margin-top: -25px;
    height: 40px;
    line-height: 40px;
    width: 40px;
    text-align: center;
    border-radius: 4px;
    z-index: 5;
  }
  #myCarousel .prev{
    left: 10px;
  }
  #myCarousel .next{
    right: 10px;
  }
  #myCarousel .carousel-inner  .active {
    opacity: 1;
    -webkit-transition: opacity ease-in-out 500ms;
    -moz-transition: opacity ease-in-out 500ms;
    -o-transition: opacity ease-in-out 500ms;
    transition: opacity ease-in-out 500ms;
    z-index: 1;
  }
  #myCarousel .carousel-inner .item {
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    left: 0 !important;
    /*opacity: 0;*/
    top: 0;
    position: absolute;
    width: 100%;
    display: block !important;
    height: 100%;
    /* height: 690px; */
    -webkit-transition: opacity ease-in-out 500ms;
    -moz-transition: opacity ease-in-out 500ms;
    -o-transition: opacity ease-in-out 500ms;
    transition: opacity ease-in-out 500ms;
  }
  .carousel-inner img{
    height: 100%;
    width: 100%;
  }
</style>
