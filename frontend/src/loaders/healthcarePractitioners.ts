import { defineColadaLoader } from 'vue-router/experimental/pinia-colada'
import { healthcarePractitionerApi } from '@/api/healthcarePractitioner'

export const useHealthcarePractitionerLoader = defineColadaLoader({
    async query({ signal }) => {
        return healthcarePractitionerApi.getHealthcarePractitioners([], {}, { signal })
    },
    // key to indetify the query in the cache, can be a string or an array of strings
    key: ["practitioners"],
    // Optional keep data fresh for 10 seconds
    staleTime: 10000,
})