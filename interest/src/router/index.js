import Vue from 'vue'
import Router from 'vue-router'

import Index from '../pages/index.vue'

import Login from '../pages/outer/login.vue'
import Regist from '../pages/outer/register.vue'
import Search from '../pages/outer/search.vue'
import Friends from '../pages/outer/add_friends.vue'
import Msgdetails from '../pages/outer/msgdetails.vue'

import Home from '../pages/hbranch/home.vue'
import Follow from '../pages/hbranch/follow.vue'
import World from '../pages/hbranch/world.vue'

import Message from '../pages/zbranch/zanding.vue'
import Haspub from '../pages/zbranch/has_pub.vue'
import Topub from '../pages/zbranch/topub.vue'

import Myself from '../pages/mbranch/myself.vue'
import chanInfo from '../pages/mbranch/change_info.vue'
import Frinfo from '../pages/mbranch/frinfo.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
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
        component : Message,
        children : [{
            path : '',
            redirect : { name : 'haspub'}
          },{
            path : 'pubed',
            name : 'haspub',
            component : Haspub
          },{
            path : 'topub',
            name : 'topub',
            component : Topub
          }
        ]
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
    },{
      path : 'msgs/:id',
      name : 'Msgdetails',
      component : Msgdetails
    }
  ]
})
