import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filter from './filters/index'
import './assets/tailwind.css'

const app = createApp(App)
app.use(store).use(router).mount('#app')
app.config.globalProperties.$filters = filter
