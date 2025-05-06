<script setup>
import PanThumb from '@/components/PanThumb/index.vue'
import { defineProps } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

defineProps({
  feature: {
    type: Array,
    requied: true
  }
})
</script>

<template>
  <div>
    <el-card class="user-container">
      <template #header>
        <div class="card-header">
          <span>{{ $t('profile.introduce') }}</span>
        </div>
      </template>
      <!-- 介绍 -->
      <div class="user-profile">
        <!-- 头像 -->
        <div class="user-profile-item">
          <pan-thumb
            width="100px"
            height="100px"
            :image="store.getters.userInfo.avatar"
          >
            <div>Hello</div>
            <div>{{ store.getters.userInfo.title }}</div>
          </pan-thumb>
        </div>
        <!-- 名字 -->
        <div class="user-profile-item">
          <div class="user-name text-center">
            {{ store.getters.userInfo.username }}
          </div>
          <div class="user-role text-center text-muted">
            {{ store.getters.userInfo.title }}
          </div>
        </div>
      </div>
      <!-- 项目介绍 -->
      <div class="project-box">
        <div class="project-header">
          <svg-icon icon="introduce"></svg-icon>
          <span class="text">{{ $t('profile.projectIntroduction') }}</span>
        </div>
        <div class="project-content">
          <div class="text-muted">
            {{ $t('profile.muted') }}
          </div>
        </div>
      </div>
      <!-- 项目功能 -->
      <div class="project-box">
        <div class="project-header">
          <svg-icon icon="reward"></svg-icon>
          <span class="text">{{ $t('profile.projectFunction') }}</span>
        </div>
        <div class="project-content">
          <div
            class="progress-item text-muted"
            v-for="item in feature"
            :key="item.id"
          >
            <div>{{ item.title }}</div>
            <el-progress :percentage="item.percentage" status="success" />
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.user-container {
  .text-muted {
    color: #777;
    font-size: 14px;
  }

  // 介绍部分
  .user-profile {
    .user-profile-item {
      margin-top: 10px;
      text-align: center;
    }

    .user-name {
      font-weight: bold;
    }

    .user-role {
      padding-top: 10px;
      font-weight: 400px;
    }
  }

  // 项目介绍 与 项目功能
  .project-box {
    margin-top: 25px;
    .project-header {
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;
      display: flex;
      align-items: center;

      .text {
        margin-left: 10px;
        font-size: 18px;
        font-weight: bold;
      }
    }

    .project-content {
      margin-top: 10px;
    }
  }

  // 项目功能
  .progress-item {
    margin-top: 10px;
  }
}
</style>
