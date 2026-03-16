export function extractVerificationToken(input) {
  const rawInput = String(input || '').trim()
  if (!rawInput) {
    return ''
  }

  const hasUrlLikeToken = rawInput.includes('token=') || rawInput.startsWith('http://') || rawInput.startsWith('https://')
  if (!hasUrlLikeToken) {
    return rawInput
  }

  try {
    if (rawInput.startsWith('http://') || rawInput.startsWith('https://')) {
      const parsedUrl = new URL(rawInput)
      const tokenFromUrl = parsedUrl.searchParams.get('token')
      if (tokenFromUrl) {
        return tokenFromUrl.trim()
      }
    }

    const queryCandidate = rawInput.includes('?') ? rawInput.slice(rawInput.indexOf('?') + 1) : rawInput
    const params = new URLSearchParams(queryCandidate)
    const tokenFromQuery = params.get('token')
    if (tokenFromQuery) {
      return tokenFromQuery.trim()
    }
  } catch {
    return rawInput
  }

  return rawInput
}