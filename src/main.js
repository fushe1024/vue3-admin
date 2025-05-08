import { createApp } from 'vue'
import installElementPlus from './plugins/element'
import instailSvgIcon from '@/icons'
import instailDirectives from './directives'
import './styles/index.scss'
import i18n from './i18n'

import App from './App.vue'
import router from './router'
import store from './store'
import './permission'

const app = createApp(App)

installElementPlus(app)
instailSvgIcon(app)
instailDirectives(app)

app.use(store).use(router).use(i18n)

app.mount('#app')
