// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../pages/Dashboard.vue'
import Submissions from '../pages/Submissions.vue'
import Tickets from '../pages/Tickets.vue'
import About from '../pages/About.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/submissions', name: 'Submissions', component: Submissions },
  { path: '/tickets', name: 'Tickets', component: Tickets },
  { path: '/about', name: 'About', component: About },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
