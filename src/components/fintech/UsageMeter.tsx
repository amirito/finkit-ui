'use client'

import React, { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangleIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

interface UsageMeterProps extends ComponentPropsWithoutRef<'div'> {
  current: number
  limit: number
  label: string
  showPercentage?: boolean
  warningThreshold?: number
}

const UsageMeter = forwardRef<HTMLDivElement, UsageMeterProps>(
  ({ current, limit, label, showPercentage = true, warningThreshold = 0.9, className, ...props }, ref) => {
    const percentage = Math.min((current / limit) * 100, 100)
    const isWarning = percentage >= warningThreshold * 100
    const isLimitReached = percentage >= 100

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          ref={ref}
          className={cn('space-y-2', className)}
          {...props}
        >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[var(--finkit-text-main)]">{label}</span>
          {showPercentage && (
            <span className={cn(
              'text-sm font-medium',
              isWarning ? 'text-[var(--finkit-warning)]' : 'text-[var(--finkit-text-muted)]'
            )}>
              {percentage.toFixed(1)}%
            </span>
          )}
        </div>

        <div className="relative">
          <div className="w-full h-3 bg-[var(--finkit-border)] rounded-full overflow-hidden">
            <motion.div
              className={cn(
                'h-full rounded-full transition-colors',
                isLimitReached ? 'bg-[var(--finkit-error)]' : isWarning ? 'bg-[var(--finkit-warning)]' : 'bg-[var(--finkit-success)]'
              )}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>

          {isLimitReached && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-1 -right-1 w-6 h-6 bg-[var(--finkit-error)] rounded-full flex items-center justify-center"
            >
              <AlertTriangleIcon className="w-3 h-3 text-white" />
            </motion.div>
          )}
        </div>

        <div className="flex justify-between text-xs text-[var(--finkit-text-muted)]">
          <span>${current.toLocaleString()}</span>
          <span>${limit.toLocaleString()}</span>
        </div>

        {isLimitReached && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex items-center gap-2 p-2 bg-[var(--finkit-error)]/10 border border-[var(--finkit-error)]/20 rounded-lg"
          >
            <AlertTriangleIcon className="w-4 h-4 text-[var(--finkit-error)] flex-shrink-0" />
            <span className="text-sm text-[var(--finkit-error)] font-medium">Limit reached</span>
          </motion.div>
        )}
        </div>
      </motion.div>
    )
  }
)

UsageMeter.displayName = 'UsageMeter'

export { UsageMeter }