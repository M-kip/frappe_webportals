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
        <div class="mx-auto p-6 bg-white rounded-xl  mt-6">
            <div class="flex items-center justify-between border-b pb-4 mb-6">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900">Patient Profile</h1>
                    <p class="text-sm text-gray-500">Manage your personal and medical profile details</p>
                    <span 
                        class="px-3 py-1 text-xs font-semibold rounded-full w-full"
                        :class="patientData ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                    >   {{ patientData ? `Patient ID: ${patientData.name}` : 'No Patient Linked' }} <br>
                        {{ patientData ? `Patient Data Last Modified: ${patientData.modified}` : 'No Patient Linked' }}
                    </span>                
                </div>
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
                <label class="block text-sm font-medium text-gray-700">First Name</label>
                <input 
                    v-model="form.first_name" 
                    type="text" 
                    required 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
                </div>

                <div>
                <label class="block text-sm font-medium text-gray-700">Middle Name</label>
                <input 
                    v-model="form.middle_name" 
                    type="text" 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
                </div>

                <div>
                <label class="block text-sm font-medium text-gray-700">last Name</label>
                <input 
                    v-model="form.last_name" 
                    type="text" 
                    required 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
                </div>
                <div>
                <label class="block text-sm font-medium text-gray-700">National ID</label>
                <input 
                    v-model="form.uid" 
                    type="text" 
                    required 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
                </div>
                <div>
                <label class="block text-sm font-medium text-gray-700">Marital Status</label>
                <input 
                    v-model="form.marital_status" 
                    type="text" 
                    required 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
                </div>
                <div>
                <label class="block text-sm font-medium text-gray-700">Country</label>
                <input 
                    v-model="form.country" 
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
                <div>
                <label class="block text-sm font-medium text-gray-700">Occupation</label>
                <input 
                    v-model="form.occupation" 
                    type="text" 
                    required 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
                </div>
                <div>
                <label class="block text-sm font-medium text-gray-700">Allergies</label>
                <input 
                    v-model="form.allergies" 
                    type="text" 
                    required 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
                </div>
                <div>
                <label class="block text-sm font-medium text-gray-700">Alcohol Current Use</label>
                <input 
                    v-model="form.alcohol_current_use" 
                    type="checkbox" 
                    required 
                    class="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
                </div>
                <div>
                <label class="block text-sm font-medium text-gray-700">Alcohol Past Use</label>
                <input 
                    v-model="form.alcohol_past_use" 
                    type="checkbox" 
                    required 
                    class="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
                </div>
                <div>
                <label class="block text-sm font-medium text-gray-700">Tobacco Current Use</label>
                <input 
                    v-model="form.tobacco_current_use" 
                    type="checkbox" 
                    required 
                    class="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
                </div>
                <div>
                <label class="block text-sm font-medium text-gray-700">Tobacco Past Use</label>
                <input 
                    v-model="form.tobacco_past_use" 
                    type="checkbox" 
                    required 
                    class="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
                </div>
                <div>
                <label class="block text-sm font-medium text-gray-700">Medication</label>
                <input 
                    v-model="form.medication" 
                    type="text" 
                    required 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
                </div>
                <div>
                <label class="block text-sm font-medium text-gray-700">Surgical History</label>
                <input 
                    v-model="form.surgical_history" 
                    type="text" 
                    required 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
                </div>
                <div>
                <label class="block text-sm font-medium text-gray-700">Emergency Record</label>
                <input 
                    v-model="form.emergency_record" 
                    type="textarea" 
                    required 
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
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
                {{ updateCall.loading ? 'Saving Changes...' : 'Update' }}
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
const userData = ref(window.user?.name || window.user || null)
const user = computed(() => userData.value || 'Guest')
const patientData = ref(window.patient || null) // Boot payload for patient data
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
  uid: patientData.value?.uid || '',
  status: patientData.value?.status || '',
  modified: patientData.value?.modified || '',
  first_name: patientData.value?.first_name || '',
  last_name: patientData.value?.last_name || '',
  middle_name: patientData.value?.middle_name || '',
  alcohol_current_use: patientData.value?.alcohol_current_use || '',
  alcohol_past_use: patientData.value?.alcohol_past_use || '',
  allergies: patientData.value?.allergies || '',
  country: patientData.value?.country || '',
  emergency_record: patientData.value?.emergency_record || '',
  marital_status: patientData.value?.marital_status || '',
  tobacco_past_use: patientData.value?.tobacco_past_use || '',
  tobacco_current_use: patientData.value?.tobacco_current_use || '',
  surgical_history: patientData.value?.surgical_history || '',
  occupation: patientData.value?.occupation || '',
  medication: patientData.value?.medication || '',
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
        occupation: form.occupation,
        medication: form.medication,
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