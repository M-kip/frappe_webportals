<template>
  <article class="flex h-full flex-col rounded-[28px] border border-slate-200 bg-white p-6 text-center shadow-sm shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg">
    <div class="mx-auto mb-5 rounded-full border border-sky-100 bg-sky-50 p-1 shadow-sm">
      <Avatar :label="doctor.name" :image="doctor.image" size="xl" />
    </div>

    <h3 class="text-xl font-bold text-slate-900">{{ doctor.name }}</h3>
    <p class="mt-2 text-sm font-semibold text-sky-700">{{ doctor.specialty }}</p>
    <p class="mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">{{ doctor.qualification }}</p>
    <p class="mt-4 flex-1 text-sm leading-7 text-slate-600">{{ doctor.bio }}</p>

    <Button variant="outline" size="sm" class="mt-6 !rounded-xl" @click="bookWithDoctor">
      Book appointment
    </Button>
  </article>
</template>

<script setup lang="ts">
import { Avatar, Button, toast } from "frappe-ui";

interface Doctor {
  name: string;
  specialty: string;
  qualification: string;
  image?: string | null;
  bio: string;
}

defineProps<{ doctor: Doctor }>();

function bookWithDoctor(): void {
  toast("info", {
    title: "Book with dentist",
    message: "Call 0746 721 164 or 0711 842 836 to schedule with this specialist.",
    duration: 4000,
  });
}
</script>
