<script setup>
import Hamburger from '@/components/Hamburger/index.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import LangSelect from '@/components/LangSelect/index.vue'
import ThemeSelect from '@/components/ThemeSelect/index.vue'
import { useStore } from 'vuex'
const store = useStore()

// 退出登录
const logout = () => {
  store.dispatch('user/logout')
}
</script>

<template>
  <div class="nav-bar">
    <!-- Hamburger -->
    <hamburger />
    <!-- Breadcrumb -->
    <breadcrumb />
    <div class="right-menu">
      <!-- themeChange -->
      <theme-select class="right-menu-item" />
      <!-- langChange -->
      <lang-select class="right-menu-item" />
      <!-- avatar -->
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
            <router-link to="/">
              <el-dropdown-item>{{ $t('navBar.home') }}</el-dropdown-item>
            </router-link>
            <a
              href="https://github.com/fushe1024/vue3-imooc-admin"
              target="_blank"
            >
              <el-dropdown-item>{{ $t('navBar.address') }}</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">{{
              $t('navBar.logout')
            }}</el-dropdown-item>
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
  display: flex;
  align-items: center;

  .right-menu {
    padding-right: 16px;
    height: inherit;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: end;

    // 功能菜单按钮
    :deep(.right-menu-item) {
      margin-right: 18px;
      font-size: 24px;
      color: #5a5e66;

      &:hover {
        cursor: pointer;
      }
    }

    :deep(.avater-container) {
      cursor: pointer;
    }
  }
}
</style>
