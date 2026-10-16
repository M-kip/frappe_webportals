import { createRouter, createWebHistory } from 'vue-router'
import { session } from '@/data/session'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: () => import('@/pages/Profile.vue'),
    //meta: { requiresAuth: true }
  },
  {
    path: '/portal',
    name: 'Portal',
    component: () => import('@/views/AppLayout.vue'),
    //meta: { requiresAuth: true },
    // Automatically make dashboard the default view when visiting /portal
    redirect: { name: 'Dashboard' },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/ClientDashboardView.vue'),
      },
      // Placeholder routes for views you haven't built yet
      {
        path: 'appointments',
        name: 'Appointments',
        component: () => import('@/views/PlaceholderView.vue'),
      },
      {
        path: 'history',
        name: 'History',
        component: () => import('@/views/PlaceholderView.vue'),
      },
      {
        path: 'billing',
        name: 'Billing',
        component: () => import('@/views/PlaceholderView.vue'),
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/PlaceholderView.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory('/home'),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const isLoggedIn = session.isLoggedIn

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router