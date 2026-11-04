// src/api/request.ts
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
  [key: string]: any 
}

/**
 * Universal wrapper using native fetch to fix undefined responses from frappeRequest
 */
export async function sendRequest<T = any>(
  url: string, 
  options: RequestOptions = {}
): Promise<T> {
  const method = options.method || 'POST'
  let targetUrl = url

  // Automatically format GET/DELETE query params (like fields & filters)
  if (options.params && (method === 'GET' || method === 'DELETE')) {
    const searchParams = new URLSearchParams()
    for (const [key, value] of Object.entries(options.params)) {
      if (value !== undefined && value !== null) {
        searchParams.append(key, typeof value === 'object' ? JSON.stringify(value) : value)
      }
    }
    const queryString = searchParams.toString()
    if (queryString) {
      targetUrl += (targetUrl.includes('?') ? '&' : '?') + queryString
    }
  }

  // Format POST body payload
  let body: BodyInit | undefined = undefined
  if (method !== 'GET' && method !== 'HEAD' && options.params) {
    body = JSON.stringify(options.params)
  }

  try {
    const response = await fetch(targetUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(options.headers || {}),
      },
      body,
      signal: options.signal,
      credentials: options.credentials || 'same-origin',
    })

    if (!response.ok) {
      const errorJson = await response.json().catch(() => ({}))
      throw {
        status: response.status,
        messages: errorJson.messages || [response.statusText],
        exc: errorJson.exc,
      } as FrappeResourceError
    }

    const json = await response.json()
    console.log("Native fetch raw output successfully retrieved:", json)

    // Unwrap Frappe's standard .message container automatically
    return (json?.data !== undefined ? json.data : json) as T

  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw error // Let router handle aborted signals gracefully
    }
    if (options.onError) {
      options.onError(error)
    }
    throw error
  }
}