'use client'

import { Eye, EyeOff } from 'lucide-react'
import { motion } from 'framer-motion'
import { forwardRef, createContext, useContext, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/formatters'

interface BalanceCardRootProps extends ComponentPropsWithoutRef<'div'> {
  trend: {
    label: string
    value: string
    direction: 'up' | 'down'
  }
  className?: string
  children?: ReactNode
}

const BalanceCardRoot = forwardRef<HTMLDivElement, BalanceCardRootProps>(
  ({ trend, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 border border-border',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-foreground-secondary">Total Balance</span>
          <span className={`text-xs px-2 py-1 rounded-full ${
            trend.direction === 'up'
              ? 'bg-success/10 text-success'
              : 'bg-red-400/10 text-red-400'
          }`}>
            {trend.direction === 'up' ? '↑' : '↓'} {trend.value} {trend.label}
          </span>
        </div>
        {children}
      </div>
    )
  }
)
BalanceCardRoot.displayName = 'BalanceCard.Root'

const BalanceCardHeader = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'> & {
  label: string
  showVisibilityToggle?: boolean
}>(
  ({ label, showVisibilityToggle = true, className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex items-center justify-between mb-2', className)} {...props}>
        <h2 className="text-sm font-medium text-foreground-secondary">{label}</h2>
        {children}
      </div>
    )
  }
)
BalanceCardHeader.displayName = 'BalanceCard.Header'

const BalanceCardValue = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'> & {
  amount: number | string
  currency: string
}>(
  ({ amount, currency, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('mb-6', className)} {...props}>
        <motion.p
          className="text-4xl font-mono font-bold text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {typeof amount === 'number' ? formatCurrency(amount) : amount}
        </motion.p>
        <p className="text-sm text-foreground-secondary mt-1">{currency}</p>
      </div>
    )
  }
)
BalanceCardValue.displayName = 'BalanceCard.Value'

const BalanceCardChart = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('mb-8', className)} {...props}>
      {children}
    </div>
  )
)
BalanceCardChart.displayName = 'BalanceCard.Chart'

const BalanceCardAction = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<'button'> & {
  icon: ReactNode
  label: string
}>(
  ({ icon, label, className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-surface border border-border text-foreground rounded-lg hover:bg-surface-hover transition-colors text-sm font-medium',
        className
      )}
      {...props}
    >
      {icon}
      {label}
    </button>
  )
)
BalanceCardAction.displayName = 'BalanceCard.Action'

const BalanceCardActions = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex gap-3 mt-6', className)} {...props}>
      {children}
    </div>
  )
)
BalanceCardActions.displayName = 'BalanceCard.Actions'

export const HeroBalanceCard = Object.assign(BalanceCardRoot, {
  Balance: BalanceCardValue,
  Actions: BalanceCardActions,
  Action: BalanceCardAction,
})
