export const getters = {
  token: (state) => state.user.token,
  hasUserInfo: (state) => JSON.stringify(state.user.userInfo) !== '{}',
  userInfo: (state) => state.user.userInfo
}

export default getters
