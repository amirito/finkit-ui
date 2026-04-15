'use client'

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/formatters'

const MarketTickerRoot = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'> & {
  children: ReactNode
}>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center gap-2 p-2 bg-surface border border-border rounded-lg', className)}
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
      className={cn('font-semibold text-foreground', className)}
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
      className={cn('font-mono tabular-nums text-foreground', className)}
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
    const color = isPositive ? 'text-success' : 'text-red-400'
    return (
      <span
        ref={ref}
        className={cn(
          'px-2 py-1 text-xs border rounded-full font-mono tabular-nums',
          isPositive ? 'bg-success/10 border-success/20 text-success' : 'bg-red-500/10 border-red-500/20 text-red-400',
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