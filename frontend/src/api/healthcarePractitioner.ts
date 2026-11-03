// src/api/healthcarePractitioner.ts
import { apiService } from '@/api/apiService'
import type { RequestOptions } from '@/api/request'

export const healthcarePractitionerApi = {
  getHealthcarePractitioner: (practitionerId: string) => apiService.get(`/api/resource/Healthcare Practitioner/${practitionerId}`),
  createHealthcarePractitioner: (practitionerData: Record<string, any>, options?: RequestOptions) => apiService.post('/api/v2/method/frappe_webportals.api.register_healthcare_practitioner', practitionerData, options),
  getHealthcarePractitioners: (fields?: string[], filters?: Record<string, any>, options?: RequestOptions) => apiService.getList('/api/v2/method/frappe_webportals.api.get_practitioners_list', fields || [], filters, options),
  //updateHealthcarePractitioner: (practitionerId: string, practitionerData: Record<string, any>) => apiService.put(`/api/resource/Healthcare Practitioner/${practitionerId}`, practitionerData),
  //deleteHealthcarePractitioner: (practitionerId: string) => apiService.delete(`/api/resource/Healthcare Practitioner/${practitionerId}`),
}