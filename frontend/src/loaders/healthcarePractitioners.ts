import { defineColadaLoader } from 'vue-router/experimental/pinia-colada'
import { healthcarePractitionerApi } from '@/api/healthcarePractitioner'
export const useHealthcarePractitionerLoader = defineColadaLoader({
  async query(_to, { signal }) {
    return healthcarePractitionerApi.getHealthcarePractitioners(
      ['name', 'practitioner_name', 'department', 'designation', 'gender', 'image'],
      {},
      { signal, responseType: 'response'})
  },
  key: () => ['healthcarePractitioners'],
  // Keep the data "fresh" 10 seconds to avoid fetching the same data too often
  //staleTime: 10000,
})