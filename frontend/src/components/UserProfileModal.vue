<template>
    <Dialog
        v-model:open="show"
        title="Settings Bay"
        size="2xl"
        class="z-40"
        icon="lucide-user-round-cog size-9"
        theme="blue"
        :padding-top="90"
    >
        <div class="mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100 mt-6">
            <div class="flex items-center justify-between border-b pb-4 mb-6">
            <div>
                <h1 class="text-2xl font-bold text-gray-900">Patient Profile</h1>
                <p class="text-sm text-gray-500">Manage your personal and medical profile details</p>
            </div>
            <span 
                class="px-3 py-1 text-xs font-semibold rounded-full"
                :class="patientData ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
            >
                {{ patientData ? `Patient ID: ${patientData.name}` : 'No Patient Linked' }}
            </span>
            </div>

            <!-- State: Patient Profile Not Found -->
            <div v-if="!patientData" class="py-8 text-center">
            <p class="text-gray-600 mb-4">No patient record is linked to account: <strong>{{ user }}</strong></p>
            <button 
                @click="handleRegisterPatient" 
                :disabled="createPatientCall.loading"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
            >
                {{ createPatientCall.loading ? 'Creating Record...' : 'Register as Patient' }}
            </button>
            </div>

            <!-- State: Patient Profile Form -->
            <form v-else @submit.prevent="saveProfile" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                <label class="block text-sm font-medium text-gray-700">Full Name</label>
                <input 
                    v-model="form.patient_name" 
                    type="text" 
                    required 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
                </div>

                <div>
                <label class="block text-sm font-medium text-gray-700">Mobile Number</label>
                <input 
                    v-model="form.mobile" 
                    type="tel" 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
                </div>

                <div>
                <label class="block text-sm font-medium text-gray-700">Gender</label>
                <select 
                    v-model="form.sex" 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                </div>

                <div>
                <label class="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input 
                    v-model="form.dob" 
                    type="date" 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
                </div>

                <div>
                <label class="block text-sm font-medium text-gray-700">Blood Group</label>
                <select 
                    v-model="form.blood_group" 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                </select>
                </div>

                <div>
                <label class="block text-sm font-medium text-gray-700">Email Address</label>
                <input 
                    v-model="form.email" 
                    type="email" 
                    disabled 
                    class="mt-1 block w-full rounded-md border-gray-200 bg-gray-50 p-2 border cursor-not-allowed text-gray-500"
                />
                </div>
            </div>

            <!-- Feedback Messages -->
            <div v-if="successMessage" class="p-3 bg-green-50 text-green-700 rounded-md text-sm">
                {{ successMessage }}
            </div>
            <div v-if="updateCall.error" class="p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {{ updateCall.error.message || 'Failed to update profile.' }}
            </div>

            <!-- Submit Action -->
            <div class="flex justify-end pt-4 border-t">
                <button 
                type="submit" 
                :disabled="updateCall.loading"
                class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-sm disabled:opacity-50"
                >
                {{ updateCall.loading ? 'Saving Changes...' : 'Save Profile' }}
                </button>
            </div>
            </form>
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
import { useCall, Dialog } from 'frappe-ui'

// 1. Read boot payload passed from your_app.py
const bootData = ref(window.site_boot?.boot || window.boot || {})
const user = computed(() => bootData.value.user)
const patientData = ref(bootData.value.patient)
const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

const show = ref(props.modelValue)

// Ensure model state stays synced with parent components
watch(() => props.modelValue, (val) => {
  show.value = val
})
watch(show, (val) => {
  emit('update:modelValue', val)
})

const successMessage = ref('')

// 2. Local reactive state initialized from boot patient object
const form = reactive({
  patient_name: patientData.value?.patient_name || '',
  mobile: patientData.value?.mobile || '',
  sex: patientData.value?.sex || '',
  dob: patientData.value?.dob || '',
  blood_group: patientData.value?.blood_group || '',
  email: patientData.value?.email || user.value || '',
})

// 3. API Call to save profile modifications directly to the Patient document
const updateCall = useCall({
  url: 'frappe.client.set_value',
  immediate: false,
})

async function saveProfile() {
  if (!patientData.value?.name) return
  successMessage.value = ''
  try {
    await updateCall.submit({
      doctype: 'Patient',
      name: patientData.value.name,
      fieldname: {
        patient_name: form.patient_name,
        mobile: form.mobile,
        sex: form.sex,
        dob: form.dob,
        blood_group: form.blood_group,
      },
    })
    
    successMessage.value = 'Profile updated successfully!'
  } catch (err) {
    console.error('Failed to update patient profile:', err)
  }
}

// 4. API Call to automatically create and link a Patient document if missing
const createPatientCall = useCall({
  url: 'frappe.client.insert',
  immediate: false,
  onSuccess(data) {
    patientData.value = data
    window.location.reload()
  }
})

// Trigger processing dynamically to avoid parsing undefined strings during initialization
function handleRegisterPatient() {
  const emailStr = typeof user.value === 'string' ? user.value : ''
  const firstName = emailStr.includes('@') ? emailStr.split('@')[0] : emailStr

  createPatientCall.submit({
    doc: {
      doctype: 'Patient',
      first_name: firstName || 'New Patient',
      user_id: emailStr,
      email: emailStr,
    }
  })
}
</script>