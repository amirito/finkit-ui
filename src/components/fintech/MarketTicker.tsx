'use client'

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { formatCurrency } from '../../lib/formatters'

const MarketTickerRoot = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'> & {
  children: ReactNode
}>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center gap-2 p-2 bg-[var(--finkit-surface)] border border-[var(--finkit-border)] rounded-lg', className)}
      {...props}
    >
      {children}
    </div>
  )
)
MarketTickerRoot.displayName = 'MarketTicker.Root'

const MarketTickerSymbol = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<'span'> & {
  symbol: string
}>(
  ({ symbol, className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn('font-semibold text-[var(--finkit-text-main)]', className)}
      {...props}
    >
      {symbol}
    </span>
  )
)
MarketTickerSymbol.displayName = 'MarketTicker.Symbol'

const MarketTickerPrice = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<'span'> & {
  price: number
  currency?: string
}>(
  ({ price, currency = 'USD', className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn('font-mono tabular-nums text-[var(--finkit-text-main)]', className)}
      {...props}
    >
      {formatCurrency(price, currency)}
    </span>
  )
)
MarketTickerPrice.displayName = 'MarketTicker.Price'

const MarketTickerChange = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<'span'> & {
  change: number
}>(
  ({ change, className, ...props }, ref) => {
    const isPositive = change >= 0
    return (
      <span
        ref={ref}
        className={cn(
          'px-2 py-1 text-xs border rounded-full font-mono tabular-nums',
          isPositive ? 'bg-[var(--finkit-success)]/10 border-[var(--finkit-success)]/20 text-[var(--finkit-success)]' : 'bg-[var(--finkit-error)]/10 border-[var(--finkit-error)]/20 text-[var(--finkit-error)]',
          className
        )}
        {...props}
      >
        {isPositive ? '+' : ''}{change.toFixed(2)}%
      </span>
    )
  }
)
MarketTickerChange.displayName = 'MarketTicker.Change'

export const MarketTicker = Object.assign(MarketTickerRoot, {
  Symbol: MarketTickerSymbol,
  Price: MarketTickerPrice,
  Change: MarketTickerChange,
})