<script setup>
import { useStore } from 'vuex'
const store = useStore()
/**
 * 退出登录
 */
const logout = () => {
  store.dispatch('user/logout')
}
</script>

<template>
  <div class="nav-bar">
    <div class="right-menu">
      <!-- 头像 -->
      <el-dropdown class="avater-container" trigger="click">
        <div class="avater-wrapper">
          <el-avatar
            shape="square"
            :size="40"
            :src="store.getters.userInfo.avatar"
          />
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <el-dropdown-item disabled>个人中心</el-dropdown-item>
            <router-link to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <a
              href="https://github.com/fushe1024/vue3-imooc-admin"
              target="_blank"
            >
              <el-dropdown-item>仓库地址</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nav-bar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .right-menu {
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: end;
    padding-right: 16px;

    :deep(.avater-container) {
      cursor: pointer;
    }
  }
}
</style>
