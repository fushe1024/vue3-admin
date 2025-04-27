import variables from '@/styles/variables.module.scss'

export const getters = {
  token: (state) => state.user.token,
  hasUserInfo: (state) => JSON.stringify(state.user.userInfo) !== '{}',
  userInfo: (state) => state.user.userInfo,
  cssVar: () => variables,
  sidebarOpend: (state) => state.app.sidebarOpend
}

export default getters
