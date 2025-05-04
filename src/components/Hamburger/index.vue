<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

// 图标状态
const iconStatus = computed(() => {
  return store.getters.sidebarOpend ? 'hamburger-opened' : 'hamburger-closed'
})

// 点击按钮
const clickBtn = () => {
  store.commit('app/toggleSidebar')
}
</script>

<template>
  <div class="hamburger-container" @click="clickBtn">
    <svg-icon id="guide-hamburger" :icon="iconStatus"></svg-icon>
  </div>
</template>

<style scoped lang="scss">
.hamburger-container {
  width: 50px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.5s;
  font-size: 20px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
