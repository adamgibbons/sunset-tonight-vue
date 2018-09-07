import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Algorithm from './views/Algorithm.vue'

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
      // route level code-splitting
      // this generates a separate chunk (Algorithm.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Algorithm
    }
  ]
})
