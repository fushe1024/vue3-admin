import { createRouter, createWebHashHistory } from 'vue-router'

/**
 * 公开路由表
 */
const PublicRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      hidden: true
    }
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/layout/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: PublicRoutes
})

export default router
