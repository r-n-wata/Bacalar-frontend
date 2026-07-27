const BACALAR_LOCATION_CONTEXT = 'Bacalar, Quintana Roo, Mexico'
const KNOWN_LOCATION_PATTERN =
  /\b(bacalar|quintana\s+roo|q\.?\s*roo|qroo|mexico|m[eé]xico|mx)\b/i

function normalizeAddress(value?: string) {
  const normalized = value?.trim()

  if (!normalized) {
    return undefined
  }

  if (KNOWN_LOCATION_PATTERN.test(normalized)) {
    return normalized
  }

  return `${normalized}, ${BACALAR_LOCATION_CONTEXT}`
}

export function buildMapUrl(address?: string) {
  const normalizedAddress = normalizeAddress(address)

  if (!normalizedAddress) {
    return undefined
  }

  const params = new URLSearchParams({
    q: normalizedAddress,
  })

  return `https://www.google.com/maps?${params.toString()}`
}

export function buildMapEmbedUrl(address?: string) {
  const normalizedAddress = normalizeAddress(address)

  if (!normalizedAddress) {
    return undefined
  }

  const params = new URLSearchParams({
    q: normalizedAddress,
    output: 'embed',
  })

  return `https://www.google.com/maps?${params.toString()}`
}
