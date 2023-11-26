const routes = [
  {
    path: "/",
    component: () => import("layouts/GuestLayout.vue"),
    children: [
      {
        path: "/",
        component: () => import("pages/LoginPage.vue"),
        name: "login",
      },
      {
        path: "/register",
        component: () => import("pages/RegisterPage.vue"),
        name: "register",
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/dashboard",
        component: () => import("pages/DashboardPage.vue"),
        name: "dashboard",
      },
      {
        path: "/products",
        component: () => import("pages/ProductsPage.vue"),
        name: "products",
      },
      {
        path: "/categories",
        component: () => import("pages/CategoriesPage.vue"),
        name: "categories",
      },
      {
        path: "/stocks",
        component: () => import("pages/StocksPage.vue"),
        name: "stocks",
      },
      {
        path: "/reports",
        component: () => import("pages/ReportsPage.vue"),
        name: "reports",
      },
      {
        path: "/addproduct",
        component: () => import("pages/addProductPage.vue"),
        name: "addproduct",
      },
      {
        path: "/editproduct",
        component: () => import("pages/editProductPage.vue"),
        name: "editproduct",
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
