<script setup lang="ts">
import { Button } from 'frappe-ui'
</script>

<template>
  <div class="flex h-full flex-col items-center justify-center p-12 text-center space-y-3 bg-surface-white rounded-lg border border-outline-gray-1">
    <h3 class="text-lg font-semibold text-ink-gray-8">Module Coming Soon</h3>
    <p class="text-sm text-ink-gray-5 max-w-sm">This section of the Flair Smile Dental client portal is currently under active development.</p>
    <Button variant="solid" label="Back to Dashboard" @click="$router.push({ name: 'Dashboard' })" />
  </div>
</template>