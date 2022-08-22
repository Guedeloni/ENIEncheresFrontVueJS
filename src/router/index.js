import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/inscription',
      name: 'inscription',
      component: () => import("@/views/Inscription.vue")
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("@/views/Login.vue")
    },
    {
      path: '/vente-article',
      name: 'vente-article',
      component: () => import("@/views/VenteArticle.vue")
    },
    {
      path: '/profil',
      name: 'profil',
      component: () => import("@/views/Profil.vue")
    },
    // Redirect 404
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFound.vue")
    }
  ]
})

export default router
