import Vue from 'vue'
import Router from 'vue-router'
import routerList from './router.js'
Vue.use(Router)

export default new Router({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/jump',
      component: resolve => require(['@/view/jump'], resolve),
    },
    {
      path: '/login', //登录
      name: 'login',
      component: resolve => require(['@/view/login'], resolve),
      meta: {
        name: "登录"
      }
    },
    {
      path: '/',
      component: resolve => require(['@/components/frame'], resolve),
      children: [{
        path: '/main',
        component: resolve => require(['@/view/main'], resolve),
        meta: {
          title: '首页',
          icon: 'el-icon-monitor'
        }
      }, ...routerList]
    }
  ]
})
