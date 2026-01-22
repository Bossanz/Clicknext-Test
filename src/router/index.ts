import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/",
    name: "Dashboard",
    component: () => import("../views/HomeView.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "DepositWithdraw",
        component: () => import("../components/TransactionForm.vue"),
      },
      {
        path: "transaction",
        name: "Transaction",
        component: () => import("../components/TransactionHistory.vue"),
      },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (to.meta.requiresAuth && !isLoggedIn) {
    next("/login");
  } else if (to.path === "/login" && isLoggedIn) {
    next("/");
  } else {
    next();
  }
});

export default router;
