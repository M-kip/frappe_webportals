import { defineMutation, useMutation } from '@pinia/colada'
import { patientApi } from '@/api/patient'
import { type RequestOptions } from '@/api/request'
/*
* This file defines the various mutations used to process and mutate  patient data
*/

export const usePatientMutation = defineMutation(() => {
    const { mutate, ...mutation } = useMutation({
        mutation: (payload: {
             patientData: Record<string, any>,
              options?: RequestOptions 
            }) => patientApi.createPatient(
                payload.patientData, 
                payload.options),
    })

    return {
        ...mutation,
        registerPatient: mutate,
    }
})

