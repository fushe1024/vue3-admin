<script setup>
import PanThumb from '@/components/PanThumb/index'
import { useStore } from 'vuex'
const store = useStore()
</script>

<template>
  <div class="author-box">
    <div class="author-info">
      <div class="left">
        <pan-thumb
          width="60px"
          height="60px"
          :image="store.getters.userInfo.avatar"
        >
          <div>Hello</div>
          <div>{{ $t('profile.name') }}</div>
        </pan-thumb>
      </div>
      <div class="right">
        <h2>{{ $t('profile.name') }}</h2>
        <p>{{ $t('profile.job') }}</p>
      </div>
    </div>
    <div class="author-bio">
      {{ $t('profile.Introduction') }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.author-box {
  .author-info {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .left {
      margin-right: 20px;
    }
    .right {
      p {
        font-size: 16px;
      }
    }
  }

  .author-bio {
    text-indent: 2em;
    line-height: 1.5;
    font-size: 16px;
  }
}
</style>
