import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toaster from '@meforma/vue-toaster'
import vClickOutside from 'click-outside-vue3'

import filter from './filters/index'
import './assets/tailwind.css'

const toasterProperties = {
    position: "top"
}

const app = createApp(App)
app.use(store).use(router).use(Toaster,toasterProperties).use(vClickOutside).mount('#app')
app.config.globalProperties.$filter = filter
