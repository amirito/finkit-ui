'use client'

import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      checked = false,
      onCheckedChange,
      disabled,
      type = 'button',
      onClick,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      type={type}
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented && !disabled) {
          onCheckedChange?.(!checked)
        }
      }}
      className={cn(
        'finkit-root box-border inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-[var(--finkit-border)] p-1 transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--finkit-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--finkit-background)]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        checked ? 'bg-[var(--finkit-primary)]' : 'bg-[var(--finkit-surface)]',
        className
      )}
      {...props}
    >
      <span
        className={cn(
          'box-border h-5 w-5 rounded-full bg-[var(--finkit-background)] shadow-sm transition-transform',
          checked && 'translate-x-5'
        )}
      />
    </button>
  )
)

Toggle.displayName = 'Toggle'
