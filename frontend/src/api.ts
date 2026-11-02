// src/api/frappeClient.ts
import { frappeRequest } from 'frappe-ui'
import type { FrappeResourceError } from 'frappe-ui'
export interface RequestOptions {
  method?: string
  params?: Record<string, any>
  headers?: Record<string, string>
  signal?: AbortSignal
  credentials?: RequestCredentials
  responseType?: 'json' | 'response'
  onError?: (error: any) => void
  onServerMessages?: (messages: any[]) => void
  [key: string]: any // Allows any extra custom option properties
}
/**
 * Universal wrapper for frappeRequest
 * @param url - Dotted method path or resource path (e.g. '/api/resource/ToDo')
 * @param options - Override options (method, params, headers, signal, onError, etc.)
 */
export async function sendRequest<T = any>(
  url: string, 
  options: Omit<RequestOptions, 'url'> = {}
): Promise<T> {
  try {
    return await frappeRequest({
      url,
      method: options.method || 'POST',
      params: options.params || {},
      headers: { ...options.headers },
      ...options,
    }) as T
  } catch (error) {
    // Optional: type casting or logging for FrappeResourceError
    const typedError = error as FrappeResourceError
    throw typedError
  }
}