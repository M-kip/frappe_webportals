<template>
  <Dialog
    v-model:open="show"
    title="User Login"
    size="sm"
    class="z-40"
    icon="lucide-user"
    theme="blue"
  >
    <form id="login-form" class="space-y-4 py-2" @submit.prevent="handleLogin">
      <div class="space-y-1">
        <h2 class="text-lg-semibold text-ink-gray-9 uppercase">Log In</h2>
        <p class="text-p-sm text-ink-gray-6">
          Enter your credentials to access your account.
        </p>
      </div>

      <div 
        v-if="errorMessage" 
        class="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600 border border-red-200"
      >
        {{ errorMessage }}
      </div>

      <FormControl
        v-model="form.username"
        label="Username"
        type="text"
        placeholder="Enter your username"
        required
      />

      <FormControl
        v-model="form.password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        required
      />
    </form>

    <template #actions>
      <div class="flex justify-end gap-2">
        <Button
          variant="solid"
          theme="blue"
          type="submit"
          form="login-form"
          :loading="loginCall.loading"
        >
          {{ loginCall.loading ? 'LOGGING IN...' : 'LOG IN' }}
        </Button>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useCall, Dialog, FormControl, Button, toast } from 'frappe-ui'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{(e: 'update:modelValue', value: boolean): void}>()

const show = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const errorMessage = ref('')
const form = reactive({
  username: '',
  password: ''
})

const loginCall = useCall({
  url: '/api/v2/method/login',
  method: 'POST',
  immediate: false,
  onError(error: any) {
    const message = error.messages?.[0] || error.message || 'Authentication failed'
    errorMessage.value = message
    toast.error(message)
  }
})

async function handleLogin() {
  errorMessage.value = ''
  
  try {
    // submit() returns the response data directly
    const res = await loginCall.submit({
      usr: form.username,
      pwd: form.password
    })
    console.log('Login response:', loginCall.data)
    if (res?.message === "Logged In") {
      toast.success(`${res.full_name || 'User'} logged in successfully!`)
      window.location.href = res.home_page || '/portal'
    } else {
      errorMessage.value = res?.message || 'Invalid username or password'
      toast.warning(errorMessage.value)
    }
  } catch (err: any) {
    // HTTP non-200 or network errors are caught here and by onError()
    if (!errorMessage.value) {
      errorMessage.value = err.message || 'Login failed'
    }
  }
}
</script>