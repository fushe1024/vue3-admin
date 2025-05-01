<script setup>
import { defineProps } from 'vue'
import { getI18nTitle } from '@/utils/i18n'
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
</script>

<template>
  <i v-if="icon.includes('el-icon')" class="sub-el-icon" :icon="icon"> </i>
  <svg-icon v-else :icon="icon"></svg-icon>
  <span>{{ getI18nTitle(title) }}</span>
</template>
