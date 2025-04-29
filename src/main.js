import { createApp } from 'vue'
import i18n from './i18n'
import App from './App.vue'
import router from './router'
import store from './store'
import './permission'

// 导入全局样式
import './styles/index.scss'
// 导入 Element Plus
import installElementPlus from './plugins/element'
// 导入 svgIcon
import instailSvgIcon from '@/icons'

const app = createApp(App)

// 安装 Element Plus & svgIcon
installElementPlus(app)
instailSvgIcon(app)

app.use(store).use(router)

app.use(i18n)

app.mount('#app')
