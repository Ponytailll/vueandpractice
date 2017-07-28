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
        <div class="toggle-qrcode"></div>
        <div class="login_mod_tab">
          <div class="fl mod">
            <a class="lo_mod tab_on" href="javascript:;" title="普通登入" @click="commonLogin">普通登录</a>
          </div>
          <div class="fl mod">
            <a class="eb_mod" href="javascript:;" title="手机免密码登入" @click="phoneLogin">手机无密码登录</a>
          </div>
        </div>
        <div class="formbox">
            <p class="error_tip">登录名或密码错误</p>
          <div class="lg_form">
              <form>
                <!-- 正常登录 start -->
                <div class="mod_box lo_mod_box">
                  <div class="ui-sign-item ui-name-item lg_item lg_name">
                    <input type="text" maxlength="32" class="ui-input pwd_text" name="uname" placeholder="用户名/邮箱/手机号" style="border-color:#CFCFCF;">
                  </div>
                  <div class="ui-sign-item ui-sign-common-item lg_item lg_pass">
                    <input type="password" maxlength="32" class="ui-input pwd_text"  name="pass" value="" placeholder="密码" style="border-color:#CFCFCF;">
                  </div>
                </div>
                <!-- 正常登录 end -->
                <!-- 无密码 start -->
                <div class="mod_box eb_mod_box" style="display: none">
                  <div class="ui-sign-item ui-name-item clearfix mb">
                    <input type="text" maxlength="32" class="ui-input short_text" name="tele" placeholder="手机号码" style="border-color:#CFCFCF;">
                  </div>
                  <!-- 动态密码输入 -->
                  <div class="ui-sign-item ui-sign-common-item lg_item lg_code">
                    <!-- 获取验证码按钮 -->
                    <div class="lg_item lg_getcode">
                      <a href="javascript:;" class="get_tel_code" id="get_tel_code">获取动态密码</a>
                      <input type="text" maxlength="32" class="ui-input pwd_text width_180" name="telcode"  placeholder="动态密码" style="border-color:#CFCFCF;">
                    </div>
                  </div>
                  <div class="lg_chk_item"></div>
                </div>
                <!-- 无密码 end -->
                <div class="lg_login clearfix">
                  <input  value="登录" @click="loginClick" class="sub">
                </div>
                <div class="ot_login">
                  <div class="ot_btn clearfix">
                    <a class="ui-ot-btn mr-42" href="javascript:;" data-type="qq">
                      <img src="http://s17.mogucdn.com/p2/170104/upload_5763lkilh8f7abid345gbhh167d79_19x19.png">QQ登录</a>
                    <a class="ui-ot-btn mr-42" href="javascript:;" data-type="weixin">
                      <img src="http://s16.mogucdn.com/p2/170104/upload_8d4dd486c18961b55lf0hbe5ebf7l_18x19.png">微信登录</a>
                  </div>
                </div>
                <div class="lg_reg">
                  <a class="findpwd" href="">忘记密码</a>
                  <a class="regist" href="">免费注册</a>
                </div>
              </form>
          </div>
          </div>
      </div>
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
    created:function(){
      /**刚进入页面的时候请求的接口**/
      this.loginAxios();
    },
    methods:{
      phoneLogin:function () {
          $(".eb_mod_box").css("display","block");
          $(".lo_mod_box").css("display","none");
          $(".eb_mod").addClass("tab_on");
          $(".lo_mod").removeClass("tab_on");
      },
      commonLogin:function () {
          $(".eb_mod_box").css("display","none");
          $(".lo_mod_box").css("display","block");
          $(".lo_mod").addClass("tab_on");
          $(".eb_mod").removeClass("tab_on");
      },
      loginAxios:function () {
//            let str = {
//              username: '15605181765',
//              password: '123456'
//            };
//            this.$http.post('http://172.28.184.75:9091/api/custcenter/login',str).then(m=>console.log(m.data));
      },
      loginTab:function () {

      },
      loginClick:function () {
        let loginAccount= $("input[name='uname']").val();
        if(loginAccount == ''){
              $(".error_tip").css("display","block");
              return;
        }
        let that =this;
        let str = {
          username: '15605181765',
          password: '123456'
        };

        this.axios({
          method: 'post',
          url: 'http://172.28.184.75:9091/api/custcenter/login',
          data:str
        }).then(function (response) {
          console.log(response);
          if(response.status == 200){
//                    message.textContent="登录成功";
            that.$router.push('/');
          }else {
            let message=document.createElement('div');
            message.className='message';
            document.body.appendChild(message);
            setTimeout(function () {
              document.body.removeChild(message);
            },2000);
            message.textContent="登录失败";
          }
        }).catch(function (error) {
          console.log(error);
        });

//          $(".message").css("display","block");
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
  .toggle-qrcode, .toggle-regular {
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 5px;
  }
  .toggle-qrcode {
    height: 46px;
    width: 46px;
    background: url(../../assets/login-icon.png) no-repeat;
  }
  .login_mod_tab {
    height: 70px;
    margin-left: -38px;
  }
  .login_mod_tab .mod {
    width: 50%;
    border-bottom: 1px solid #ccc;
  }
  .login_mod_tab .tab_on {
    color: #fe617a;
    height: 41px;
    border-bottom: 2px solid #ff4066;
  }
  .login_mod_tab .lo_mod {
    display: block;
    width: 119px;
    margin: 10px auto 0;
  }
  .login_mod_tab a {
    height: 43px;
    line-height: 42px;
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    color: #3c3c3c;
  }
  .login_mod_tab .eb_mod {
    display: block;
    width: 119px;
    margin: 10px 30px 0;
  }
  .login_mod_tab a {
    height: 43px;
    line-height: 42px;
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    color: #3c3c3c;
  }
  .error_tip {
    background: url(../../assets/error.png) 12px no-repeat #fffff8;
    border: 1px solid #ffd797;
    height: 30px;
    line-height: 30px;
    color: #ff1877;
    width: 273px;
    padding-left: 40px;
    margin-bottom: 9px;
    display: none;
  }
  .lg_form .lg_code, .lg_form .lg_name, .lg_form .lg_pass {
    position: relative;
  }
  .lg_form .lg_item {
    margin-bottom: 15px;
  }
  .pwd_text {
    height: 40px;
    width: 300px;
  }
  .pwd_text, .short_text {
    background: none!important;
    border: 1px solid #ccc;
    padding: 0 6px;
  }
  .short_text {
    float: left;
    height: 38px;
    width: 180px;
  }
  .lg_login {
    padding-top: 10px;
  }
  .lg_login .sub {
    display: inline;
    text-align: center;
    /*float: left;*/
    border: none;
    width: 314px;
    height: 40px;
    background: #ff5777;
    border-radius: 2px;
    cursor: pointer;
    color: #fff;
  }
  .ot_login {
    margin-top: 20px;
  }
  .ot_login .ot_btn {
    padding-top: 6px;
  }
  .mr-42 {
    margin-right: 47px;
  }
  .ot_login .ot_btn a img {
    vertical-align: top;
    margin-right: 6px;
  }
  .lg_reg {
    padding-top: 20px;
    padding-right: 44px;
    text-align: right;
  }
  .lg_reg a {
    text-decoration: underline;
    color: #959595;
  }
  .mb {
    position: relative;
    margin-bottom: 15px;
  }
  .lg_item .get_tel_code {
    display: inline-block;
    width: 110px;
    height: 42px;
    line-height: 42px;
    text-align: center;
    margin-right: 10px;
    color: #fff;
    background-color: #ff5777;
  }
  .lg_getcode .width_180 {
    border-color: #cfcfcf;
    width: 180px;
  }
</style>


