import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import User from '@/views/user/Users'
import Right from '@/views/rights/Right'
import Role from '@/views/rights/Role'
import Goods from '@/views/goods/Goods'
import List from '@/views/goods/List'
import Add from '@/views/goods/Add'
import Categories from '@/views/goods/Categories'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'users',
          name: 'User',
          component: User
        },
        {
          path: 'rights',
          name: 'Right',
          component: Right
        },
        {
          path: 'roles',
          name: 'Role',
          component: Role
        },
        {
          path: 'goods',
          name: 'Goods',
          component: Goods,
          redirect: {
            name: 'List'
          },
          children: [
            {
              path: 'list',
              name: 'List',
              component: List
            },
            {
              path: 'add',
              name: 'Add',
              component: Add
            }
          ]
        },
        {
          path: 'categories',
          name: 'Categories',
          component: Categories
        }
      ]
    }
  ]
})
