import store from '@/store'

/**
 * @description 权限指令
 * @param {Object} el 绑定元素
 * @param {Object} binding 绑定的属性
 */
function checkPermission(el, binding) {
  // 获取绑定的值 (权限点)
  const { value } = binding

  // 获取用户的权限点
  const points = store.getters.userInfo.permission.points ?? []

  // 判断是否有权限
  if (value && value instanceof Array && value.length > 0) {
    // 判断当前权限点是否在用户的权限点中
    const hasPermission = points.some((point) => {
      return value.includes(point)
    })

    // 如果没有权限，则移除该元素
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('need roles! Like v-permission=["admin","editor"]')
  }
}

// https://cn.vuejs.org/guide/reusability/custom-directives#directive-hooks
export default {
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted: checkPermission,

  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated: checkPermission
}
