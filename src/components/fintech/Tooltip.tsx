'use client'

import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

export interface TooltipProps extends ComponentPropsWithoutRef<'span'> {
  label: ReactNode
  children: ReactNode
  side?: 'top' | 'bottom'
}

export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(
  ({ className, label, children, side = 'top', ...props }, ref) => {
    const id = useId()

    return (
      <span
        ref={ref}
        className={cn('finkit-root group relative inline-flex', className)}
        aria-describedby={id}
        {...props}
      >
        {children}
        <span
          id={id}
          role="tooltip"
          className={cn(
            'pointer-events-none absolute left-1/2 z-50 max-w-64 -translate-x-1/2 whitespace-nowrap rounded-md bg-[rgb(0_0_0/0.9)] px-2 py-1 text-xs font-medium text-[white] opacity-0 shadow-lg backdrop-blur transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100',
            side === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
          )}
        >
          {label}
        </span>
      </span>
    )
  }
)

Tooltip.displayName = 'Tooltip'
