function normalizeItem(value: string) {
  const normalized = value.replace(/\s+/g, ' ').trim()
  return normalized.length > 0 ? normalized : null
}

export function parseIncludedItemsInput(value: string) {
  return value
    .split(/\r?\n/)
    .map((item) => normalizeItem(item))
    .filter((item): item is string => item !== null)
}

export function formatIncludedItemsInput(items?: string[]) {
  return Array.isArray(items) && items.length > 0 ? items.join('\n') : ''
}
