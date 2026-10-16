<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { DesktopShell, MobileShell, Sidebar, SidebarHeader, SidebarItem, MobileNav, MobileNavItem } from 'frappe-ui'

// 1. Reactive window width tracker
const windowWidth = ref(window.innerWidth)
const updateWidth = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => window.addEventListener('resize', updateWidth))
onUnmounted(() => window.removeEventListener('resize', updateWidth))

// 2. Automatically determine if the viewport is mobile (< 768px)
const isMobile = computed(() => windowWidth.value < 768)
</script>

<template>
  <div class="h-screen w-screen overflow-hidden bg-surface-base">
    
    <!-- MOBILE SHELL (Automatically rendered on small screens) -->
    <MobileShell v-if="isMobile">
      <router-view />
      <template #nav>
        <MobileNav>
          <MobileNavItem label="Appointments" icon="lucide-calendar" :route="{ name: 'Appointments' }" />
          <MobileNavItem label="Billing" icon="lucide-receipt" :route="{ name: 'Billing' }" />
          <MobileNavItem label="Settings" icon="lucide-settings" :route="{ name: 'Settings' }" />
        </MobileNav>
      </template>
    </MobileShell>

    <!-- DESKTOP SHELL (Automatically rendered on wider screens) -->
    <DesktopShell v-else :scroll="false">
      <template #sidebar>
        <Sidebar class="border-r" width="16rem">
          <SidebarHeader title="Flair Smile" subtitle="Dental Care Portal" />
          <div class="flex-1 overflow-y-auto space-y-0.5 px-2 pb-2">
            <SidebarItem label="Dashboard" icon="lucide-layout-dashboard" :route="{ name: 'Dashboard' }" />
            <SidebarItem label="Appointments" icon="lucide-calendar" :route="{ name: 'Appointments' }" />
            <SidebarItem label="Patients" icon="lucide-users" :route="{ name: 'Patients' }" />
            <SidebarItem label="Billing" icon="lucide-receipt" :route="{ name: 'Billing' }" />
            <SidebarItem label="Settings" icon="lucide-settings" :route="{ name: 'Settings' }" />
          </div>
        </Sidebar>
      </template>

      <!-- Routed page content -->
      <router-view />
    </DesktopShell>

  </div>
</template>