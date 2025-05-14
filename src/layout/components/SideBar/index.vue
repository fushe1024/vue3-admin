<script setup>
import SidebarMenu from './SidebarMenu.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()
</script>

<template>
  <div>
    <!-- logo -->
    <div class="logo-container">
      <el-avatar
        class="logo-avatar"
        @click="router.push('/')"
        shape="square"
        :size="44"
        :src="store.getters.userInfo.avatar"
      ></el-avatar>
      <!-- title -->
      <h1
        class="logo-title"
        :class="{ isDisplay: !store.getters.sidebarOpend }"
      >
        imooc-admin
      </h1>
    </div>
    <!-- menu -->
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.logo-container {
  padding: 10px 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .logo-avatar {
    cursor: pointer;
  }

  .logo-title {
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
    transition: all 0.28s;
  }

  .logo-title.isDisplay {
    display: none;
  }
}
</style>
