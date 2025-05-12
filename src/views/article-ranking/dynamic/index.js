import { ref, watch } from 'vue'
import getDynamicData from './DynamicData'
import { watchSwitchLang } from '@/utils/i18n'

// 动态列的数据
export const dynamicData = ref(getDynamicData())

// 切换语言时重新获取动态列数据, 并默认全部勾选
watchSwitchLang(() => {
  dynamicData.value = getDynamicData()
  defaultCheckedKeys()
})

// 被勾选动态列数据
export const checkedDynamicData = ref([])
// 默认全部勾选
const defaultCheckedKeys = () => {
  checkedDynamicData.value = dynamicData.value.map((item) => {
    return item.prop
  })
}
defaultCheckedKeys()

// 要展示的 table 列数据
export const tableColumns = ref([])

// 监听 checkedDynamicData 变化, 动态更新 tableColumns
watch(
  checkedDynamicData,
  (newCheckedList) => {
    tableColumns.value = dynamicData.value.filter((item) =>
      newCheckedList.includes(item.prop)
    )
  },
  {
    immediate: true
  }
)
