import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import './assets/styles/global.css'

const app = createApp(App)
const pinia = createPinia()

// 创建i18n实例
const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  messages: {
    zh: {
      // 这里将来添加中文翻译
    }
  }
})

app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app') 