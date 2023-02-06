import { createRouter, createWebHistory } from 'vue-router'
import SplashView from '../views/SplashView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'splash',
      component: SplashView
    },
    {
      path: '/playerSetup/',
      name: 'playerSetup',
      component: () => import('../views/PlayerSetupView.vue')
    },
    {
      path: '/game/',
      name: 'game',
      component: () => import('../views/GameView.vue')
    },
    {
      path: '/results/',
      name: 'results',
      component: () => import('../views/ResultsView.vue')
    }
  ]
});

export default router
