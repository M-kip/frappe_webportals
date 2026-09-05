<template>
  <div class="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
    <div class="flex items-center gap-1 mb-4">
      <FeatherIcon
        v-for="i in 5"
        :key="i"
        name="star"
        class="h-4 w-4 fill-amber-400 text-amber-400"
      />
    </div>
    <blockquote class="flex-1 text-sm leading-relaxed text-gray-700 italic">
      "{{ testimonial.quote }}"
    </blockquote>
    <div class="mt-4 flex items-center gap-3 border-t border-gray-100 pt-4">
      <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-800">
        {{ testimonial.avatar }}
      </div>
      <div>
        <p class="text-sm font-semibold text-gray-900">{{ testimonial.name }}</p>
        <p class="text-xs text-gray-500">{{ testimonial.role }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FeatherIcon } from "frappe-ui";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

defineProps<{
  testimonial: Testimonial;
}>();
</script>
