<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { 
  DesktopShell, 
  MobileShell, 
  Sidebar, 
  SidebarHeader, 
  SidebarItem, 
  MobileNav, 
  MobileNavItem, 
  PageHeaderMobile,
  PageHeader,
  Button,
  SidebarRail,
  SidebarRailItem,
} from 'frappe-ui'
import PatientRegistrationModal from "@/components/PatientRegistrationModal.vue";
import AppointmentForm from "@/components/AppointmentForm.vue";
const router = useRouter()
const route = useRoute()
const patientRegistrationOpen = ref(false);
const appointmentFormOpen = ref(false);
const position = ref('design')
const positions = [
  { id: 'DESK', initials: 'DSK' },
]
// Window width tracker for automatic shell toggling
const windowWidth = ref(window.innerWidth)
const updateWidth = () => { windowWidth.value = window.innerWidth }

onMounted(() => window.addEventListener('resize', updateWidth))
onUnmounted(() => window.removeEventListener('resize', updateWidth))

const isMobile = computed(() => windowWidth.value < 768)

// Helper to check active route matching
const isActive = (name: string) => route.name === name

const navigateTo = (name: string) => {
  router.push({ name })
}
function goToDesk() {
  window.location.href = '/desk'
}
function registerPatient() {
  patientRegistrationOpen.value = true;
}
function bookAppointment() {
  appointmentFormOpen.value = true;
}
</script>

<template>
  <div class="h-screen w-screen overflow-hidden bg-surface-base">
    
    <!-- MOBILE SHELL -->
    <MobileShell v-if="isMobile">
      <PageHeaderMobile>
        <span class="text-base font-semibold text-ink-gray-8">Flair Smile Dental</span>
      </PageHeaderMobile>
      
      <!-- Dynamic Routed View Renders Here -->
      <router-view />

      <template #nav>
        <MobileNav>
          <MobileNavItem label="Dashboard" icon="lucide-layout-dashboard" @click="navigateTo('Dashboard')" />
          <MobileNavItem label="Appointments" icon="lucide-calendar" @click="navigateTo('Appointments')" />
          <MobileNavItem label="Billing" icon="lucide-receipt" @click="navigateTo('Billing')" />
          <MobileNavItem label="Settings" icon="lucide-settings" @click="navigateTo('Settings')" />
        </MobileNav>
      </template>
    </MobileShell>

    <!-- DESKTOP SHELL (:scroll="false" keeps panes scrolling independently) -->
    <DesktopShell v-else :scroll="false">
      <template #rail>
        <SidebarRail class="border-r">
          <SidebarRailItem 
            label="Home"
            variant="ghost"
            icon="lucide-house"
            :active="isActive('Home')"
            @click="navigateTo('Home')" 
          />
          <SidebarRailItem 
            label="Desk"
            variant="ghost"
            icon="lucide-layout-dashboard"
            @click="goToDesk"
          />
        </SidebarRail>
      </template>
      <template #sidebar>
        <Sidebar class="border-r" width="16rem" :collapsible="false">
          <SidebarHeader title="Flair Smile" subtitle="Patient Portal" />
          <div class="flex-1 overflow-y-auto space-y-0.5 px-2 pb-2 pt-2">
            <SidebarItem 
              label="Dashboard" 
              icon="lucide-layout-dashboard" 
              :active="isActive('Dashboard')" 
              @click="navigateTo('Dashboard')" 
            />
            <SidebarItem 
              label="Appointments" 
              icon="lucide-calendar" 
              :active="isActive('Appointments')" 
              @click="navigateTo('Appointments')" 
            />
            <SidebarItem 
              label="Dental History" 
              icon="lucide-activity" 
              :active="isActive('History')" 
              @click="navigateTo('History')" 
            />
            <SidebarItem 
              label="Billing & Invoices" 
              icon="lucide-receipt" 
              :active="isActive('Billing')" 
              @click="navigateTo('Billing')" 
            />
            <SidebarItem 
              label="Settings" 
              icon="lucide-settings" 
              :active="isActive('Settings')" 
              @click="navigateTo('Settings')" 
            />
          </div>
        </Sidebar>
      </template>

      <!-- Pinned Page Header -->
      <PageHeader>
        <span class="text-lg font-semibold text-ink-gray-8">Patient Portal</span>
        <div class="ml-auto flex gap-2">
          <Button variant="solid" icon-left="lucide-plus" label="Book Appointment" @click="bookAppointment" />
          <Button variant="solid" icon-left="lucide-plus" label="Register" @click="registerPatient" />
        </div>
      </PageHeader>

      <!-- Routed Page Container -->
      <router-view />
      <PatientRegistrationModal v-model="patientRegistrationOpen" />
      <AppointmentForm v-model="appointmentFormOpen" />
    </DesktopShell>

  </div>
</template>