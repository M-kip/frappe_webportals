import { createRouter, createWebHistory, useSessionUser } from 'vue-router'

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
]

let router = createRouter({
  history: createWebHistory('/portal'),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const sessionUser = useSessionUser()
  const isLoggedIn = sessionUser.name && sessionUser.name !== 'Guest'

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
