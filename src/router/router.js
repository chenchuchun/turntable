import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'
import { defineAsyncComponent } from 'vue'

const router = createRouter({ 
  history: createWebHashHistory(),  // hash 模式
  // history: createWebHistory(),  // history 模式
  routes: [
    {
      path: '/status',
      name: 'basee',
      component: (() => import(`../views/status/basee.vue`)),
      meta: {
        title: '进入',
      },
    },
    {
      path: '/status/first',
      name: 'home',
      component: (() => import(`../views/status/base.vue`)),
      meta: {
        title: '首页',
      },
    },
    {
      path: '/status/second',
      name: 'user',
      component: defineAsyncComponent(() => import(`../views/status/baset.vue`)),
      meta: {
        title: 'user',
      },
    },
    {
      path: '/chart',
      name: 'chart',
      component: defineAsyncComponent(() => import(`../views/chart/index.vue`)),
      meta: {
        title: 'chart',
      },
    },
    {
      path:"/imgcut",
      name:"imgcut",
      component:  defineAsyncComponent(() => import(`../views/imgcut/index.vue`)),
    },
    {
      path:"/turntable",
      name:"转盘",
      component:  defineAsyncComponent(() => import(`../views/turntable/index.vue`)),
    }
    // {
    //   path: '/list',
    //   name: 'list',
    //   component: defineAsyncComponent(() => import(`../views/list.vue`)),
    //   meta: {
    //     title: '列表页',
    //   },
    // },
    // {
    //   path: '/*',
    //   redirect: '/',
    // },
  ]
})

// 全局路由守卫
router.beforeEach((to, from, next)=>{
  // console.log(to, from)
  if (to.meta.title) {
    document.title = `${to.meta.title}`;
  }
  next()
})

router.afterEach((to, from)=>{
  // console.log(to, from)
  console.log('afterEach')
})

export default router