// src/api/patient.ts
import { apiService } from '@/api/apiService'
import type { RequestOptions } from '@/api/request'

export const patientApi = {
  getPatient: (patientId: string) => apiService.get(`/api/resource/Patient/${patientId}`),
  createPatient: (patientData: Record<string, any>, options?: RequestOptions) => apiService.post('/api/v2/method/frappe_webportals.api.register_patient', patientData, options),
  //updatePatient: (patientId: string, patientData: Record<string, any>) => apiService.put(`/api/resource/Patient/${patientId}`, patientData),
  //deletePatient: (patientId: string) => apiService.delete(`/api/resource/Patient/${patientId}`),
}