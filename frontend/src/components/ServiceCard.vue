<template>
  <article class="group flex h-full flex-col rounded-[28px] border border-slate-200 bg-gradient-to-b from-white to-sky-50/40 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_24px_60px_rgba(14,165,233,0.12)]">
    <div class="flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm shadow-sky-100/80" :class="iconClasses">
      <FeatherIcon :name="service.icon || 'activity'" class="h-6 w-6" />
    </div>

    <h3 class="mt-6 text-xl font-bold text-slate-900">{{ service.title }}</h3>
    <p class="mt-3 flex-1 text-sm leading-7 text-slate-600">{{ service.description }}</p>

    <button
      type="button"
      class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 transition-colors hover:text-sky-800"
      @click="$emit('learn-more', service)"
    >
      Learn more
      <FeatherIcon name="arrow-right" class="h-4 w-4" />
    </button>
  </article>
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

const props = defineProps<{ service: Service }>();

defineEmits<{ (event: "learn-more", service: Service): void }>();

const iconClasses = computed(() => {
  const map: Record<string, string> = {
    sky: "bg-sky-100 text-sky-700 ring-1 ring-sky-200",
    blue: "bg-blue-100 text-blue-700 ring-1 ring-blue-200",
    indigo: "bg-indigo-100 text-indigo-700 ring-1 ring-indigo-200",
    cyan: "bg-cyan-100 text-cyan-700 ring-1 ring-cyan-200",
    teal: "bg-teal-100 text-teal-700 ring-1 ring-teal-200",
    purple: "bg-violet-100 text-violet-700 ring-1 ring-violet-200",
  };

  return map[props.service.color] ?? "bg-slate-100 text-slate-700 ring-1 ring-slate-200";
});
</script>
