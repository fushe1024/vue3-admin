// app mudule
import storage from '@/utils/storage'
import { LANG, TAG_VIEW } from '@/constant'
import { getI18nTitle } from '@/utils/i18n'

export default {
  namespaced: true,
  state: {
    sidebarOpend: true,
    language: storage.get(LANG) || 'zh',
    tagViewList: storage.get(TAG_VIEW) || []
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarOpend = !state.sidebarOpend
    },
    setLanguage(state, lang) {
      state.language = lang
      storage.set(LANG, lang)
    },
    addTagView(state, tagView) {
      const isExist = state.tagViewList.some(
        (item) => item.path === tagView.path
      )
      if (!isExist) {
        state.tagViewList.push(tagView)
        storage.set(TAG_VIEW, state.tagViewList)
      }
    },
    // 删除当前
    delTagView(state, delPath) {
      state.tagViewList = state.tagViewList.filter(
        (item) => item.path !== delPath
      )
      storage.set(TAG_VIEW, state.tagViewList)
    },
    // 删除右侧
    delRightTagView(state, index) {
      state.tagViewList.splice(index + 1, state.tagViewList.length - index)
      storage.set(TAG_VIEW, state.tagViewList)
    },
    // 删除其他
    delOtherTagView(state, delIndex) {
      state.tagViewList = state.tagViewList.filter(
        (_, index) => index === delIndex
      )
      storage.set(TAG_VIEW, state.tagViewList)
    },
    // 国际化触发修改 title 方法
    changeTagsTitle(state) {
      state.tagViewList.forEach((tagItem) => {
        tagItem.title = getI18nTitle(tagItem.meta.title)
      })
      storage.set(TAG_VIEW, state.tagViewList)
    }
  }
}
