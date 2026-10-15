<template>
  <Dialog
    v-model:open="show"
    title="Book Patient Appointment"
    message="Please fill in your appointment details make sre you have signed up as a patient"
    aria-label="Book Patient Appointment"
    size="lg"
    class="z-40"
    icon="lucide-calendar-plus size-9"
    theme="blue"
    :padding-top="90"
  >
    <form class="space-y-5" @submit.prevent="handleSubmit">
      <!-- Step Indicator -->
      <div class="flex items-center justify-between gap-3">
        <div>
          <p class="text-sm font-semibold text-gray-900">
            {{ currentStep }}. {{ steps[currentStep - 1].title }}
          </p>
          <p class="text-xs text-gray-500">Step {{ currentStep }} of {{ steps.length }}</p>
        </div>
        <div class="flex gap-1.5" aria-label="Booking progress">
          <span
            v-for="step in steps"
            :key="step.number"
            class="h-1.5 w-8 rounded-full"
            :class="step.number <= currentStep ? 'bg-blue-600' : 'bg-gray-200'"
          />
        </div>
      </div>

      <!-- Step 1: Patient Details -->
      <div v-if="currentStep === 1" class="space-y-5">
        <p class="text-sm text-gray-600">
          Enter the Patient ID for this appointment booking. Fields marked with <span class="text-red-500">*</span> are required.
        </p>

        <FormControl
          v-model="newAppointment.doc.patient"
          type="text"
          label="Patient ID *"
          placeholder="e.g. PID-00001"
          required
        />
      </div>

      <!-- Step 2: Practitioner & Schedule -->
      <div v-if="currentStep === 2" class="space-y-5">
        <p class="text-sm text-gray-600">
          Select a practitioner and date to view available booking slots.
        </p>

        <div class="grid gap-4 sm:grid-cols-2">
          <FormControl
            v-model="newAppointment.doc.practitioner"
            type="select"
            label="Practitioner *"
            :options="practitionerOptions"
            placeholder="Select Healthcare Practitioner"
            required
            @change="onPractitionerOrDateChange"
          />

          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700">
              Appointment Date <span class="text-red-500">*</span>
            </label>
            <DatePicker
              v-model="newAppointment.doc.appointment_date"
              placeholder="Pick a date"
              @change="onPractitionerOrDateChange"
            />
          </div>
        </div>

        <!-- Available Slots Selection -->
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700">
            Available Time Slot <span class="text-red-500">*</span>
          </label>

          <div v-if="slotsCall.loading" class="p-4 text-center text-sm text-gray-500 bg-gray-50 rounded-lg">
            Fetching available time slots...
          </div>

          <div v-else-if="slotsCall.data && slotsCall.data.length > 0" class="grid grid-cols-3 sm:grid-cols-4 gap-2">
            <button
              v-for="slot in slotsCall.data"
              :key="slot.from_time"
              type="button"
              :class="[
                'px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-150',
                newAppointment.doc.appointment_time === slot.from_time
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
              ]"
              @click="newAppointment.doc.appointment_time = slot.from_time"
            >
              {{ slot.from_time }}
            </button>
          </div>

          <div v-else-if="newAppointment.doc.practitioner && newAppointment.doc.appointment_date" class="p-3 text-sm text-amber-700 bg-amber-50 rounded-lg border border-amber-200">
            No time slots available for the selected practitioner on this date.
          </div>

          <div v-else class="p-3 text-sm text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            Select a practitioner and date to view time slots.
          </div>
        </div>
      </div>

      <!-- Step 3: Appointment Notes & Review -->
      <div v-if="currentStep === 3" class="space-y-4">
        <h3 class="text-base font-semibold text-gray-900">Additional Notes</h3>

        <FormControl
          v-model="newAppointment.doc.notes"
          type="textarea"
          label="Reason for Visit / Notes"
          placeholder="Describe symptoms or reasons for booking..."
          :rows="4"
        />
      </div>
    </form>

    <!-- Modal Actions Footer -->
    <template #actions>
      <div class="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="ghost" @click="show = false">Cancel</Button>
        <Button v-if="currentStep > 1" variant="ghost" @click="previousStep">Back</Button>
        <Button v-if="currentStep < steps.length" variant="solid" theme="blue" @click="nextStep">Continue</Button>
        <Button
          v-else
          type="submit"
          variant="solid"
          theme="blue"
          :loading="newAppointment.insert.loading"
          :disabled="newAppointment.insert.loading"
          loading-text="Booking..."
          @click="handleSubmit"
        >
          Confirm Appointment
        </Button>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"
