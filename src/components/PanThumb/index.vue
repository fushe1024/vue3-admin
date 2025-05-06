<script setup>
import { defineProps } from 'vue'

defineProps({
  image: {
    type: String,
    rquired: true
  },
  zIndex: {
    type: Number,
    default: 1
  },
  height: {
    type: String,
    default: '150px'
  },
  width: {
    type: String,
    default: '150px'
  }
})
</script>

<template>
  <div
    class="pan-box"
    :style="{ zIndex: zIndex, height: height, width: width }"
  >
    <div class="pan-info">
      <div class="pan-info-roles-container">
        <slot></slot>
      </div>
    </div>

    <div class="pan-thumb" :style="{ backgroundImage: `url(${image})` }"></div>
  </div>
</template>

<style scoped lang="scss">
.pan-box {
  position: relative;
  display: inline-block;

  // 信息
  .pan-info {
    position: absolute;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.05);

    .pan-info-roles-container {
      padding: 20px;
      text-align: center;
    }
  }

  // 头像
  .pan-thumb {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    overflow: hidden;
    position: absolute;
    transform-origin: 95% 40%;
    transition: all 0.3s ease-in-out;
  }

  &:hover .pan-thumb {
    transform: rotate(-110deg);
  }
}
</style>
