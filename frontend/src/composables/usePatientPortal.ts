// composables/usePatientPortal.ts
import { ref, computed } from 'vue'

const activeTab = ref('dashboard')

// Shared patient records / history data
const clientRecords = Array.from({ length: 6 }, (_, i) => ({
  id: 4001 + i,
  title: [
    'Upcoming Checkup & Polish', 
    'Routine Dental Cleaning', 
    'Composite Filling (Tooth #14)', 
    'Orthodontic Consultation', 
    'Tooth Extraction Follow-up', 
    'Annual Hygiene Review'
  ][i],
  date: i === 0 ? 'Oct 20, 2026' : `${12 - i} Sep 2026`,
  status: i === 0 ? 'Upcoming' : 'Completed',
  dentist: 'Dr. Flair',
  notes: i === 0 
    ? 'Scheduled appointment. Please arrive 10 minutes prior for paperwork and preliminary vitals.' 
    : 'Patient advised to maintain regular brushing and flossing routines. All past invoices settled ($450.00 total).'
}))

const selectedId = ref(clientRecords[0].id)

export function usePatientPortal() {
  const selectedRecord = computed(
    () => clientRecords.find((r) => r.id === selectedId.value) ?? clientRecords[0]
  )

  return {
    activeTab,
    clientRecords,
    selectedId,
    selectedRecord
  }
}