<template>
  <section class="border-y border-gray-200 bg-white py-8">
    <div class="container mx-auto px-6 lg:px-8">
      <div class="flex flex-col items-center gap-6 md:flex-row md:justify-between">
        <div class="flex items-center gap-3 text-center md:text-left">
          <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sky-50">
            <FeatherIcon name="shield" class="h-5 w-5 text-sky-700" />
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-900 sm:text-base">
              Insurance & Payment
            </h3>
            <p class="text-xs text-gray-600 sm:text-sm">
              We accept most major insurance providers and offer flexible payment plans.
            </p>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <span
            v-for="provider in providers"
            :key="provider"
            class="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm sm:px-4 sm:text-sm"
          >
            <FeatherIcon name="check" class="mr-1.5 h-3.5 w-3.5 text-green-600 sm:h-4 sm:w-4" />
            {{ provider }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { FeatherIcon } from "frappe-ui";

defineProps<{
  providers: string[];
}>();
</script>
