import { createRouter, createWebHistory } from 'vue-router'
import PublicPage from '../views/publicPage/PublicIndex.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: PublicPage
  },
  {
    path: '/signup',
    name: 'signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/registration/SignupView.vue')
  },
  {
    path: '/menu/:id',
    name: 'menu',
    component: () => import('../views/menu/MenuIndex.vue'),
    // children: [
    //   {
    //     path: 'menu',
    //     name: 'menu',
    //     component: ()=> import('../views/menu/MenuIndex.vue')
    //   }
    // ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
