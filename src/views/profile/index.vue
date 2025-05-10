<script setup>
import ProjectCard from './components/ProjectCard.vue'
import Author from './components/Author.vue'
import Chapter from './components/Chapter.vue'
import Feature from './components/Feature.vue'
import { getFeature } from '@/api/user'
import { watchSwitchLang } from '@/utils/i18n'
import { ref } from 'vue'

// 激活的tab
const activeName = ref('feature')

// 获取项目列表数据
const featureData = ref([])
const getFeatureList = async () => {
  const res = await getFeature()
  featureData.value = res
}
getFeatureList()

watchSwitchLang(getFeatureList)
</script>

<template>
  <div class="profile-container">
    <el-row>
      <el-col :span="6">
        <project-card class="user-card" :feature="featureData" />
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('profile.feature')" name="feature">
              <feature :feature="featureData" />
            </el-tab-pane>
            <el-tab-pane :label="$t('profile.chapter')" name="chapter">
              <chapter />
            </el-tab-pane>
            <el-tab-pane :label="$t('profile.author')" name="author">
              <author />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.profile-container {
  .user-card {
    margin-right: 20px;
  }
}
</style>
