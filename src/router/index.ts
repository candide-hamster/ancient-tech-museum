import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/exhibits',
      name: 'Exhibits',
      component: () => import('../views/ExhibitsView.vue')
    }
  ]
})

export default router 