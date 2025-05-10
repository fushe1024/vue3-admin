import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'
import store from './store'
import router from './router'
import i18n from './i18n'
import './permission'
import installElementPlus from './plugins/element'
import instailSvgIcon from './icons'
import instailDirectives from './directives'

// 创建 vue 实例
const app = createApp(App)

// 注册 element plus 组件
installElementPlus(app)

// 注册 Scg-Icon 图标组件
instailSvgIcon(app)

// 注册自定义指令
instailDirectives(app)

app.use(store).use(router).use(i18n)

app.mount('#app')
