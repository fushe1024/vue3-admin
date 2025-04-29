import { createI18n } from 'vue-i18n'
import store from '@/store'

// 语言包
import zh from './locales/zh'
import en from './locales/en'

// 默认语言
const getDefaultLocale = () => store.getters.language

// 创建 i18n 实例
const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: getDefaultLocale(), // 默认语言
  fallbackLocale: 'en', // 备用语言
  // 语言包
  messages: {
    zh,
    en
  }
})

export default i18n
