// theme module
import variables from '@/styles/variables.module.scss'
import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant'
import storage from '@/utils/storage'

export default {
  namespaced: true,
  state: {
    variables,
    mainColor: storage.get(MAIN_COLOR) || DEFAULT_COLOR
  },
  mutations: {
    setMainColor(state, newColor) {
      state.mainColor = newColor
      state.variables.menuBg = newColor
      storage.set(MAIN_COLOR, newColor)
    }
  }
}
