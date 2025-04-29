// app mudule
import storage from '@/utils/storage'
import { LANG } from '@/constant'

export default {
  namespaced: true,
  state: {
    sidebarOpend: true, // 控制菜单的展开收起
    language: storage.get(LANG) || 'zh'
  },
  mutations: {
    // 切换菜单的展开收起
    toggleSidebar(state) {
      state.sidebarOpend = !state.sidebarOpend
    },
    // 设置语言
    setLanguage(state, lang) {
      state.language = lang
      storage.set(LANG, lang) // 存储到本地
    }
  }
}
