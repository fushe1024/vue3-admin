// theme module
import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant'
import storage from '@/utils/storage'

export default {
  namespaced: true,
  state: {
    mainColor: storage.get(MAIN_COLOR) || DEFAULT_COLOR
  },
  mutations: {
    setMainColor(state, newColor) {
      state.mainColor = newColor
      storage.set(MAIN_COLOR, newColor)
    }
  }
}
