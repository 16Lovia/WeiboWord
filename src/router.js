import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },{
      path: '/test',
      name: '测试界面',
      component: () => import('./views/SignIn/test.vue')
    },{
      path: '/login',
      name: '登陆界面',
      component: () => import('./views/SignIn/login.vue')
    },{
      path: '/imagewall',
      name: '',
      component: () => import('./views/SignIn/ImageWall.vue')
    },{
      path: '/sevenimg',
      name: '',
      component: () => import('./views/SignIn/SevenImg.vue')
    },{
      path: '/tree',
      name: '',
      component: () => import('./views/d3Tree/tree3.vue')
    },{
      path: '/tree3_0',
      name: '',
      component: () => import('./views/d3Tree/tree3_0.vue')
    }
    // 网站架构
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home,
    //   // 单页内容
    //   children: [
    //     {
    //       path: '/sub',
    //       name: '网站首页',
    //       component: () => import('./views/Home/SubMap.vue')
    //     }
    //   ]
    // },
  ]
})
