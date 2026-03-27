import config from './config'

const API_BASE = config.api.baseUrl

function extractApiErrorMessage(payload, fallbackMessage = 'Request failed') {
  const errors = payload?.errors

  if (errors && typeof errors === 'object') {
    const firstFieldValue = Object.values(errors)[0]

    if (Array.isArray(firstFieldValue) && firstFieldValue.length > 0) {
      const firstMessage = String(firstFieldValue[0] || '').trim()
      if (firstMessage) {
        return firstMessage
      }
    }

    if (typeof firstFieldValue === 'string' && firstFieldValue.trim()) {
      return firstFieldValue.trim()
    }
  }

  const rawMessage = String(payload?.message || '').trim()
  return rawMessage || fallbackMessage
}

async function apiPost(path, payload) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(extractApiErrorMessage(data, 'Request failed'))
  }

  return data
}

export async function submitDemoRequest(formData) {
  return apiPost('/public/demo-requests', formData)
}

export async function submitContactSubmission(formData) {
  return apiPost('/public/contact-submissions', formData)
}
