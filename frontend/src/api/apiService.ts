// src/api/apiService.ts
import { sendRequest, type RequestOptions } from '@/api/request'

export const apiService = {
  /**
   * Generic GET request (for fetching lists or arbitrary endpoints)
   */
  get: <T = any>(url: string, params?: Record<string, any>, options: RequestOptions = {}) => {
    return sendRequest<T>(url, {
      method: 'GET',
      params: params || {},
      ...options,
    })
  },

  /**
   * Generic POST request (for whitelisted methods or inserting docs)
   */
  post: <T = any>(url: string, params?: Record<string, any>, options: RequestOptions = {}) => {
    return sendRequest<T>(url, {
      method: 'POST',
      params: params || {},
      ...options,
    })
  },

  /**
   * Fetches a list of records from a DocType with serialized fields and filters
   */
  getList: <T = any>(
    url: string, 
    fields?: string[], 
    filters?: Record<string, any>, 
    options: RequestOptions = {}
  ) => {
    return sendRequest<T>(url, {
      method: 'GET',
      params: {
        fields: JSON.stringify(fields),
        ...(filters ? { filters: JSON.stringify(filters) } : {}),
      },
      ...options,
    })
  },

  /**
   * Inserts a new document via frappe.client.insert
   */
  insert: <T = any>(doctype: string, docData: Record<string, any>, options: RequestOptions = {}) => {
    return sendRequest<T>('frappe.client.insert', {
      method: 'POST',
      params: {
        doc: {
          doctype,
          ...docData,
        },
      },
      ...options,
    })
  },

  /**
   * Shortcut for updating documents via frappe.client.set_value
   */
  updateDoc: <T = any>(
    doctype: string, 
    name: string, 
    fieldname: string | Record<string, any>, 
    value?: any, 
    options: RequestOptions = {}
  ) => {
    return sendRequest<T>('frappe.client.set_value', {
      method: 'POST',
      params: {
        doctype,
        name,
        fieldname,
        value,
      },
      ...options,
    })
  },

  /**
   * Calls any custom whitelisted Python method
   */
  callMethod: <T = any>(methodName: string, args: Record<string, any> = {}, options: RequestOptions = {}) => {
    return sendRequest<T>(methodName, {
      method: 'POST',
      params: args,
      ...options,
    })
  },
}