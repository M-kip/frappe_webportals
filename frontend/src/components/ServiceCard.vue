<template>
  <div class="group relative flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-sky-200 hover:shadow-md">
    <div
      class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg transition-colors"
      :class="colorClasses"
    >
      <!-- FeatherIcon uses null width/height internally, so use explicit w/h -->
      <FeatherIcon :name="service.icon || 'activity'" class="w-6 h-6" />
    </div>
    <h3 class="text-lg font-semibold text-gray-900">{{ service.title }}</h3>
    <p class="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
      {{ service.description }}
    </p>
    <button
      class="mt-4 flex items-center gap-1 text-sm font-medium text-sky-700 transition-colors hover:text-sky-900"
      @click="$emit('learn-more', service)"
    >
      Learn more
      <FeatherIcon name="arrow-right" class="w-4 h-4" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { FeatherIcon } from "frappe-ui";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const props = defineProps<{
  service: Service;
}>();

defineEmits<{
  (e: "learn-more", service: Service): void;
}>();

const colorClasses = computed(() => {
  const map: Record<string, string> = {
    sky: "bg-sky-50 text-sky-700",
    blue: "bg-blue-50 text-blue-700",
    indigo: "bg-indigo-50 text-indigo-700",
    purple: "bg-purple-50 text-purple-700",
    pink: "bg-pink-50 text-pink-700",
    teal: "bg-teal-50 text-teal-700",
  };
  return map[props.service.color] ?? "bg-gray-50 text-gray-700";
});
</script>