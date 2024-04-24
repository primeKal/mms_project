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
            path: "basic-information",
            name: "basic_information",
            component: () =>
              import("../views/ProfileView/BasicInformationView.vue"),
          },
          {
            path: "visual-branding",
            name: "visual_branding",
            component: () =>
              import("../views/ProfileView/VisualBrandingView.vue"),
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
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
