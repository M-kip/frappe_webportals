import { reactive, computed } from 'vue'
import { useCall } from 'frappe-ui'
import { useRouter } from 'vue-router'

// Define explicit interfaces for type safety
interface UserSession {
  user: string | null
  isLoggedIn: boolean
}

export const session = reactive<UserSession>({
  user: window.user?.name || window.user || null, // Initialize from global window object if available
  isLoggedIn: computed(() => !!session.user && session.user !== 'Guest'),
})

export function useSession() {
  const router = useRouter()

  // Dedicated login resource mapping natively to Frappe backend authentication
  const login = useCall({
    url: '/api/v1/method/login', // Resolves directly to /api/v1/method/login
    method: 'POST',
    immediate: false,
    onSuccess(data: any) {
      // Upon successful password validation, the SID cookie drops automatically
      // Re-hydrate session state and route away
      if (window.user) {
        window.user.name = data.full_name
      }
      session.user = data.full_name
      
      // Force page reload or direct routing depending on application requirements
      window.location.reload()
    },
    onError(error: any) {
      console.error('Authentication error:', error)
    }
  })

  // Dedicated logout resource 
  const logout = useCall({
    url: '/api/v1/method/logout', // Resolves directly to /api/method/logout
    method: 'POST',
    immediate: false,
    onSuccess() {
      session.user = null
      router.push('/login')
    }
  })

  return {
    session,
    login,
    logout,
  }
}
