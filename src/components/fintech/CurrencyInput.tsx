'use client'

import React, { forwardRef, type ComponentPropsWithoutRef, type ReactNode, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ChevronDownIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

interface CurrencyInputContextValue {
  currency: string
  setCurrency: (currency: string) => void
}

const CurrencyInputContext = React.createContext<CurrencyInputContextValue | null>(null)

function useCurrencyInputContext() {
  const context = React.useContext(CurrencyInputContext)
  if (!context) {
    throw new Error('CurrencyInput components must be used within CurrencyInput.Root')
  }
  return context
}

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
]

const CurrencyInputRoot = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'> & {
  children: ReactNode
  currency?: string
  onCurrencyChange?: (currency: string) => void
}>(
  ({ className, children, currency = 'USD', onCurrencyChange, ...props }, ref) => {
    const [selectedCurrency, setSelectedCurrency] = useState(currency)
    const [isOpen, setIsOpen] = useState(false)

    const handleCurrencyChange = useCallback((newCurrency: string) => {
      setSelectedCurrency(newCurrency)
      onCurrencyChange?.(newCurrency)
      setIsOpen(false)
    }, [onCurrencyChange])

    return (
      <CurrencyInputContext.Provider value={{ currency: selectedCurrency, setCurrency: handleCurrencyChange }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            ref={ref}
            className={cn('relative flex items-center w-full min-w-0 bg-[var(--finkit-surface)] border border-[var(--finkit-border)] rounded-xl overflow-visible', className)}
            {...props}
          >
          {children}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-full items-center gap-2 px-4 bg-[var(--finkit-surface)] border-l border-[var(--finkit-border)] hover:bg-[var(--finkit-border)]/30 transition-colors"
            >
              <span className="text-[var(--finkit-text-main)] font-medium">{currencies.find(c => c.code === selectedCurrency)?.symbol}</span>
              <ChevronDownIcon className="h-4 w-4 text-[var(--finkit-text-muted)]" />
            </button>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 top-full mt-1 bg-[var(--finkit-surface)] border border-[var(--finkit-border)] rounded-lg shadow-lg z-[100] min-w-[120px]"
              >
                {currencies.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => handleCurrencyChange(curr.code)}
                    className="w-full px-3 py-2 text-left hover:bg-[var(--finkit-border)]/30 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{curr.symbol}</span>
                      <span className="text-sm text-[var(--finkit-text-muted)]">{curr.code}</span>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </div>
          </div>
        </motion.div>
      </CurrencyInputContext.Provider>
    )
  }
)
CurrencyInputRoot.displayName = 'CurrencyInput.Root'

const CurrencyInputAddon = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'> & {
  children: ReactNode
}>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center px-4 py-3 text-[var(--finkit-text-muted)]', className)} {...props}>
      {children}
    </div>
  )
)
CurrencyInputAddon.displayName = 'CurrencyInput.Addon'

const CurrencyInputField = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<'input'> & {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
}>(
  ({ className, value, onValueChange, placeholder, ...props }, ref) => {
    const { currency } = useCurrencyInputContext()

    const formatValue = useCallback((rawValue: string) => {
      if (!rawValue) return ''
      if (rawValue === '.') return '0.'
      const rawNumber = rawValue.replace(/,/g, '')
      if (rawNumber.endsWith('.')) {
        const trimmed = rawNumber.slice(0, -1)
        const intValue = parseFloat(trimmed)
        if (isNaN(intValue)) return rawValue
        const formattedInt = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(intValue)
        return `${formattedInt}.`
      }
      if (rawNumber.includes('.')) {
        const [integerPart, decimalPart] = rawNumber.split('.')
        const intValue = parseFloat(integerPart || '0')
        if (isNaN(intValue)) return rawValue
        const formattedInt = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(intValue)
        return `${formattedInt}.${decimalPart}`
      }
      const numValue = parseFloat(rawNumber)
      if (isNaN(numValue)) return rawValue
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(numValue)
    }, [currency])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/[^0-9.]/g, '')
      const parts = rawValue.split('.')
      if (parts.length > 2) return // prevent multiple decimals
      if (parts[1] && parts[1].length > 2) return // max 2 decimals
      onValueChange(rawValue)
    }, [onValueChange])

    return (
      <input
        ref={ref}
        type="text"
        inputMode="decimal"
        value={formatValue(value)}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          'w-full min-w-0 px-4 py-3 bg-transparent text-3xl md:text-4xl font-mono font-bold text-[var(--finkit-text-main)] placeholder:text-[var(--finkit-text-main)]/40 focus:outline-none',
          className
        )}
        {...props}
      />
    )
  }
)
CurrencyInputField.displayName = 'CurrencyInput.Field'

export const CurrencyInput = Object.assign(CurrencyInputRoot, {
  Addon: CurrencyInputAddon,
  Field: CurrencyInputField,
})