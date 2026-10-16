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
  },
  {
    path: '/portal',
    name: 'Portal',
    component: () => import('@/views/AppLayout.vue'),
  },

]

let router = createRouter({
  history: createWebHistory('/portal'),
  routes,
})

router.beforeEach(async (to, from, next) => {
  //const sessionUser = session.user || { name: 'Guest' }
  const isLoggedIn = session.isLoggedIn

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
