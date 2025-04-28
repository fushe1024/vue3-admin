// 完整引入 ElementPlus
import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'
// 引入 ElementPlus 的中文语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// 设置 ElementPlus 的语言
export default (app) => {
  app.use(ElementPlus, { locale: zhCn })
}
