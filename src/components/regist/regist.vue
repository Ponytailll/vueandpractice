<template>
  <div class="login_wrap">
    <div class="logo_wrap">
      <div class="logo">
        <a title="Logo" href="" class="logo_img"></a>
      </div>
    </div>
    <div class="content clearfix">
      <div class="lg_banner">
        <a href="" target="_blank" class="banner1" ></a>
      </div>
      <div class="lg_left ui-option-main-box">
          <div>
            <h3>新用户注册</h3>
          </div>
          <div class="formbox">
              <div class="re_form">
                  <form>

                  </form>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    }

  }
</script>

<style scoped>
  @import "../../../css/public.css";
  .logo_wrap{
    width: 100%;
    background-color: #fff;
    padding: 20px 0;
  }
  .login_wrap .logo {
    width: 1200px;
    margin: 0 auto;
  }
  .login_wrap .logo_img {
    background: no-repeat;
    display: inline-block;
    width: 220px;
    height: 52px;
  }
  .login_wrap .content{
    width: 100%;
    background: url(../../assets/backgroundImage.png) no-repeat center center;
  }
  .lg_banner {
    width: 62.5%;
    float: left;
    display: inline;
    height: 600px;
  }
  .lg_banner a {
    display: block;
    width: 700px;
    margin-left: 56px;
    margin-top: 80px;
    height: 440px;
    overflow: hidden;
  }
  .ui-option-main-box {
    position: relative;
  }
  .lg_left {
    width: 356px;
    float: left;
    display: inline;
    padding: 0 0 30px 44px;
    background-color: #ffeceb;
    margin-top: 80px;
    -webkit-opacity: .9;
    -moz-opacity: .9;
    -khtml-opacity: .9;
    opacity: .9;
    filter: alpha(opacity=90);
  }

</style>
