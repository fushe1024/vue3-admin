<script setup>
import ContextMenu from './ContextMenu.vue'
import { CircleClose } from '@element-plus/icons-vue'
import { watchSwitchLang } from '@/utils/i18n'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ref, watch } from 'vue'
const store = useStore()
const route = useRoute()

/**
 * 判断是否是当前激活的标签
 * @param {*} tag 标签
 */
const isActive = (tag) => {
  return tag.path === route.path
}

/**
 * 关闭标签
 * @param {*} tag 标签
 */
const closeClick = (tag) => {
  store.commit('app/delTagView', tag.path)
}

/**
 * 监听语言切换
 * @param {*} callback 回调函数
 */
watchSwitchLang(() => {
  store.commit('app/changeTagsTitle')
})

const visible = ref(false)
const selectIndex = ref(-1)
const menuStyle = ref({
  left: 0,
  top: 0
})

/**
 * 打开右键菜单
 * @param {*} event 事件
 * @param {*} index 索引
 */
const openMenu = ({ clientX, clientY }, index) => {
  menuStyle.value = {
    left: clientX + 'px',
    top: clientY + 'px'
  }
  selectIndex.value = index
  visible.value = true
}

/**
 * 关闭右键菜单
 */
const closeMenu = () => {
  visible.value = false
}

/**
 * 监听右键菜单是否显示
 * 如果显示，点击body关闭右键菜单
 * 如果隐藏，点击body移除事件监听
 */
watch(visible, (val) => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})
</script>

<template>
  <div class="tags-view-container">
    <router-link
      class="tag-item"
      :class="{ active: isActive(tag) }"
      :style="{
        backgroundColor: isActive(tag) ? store.getters.cssVar.menuBg : '',
        border: isActive(tag) ? store.getters.cssVar.menuBg : ''
      }"
      v-for="(tag, index) in store.getters.tagViewList"
      :key="tag.path"
      :to="tag.fullPath"
      @contextmenu.prevent="openMenu($event, index)"
    >
      {{ tag.title }}
      <el-icon
        class="close-icon"
        v-show="!isActive(tag)"
        @click.prevent.stop="closeClick(tag)"
        ><CircleClose
      /></el-icon>
    </router-link>

    <!-- 右键菜单 -->
    <context-menu
      v-show="visible"
      :style="menuStyle"
      :index="selectIndex"
      @close-menu="closeMenu"
    />
  </div>
</template>

<style scoped lang="scss">
.tags-view-container {
  height: 34px;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;
  padding: 0 15px;

  // 标签项
  .tag-item {
    height: 26px;
    line-height: 26px;
    color: #495060;
    background-color: #fff;
    border: 1px solid #d8dce5;
    font-size: 12px;
    cursor: pointer;
    padding: 0 8px;
    margin-right: 5px;
    display: flex;
    align-items: center;

    // 激活
    &.active {
      color: #fff;
      &::before {
        content: '';
        background-color: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 4px;
      }
    }

    .close-icon {
      margin-left: 3px;
    }
  }
}
</style>
