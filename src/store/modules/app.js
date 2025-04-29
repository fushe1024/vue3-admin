// app mudule
import storage from '@/utils/storage'
import { LANG } from '@/constant'

export default {
  namespaced: true,
  state: {
    sidebarOpend: true,
    language: storage.get(LANG) || 'zh'
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarOpend = !state.sidebarOpend
    },
    setLanguage(state, lang) {
      state.language = lang
      storage.set(LANG, lang)
    }
  }
}
