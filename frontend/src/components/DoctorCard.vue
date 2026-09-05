<template>
  <div class="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all hover:border-sky-200 hover:shadow-md">
    <Avatar
      :label="doctor.name"
      :image="doctor.image"
      size="xl"
      class="mb-4"
    />
    <h3 class="text-lg font-semibold text-gray-900">{{ doctor.name }}</h3>
    <p class="mt-1 text-sm font-medium text-sky-700">{{ doctor.specialty }}</p>
    <p class="mt-2 text-xs text-gray-500">{{ doctor.qualification }}</p>
    <p class="mt-3 text-sm leading-relaxed text-gray-600">
      {{ doctor.bio }}
    </p>
    <Button
      variant="outline"
      class="mt-4 w-full"
      size="sm"
      @click="bookWithDoctor"
    >
      Book Appointment
    </Button>
  </div>
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

defineProps<{
  doctor: Doctor;
}>();

function bookWithDoctor(): void {
  toast("info", {
    title: "Book with Doctor",
    message: `Call +254 700 123 456 to schedule with this dentist.`,
    duration: 4000,
  });
}
</script>
