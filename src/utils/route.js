import path from 'path'

/**
 * 获取所有子路由列表
 */
const getChildrenRoutes = (routes) =>
  routes.flatMap((route) => (route.children?.length ? route.children : []))

/**
 * 过滤出有效的顶层路由
 */
export const filterRouters = (routes) => {
  const childrenPaths = new Set(getChildrenRoutes(routes).map((r) => r.path))
  return routes.filter((route) => !childrenPaths.has(route.path))
}

/**
 * 判断数据是否为空值
 */
const isEmpty = (data) => {
  if (data == null) return true
  if (Array.isArray(data)) return data.length === 0
  if (typeof data === 'object') return Object.keys(data).length === 0
  return false
}

/**
 * 生成符合规范的菜单结构
 */
export function generateMenus(routes, basePath = '') {
  return routes.reduce((result, item) => {
    // 跳过无meta且无子路由的项
    if (isEmpty(item.meta) && isEmpty(item.children)) return result

    const routePath = path.resolve(basePath, item.path)

    // 处理仅包含子路由的情况
    if (isEmpty(item.meta) && !isEmpty(item.children)) {
      return [...result, ...generateMenus(item.children, routePath)]
    }

    // 验证菜单项必须的元数据
    if (!item.meta?.icon || !item.meta?.title) return result

    // 合并相同路径的菜单项
    const existing = result.find((menu) => menu.path === routePath)
    if (existing) {
      existing.children = [
        ...(existing.children || []),
        ...generateMenus(item.children || [], routePath)
      ]
    } else {
      result.push({
        ...item,
        path: routePath,
        children: generateMenus(item.children || [], routePath)
      })
    }

    return result
  }, [])
}
