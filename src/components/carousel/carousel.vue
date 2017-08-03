<template>
    <section>
      <div id="myCarousel" class="carousel slide">
        <!-- 轮播（Carousel）指标 -->
        <ol class="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>
        <!-- 轮播（Carousel）项目 -->
        <div class="carousel-inner">
          <div class="item active">
            <img src="http://172.28.184.75:9091/api/file/show?key=upload_f58cb854c5c2fdd34c68c6e13040e399" alt="First slide">
          </div>
          <div class="item">
            <img src="http://172.28.184.75:9091/api/file/show?key=upload_e2d736ce21c91c36a45df23b371fb25b" alt="Second slide">
          </div>
          <div class="item">
            <img src="http://172.28.184.75:9091/api/file/show?key=upload_f58cb854c5c2fdd34c68c6e13040e399" alt="Third slide">
          </div>
        </div>
        <!-- 轮播（Carousel）导航 -->
        <a class="carousel-control left" href="#myCarousel"
           data-slide="prev">&lsaquo;</a>
        <a class="carousel-control right" href="#myCarousel"
           data-slide="next">&rsaquo;</a> 
        <!--<a class="prev hidden-xs" href="#myCarousel" data-slide="prev">-->
          <!--<i id="faLeft" class="fa fa-chevron-left"></i>-->
        <!--</a>-->
        <!--<a class="next hidden-xs" href="#myCarousel" data-slide="next">-->
          <!--<i id="faRight" class="fa fa-chevron-right"></i>-->
        <!--</a>-->
      </div>
    </section>
</template>
<script>
  import  '../../assets/bootstrap/bootstrap.min.js'
   export default{
       data(){
           return{}
       },

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
    line-height: 40px;
    text-align: center;
    border-radius: 4px;
    z-index: 5;
  }

</style>
