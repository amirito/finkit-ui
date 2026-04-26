'use client'

import React, { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { CheckIcon, ClockIcon, CircleIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

type TimelineState = 'success' | 'pending' | 'current'

interface TimelineItemProps {
  title: string
  description?: string
  state: TimelineState
  timestamp?: string
}

const stateConfig = {
  success: {
    icon: CheckIcon,
    color: 'text-[var(--finkit-success)]',
    bgColor: 'bg-[var(--finkit-success)]',
    borderColor: 'border-[var(--finkit-success)]',
  },
  pending: {
    icon: ClockIcon,
    color: 'text-[var(--finkit-warning)]',
    bgColor: 'bg-[var(--finkit-warning)]',
    borderColor: 'border-[var(--finkit-warning)]',
  },
  current: {
    icon: CircleIcon,
    color: 'text-[var(--finkit-primary)]',
    bgColor: 'bg-[var(--finkit-primary)]',
    borderColor: 'border-[var(--finkit-primary)]',
  },
}

const TimelineRoot = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'> & {
  children: ReactNode
}>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-4', className)} {...props}>
      {children}
    </div>
  )
)
TimelineRoot.displayName = 'Timeline.Root'

const TimelineItem = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'> & TimelineItemProps>(
  ({ title, description, state, timestamp, className, ...props }, ref) => {
    const config = stateConfig[state]
    const Icon = config.icon

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          ref={ref}
          className={cn('flex gap-4', className)}
          {...props}
        >
        <div className="flex flex-col items-center">
          <motion.div
            className={cn(
              'w-8 h-8 rounded-full border-2 flex items-center justify-center',
              config.borderColor,
              state === 'success' ? config.bgColor : 'bg-[var(--finkit-surface)]'
            )}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <Icon className={cn('w-4 h-4', state === 'success' ? 'text-white' : config.color)} />
          </motion.div>
          <div className={cn(
            'w-0.5 h-12 mt-2',
            state === 'success' ? 'bg-[var(--finkit-success)]' : 'bg-[var(--finkit-border)]'
          )} />
        </div>
        <div className="flex-1 pb-8">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-[var(--finkit-text-main)]">{title}</h3>
            {timestamp && (
              <span className="text-xs text-[var(--finkit-text-muted)]">{timestamp}</span>
            )}
          </div>
          {description && (
            <p className="text-sm text-[var(--finkit-text-muted)] mt-1">{description}</p>
          )}
        </div>
        </div>
      </motion.div>
    )
  }
)
TimelineItem.displayName = 'Timeline.Item'

export const StatusTimeline = Object.assign(TimelineRoot, {
  Item: TimelineItem,
})