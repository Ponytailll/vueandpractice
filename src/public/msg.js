/**
 * Created by wanxh on 2018/4/23.
 */
import Vue from 'vue'
const Message ={
  //dialog标题
  dialogTitleInfo :'提示',
  dialogTitleError :'错误',
  dialogTitleWarning :'警告',
  dialogTitleSuccess :'成功',

  //login
  INFO_LOGIN_001:'请输入账号',
  INFO_LOGIN_002:'请输入密码',
  INFO_LOGIN_003:'请输入验证码',
  INFO_LOGIN_004:'验证码不正确',
  INFO_LOGIN_005:'验证码发送成功请注意查收',
  WARNING_LOGIN_006:'用户名或密码不正确',
  WARNING_LOGIN_007:'请输入正确的用户名和密码',
  INFO_LOGIN_008:'密码已经发送到您的邮箱, 请登录',
  INFO_LOGIN_009:'校验错误, 请重新验证',
  INFO_LOGIN_010:'验证码有效期为15分钟,请勿重复发送',
  INFO_LOGIN_011:'验证码已过期, 请重新验证',
  INFO_LOGIN_012:'用户不存在',
  INFO_LOGIN_013:'密码有误',
  INFO_LOGIN_014:'您输入的用户不存在， 请先注册',
  INFO_LOGIN_015:'请输入手机号',
};
export default {
  install () {
    let duration = 2000;
    Vue.prototype.Message = Message;
    Vue.prototype.showMessage = function(code,fun){
      let type = code.substring(0,code.indexOf("_"));
      let title = '';
      if(String(fun) === 'undefined' || fun === null){
        fun = function(){};
      }
      if(type === "INFO"){
        title = this.Message.dialogTitleInfo;
        this.$notify.info({
          title: title,
          message: this.Message[code],
          showClose: false,
          duration:duration,
          onClose:function(){
            fun();
          }
        });
      }else if(type === "ERROR"){
        title = this.Message.dialogTitleError;
        this.$notify.error({
          title: title,
          message: this.Message[code],
          showClose: false,
          duration:duration,
          onClose:function(){
            fun();
          }
        });
      }else if(type === "WARNING"){
        title = this.Message.dialogTitleWarning;
        this.$notify.warning({
          title: title,
          message: this.Message[code],
          showClose: false,
          duration:duration,
          onClose:function(){
            fun();
          }
        });
      }else if(type === "SUCCESS"){
        title = this.Message.dialogTitleSuccess;
        this.$notify.success({
          title: title,
          message: this.Message[code],
          showClose: false,
          duration:duration,
          onClose:function(){
            fun();
          }
        });
      }
    };
    Vue.prototype.showMessageBox = function(code,fun1,fun2){
      let type = code.substring(0,code.indexOf("_"));
      let title = '';
      if(type === "INFO"){
        title = this.Message.dialogTitleInfo;
        this.$confirm(this.Message[code], title, {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'info'
        }).then(() => {
          fun1();
        }).catch(() => {
          fun2();
        });
      }else if(type === "ERROR"){
        title = this.Message.dialogTitleError;
        this.$confirm(this.Message[code], title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          fun1();
        }).catch(() => {
          fun2();
        });
      }else if(type === "WARNING"){
        title = this.Message.dialogTitleWarning;
        this.$confirm(this.Message[code], title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          fun1();
        }).catch(() => {
          fun2();
        });
      }else if(type === "SUCCESS"){
        title = this.Message.dialogTitleSuccess;
        this.$confirm(this.Message[code], title, {
          confirmButtonText: '确定',

          showCancelButton: false,
          type: 'success'
        }).then(() => {
          fun1();
        }).catch(() => {
          fun2();
        });
      }
      // this.Message


    }
  }
}
