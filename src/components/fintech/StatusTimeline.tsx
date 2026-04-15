'use client'

import React, { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { CheckIcon, ClockIcon, CircleIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

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
    color: 'text-success',
    bgColor: 'bg-success',
    borderColor: 'border-success',
  },
  pending: {
    icon: ClockIcon,
    color: 'text-warning',
    bgColor: 'bg-warning',
    borderColor: 'border-warning',
  },
  current: {
    icon: CircleIcon,
    color: 'text-primary',
    bgColor: 'bg-primary',
    borderColor: 'border-primary',
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
              state === 'success' ? config.bgColor : 'bg-surface'
            )}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <Icon className={cn('w-4 h-4', state === 'success' ? 'text-white' : config.color)} />
          </motion.div>
          <div className={cn(
            'w-0.5 h-12 mt-2',
            state === 'success' ? 'bg-success' : 'bg-border'
          )} />
        </div>
        <div className="flex-1 pb-8">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">{title}</h3>
            {timestamp && (
              <span className="text-xs text-foreground-secondary">{timestamp}</span>
            )}
          </div>
          {description && (
            <p className="text-sm text-foreground-secondary mt-1">{description}</p>
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