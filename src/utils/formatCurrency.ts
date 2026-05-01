const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
})

export function formatCurrency(value: number) {
  return priceFormatter.format(value)
}
