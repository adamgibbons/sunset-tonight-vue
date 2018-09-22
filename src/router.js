import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Algorithm from './views/Algorithm.vue'
import Debug from './views/Debug.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/algorithm',
      name: 'algorithm',
      component: Algorithm
    },
    {
      path: '/debug',
      name: 'debug',
      component: Debug
    }
  ]
})
