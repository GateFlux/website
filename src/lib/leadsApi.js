import config from './config'

const API_BASE = config.api.baseUrl

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
    throw new Error(data?.message || 'Request failed')
  }

  return data
}

export async function submitDemoRequest(formData) {
  return apiPost('/public/demo-requests', formData)
}

export async function submitContactSubmission(formData) {
  return apiPost('/public/contact-submissions', formData)
}
