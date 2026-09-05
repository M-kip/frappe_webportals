<template>
  <div class="flex items-start gap-4 rounded-xl bg-white p-6 shadow-sm">
    <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sky-50">
      <FeatherIcon :name="feature.icon" class="h-6 w-6 text-sky-700" />
    </div>
    <div>
      <h3 class="text-base font-semibold text-gray-900">{{ feature.title }}</h3>
      <p class="mt-2 text-sm leading-relaxed text-gray-600">
        {{ feature.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FeatherIcon } from "frappe-ui";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

defineProps<{
  feature: Feature;
}>();
</script>
