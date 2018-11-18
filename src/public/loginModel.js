/**
 * Created by wanxh on 2018/3/30.
 */
import store from '../store'
import {getToken} from '@/public/auth'


const loginModel = {
  getLoginUserMode:function(){
    // const loginUserMode = sessionStorage.getItem("loginModel")
    // let sessionData = '';
    // if (loginUserMode !== null && loginUserMode !== undefined && loginUserMode !== '') {
    //   sessionData = JSON.parse(loginUserMode);
    // } else {
    //   sessionData = '';
    // }
    // return sessionData
    // debugger
    if(getToken()){
        return store.getters.user
    }
    else{
      return ''
    }
  },
  //判断是否登录 true为已登录，false为未登录
  getLoginFlag:function(){
    const sessionData = this.getLoginUserMode()
    if(sessionData !== null && sessionData !== undefined && sessionData !== ''){
      return true
    }else{
      return false
    }
  },
  //获取登录用户id
  getUserId: function () {
    const sessionData = this.getLoginUserMode()
    if(sessionData.id !== null && sessionData.id !== undefined && sessionData.id !== ''){
      return sessionData.id
    }else{
      return ''
    }
  },
  //获取登录用户名
  getUserName: function () {
    const sessionData = this.getLoginUserMode()
    if(sessionData.name !== null && sessionData.name !== undefined && sessionData.name !== ''){
      return sessionData.name
    }else{
      return ''
    }
  },
  getAgencyCode: function () {
    const sessionData = JSON.parse(sessionStorage.getItem('agencyCode'))
    if(sessionData){
      return sessionData
    }else{
      return ''
    }
  },
  //获取组织机构代码
  getCompcode: function () {
    const sessionData = this.getLoginUserMode()
    if(sessionData.compcode !== null && sessionData.compcode !== undefined && sessionData.compcode !== ''){
      return sessionData.compcode
    }else{
      return ''
    }
  },
  //获取用户类型
  getIsagency: function () {
    const sessionData = this.getLoginUserMode()
    if(sessionData.isagency !== null && sessionData.isagency !== undefined && sessionData.isagency !== ''){
      return sessionData.isagency
    }else{
      return ''
    }
  },
  //获取用户昵称
  getNickname: function () {
    const sessionData = this.getLoginUserMode()
    if(sessionData.nickname !== null && sessionData.nickname !== undefined && sessionData.nickname !== ''){
      return sessionData.nickname
    }else{
      return ''
    }
  },
  //获取登录公司名
  getCompname: function () {
    const sessionData = this.getLoginUserMode()
    if(sessionData.compname !== null && sessionData.compname !== undefined && sessionData.compname !== ''){
      return sessionData.compname
    }else{
      return ''
    }
  },
  //获取是否实名认证
  getStatus: function () {
    const sessionData = this.getLoginUserMode()
    if(sessionData.status !== null && sessionData.status !== undefined && sessionData.status !== ''){
      return sessionData.status
    }else{
      return ''
    }
  },
  //获取token
  getSessionId: function () {
    const sessionId = sessionStorage.getItem("sessionId")
    if (sessionId === null || sessionId === '' || sessionId === undefined) {
      return ''
    } else {
      return sessionId
    }
  },
  //获取认证code
  getIsAuthentication: function () {
    const sessionData = this.getLoginUserMode()
    if(sessionData.is_authentication !== null && sessionData.is_authentication !== undefined && sessionData.is_authentication !== ''){
      return sessionData.is_authentication
    }else{
      return ''
    }
  },

  //获取打回理由
  getReason: function () {
    const sessionData = this.getLoginUserMode()
    if(sessionData.reason !== null && sessionData.reason !== undefined && sessionData.reason !== ''){
      return sessionData.reason
    }else{
      return ''
    }
  },
  //获取主账户id
  getParentId: function () {
    const sessionData = this.getLoginUserMode()
    if(sessionData.parent_id !== null && sessionData.parent_id !== undefined && sessionData.parent_id !== ''){
      return sessionData.parent_id
    }else{
      return ''
    }
  },

  getIsOperation: function () {
    const sessionData = this.getLoginUserMode()
    if(sessionData.is_operation !== null && sessionData.is_operation !== undefined && sessionData.is_operation !== ''){
      return sessionData.is_operation
    }else{
      return ''
    }
  },

  //获得电话号码
  getMobile(){
    const sessionData = this.getLoginUserMode()
    if(sessionData.mobile !== null && sessionData.mobile !== undefined && sessionData.mobile !== ''){
      return sessionData.mobile
    }else{
      return ''
    }
  },

  //获得登录用户头像
  getExtension(){
    const sessionData = this.getLoginUserMode()
    if(sessionData.extension !== null && sessionData.extension !== undefined && sessionData.extension !== ''){
      return sessionData.extension
    }else{
      return ''
    }
  },

  //设置登录用户头像
  setExtension(extensionChange){
    const sessionData = this.getLoginUserMode()
    sessionData.extension = extensionChange
    sessionStorage.removeItem('loginModel')
    sessionStorage.setItem('loginModel', JSON.stringify(sessionData))
  },

  //获得真实的操作用户
  getRealUser:function(){
    const sessionData = this.getLoginUserMode()
    if(sessionData.real_user !== null && sessionData.real_user !== undefined && sessionData.real_user !== ''){
      return sessionData.real_user
    }else{
      return ''
    }
  },

};
export default loginModel
