import i18n from '@/i18n'
import { watch } from 'vue'
import store from '@/store'

// 获取多语言标题（默认路由）
export const getI18nTitle = (titleKey, prefix = 'route') => {
  return i18n.global.t(`${prefix}.${titleKey}`)
}

// 监听语言变化
export const watchSwitchLang = (...callbacks) => {
  watch(
    () => store.getters.language,
    () => {
      callbacks.forEach((cb) => cb(store.getters.language))
    }
  )
}
