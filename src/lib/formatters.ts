/**
 * Format an amount as currency using Intl.NumberFormat.
 * Supports multiple currencies and locales.
 *
 * @param amount - The amount to format
 * @param currency - ISO 4217 currency code (default: 'USD')
 * @param locale - BCP 47 locale string (default: 'en-US')
 * @returns Formatted currency string
 *
 * @example
 * formatCurrency(1234.56) // '$1,234.56'
 * formatCurrency(1234.56, 'EUR', 'en-GB') // '€1,234.56'
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Format a number as a percentage.
 *
 * @param value - The value (0-100)
 * @param decimals - Decimal places (default: 1)
 * @returns Formatted percentage string
 *
 * @example
 * formatPercentage(25.5) // '25.5%'
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return value.toFixed(decimals) + '%'
}

/**
 * Format a number with thousands separators.
 *
 * @param value - The number to format
 * @param decimals - Decimal places (default: 0)
 * @returns Formatted number string
 *
 * @example
 * formatNumber(1234567.89) // '1,234,567.89'
 */
export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

/**
 * Format bytes as human-readable file size.
 *
 * @param bytes - Size in bytes
 * @returns Formatted size string
 *
 * @example
 * formatBytes(1024) // '1 KB'
 * formatBytes(1048576) // '1 MB'
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'

  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const k = 1024
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}
