import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import 'element-plus/lib/theme-chalk/display.css'
import router from './router/index.js'
import store from './store'

createApp(App).use(ElementPlus).use(VueAxios, axios).use(router).use(store).mount('#app')
