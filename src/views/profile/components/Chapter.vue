<script setup>
import { ref } from 'vue'
import { getChapter } from '@/api/user'
import { watchSwitchLang } from '@/utils/i18n'

// 获取章节列表数据
const chapterData = ref([])
const getChapterList = async () => {
  const res = await getChapter()
  chapterData.value = res
}
getChapterList()

// 监听语言切换
watchSwitchLang(() => {
  getChapterList()
})
</script>

<template>
  <el-timeline>
    <el-timeline-item
      v-for="item in chapterData"
      :key="item.id"
      :timestamp="item.timestamp"
      placement="top"
    >
      <el-card>
        <h4>{{ item.content }}</h4>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<style scoped></style>
