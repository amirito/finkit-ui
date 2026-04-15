'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/formatters'

export type TransactionStatus = 'cleared' | 'pending' | 'failed'

const statusStyles: Record<TransactionStatus, string> = {
  cleared: 'bg-success/10 text-success border-success/20',
  pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  failed: 'bg-red-500/10 text-red-400 border-red-500/20',
}

const TransactionRoot = forwardRef<HTMLDivElement, HTMLMotionProps<'div'> & {
  onClick?: () => void
  children: ReactNode
}>(
  ({ className, onClick, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn(
        'flex items-center justify-between p-4 bg-surface border border-border rounded-lg cursor-pointer',
        className
      )}
      whileHover={{ backgroundColor: 'var(--surface-hover)' }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  )
)
TransactionRoot.displayName = 'Transaction.Root'

const TransactionIcon = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'> & {
  src?: string
  alt?: string
  fallback?: ReactNode
}>(
  ({ src, alt, fallback, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('w-10 h-10 rounded-full bg-border flex items-center justify-center overflow-hidden', className)}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt ?? 'transaction icon'} className="w-full h-full object-contain" loading="lazy" />
      ) : (
        fallback ?? <span className="text-xs font-mono">?</span>
      )}
    </div>
  )
)
TransactionIcon.displayName = 'Transaction.Icon'

const TransactionInfo = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'> & {
  title: string
  sub: string
  isSubscription?: boolean
}>(
  ({ title, sub, isSubscription, className, ...props }, ref) => (
    <div ref={ref} className={cn('min-w-0', className)} {...props}>
      <div className="flex items-center space-x-2">
        <h3 className="font-medium text-foreground truncate">{title}</h3>
        {isSubscription && (
          <span className="px-2 py-1 text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full">
            Sub
          </span>
        )}
      </div>
      <p className="text-sm text-foreground/60 truncate">{sub}</p>
    </div>
  )
)
TransactionInfo.displayName = 'Transaction.Info'

const TransactionAmount = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<'span'> & {
  value: number
}>(
  ({ value, className, ...props }, ref) => {
    const isPositive = value >= 0
    const amountColor = isPositive ? 'text-success' : 'text-foreground'
    return (
      <span ref={ref} className={cn('text-lg font-mono font-semibold', amountColor, className)} {...props}>
        {isPositive ? '+' : '-'}{formatCurrency(Math.abs(value))}
      </span>
    )
  }
)
TransactionAmount.displayName = 'Transaction.Amount'

const TransactionStatusLabel = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<'span'> & {
  status: TransactionStatus
}>(
  ({ status, className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn('px-2 py-1 text-xs border rounded-full', statusStyles[status], className)}
      {...props}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
)
TransactionStatusLabel.displayName = 'Transaction.Status'

type TransactionCompoundComponent = typeof TransactionRoot & {
  Root: typeof TransactionRoot
  Icon: typeof TransactionIcon
  Info: typeof TransactionInfo
  Amount: typeof TransactionAmount
  Status: typeof TransactionStatusLabel
}

export const Transaction = Object.assign(TransactionRoot, {
  Root: TransactionRoot,
  Icon: TransactionIcon,
  Info: TransactionInfo,
  Amount: TransactionAmount,
  Status: TransactionStatusLabel,
}) as TransactionCompoundComponent

export interface TransactionRowProps extends HTMLMotionProps<'div'> {
  merchant: string
  category: string
  subText: string
  amount: number
  status: TransactionStatus
  isSubscription?: boolean
  iconUrl?: string
  onClick?: () => void
}

export function TransactionRow({
  merchant,
  category,
  subText,
  amount,
  status,
  isSubscription,
  iconUrl,
  className,
  onClick,
  ...props
}: TransactionRowProps) {
  return (
    <Transaction.Root className={cn('max-w-full', className)} onClick={onClick} {...props}>
      <div className="flex items-center gap-4">
        <Transaction.Icon
          src={iconUrl}
          alt={`${merchant} icon`}
          fallback={<span className="text-sm font-semibold uppercase text-foreground/80">{merchant.charAt(0)}</span>}
        />
        <Transaction.Info
          title={merchant}
          sub={`${category} • ${subText}`}
          isSubscription={isSubscription}
        />
      </div>
      <div className="flex items-end gap-3">
        <Transaction.Amount value={amount} />
        <Transaction.Status status={status} />
      </div>
    </Transaction.Root>
  )
}
