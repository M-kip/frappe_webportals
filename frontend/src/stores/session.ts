/*
 *  Define a Pinia store for managing user session state. 
 *  This store will handle user authentication status, user information, 
 *  and any other session-related data.
 *  The store will provide reactive state properties and actions to update the session state, 
 *  making it easy to manage user sessions across the application.   
*/
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useSessionStore = defineStore('session', () => {
  // Reactive state properties for the session store
  const user = ref<string | null>((window as any).user?.name || (window as any).user || null);
  const patient = ref<Record<string, any> | null>((window as any).patient || null);

  // Getter to determine if the user is logged in
  const isLoggedIn = computed(() => !!user.value && user.value !== 'Guest');
  // Getter to determine if the patient is logged in
  const isPatientLoggedIn = computed(() => !!patient.value);
  // Action to update the user information
  function setUser(newUser: string | null) {
    user.value = newUser;
  }

  // Action to update the patient information
  function setPatient(newPatient: Record<string, any> | null) {
    patient.value = newPatient;
  }

  return {
    user,
    patient,
    isLoggedIn,
    setUser,
    setPatient,
    isPatientLoggedIn,
  };
});
