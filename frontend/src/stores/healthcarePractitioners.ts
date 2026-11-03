/*
* This file defines the various stores used to process and mutate healthcare practitioner data
*/
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { type HealthcarePractitioner } from '@/stores/healthcarePractitioner'

export const useHealthcarePractitionerStore = defineStore('healthcarePractitioners', () => {
  // State changed to an array (list)
  const healthcarePractitioners = ref<HealthcarePractitioner[]>([]);

  // Computed helper: Returns only active practitioners
  const activePractitioners = computed(() => {
    return healthcarePractitioners.value.filter(p => p.status === 'Active');
  });

  // Computed helper: Total count of practitioners in store
  const totalPractitioners = computed(() => {
    return healthcarePractitioners.value.length;
  });

  // Actions
  function setHealthcarePractitioners(newPractitioners: HealthcarePractitioner[]) {
    healthcarePractitioners.value = newPractitioners;
  }

  function addHealthcarePractitioner(practitioner: HealthcarePractitioner) {
    healthcarePractitioners.value.push(practitioner);
  }

  function removeHealthcarePractitioner(name: string) {
    healthcarePractitioners.value = healthcarePractitioners.value.filter(p => p.name !== name);
  }

  function clearHealthcarePractitioners() {
    healthcarePractitioners.value = [];
  }

  return { 
    healthcarePractitioners, 
    activePractitioners, 
    totalPractitioners, 
    setHealthcarePractitioners, 
    addHealthcarePractitioner, 
    removeHealthcarePractitioner, 
    clearHealthcarePractitioners 
  };
});
