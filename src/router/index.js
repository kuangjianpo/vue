import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'Login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})