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
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
      // AU DESSUS 
      // Ecriture permettant de split le code
      // càd ne vas chargé le component seulement au moment ou la route est utilisé
      // Permet de ne pas sucharger le cache de l'appli
    },
    {
      path:'/bills',
      name: 'bills',
      props: true,
      component: () => import('../views/BillsView.vue')
    },
    {
      path:'/bill/:id',
      name: 'bill',
      props: true,
      component: () => import('../views/BillView.vue')
    },
    {
      path:'/users',
      name: 'users',
      props: true,
      component: ()=>import('../views/UsersView.vue')
    },
    {
      path:'/users/:id',
      name: 'user',
      props: true,
      component: ()=>import('../views/UserView.vue')
    },
    // TOUJOURS en dernier
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundViews.vue')
    }
  ]
})

export default router
