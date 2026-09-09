// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './styles/global.css'
import './styles/layout.css'
import './styles/dashboard.css'
import './styles/submissions.css'
import '@/styles/tickets.css'
import './styles/about.css'
import './styles/components.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
