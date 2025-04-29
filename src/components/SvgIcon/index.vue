<script setup>
import { isExternal as external } from '@/utils/validate'
import { defineProps, computed } from 'vue'

const props = defineProps({
  // icon 图标
  icon: {
    type: String,
    required: true
  },
  // 图标类名
  className: {
    type: String,
    default: ''
  }
})

/**
 * 判断是否为外部图标
 */
const isExternal = computed(() => external(props.icon))

/**
 * 外部图标 => 通过背景图的方式引入
 * 通过 mask 的方式引入外部图标
 */
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))

/**
 * 内部图标 => 通过 svg 的方式引入
 * 通过 use 引入 svg 图标
 */
const iconName = computed(() => `#icon-${props.icon}`)
</script>

<template>
  <div inert>
    <!-- 外部图标容器 -->
    <div
      v-if="isExternal"
      :style="styleExternalIcon"
      class="svg-external-icon svg-icon"
      :class="className"
    ></div>
    <!-- Svg 容器 -->
    <svg v-else class="svg-icon" :class="className" focusable="false">
      <use :xlink:href="iconName" />
    </svg>
  </div>
</template>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
