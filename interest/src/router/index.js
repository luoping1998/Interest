import Vue from 'vue'
import Router from 'vue-router'

import Index from '../pages/index.vue'

import Home from '../pages/home.vue'
import Message from '../pages/zanding.vue'
import Myself from '../pages/myself.vue'
import Login from '../pages/login.vue'
import Regist from '../pages/register.vue'

import Follow from '../pages/hbranch/follow.vue'
import World from '../pages/hbranch/world.vue'

import Search from '../pages/search.vue'
import Friends from '../pages/add_friends.vue'
import Frinfo from '../pages/frinfo.vue'

import chanInfo from '../pages/change_info.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },{
      path: '/index',   //主要功能页面
      name: 'Index',
      component: Index,
      linkActiveClass : 'active',
      children : [{
        path : '',
        redirect : {name : Home}
      },{
        path : 'home',  //主页
        component : Home,
        children: [{
            path: '',   
            redirect: { name: 'World' }
          },{
            path: 'follow',   //关注
            name: 'Follow',
            component: Follow
          },{
            path : 'world',   //世界
            name : 'World',
            component : World
          }]
      },{
        path : 'msg',   //消息
        name : 'Message',
        component : Message
      },{
       path : 'myself', //个人页面
       name : 'Myself',
       component : Myself
      }]
    },{
        path:'/chinfo',   //修改个人信息
        name : 'ChanInfo',
        component : chanInfo
    },{
        path:'/add',     //添加好友
        name : 'Friends',
        component : Friends
    },{ 
      path : '/login',  //登录
      name : 'Login',
      component : Login
    },{
      path : '/reg',    //注册
      name : 'Regist',
      component : Regist
    },{
      path : '/search', //查询好友
      name : 'Search',
      component : Search
    },{
      path : 'details/:id',
      name : 'Frinfo',
      component : Frinfo
    }
  ]
})
