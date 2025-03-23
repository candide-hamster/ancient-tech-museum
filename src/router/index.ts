import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/exhibit/:id',
    name: 'ExhibitDetail',
    component: () => import('../views/ExhibitDetail.vue')
  },
  {
    path: '/ar-view/:id',
    name: 'ARView',
    component: () => import('../views/ARView.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
}) 