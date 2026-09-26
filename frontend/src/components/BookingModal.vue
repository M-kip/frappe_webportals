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
          <FormControl
            v-model="form.name"
            type="text"
            label="Full name"
            placeholder="e.g. Wanjiru Mwangi"
            required
          />

          <FormControl
            v-model="form.phone"
            type="text"
            label="Phone"
            placeholder="07XX XXX XXX"
            required
          />
        </div>

        <FormControl
          v-model="form.email"
          type="email"
          label="Email"
          placeholder="you@example.com"
        />

        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700">
              Preferred date
            </label>
            <DatePicker v-model="form.date" placeholder="Pick a date" />
          </div>

          <FormControl
            v-model="form.time"
            type="select"
            label="Preferred time"
            :options="[
              { label: 'Any time', value: '' },
              { label: 'Morning (8am – 12pm)', value: 'morning' },
              { label: 'Afternoon (12pm – 4pm)', value: 'afternoon' },
              { label: 'Evening (4pm – 6pm)', value: 'evening' },
            ]"
          />
        </div>

        <FormControl
          v-model="form.service"
          type="select"
          label="Service"
          :options="[
            { label: 'Select a service (optional)', value: '' },
            { label: 'General Dentistry', value: 'General Dentistry' },
            { label: 'Dental Fillings', value: 'Dental Fillings' },
            { label: 'Root Canal Therapy', value: 'Root Canal Therapy' },
            { label: 'Orthodontics', value: 'Orthodontics' },
            { label: 'Cosmetic Dentistry', value: 'Cosmetic Dentistry' },
            { label: 'Dental Implants', value: 'Dental Implants' },
            { label: 'Other', value: 'Other' },
          ]"
        />

        <FormControl
          v-model="form.message"
          type="textarea"
          label="Anything else we should know?"
          placeholder="Tell us about your symptoms, concerns, or questions..."
          :rows="3"
        />
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
import { Dialog, FormControl, DatePicker, Button, toast } from "frappe-ui";

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
    toast.error({
      title: "Missing details",
      message: "Please enter your name and phone number so we can reach you.",
    });
    return;
  }
  submitting.value = true;
  
  setTimeout(() => {
    submitting.value = false;
    toast.success({
      title: "Request received!",
      message: "We'll call you within 24 hours to confirm your appointment.",
    });
    emit("submitted", { ...form.value });
    show.value = false;
    reset();
  }, 900);
}
</script>