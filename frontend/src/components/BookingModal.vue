<template>
  <Dialog
    v-model="show"
    :options="{
      title: 'Book an Appointment',
      size: 'md',
    }"
  >
    <template #body-content>
      <form class="space-y-4" @submit.prevent="submit">
        <p class="text-sm text-gray-600">
          Fill in your details and we'll get back to you within 24 hours to confirm your visit.
        </p>

        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700">
              Full name <span class="text-red-500">*</span>
            </label>
            <Input
              v-model="form.name"
              type="text"
              placeholder="e.g. Wanjiru Mwangi"
              required
            />
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700">
              Phone <span class="text-red-500">*</span>
            </label>
            <Input
              v-model="form.phone"
              type="tel"
              placeholder="07XX XXX XXX"
              required
            />
          </div>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>
          <Input
            v-model="form.email"
            type="email"
            placeholder="you@example.com"
          />
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700">
              Preferred date
            </label>
            <DatePicker v-model="form.date" placeholder="Pick a date" />
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700">
              Preferred time
            </label>
            <select
              v-model="form.time"
              class="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            >
              <option value="">Any time</option>
              <option value="morning">Morning (8am – 12pm)</option>
              <option value="afternoon">Afternoon (12pm – 4pm)</option>
              <option value="evening">Evening (4pm – 6pm)</option>
            </select>
          </div>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700">
            Service
          </label>
          <select
            v-model="form.service"
            class="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="">Select a service (optional)</option>
            <option value="General Dentistry">General Dentistry</option>
            <option value="Dental Fillings">Dental Fillings</option>
            <option value="Root Canal Therapy">Root Canal Therapy</option>
            <option value="Orthodontics">Orthodontics</option>
            <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
            <option value="Dental Implants">Dental Implants</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700">
            Anything else we should know?
          </label>
          <textarea
            v-model="form.message"
            rows="3"
            placeholder="Tell us about your symptoms, concerns, or questions..."
            class="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          ></textarea>
        </div>
      </form>
    </template>

    <template #actions>
      <div class="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="ghost" @click="show = false">Cancel</Button>
        <Button variant="solid" :loading="submitting" @click="submit">
          Request Appointment
        </Button>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Dialog, Input, DatePicker, Button, toast } from "frappe-ui";

interface BookingForm {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  service: string;
  message: string;
}

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "submitted", payload: BookingForm): void;
}>();

const show = ref(props.modelValue);
const submitting = ref(false);

const form = ref<BookingForm>({
  name: "",
  phone: "",
  email: "",
  date: "",
  time: "",
  service: "",
  message: "",
});

watch(() => props.modelValue, (v) => { show.value = v; });
watch(show, (v) => { emit("update:modelValue", v); });

function reset() {
  form.value = {
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    service: "",
    message: "",
  };
}

function submit() {
  if (!form.value.name.trim() || !form.value.phone.trim()) {
    toast("error", {
      title: "Missing details",
      message: "Please enter your name and phone number so we can reach you.",
    });
    return;
  }
  submitting.value = true;
  // Simulate sending — in production this would call a Frappe API endpoint
  setTimeout(() => {
    submitting.value = false;
    toast("success", {
      title: "Request received!",
      message: "We'll call you within 24 hours to confirm your appointment.",
    });
    emit("submitted", { ...form.value });
    show.value = false;
    reset();
  }, 900);
}
</script>
