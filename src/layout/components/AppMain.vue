<script setup></script>

<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 60px 20px 20px;
  box-sizing: border-box;
}
</style>
