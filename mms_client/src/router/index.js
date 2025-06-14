import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RegistrationView from "../views/RegistrationView";
import MainView from "../views/MainView.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/registration",
    name: "registration",
    component: RegistrationView,
  },
  {
    path: "/home",
    name: "home",
    component: MainView,
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("../views/DashboardView/DashbordIndex.vue"),
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("../views/ProfileView/ProfileIndex.vue"),
        children: [
          {
            path: "company-information",
            name: "company_information",
            component: () =>
              import("../views/ProfileView/BasicInformationView.vue"),
          },
          {
            path: "users",
            name: "users",
            component: () => import("../views/ProfileView/UsersView.vue"),
          },
          {
            path: "visual-branding",
            name: "visual_branding",
            component: () =>
              import("../views/ProfileView/VisualBrandingView.vue"),
          },
          {
            path: "billing_information",
            name: "billing_information",
            component: () =>
              import("../views/ProfileView/BillingInformationView.vue"),
          },
          {
            path: "operation-hours",
            name: "operation_hours",
            component: () =>
              import("../views/ProfileView/OperationHoursView.vue"),
          },
          {
            path: "cusine-specialty",
            name: "cusine_speciality",
            component: () =>
              import("../views/ProfileView/CusineSpecialtyView.vue"),
          },
          {
            path: "image-gallery",
            name: "image_gallery",
            component: () =>
              import("../views/ProfileView/ImageGalleryView.vue"),
          },
        ],
      },
      {
        path: "products",
        name: "products",
        component: () =>
          import("../views/ProductsView/ProductView.vue"),
      },
      {
        path: "menu-management",
        name: "menu_management",
        component: () =>
          import("../views/MenuMangementView/MenuManagementIndex.vue"),
      },
      {
        path: "edit-menu/:name",
        name: "edit_menu",
        component: () => import("../views/MenuMangementView/EditMenuView.vue"),
      },
      {
        path: "table-management",
        name: "table_management",
        component: () =>
          import("../views/TableManagementView/TableManagementView.vue"),
      },
      {
        path: "order-processing",
        name: "order_processing",
        component: () =>
          import("../views/OrderProcessingView/OrderProcessingIndex.vue"),
      },
      {
        path: "payments",
        name: "payments",
        component: () =>
          import("../views/PaymentView/PaymentView.vue"),
      },
      {
        path: "methods",
        name: "methods",
        component: () =>
          import("../views/MethodView/MethodView.vue"),
      },
      {
        path: '/items',
        name: 'items',
        component: () => import('@/views/ItemsView/ItemsView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Items Management'
        }
      },
      {
        path: '/procurement',
        name: 'procurement',
        component: () => import('@/views/ProcurementView/ProcurementView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Procurement Management'
        }
      },
      {
        path: '/inventory',
        name: 'inventory',
        component: () => import('@/views/InventoryView/index.vue'),
        meta: {
          requiresAuth: true,
          title: 'Inventory Management'
        }
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
