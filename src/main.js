// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss'

import ElementUi from 'element-ui'
Vue.use(ElementUi)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('itcast_token')
  if (token || to.path === '/login') {
    next()
  } else {
    next({path: '/login'})
  }
  // console.log(to)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
