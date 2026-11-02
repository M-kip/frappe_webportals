/*
* This file defines the various stores used to process and mutate  patient data
*/
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export interface PatientDocument {
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
export const usePatientStore = defineStore('patient', () => {
    const patient = ref<PatientDocument | null>(null)
    const full_name = computed(() => {
        if (!patient.value) return ''
        const { first_name, middle_name, last_name } = patient.value
        return [first_name, middle_name, last_name].filter(Boolean).join(' ')
    })
    function setPatient(newPatient: PatientDocument) {
        patient.value = newPatient
    }
    function clearPatient() {
        patient.value = null
    }
    return { patient, full_name, setPatient, clearPatient }
})
