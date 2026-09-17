<template>
  <Dialog
    class="z-40"
    v-model="show"
    :options="{
      title: 'Register as Patient',
      size: 'lg',
    }"
  >
    <template #body-content>
      <form class="space-y-5" @submit.prevent="handleSubmit">
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="text-sm font-semibold text-gray-900">
              {{ currentStep }}. {{ steps[currentStep - 1].title }}
            </p>
            <p class="text-xs text-gray-500">Step {{ currentStep }} of {{ steps.length }}</p>
          </div>
          <div class="flex gap-1.5" aria-label="Registration progress">
            <span
              v-for="step in steps"
              :key="step.number"
              class="h-1.5 w-8 rounded-full"
              :class="step.number <= currentStep ? 'bg-blue-600' : 'bg-gray-200'"
            />
          </div>
        </div>

        <p v-if="currentStep === 1" class="text-sm text-gray-600">
          Fill in your basic details. Fields marked with <span class="text-red-500">*</span> are required.
        </p>

        <!-- Step 1: Demographics -->
        <div v-if="currentStep === 1" class="space-y-5">
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700">
              Full Name <span class="text-red-500">*</span>
            </label>
            <div class="grid gap-4 sm:grid-cols-3">
              <Input v-model="newPatient.doc.first_name" type="text" placeholder="First name" required />
              <Input v-model="newPatient.doc.middle_name" type="text" placeholder="Middle name (optional)" />
              <Input v-model="newPatient.doc.last_name" type="text" placeholder="Last name" required />
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-3">
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">
                Gender <span class="text-red-500">*</span>
              </label>
              <Select v-model="newPatient.doc.sex" :options="genderOptions" placeholder="Select gender" required />
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">Date of Birth</label>
              <DatePicker v-model="newPatient.doc.dob" placeholder="Pick a date" />
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">Blood Group</label>
              <Select v-model="newPatient.doc.blood_group" :options="bloodGroupOptions" placeholder="Select blood group" />
            </div>
          </div>
        </div>

        <!-- Step 2: Contact and Personal Details -->
        <div v-if="currentStep === 2" class="space-y-5">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">
                Mobile <span class="text-red-500">*</span>
              </label>
              <input
                v-model="newPatient.doc.mobile"
                class="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
                type="tel"
                placeholder="07XX XXX XXX"
                required
              />
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">Phone</label>
              <input
                v-model="newPatient.doc.phone"
                class="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
                type="tel"
                placeholder="020 XXXXXXX"
              />
            </div>
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <Input v-model="newPatient.doc.email" type="email" placeholder="you@example.com" />
          </div>

          <div class="border-t border-gray-200 pt-5">
            <h3 class="mb-4 text-base font-semibold text-gray-900">Personal Details</h3>
            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <label class="mb-1 block text-sm font-medium text-gray-700">Occupation</label>
                <Input v-model="newPatient.doc.occupation" type="text" placeholder="Occupation" />
              </div>
              <div>
                <label class="mb-1 block text-sm font-medium text-gray-700">Marital Status</label>
                <Select v-model="newPatient.doc.marital_status" :options="maritalStatusOptions" placeholder="Select marital status" />
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3: Medical History -->
        <div v-if="currentStep === 3" class="space-y-4">
          <h3 class="text-base font-semibold text-gray-900">Allergies, Medical and Surgical History</h3>
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">Allergies</label>
              <textarea v-model="newPatient.doc.allergies" class="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none" rows="3" placeholder="List any known allergies" />
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">Medication</label>
              <textarea v-model="newPatient.doc.medication" class="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none" rows="3" placeholder="Current medication" />
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">Medical History</label>
              <textarea v-model="newPatient.doc.medical_history" class="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none" rows="3" placeholder="Relevant medical history" />
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">Surgical History</label>
              <textarea v-model="newPatient.doc.surgical_history" class="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none" rows="3" placeholder="Previous surgeries" />
            </div>
          </div>
        </div>

        <!-- Step 4: Risk Factors -->
        <div v-if="currentStep === 4" class="space-y-4">
          <h3 class="text-base font-semibold text-gray-900">Risk Factors</h3>
          <div class="space-y-3 text-sm text-gray-700">
            <label class="flex items-start gap-3">
              <input v-model="riskForm.tobacco_consumption" type="checkbox" class="mt-1 rounded border-gray-300 text-blue-600" />
              <span>Check if you have a history of Tobacco Consumption</span>
            </label>
            <label class="flex items-start gap-3">
              <input v-model="riskForm.tobacco_use" type="checkbox" class="mt-1 rounded border-gray-300 text-blue-600" />
              <span>Check if you consume Tobacco</span>
            </label>
            <label class="flex items-start gap-3">
              <input v-model="riskForm.alcohol_consumption" type="checkbox" class="mt-1 rounded border-gray-300 text-blue-600" />
              <span>Check if you have a history of Alcohol Consumption</span>
            </label>
            <label class="flex items-start gap-3">
              <input v-model="riskForm.alcohol_use" type="checkbox" class="mt-1 rounded border-gray-300 text-blue-600" />
              <span>Check if you consume Alcohol</span>
            </label>
          </div>
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">Occupational Hazards</label>
              <textarea v-model="newPatient.doc.surrounding_factors" class="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none" rows="3" placeholder="Describe any relevant hazards or factors" />
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700">Other Risk Factors</label>
              <textarea v-model="newPatient.doc.other_risk_factors" class="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none" rows="3" placeholder="Add any other risk factors" />
            </div>
          </div>
        </div>
      </form>
    </template>

    <template #actions>
      <div class="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="ghost" @click="show = false">Cancel</Button>
        <Button v-if="currentStep > 1" variant="ghost" @click="previousStep">Back</Button>
        <Button v-if="currentStep < steps.length" variant="solid" theme="blue" @click="nextStep">Continue</Button>
        <Button v-else type="submit" variant="solid" theme="blue" :loading="newPatient.loading" :disabled="newPatient.loading" loading-text="Registering..." @click="handleSubmit">
          Register Patient
        </Button>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue"
