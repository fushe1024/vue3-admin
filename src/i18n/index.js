import store from '@/store'
import { createI18n } from 'vue-i18n'
import zh from './locales/zh'
import en from './locales/en'

// 默认语言
const getDefaultLocale = () => store && store.getters && store.getters.language

// 创建 i18n 实例
const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: getDefaultLocale(), // 默认语言
  fallbackLocale: 'en', // 备用语言
  messages: { zh, en } // 语言包
})

export default i18n
