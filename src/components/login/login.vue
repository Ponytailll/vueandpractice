<template>
  <div>
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
    <!--<div class="message">登录成功</div>-->
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
