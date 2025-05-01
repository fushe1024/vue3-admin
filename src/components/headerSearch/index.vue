<script setup>
import { ref, computed, watch, nextTick, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { filterRouters } from '@/utils/route'
import { generateSearchRoutes } from './FuseData'
import { watchSwitchLang } from '@/utils/i18n'
import Fuse from 'fuse.js'
const router = useRouter()

// 控制选择框显示隐藏
const isShow = ref(false)
const headerSearchSelectRef = ref()

// 检索数据源
let searchPool = computed(() => {
  const filteRoutes = filterRouters(router.getRoutes())
  return generateSearchRoutes(filteRoutes)
})

// 搜索库
let fuse
const initFuse = (searchPool) => {
  fuse = new Fuse(searchPool, {
    shouldSort: true,
    minMatchCharLength: 1,
    keys: [
      { name: 'title', weight: 0.7 },
      { name: 'path', weight: 0.3 }
    ]
  })
}
initFuse(searchPool.value)

// 搜索关键字 & 搜索结果
const search = ref('')
const searchOptions = ref([])

// 模糊检索
const querySearch = (queryString) => {
  if (!queryString) {
    searchOptions.value = []
    return
  }
  searchOptions.value = fuse.search(queryString)
}

// 点击搜索项
const onSelectChange = (val) => {
  isShow.value = false
  router.push(val.path)
}

// 打开搜索框
const onShowClick = () => {
  isShow.value = !isShow.value
  headerSearchSelectRef.value.focus()
}

// 关闭搜索框
const onCloseClick = async () => {
  // 1. 清空搜索内容
  search.value = ''
  searchOptions.value = []

  // 3. 等待一帧渲染周期
  await nextTick(() => {
    // 4. 隐藏组件
    isShow.value = false
  })
}

// 监听显示隐藏
watch(isShow, (val) => {
  if (val) {
    document.body.addEventListener('click', onCloseClick)
  } else {
    document.body.removeEventListener('click', onCloseClick)
  }
})
// 监听语言切换
watchSwitchLang(() => {
  searchPool = computed(() => {
    const filteRoutes = filterRouters(router.getRoutes())
    return generateSearchRoutes(filteRoutes)
  })

  // 重置检索库
  initFuse(searchPool.value)
})

onUnmounted(() => {
  document.body.removeEventListener('click', onCloseClick)
})
</script>

<template>
  <div class="header-search" :class="{ show: isShow }">
    <!-- icon -->
    <svg-icon class="search-icon" icon="search" @click.stop="onShowClick" />
    <!-- select -->
    <el-select
      :model-value="search"
      ref="headerSearchSelectRef"
      class="header-search-select"
      default-first-option
      filterable
      clearable
      remote
      :remote-method="querySearch"
      placeholder="search"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"
      />
    </el-select>
  </div>
</template>

<style scoped lang="scss">
.header-search {
  display: flex;
  align-items: center;

  // icon
  :deep(.search-icon) {
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  // select
  .header-search-select {
    :deep(.el-select__wrapper) {
      width: 0;
      transition: width 0.2s;
      border-radius: 0;
      border: 0;
      padding: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
    }
  }

  // show > select
  &.show {
    :deep(.el-select__wrapper) {
      margin-left: 10px;
      width: 210px;
    }
  }
}
</style>
