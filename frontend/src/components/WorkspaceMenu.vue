<script setup lang="ts">
import { computed, ref } from 'vue'
import { Dropdown, Icon } from 'frappe-ui'

const theme = ref<'light' | 'dark' | 'system'>('system')

// 1. Read boot payload passed from your_app.py
const bootData = ref(window.site_boot?.boot || window.boot || {})
const user = computed(() => bootData.value.user)
const patientData = ref(bootData.value.patient)


const emit = defineEmits([
  'bookAppointment',
  'registerPatient',
  'editProfile',
  'userLogin',
])
function BookAppointment() {
  emit('bookAppointment', true)
}
/* emit event to register patient */
function RegisterPatient() {
  emit('registerPatient', true)
}

function EditProfile() {
  emit('editProfile')
}

function UserLogin(){
  emit('userLogin', true)
}
const userMenuItems = computed(() => [
  {
    icon: 'lucide-user',
    label: 'My Profile',
    onClick: () => EditProfile(),
  },
  {
    icon: 'lucide-layout-grid',
    label: 'Services',
    submenu: [
      {
        label: 'Book Appointment',
        onClick: () => BookAppointment(),
      },
      {
        label: 'Register As a patient',
        onClick: () => RegisterPatient(),
      },
      {
        label: 'Helpdesk',
        onClick: () => UserLogin(),
      },
    ],
  },
  {
    icon: 'lucide-settings',
    label: 'Settings & Members',
    onClick: () => console.log('Settings & Members clicked'),
  },
  {
    icon: 'lucide-moon',
    label: 'Theme',
    submenu: [
      {
        label: 'Light Mode',
        selected: theme.value === 'light',
        onClick: () => {
          theme.value = 'light'
        },
      },
      {
        label: 'Dark Mode',
        selected: theme.value === 'dark',
        onClick: () => {
          theme.value = 'dark'
        },
      },
      {
        label: 'System Default',
        selected: theme.value === 'system',
        onClick: () => {
          theme.value = 'system'
        },
      },
    ],
  },
  {
    group: 'Account',
    options: [
      {
        icon: 'lucide-list-restart',
        label: 'Clear cache',
        onClick: () => console.log('Clear cache clicked'),
      },
      {
        icon: 'lucide-info',
        label: 'About',
        onClick: () => console.log('About clicked'),
      },
      {
        icon: 'lucide-log-out',
        label: 'Log out',
        onClick: () => console.log('Log out clicked'),
      },
      {
        icon: 'lucide-log-out',
        label: 'Log in',
        onClick: () => UserLogin(),
      },
    ],
  },
])
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <Dropdown :options="userMenuItems">
      <template #default="{ open }">
        <button
          class="flex w-56 items-center rounded-5 px-2 py-2 text-left transition-colors"
          :class="open ? 'bg-surface-gray-3' : 'hover:bg-surface-gray-2'"
          size="sm"
        >
          <!-- User logo -->
          <Icon icon="lucide-user-round-cog" class="size-4 text-ink-gray-7" />
          <div class="ml-2 min-w-0">
            <div
              class="truncate text-base-medium text-ink-gray-8 leading-none"
            >
              Settings
            </div>
            <div class="mt-1 truncate text-p-sm text-ink-gray-5 leading-none">
              
            </div>
          </div>
          <span
            class="lucide-chevron-down ml-auto size-4 text-ink-gray-6 transition-transform"
            :class="open ? 'rotate-180' : ''"
          />
        </button>
      </template>

      <template #item-suffix="{ selected }">
        <span
          v-if="selected"
          class="lucide-check size-4 text-ink-gray-7"
          aria-hidden="true"
        />
      </template>
    </Dropdown>
  </div>
</template>