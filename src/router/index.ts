import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// 1. กำหนดหน้าต่างๆ ของแอป
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: true }, // หน้าที่ต้อง Login ก่อนถึงจะเข้าได้
    children: [
      {
        path: '',
        name: 'DepositWithdraw',
        component: () => import('../components/TransactionForm.vue')
      },
      {
        path: 'transaction',
        name: 'Transaction',
        component: () => import('../components/TransactionHistory.vue')
      }
    ]
  },
  // ถ้าพิมพ์ URL มั่วให้เด้งไปหน้าแรก
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 2. ระบบ Navigation Guard (กันคนแอบเข้าหน้าหลัก และเช็คสถานะตอน Refresh) 
router.beforeEach((to, from, next) => {
  // เช็คสถานะการ Login จาก localStorage (โจทย์อนุญาตให้แยกจาก Store) [cite: 15]
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

  if (to.meta.requiresAuth && !isLoggedIn) {
    // ถ้าจะเข้าหน้า Dashboard แต่ยังไม่ได้ Login ให้เด้งไปหน้า Login
    next('/login')
  } else if (to.path === '/login' && isLoggedIn) {
    // ถ้า Login อยู่แล้วแต่จะพยายามเข้าหน้า Login ให้เด้งไปหน้า Dashboard
    next('/')
  } else {
    next()
  }
})

export default router