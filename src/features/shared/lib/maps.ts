function normalizeAddress(value?: string) {
  const normalized = value?.trim()
  return normalized ? normalized : undefined
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