import {
  Dialog,
  Input,
  Select,
  DatePicker,
  Button,
  toast,
  useNewDoc,
} from "frappe-ui"

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void
  (e: "registered", payload: any): void
}>()

interface PatientDocument {
  doctype: "Patient"
  name?: string
  first_name: string
  middle_name: string
  last_name: string
  sex: string
  dob: string
  blood_group: string
  mobile: string
  email: string
  phone: string
  occupation: string
  marital_status: string
  allergies: string
  medication: string
  medical_history: string
  surgical_history: string
  surrounding_factors: string
  other_risk_factors: string
  tobacco_past_use?: string
  tobacco_current_use?: string
  alcohol_past_use?: string
  alcohol_current_use?: string
}

const show = ref(props.modelValue)
const currentStep = ref(1)

const steps = [
  { number: 1, title: "Demographics" },
  { number: 2, title: "Contact and personal details" },
  { number: 3, title: "Medical history" },
  { number: 4, title: "Risk factors" },
]

// Initialize useNewDoc directly for Frappe Health Patient DocType
const newPatient = useNewDoc<PatientDocument>("Patient", {
  doctype: "Patient",
  name: "new-patient-registration",
  first_name: "",
  middle_name: "",
  last_name: "",
  sex: "",
  dob: "",
  blood_group: "",
  mobile: "",
  email: "",
  phone: "",
  occupation: "",
  marital_status: "",
  allergies: "",
  medication: "",
  medical_history: "",
  surgical_history: "",
  surrounding_factors: "",
  other_risk_factors: "",
})

// Temporary local state for checkbox booleans mapped to Frappe "Yes"/"No"
const riskForm = reactive({
  tobacco_consumption: false,
  tobacco_use: false,
  alcohol_consumption: false,
  alcohol_use: false,
})

// Standard Frappe Health Blood Group options (use hyphens, not spaces)
const bloodGroupOptions = [
  { value: "A-Positive", label: "A Positive" },
  { value: "A-Negative", label: "A Negative" },
  { value: "AB-Positive", label: "AB Positive" },
  { value: "AB-Negative", label: "AB Negative" },
  { value: "B-Positive", label: "B Positive" },
  { value: "B-Negative", label: "B Negative" },
  { value: "O-Positive", label: "O Positive" },
  { value: "O-Negative", label: "O Negative" },
]

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
]

const maritalStatusOptions = [
  { value: "Single", label: "Single" },
  { value: "Married", label: "Married" },
  { value: "Divorced", label: "Divorced" },
  { value: "Widow", label: "Widow" },
]

watch(() => props.modelValue, (v) => {
  show.value = v
  if (v) currentStep.value = 1
})

watch(show, (v) => {
  emit("update:modelValue", v)
  if (!v) currentStep.value = 1
})

function validateStep(step: number) {
  if (step === 1) {
    if (!newPatient.doc.first_name?.trim() || !newPatient.doc.last_name?.trim()) {
      toast.error("Please enter first and last name.")
      return false
    }
    if (!newPatient.doc.sex) {
      toast.error("Please select gender.")
      return false
    }
  }

  if (step === 2) {
    const mobile = String(newPatient.doc.mobile || "").trim()
    if (!mobile) {
      toast.error("Please enter mobile number.")
      return false
    }
    const mobileClean = mobile.replace(/[\s\-]+/g, "")
    if (!/^\d{10,13}$/.test(mobileClean)) {
      toast.error("Please enter a valid mobile number (10-13 digits).")
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
    // Re-confirm doctype field on the document object
    newPatient.doc.doctype = "Patient"
    // Map boolean risk factors to Frappe Health fields
    newPatient.doc.tobacco_past_use = riskForm.tobacco_consumption ? "Yes" : "No"
    newPatient.doc.tobacco_current_use = riskForm.tobacco_use ? "Yes" : "No"
    newPatient.doc.alcohol_past_use = riskForm.alcohol_consumption ? "Yes" : "No"
    newPatient.doc.alcohol_current_use = riskForm.alcohol_use ? "Yes" : "No"

    // Execute submission without arguments
    const doc = await newPatient.submit()

    toast.success(`Patient registered: ${doc.name}`)
    emit("registered", doc)
    show.value = false
  } catch (error: any) {
    console.error("Patient registration failed:", error)
    const serverError = newPatient.error as any
    const message = serverError?.messages?.join("\n") || serverError?.exception || error?.message
    toast.error(`Patient registration failed: ${message || "Please try again."}`, {
      duration: 10,
    })
  }
}
</script>