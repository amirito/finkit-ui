'use client'

import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode
  error?: ReactNode
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, id, label, error, 'aria-describedby': ariaDescribedBy, ...props }, ref) => {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const errorId = error ? `${inputId}-error` : undefined
    const describedBy = [ariaDescribedBy, errorId].filter(Boolean).join(' ') || undefined

    return (
      <div className="finkit-root box-border flex w-full flex-col gap-2">
        {label ? (
          <label
            htmlFor={inputId}
            className="box-border text-sm font-medium text-[var(--finkit-text-main)]"
          >
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : props['aria-invalid']}
          aria-describedby={describedBy}
          className={cn(
            'box-border h-11 w-full rounded-xl border border-[var(--finkit-border)] bg-[var(--finkit-surface)] px-3 py-2 text-sm text-[var(--finkit-text-main)] shadow-sm transition-colors',
            'placeholder:text-[var(--finkit-text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--finkit-primary)] focus:border-[var(--finkit-primary)]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-[var(--finkit-error)]',
            className
          )}
          {...props}
        />
        {error ? (
          <p id={errorId} className="box-border text-sm text-[var(--finkit-error)]">
            {error}
          </p>
        ) : null}
      </div>
    )
  }
)

TextInput.displayName = 'TextInput'
