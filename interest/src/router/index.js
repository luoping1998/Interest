import Vue from 'vue'
import Router from 'vue-router'

import Index from '../pages/index.vue'

import Login from '../pages/outer/login.vue'
import Regist from '../pages/outer/register.vue'
import Fpass from '../pages/outer/fpass.vue'
import Search from '../pages/outer/search.vue'
import Friends from '../pages/outer/add_friends.vue'
import Msgdetails from '../pages/outer/msgdetails.vue'
import Myfollow from '../pages/outer/my_follow.vue'
import Followme from '../pages/outer/follow_me.vue'
import Commitdetail from '../pages/outer/commitdetail.vue'
import Userpubed from '../pages/outer/userpubed.vue'
import Prompt from '../pages/outer/prompt.vue'

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
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/index',   //主要功能页面
      component: Index,
      linkActiveClass : 'active',
      children : [{
        path : '',
        redirect : {name : Home}
      },
      {
        path : 'home',  //主页
        component : Home,
        children: [
          {
            path: '',   
            redirect: { name: 'World' }
          },
          {
            path: 'follow',   //关注
            name: 'Follow',
            component: Follow
          },
          {
            path : 'world',   //世界
            name : 'World',
            component : World
          }
        ]
      },
      {
        path : 'msg',   //消息
        component : Message,
        children : [
          {
            path : '',
            redirect : { name : 'haspub'}
          },
          {
            path : 'pubed',
            name : 'haspub',
            component : Haspub
          },
          {
            path : 'topub',
            name : 'topub',
            component : Topub
          }
        ]
      },
      {
       path : 'myself', //个人页面
       name : 'Myself',
       component : Myself
      }]
    },
    {
      path:'/chinfo',   //修改个人信息
      name : 'ChanInfo',
      component : chanInfo
    },
    {
      path:'/add',     //添加好友
      name : 'Friends',
      component : Friends
    },
    { 
      path : '/login',  //登录
      name : 'Login',
      component : Login
    },
    {
      path : '/reg',    //注册
      name : 'Regist',
      component : Regist
    },
    {
      path : '/fpass',    //找回密码
      name : 'Fpass',
      component : Fpass
    },
    {
      path : '/search', //查询好友
      name : 'Search',
      component : Search
    },
    {
      path : '/details/:id',   //好友详情
      name : 'Frinfo',
      component : Frinfo
    },
    {
      path : '/msgs/:id',    //帖子详情
      name : 'Msgdetails',
      component : Msgdetails
    },
    {
      path :'/myfol/:u_id',        //我关注列表
      name : 'Myfollow',
      component : Myfollow
    },
    { 
      path : '/folme/:u_id',       //关注我列表
      name : 'Followme',
      component : Followme
    },
    {
      path : '/commit/:c_id',      //评论回复列表
      name : 'Commitdetail',
      component : Commitdetail
    },
    {
      path : '/pubed/:u_id',        //好友发表列表
      name : 'Userpubed',
      component : Userpubed
    },
    {
      path : '/proms',              //个人消息推送
      name : 'Prompt',
      component : Prompt
    }
  ]
})
