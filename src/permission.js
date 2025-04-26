import { ElMessage } from 'element-plus'
import router from './router'
import store from './store'

// 白名单
const whiteList = ['/login']

/**
 * 路由前置守卫
 */
router.beforeEach(async (to, from) => {
  // 获取 token
  const token = store.getters.token

  if (token) {
    if (to.path === '/login') {
      ElMessage.success('您已经登录')
      return '/'
    } else {
      if (!store.getters.hsaUserInfo) {
        await store.dispatch('user/getInfo')
      }
      return true
    }
  } else if (whiteList.includes(to.path)) {
    return true
  } else {
    ElMessage.success('请先登录')
    return '/login'
  }
})
