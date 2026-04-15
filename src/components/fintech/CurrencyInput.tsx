'use client'

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

const CurrencyInputRoot = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'> & {
  children: ReactNode
}>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('relative flex items-center', className)}
      {...props}
    >
      {children}
    </div>
  )
)
CurrencyInputRoot.displayName = 'CurrencyInput.Root'

const CurrencyInputField = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<'input'> & {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
}>(
  ({ className, value, onValueChange, placeholder, ...props }, ref) => {
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
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          'flex-1 px-3 py-2 bg-surface border border-border rounded-lg text-foreground font-mono tabular-nums placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-success/20 focus:border-success',
          className
        )}
        {...props}
      />
    )
  }
)
CurrencyInputField.displayName = 'CurrencyInput.Field'

const CurrencyInputAddon = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<'button'> & {
  children: ReactNode
}>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        'px-3 py-2 bg-surface border border-border border-l-0 rounded-r-lg text-foreground hover:bg-surface-hover transition-colors font-medium',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
)
CurrencyInputAddon.displayName = 'CurrencyInput.Addon'

export const CurrencyInput = Object.assign(CurrencyInputRoot, {
  Field: CurrencyInputField,
  Addon: CurrencyInputAddon,
})