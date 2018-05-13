import Vue from 'vue'
import Router from 'vue-router'

import Home from '../pages/home.vue'
import Zanding from '../pages/zanding.vue'
import Myself from '../pages/myself.vue'
import Login from '../pages/login.vue'
import withE from '../pages/withe.vue'

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
      path: '/home',
      name: 'Home',
      component: Home,
      children: [{
          path: '/home',
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
    	path : '/zanding',
    	name : 'Zanding',
    	component : Zanding
    },{
    	path : '/myself',
    	name : 'Myself',
    	component : Myself
    }
    ,{
      path : '/login',
      name : 'Login',
      component : Login
    },{
        path : '/withe',
        name : 'withE',
        component : withE
      }
    //,{
    //   path : 'register',
    //   name : 'Regist',
    //   component : Regist
    // }
  ]
})
