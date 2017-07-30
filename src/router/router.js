/**
 * Created by wanxh on 2017/7/25.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/components/HomePage'
import Login from './../components/login/login.vue'
import Regist from './../components/regist/regist.vue'
import Test from './../components/test/test.vue'
import UserCenter from './../components/user/userCenter.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      // 首页
      path: '/',
      name: 'HomePage',
      component: HomePage
      // redirect: Header
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/regist',
      component: Regist
    },
    {
      path: '/test',
      component: Test
    },
    {
      path: '/user',
      component: UserCenter
    }
  ]
})
