<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { isTags } from '@/utils/tags'
import { useStore } from 'vuex'
import { getI18nTitle } from '@/utils/i18n'
const route = useRoute()
const store = useStore()

// 获取title
const getTitle = (route) => {
  let title = ''
  // 如果没有设置title，则使用路径作为title
  if (!route.meta) {
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = getI18nTitle(route.meta.title)
  }
  return title
}

watch(
  route,
  (to, from) => {
    // 是否需要缓存
    if (!isTags(to.path)) return

    const { fullPath, meta, name, params, path, query } = to

    // 添加tagView
    store.commit('app/addTagView', {
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to)
    })
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :exclude="['ArticleCreate', 'ArticleDetail']">
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<style scoped lang="scss">
.app-main {
  min-height: calc(100vh - 50px - 43px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 105px 20px 20px;
  box-sizing: border-box;
}
</style>
