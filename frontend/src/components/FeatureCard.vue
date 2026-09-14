<template>
  <article class="rounded-[26px] border border-slate-700/60 bg-slate-800/70 p-6 shadow-sm shadow-slate-950/10 backdrop-blur-sm transition-all duration-300 hover:border-sky-400/50 hover:shadow-lg hover:shadow-sky-950/20">
    <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-300 ring-1 ring-sky-400/20">
      <FeatherIcon :name="feature.icon" class="h-5 w-5" />
    </div>
    <h3 class="mt-5 text-xl font-bold text-white">{{ feature.title }}</h3>
    <p class="mt-3 text-sm leading-7 text-slate-300">{{ feature.description }}</p>
  </article>
</template>

<script setup lang="ts">
import { FeatherIcon } from "frappe-ui";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

defineProps<{ feature: Feature }>();
</script>

