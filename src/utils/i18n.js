import i18n from '@/i18n'

// 生成路由菜单所需要的国际化 name
export const generateTitle = (title) => {
  return i18n.global.t('route.' + title)
}
