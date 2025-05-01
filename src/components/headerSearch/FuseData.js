import path from 'path'
import { getI18nTitle } from '@/utils/i18n'

// 匹配动态路由（如 /:id）
const DYNAMIC_ROUTE_REGEX = /\/:.+/

/**
 * 生成可搜索路由列表
 * @param routes 原始路由配置
 * @param basePath 当前基础路径
 * @param titleChain 已累积的标题层级
 */
export const generateSearchRoutes = (
  routes,
  basePath = '/',
  titleChain = []
) => {
  const result = []

  for (const route of routes) {
    // 跳过无效路径或动态路由
    if (!route.path || DYNAMIC_ROUTE_REGEX.test(route.path)) continue

    // 构建完整路径
    const fullPath = path.resolve(basePath, route.path)
    const currentTitles = [...titleChain]

    // 处理带标题的路由
    if (route.meta?.title) {
      const i18nTitle = getI18nTitle(`${route.meta.title}`)
      currentTitles.push(i18nTitle)
      result.push({ path: fullPath, title: currentTitles })
    }

    // 递归处理子路由
    if (route.children) {
      const childRoutes = generateSearchRoutes(
        route.children,
        fullPath,
        route.meta?.title ? currentTitles : titleChain // 决定是否继承当前标题
      )
      result.push(...childRoutes)
    }
  }

  return result
}
