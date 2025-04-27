<script setup>
import { computed } from 'vue'
import SidebarItem from './SidebarItem.vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { filterRouters, generateMenus } from '@/utils/route'
const router = useRouter()
const route = useRoute()
const store = useStore()

// 动态路由
const routes = computed(() => {
  const fRouters = filterRouters(router.getRoutes())
  return generateMenus(fRouters)
})

// 默认激活菜单
const activeMenu = computed(() => {
  return route.path
})
</script>

<template>
  <div>
    <el-menu
      :collapse="!store.getters.sidebarOpend"
      :unique-opened="true"
      :background-color="store.getters.cssVar.menuBg"
      :text-color="store.getters.cssVar.menuText"
      :active-text-color="store.getters.cssVar.menuActiveText"
      router
      :default-active="activeMenu"
    >
      <sidebar-item
        v-for="item in routes"
        :key="item.path"
        :route="item"
      ></sidebar-item>
    </el-menu>
  </div>
</template>
