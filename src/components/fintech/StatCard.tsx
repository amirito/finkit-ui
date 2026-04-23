'use client'

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '../../lib/utils'

const StatRoot = forwardRef<HTMLDivElement, HTMLMotionProps<'div'> & {
  children: ReactNode
}>(
  ({ className, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      whileHover={{ y: -4 }}
      className={cn(
        'p-4 bg-surface border border-border rounded-lg cursor-pointer group hover:border-success/30 transition-colors',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
)
StatRoot.displayName = 'Stat.Root'

const StatLabel = forwardRef<HTMLHeadingElement, ComponentPropsWithoutRef<'h3'> & {
  children: ReactNode
}>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-sm font-medium text-foreground-secondary mb-3', className)}
      {...props}
    >
      {children}
    </h3>
  )
)
StatLabel.displayName = 'Stat.Label'

const StatValue = forwardRef<HTMLParagraphElement, ComponentPropsWithoutRef<'p'> & {
  children: ReactNode
  isVisible?: boolean
}>(
  ({ className, children, isVisible = true, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-2xl font-bold text-foreground', className)}
      {...props}
    >
      {isVisible ? children : '••••'}
    </p>
  )
)
StatValue.displayName = 'Stat.Value'

const StatTrend = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'> & {
  change: number
  format?: 'currency' | 'percentage'
}>(
  ({ className, change, format = 'currency', ...props }, ref) => {
    const isPositive = change >= 0
    return (
      <div
        ref={ref}
        className={cn(
          'text-xs font-medium flex items-center space-x-1 mt-2',
          isPositive ? 'text-success' : 'text-red-400',
          className
        )}
        {...props}
      >
        <span>{isPositive ? '↑' : '↓'}</span>
        <span>
          {Math.abs(change)}{format === 'percentage' ? '%' : ''} from last month
        </span>
      </div>
    )
  }
)
StatTrend.displayName = 'Stat.Trend'

type StatCompoundComponent = typeof StatRoot & {
  Root: typeof StatRoot
  Label: typeof StatLabel
  Value: typeof StatValue
  Trend: typeof StatTrend
}

export const Stat = Object.assign(StatRoot, {
  Root: StatRoot,
  Label: StatLabel,
  Value: StatValue,
  Trend: StatTrend,
}) as StatCompoundComponent

// Legacy support for existing StatCard prop-based component
export interface StatCardProps {
  label: string
  value: string
  change: number
  icon: React.ComponentType<{ className?: string }>
  isVisible: boolean
}

export function StatCard({ label, value, change, icon: Icon, isVisible }: StatCardProps) {
  return (
    <Stat.Root>
      <div className="flex items-center justify-between mb-3">
        <Stat.Label>{label}</Stat.Label>
        <Icon className="w-4 h-4 text-foreground-secondary group-hover:text-success transition-colors" />
      </div>
      <div className="space-y-2">
        <Stat.Value isVisible={isVisible}>{value}</Stat.Value>
        <Stat.Trend change={change} />
      </div>
    </Stat.Root>
  )
}
