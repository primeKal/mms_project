import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MainView from '../views/MainView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    component: MainView,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('../views/DashboardView/DashbordIndex.vue')
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('../views/ProfileView/ProfileIndex.vue'),
        children:[
          {
            path: 'basic-information',
            name: 'basic_information',
            component: () => import('../views/ProfileView/BasicInformationView.vue'),
          },
          {
            path: 'visual-branding',
            name: 'visual_branding',
            component: () => import('../views/ProfileView/VisualBrandingView.vue')
          },
          {
            path: 'operation-hours',
            name: 'operation_hours',
            component: () => import('../views/ProfileView/OperationHoursView.vue')
          },
          {
            path: 'cusine-specialty',
            name: 'cusine_speciality',
            component: () => import('../views/ProfileView/CusineSpecialtyView.vue')
          },
          {
            path: 'image-gallery',
            name: 'image_gallery',
            component: () => import('../views/ProfileView/ImageGalleryView.vue')
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
