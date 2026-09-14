<template>
  <article class="flex h-full flex-col rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
    <div class="flex items-center gap-1 text-amber-400">
      <FeatherIcon v-for="i in 5" :key="i" name="star" class="h-4 w-4 fill-current" />
    </div>

    <blockquote class="mt-5 flex-1 text-base leading-8 text-slate-700">
      “{{ testimonial.quote }}”
    </blockquote>

    <div class="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
      <div class="flex h-11 w-11 items-center justify-center rounded-full bg-sky-100 text-sm font-black text-sky-700">
        {{ testimonial.avatar }}
      </div>
      <div>
        <p class="text-sm font-bold text-slate-900">{{ testimonial.name }}</p>
        <p class="text-xs uppercase tracking-[0.14em] text-slate-500">{{ testimonial.role }}</p>
      </div>
    </div>
  </article>
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

defineProps<{ testimonial: Testimonial }>();
</script>

