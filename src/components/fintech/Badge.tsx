'use client'

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

export type BadgeVariant = 'primary' | 'secondary' | 'text'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  children: ReactNode
}

const badgeVariants: Record<BadgeVariant, string> = {
  primary:
    'border-[var(--finkit-primary)]/20 bg-[var(--finkit-primary)]/10 text-[var(--finkit-primary)]',
  secondary:
    'border-[var(--finkit-border)] bg-[var(--finkit-surface)] text-[var(--finkit-text-muted)]',
  text: 'border-transparent bg-transparent text-[var(--finkit-text-muted)]',
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, children, variant = 'primary', ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'finkit-root box-border inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium leading-none transition-colors',
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
)

Badge.displayName = 'Badge'
