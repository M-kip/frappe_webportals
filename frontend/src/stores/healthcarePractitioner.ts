/*
* This file defines the various stores used to process and mutate healthcare practitioner data
*/
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface HealthcarePractitioner {
  // Basic Details
  naming_series?: string; // HLC-PRAC-.YYYY.-
  first_name: string;
  middle_name?: string;
  last_name: string;
  practitioner_name?: string; // Full Name
  gender?: string;
  image?: string;
  status: 'Active' | 'Disabled';
  mobile_phone?: string;
  residence_phone?: string;
  office_phone?: string;

  // Employee and User Details
  practitioner_type?: 'Internal' | 'External';
  employee?: string;
  supplier?: string;
  department?: string; // Medical Department
  designation?: string;
  user_id?: string; // User
  hospital?: string;

  // Appointments & Schedules
  practitioner_schedules?: PractitionerSchedule[];
  google_calendar?: string;
  show_in_portal?: boolean;

  // Charges
  op_consulting_charge_item?: string;
  op_consulting_charge?: number;
  inpatient_visit_charge_item?: string;
  inpatient_visit_charge?: number;

  // Free Follow-up Details
  enable_free_follow_ups?: boolean;
  max_visits?: number; // Number of Patient Encounters in Valid Days
  valid_days?: number;

  // Account Details
  default_currency?: string;
  accounts?: PartyAccount[];

  // Primary Address and Contact
  practitioner_primary_contact?: string;
  mobile_no?: string; // Read Only
  email_id?: string; // Read Only
  practitioner_primary_address?: string;
  primary_address?: string;
}

export interface PractitionerSchedule {
  // Define structure for practitioner_schedules table row if needed
}

export interface PartyAccount {
  // Define structure for income accounts table row if needed
}

export const useHealthcarePractitionerStore = defineStore('healthcarePractitioner', () => {
  const healthcarePractitioner = ref<HealthcarePractitioner | null>(null);

  const full_name = computed(() => {
    if (!healthcarePractitioner.value) return '';
    const { practitioner_name } = healthcarePractitioner.value;
    return practitioner_name || '';
  })
  function setHealthcarePractitioner(newPractitioner: HealthcarePractitioner) {
    healthcarePractitioner.value = newPractitioner;
  }
  function clearHealthcarePractitioner() {
    healthcarePractitioner.value = null;
  }
  return { healthcarePractitioner, full_name, setHealthcarePractitioner, clearHealthcarePractitioner };
});