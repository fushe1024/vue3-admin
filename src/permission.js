import store from './store'
import router from './router'

// 白名单
const whiteList = ['/login']

// 路由前置守卫
router.beforeEach(async (to, from) => {
  // 用户已经登录
  if (store.getters.token) {
    // 登录之后不允许进入登录页
    if (to.path === '/login') {
      return '/'
    } else {
      // 登录之后，访问其余6个路由（登录页以外的路由）
      if (!store.getters.hasUserInfo) {
        // 没有用户信息，派发 action 获取用户信息
        const { permission } = await store.dispatch('user/getInfo')
        // 筛选用户权限，生成可访问的路由表
        const filterRoutes = await store.dispatch(
          'permission/filterRoutes',
          permission.menus
        )
        // 动态添加可访问的路由表
        filterRoutes.forEach((route) => {
          router.addRoute(route)
        })
        // 添加完动态路由之后，需要在进行一次主动跳转
        return to.path
      }
      return true
    }
  } else {
    //  没有token的情况， 只能进入白名单
    if (whiteList.includes(to.path)) {
      return true
    } else {
      // 没有token，并且不在白名单
      return '/login'
    }
  }
})
