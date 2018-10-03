import Vue from 'vue'
import Router from 'vue-router'
import Root from './views/Root.vue'
import Algorithm from './views/Algorithm.vue'
import Debug from './views/Debug.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'root',
      component: Root
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
