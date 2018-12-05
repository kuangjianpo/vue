import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import User from '@/views/user/Users'
import Right from '@/views/rights/Right'
import Role from '@/views/rights/Role'

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
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/user',
          name: 'User',
          component: User
        },
        {
          path: '/right',
          name: 'Right',
          component: Right
        },
        {
          path: '/role',
          name: 'Role',
          component: Role
        }
      ]
    }
  ]
})
