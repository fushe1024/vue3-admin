// permission module
import { publicRoutes, privateRoutes } from '@/router'

export default {
  namespaced: true,
  state: {
    // 路由表
    routes: publicRoutes
  },
  mutations: {
    // 设置路由表
    setRoutes(state, newRoutes) {
      state.routes = [...publicRoutes, ...newRoutes]
    }
  },
  actions: {
    // 筛选路由表
    filterRoutes({ commit }, menus) {
      const routes = []

      // 筛选出用户可访问的路由表
      menus.forEach((key) => {
        routes.push(...privateRoutes.filter((item) => item.name === key))
      })

      // 添加 404 页面
      routes.push({
        path: '/:pathMatch(.*)*',
        redirect: '/404'
      })

      // 提交 mutation 设置路由表
      commit('setRoutes', routes)

      return routes
    }
  }
}
