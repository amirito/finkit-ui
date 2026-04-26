'use client'

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

export type ButtonVariant = 'primary' | 'secondary' | 'text'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  isLoading?: boolean
  children: ReactNode
}

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    'border-transparent bg-[var(--finkit-primary)] text-[var(--finkit-background)] shadow-sm hover:bg-[var(--finkit-primary)]/90',
  secondary:
    'border-[var(--finkit-border)] bg-[var(--finkit-surface)] text-[var(--finkit-text-main)] hover:border-[var(--finkit-primary)]/50 hover:bg-[var(--finkit-primary)]/10',
  text:
    'border-transparent bg-transparent text-[var(--finkit-primary)] hover:bg-[var(--finkit-primary)]/10',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = 'primary',
      isLoading = false,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      className={cn(
        'finkit-root box-border inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--finkit-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--finkit-background)]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        buttonVariants[variant],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      ) : null}
      <span className={cn('box-border', isLoading && 'opacity-80')}>{children}</span>
    </button>
  )
)

Button.displayName = 'Button'
