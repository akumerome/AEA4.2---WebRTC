import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LlistaConnexionsView from '../views/LlistaConnexionsView.vue'
import ConnexioView from '../views/ConnexioView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/llista_connexions',
      name: 'llista_connexions',
      component: LlistaConnexionsView
    },
    {
      path: '/sala_connexio',
      name: 'sala_connexio',
      component: ConnexioView
    }
  ]
})

export default router
