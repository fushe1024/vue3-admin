// app mudule
export default {
  namespaced: true,
  state: {
    sidebarOpend: true // 控制菜单的展开收起
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarOpend = !state.sidebarOpend // 取反
    }
  }
}
