import { useState, useCallback } from 'react'
import { formatCurrency } from '@/lib/formatters'

export interface CurrencyConfig {
  code: string
  symbol: string
  locale: string
}

const SUPPORTED_CURRENCIES: Record<string, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', locale: 'en-US' },
  EUR: { code: 'EUR', symbol: '€', locale: 'en-GB' },
  GBP: { code: 'GBP', symbol: '£', locale: 'en-GB' },
  JPY: { code: 'JPY', symbol: '¥', locale: 'ja-JP' },
  AUD: { code: 'AUD', symbol: 'A$', locale: 'en-AU' },
  CAD: { code: 'CAD', symbol: 'C$', locale: 'en-CA' },
}

/**
 * Hook for managing currency conversion and formatting.
 * Provides methods to format amounts in selected currency.
 *
 * @param initialCurrency - Default currency code (default: 'USD')
 * @returns Object with currency state, formatter, and setter
 *
 * @example
 * const { currency, format, setCurrency } = useCurrency('EUR')
 * format(1234.56) // '€1,234.56'
 */
export function useCurrency(initialCurrency: string = 'USD') {
  const [currency, setCurrency] = useState(initialCurrency)

  const config = SUPPORTED_CURRENCIES[currency] || SUPPORTED_CURRENCIES.USD

  const format = useCallback(
    (amount: number) => {
      return formatCurrency(amount, config.code, config.locale)
    },
    [config]
  )

  const changeCurrency = useCallback((newCurrency: string) => {
    if (SUPPORTED_CURRENCIES[newCurrency]) {
      setCurrency(newCurrency)
    }
  }, [])

  return {
    currency,
    config,
    format,
    changeCurrency,
    supportedCurrencies: Object.keys(SUPPORTED_CURRENCIES),
  }
}
