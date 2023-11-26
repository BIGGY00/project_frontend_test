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

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
