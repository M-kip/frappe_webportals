import { reactive, computed } from 'vue'
import { useCall } from 'frappe-ui'
import { useRouter } from 'vue-router'


// Define explicit interfaces for type safety
interface UserSession {
  user: string | null
  isLoggedIn: boolean
  patient: Record<string, any> | null
}

export const session = reactive<UserSession>({
  user: (window as any).user?.name || (window as any).user || null,
  // Getter
  get isLoggedIn() {
    return !!this.user && this.user !== 'Guest'
  },
  patient: (window as any).patient || null, // Initialized as null by default
})

export function useSession() {
  const router = useRouter()

  // Define a type/interface for your expected login success response data
interface LoginResponse {
  full_name: string
  message?: string
}
// Initialize the call resource for logging in
const login = useCall({
  url: '/api/method/login',
  method: 'POST',
  immediate: false, // Don't run automatically on mount; wait for user action
  
  // Explicitly set headers to form-urlencoded because Frappe's login endpoint expects form data
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },

  // Triggered automatically on a successful HTTP 200 response
  onSuccess(data: LoginResponse) {
    if (window?.user) {
      window.user.name = data.full_name
    }
    session.user = data.full_name
    
    // Refresh the page so the browser picks up the newly dropped SID cookie
    window.location.reload()
  },
  
  // Triggered if the request fails (e.g., incorrect password or 401 Unauthorized)
  onError(error: any) {
    console.error('Authentication error:', error)
  }
})

// Function bound to your form submit event
function handleLoginSubmit(username: string, password: string) : void {
  // Construct form data using URLSearchParams so it formats as key=value pairs (usr=...&pwd=...)
  const formData = new URLSearchParams()
  formData.append('usr', username)
  formData.append('pwd', password)

  // Pass the form data directly into the resource's submit method
  login.submit(formData)
}


// Dedicated logout resource (no request body/data needed)
const logout = useCall({
  url: '/api/method/logout',
  method: 'POST',
  immediate: false, // Wait for user action to trigger
  
  onSuccess() {
    // Clear global user state if applicable
    if (window?.user) {
      window.user.name = null
    }
    session.user = null 
    
    // Redirect the user back to the login page
    router.push('/login')
  },
  
  onError(error: any) {
    console.error('Logout error:', error)
  }
})

// When the user clicks the logout button, just trigger it cleanly:
// logout.submit()

  return {
    session,
    handleLoginSubmit,
    logout,
  }
}
