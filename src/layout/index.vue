<script setup>
import SideBar from './components/SideBar'
import NavBar from './components/NavBar.vue'
import AppMain from './components/AppMain.vue'
import variables from '@/styles/variables.module.scss'
import { useStore } from 'vuex'
const store = useStore()
</script>

<template>
  <div
    class="app-wrapper"
    :class="[store.getters.sidebarOpend ? 'openSidebar' : 'hideSidebar']"
  >
    <!-- side-bar -->
    <side-bar
      class="sidebar-container"
      :style="{ backgroundColor: variables.menuBg }"
    ></side-bar>
    <div class="main-container">
      <div class="fixed-header">
        <!-- navbar -->
        <nav-bar></nav-bar>
      </div>
      <!-- main -->
      <app-main></app-main>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.module.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
