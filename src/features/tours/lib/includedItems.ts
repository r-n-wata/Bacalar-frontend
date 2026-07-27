function normalizeItem(value: string) {
  const normalized = value.replace(/\s+/g, ' ').trim()
  return normalized.length > 0 ? normalized : null
}

export function normalizeIncludedItems(items: string[]) {
  return items
    .map((item) => normalizeItem(item))
    .filter((item): item is string => item !== null)
}

export function parseIncludedItemsInput(value: string) {
  return normalizeIncludedItems(value.split(/\r?\n/))
}

export function formatIncludedItemsInput(items?: string[]) {
  return Array.isArray(items) && items.length > 0 ? items.join('\n') : ''
}
