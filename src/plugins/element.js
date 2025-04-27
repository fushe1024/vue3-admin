// 完整引入 ElementPlus
import ElementPlus from 'element-plus'
// 完整引入 ElementPlus 图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'element-plus/dist/index.css'
// 引入 ElementPlus 的中文语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// 设置 ElementPlus 的语言
export default (app) => {
  app.use(ElementPlus, {
    locale: zhCn
  })
  // 遍历所有图标并注册组件
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
