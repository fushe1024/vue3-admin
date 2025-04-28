<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
const route = useRoute()

// 面包屑数据
const breadcrumbData = ref([])
// 获取面包屑数据
const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  )
}

// 监听路由变化计算面包屑数据
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  { immediate: true }
)

// 点击面包屑
const router = useRouter()
const onLinkClick = (item) => {
  router.push(item.path)
}

// 导入鼠标移入样式
const store = useStore()
// eslint-disable-next-line
const linkHoverColer = ref(store.getters.cssVar.menuBg)
</script>

<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <!-- 动画 -->
    <TransitionGroup name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <!-- 最后一项 -->
        <span class="no-redirect" v-if="index === breadcrumbData.length - 1">
          {{ item.meta.title }}
        </span>
        <!-- 其他项 -->
        <a class="redirect" v-else @click.prevent="onLinkClick(item)">
          {{ item.meta.title }}
        </a>
      </el-breadcrumb-item>
    </TransitionGroup>
  </el-breadcrumb>
</template>

<style scoped lang="scss">
.breadcrumb {
  margin-left: 10px;
  font-size: 14px;

  // 面包屑项
  .redirect {
    color: #666;
    font-weight: 600;
  }

  // 鼠标移入样式
  .redirect:hover {
    color: v-bind(linkHoverColer);
  }

  // 最后一项
  :deep(.no-redirect) {
    color: #97a8be;
    cursor: text;
  }
}
</style>
