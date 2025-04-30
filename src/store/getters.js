import { MAIN_COLOR } from '@/constant'
import storage from '@/utils/storage'
import { generateColors } from '@/utils/theme'

export const getters = {
  token: (state) => state.user.token,
  hasUserInfo: (state) => JSON.stringify(state.user.userInfo) !== '{}',
  userInfo: (state) => state.user.userInfo,
  cssVar: (state) => {
    return {
      ...state.theme.variables,
      ...generateColors(storage.get(MAIN_COLOR))
    }
  },
  sidebarOpend: (state) => state.app.sidebarOpend,
  language: (state) => state.app.language,
  mainColor: (state) => state.theme.mainColor
}

export default getters
