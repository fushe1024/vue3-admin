<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()

const props = defineProps({
  index: {
    type: Number,
    required: true
  }
})

// 刷新页面
const router = useRouter()
const refreshClick = () => {
  router.go(0)
}

// 关闭右侧
const closeRightClick = () => {
  store.commit('app/delRightTagView', props.index)
}

// 关闭其他
const closeOtherClick = () => {
  store.commit('app/delOtherTagView', props.index)
}
</script>

<template>
  <ul class="context-menu">
    <li @click="refreshClick">
      {{ $t('tagsView.refresh') }}
    </li>
    <li @click="closeRightClick">
      {{ $t('tagsView.closeRight') }}
    </li>
    <li @click="closeOtherClick">
      {{ $t('tagsView.closeOther') }}
    </li>
  </ul>
</template>

<style scoped lang="scss">
.context-menu {
  position: fixed;
  background-color: #fff;
  z-index: 999;
  list-style: none;
  padding: 5px 0;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

  li {
    padding: 7px 16px;
    cursor: pointer;

    &:hover {
      background-color: #eee;
    }
  }
}
</style>