import {
  Dialog,
  FormControl,
  DatePicker,
  Button,
  toast,
  useList,
  useCall,
  useNewDoc
} from "frappe-ui"

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void
  (e: "booked", payload: any): void
}>()

interface AppointmentDocument {
  doctype: "Patient Appointment"
  patient: string
  practitioner: string
  appointment_date: string
  appointment_time: string
  notes?: string
  status: string
}

const show = ref(props.modelValue)
const currentStep = ref(1)

const steps = [
  { number: 1, title: "Patient Details" },
  { number: 2, title: "Practitioner & Schedule" },
  { number: 3, title: "Reason & Notes" },
]

// 1. Fetch Practitioners list using useList
const practitioners = useList({
  doctype: 'Healthcare Practitioner',
  fields: ['name', 'practitioner_name'],
  filters: {
    status: 'Active',
  },
  pageLength: 100,
  auto: true,
})

const practitionerOptions = computed(() => {
  return (practitioners.data || []).map((doc: any) => ({
    label: doc.practitioner_name || doc.name,
    value: doc.name
  }))
})

// 2. Custom API call for slots using useCall
const slotsCall = useCall({
  url: "/api/v2/method/frappe_webportals.api.get_practitioner_slots"
})

// 3. New Document composable for Patient Appointment
const newAppointment = useNewDoc<AppointmentDocument>("Patient Appointment", {
  doctype: "Patient Appointment",
  patient: "",
  practitioner: "",
  appointment_date: "",
  appointment_time: "",
  notes: "",
  status: "Open"
})

watch(() => props.modelValue, (v) => {
  show.value = v
  if (v) currentStep.value = 1
})

watch(show, (v) => {
  emit("update:modelValue", v)
  if (!v) currentStep.value = 1
})

function onPractitionerOrDateChange() {
  newAppointment.doc.appointment_time = ""
  if (newAppointment.doc.practitioner && newAppointment.doc.appointment_date) {
    slotsCall.execute({
      practitioner: newAppointment.doc.practitioner,
      date: newAppointment.doc.appointment_date
    })
  }
}

function validateStep(step: number) {
  if (step === 1) {
    if (!newAppointment.doc.patient?.trim()) {
      toast.error("Please enter a Patient ID.")
      return false
    }
  }

  if (step === 2) {
    if (!newAppointment.doc.practitioner) {
      toast.error("Please select a practitioner.")
      return false
    }
    if (!newAppointment.doc.appointment_date) {
      toast.error("Please select an appointment date.")
      return false
    }
    if (!newAppointment.doc.appointment_time) {
      toast.error("Please select an available time slot.")
      return false
    }
  }

  return true
}

function nextStep() {
  if (validateStep(currentStep.value)) currentStep.value += 1
}

function previousStep() {
  currentStep.value -= 1
}

function handleSubmit() {
  if (currentStep.value < steps.length) {
    nextStep()
    return
  }
  submit()
}

async function submit() {
  if (!validateStep(1) || !validateStep(2)) return

  try {
    const doc = await newAppointment.insert()

    toast.success(`Appointment confirmed: ${doc.name}`)
    emit("booked", doc)
    show.value = false
  } catch (error: any) {
    console.error("Appointment creation failed:", error)
    const serverError = newAppointment.error as any
    const message = serverError?.messages?.join("\n") || serverError?.exception || error?.message
    toast.error(message || "Failed to schedule appointment. Please try again.")
  }
}
</script>