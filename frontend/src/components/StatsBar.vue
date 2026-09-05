<template>
  <section class="bg-sky-700 py-10">
    <div class="container mx-auto px-6 lg:px-8">
      <div class="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
        <div v-for="stat in stats" :key="stat.id" class="text-white">
          <div class="flex items-center justify-center text-3xl font-extrabold sm:text-4xl">
            <FeatherIcon :name="stat.icon" class="mr-2 h-7 w-7 text-sky-200" />
            <span>{{ stat.value }}</span>
          </div>
          <p class="mt-2 text-sm font-medium uppercase tracking-wide text-sky-100">
            {{ stat.label }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { FeatherIcon } from "frappe-ui";

interface Stat {
  id: number;
  value: string;
  label: string;
  icon: string;
}

defineProps<{
  stats: Stat[];
}>();
</script>
