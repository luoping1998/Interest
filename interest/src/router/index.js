import Vue from 'vue'
import Router from 'vue-router'

import Index from '../pages/index.vue'

import Home from '../pages/home.vue'
import Zanding from '../pages/zanding.vue'
import Myself from '../pages/myself.vue'
import Login from '../pages/login.vue'
import Regist from '../pages/register.vue'

import Follow from '../pages/hbranch/follow.vue'
import World from '../pages/hbranch/world.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },{
      path: '/index',
      name: 'Index',
      component: Index,
      children : [{
        path : 'home',
        name : 'Home',
        component : Home,
        children: [{
            path: '',
            redirect: { name: 'World' }
          },{
            path: 'follow',
            name: 'Follow',
            component: Follow
          },{
            path : 'world',
            name : 'World',
            component : World
          }]
      },{
        path : 'zanding',
        name : 'Zanding',
        component : Zanding
      },{
       path : 'myself',
       name : 'Myself',
       component : Myself
      }]
    }
    ,{
      path : '/login',
      name : 'Login',
      component : Login
    }
    ,{
      path : '/reg',
      name : 'Regist',
      component : Regist
    }
  ]
})
