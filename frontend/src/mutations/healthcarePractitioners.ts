import { defineMutation, useMutation } from '@pinia/colada'
import { healthcarePractitionerApi } from '@/api/healthcarePractitioner'
import { type RequestOptions } from '@/api/request'

/*
* This file defines the various mutations used to process and mutate healthcare practitioner data
*/

export const useHealthcarePractitionerMutation = defineMutation(() => {
    const { mutate, ...mutation } = useMutation({
        mutation: (payload: { practitionerData: Record<string, any>, options?: RequestOptions }) => healthcarePractitionerApi.createHealthcarePractitioner(payload.practitionerData, payload.options),
    })

    return {
        ...mutation,
        registerHealthcarePractitioner: mutate,
    }
})