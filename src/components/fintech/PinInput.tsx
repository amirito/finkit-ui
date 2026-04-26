'use client'

import { forwardRef, type ComponentPropsWithoutRef, useState, useCallback, useRef, useEffect } from 'react'
import { cn } from '../../lib/utils'

const PinInputRoot = forwardRef<HTMLDivElement, Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> & {
  value: string
  onChange: (value: string) => void
  onComplete?: (value: string) => void
  length?: number
}>(
  ({ className, value, onChange, onComplete, length = 6, ...props }, ref) => {
    const inputsRef = useRef<(HTMLInputElement | null)[]>([])
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

    const handleChange = useCallback((index: number, digit: string) => {
      if (!/^\d?$/.test(digit)) return
      const newValue = value.split('')
      newValue[index] = digit
      const cleanValue = newValue.join('').replace(/[^0-9]/g, '').slice(0, length)
      onChange(cleanValue.padEnd(length, ''))

      // Auto-focus next
      if (digit && index < length - 1) {
        inputsRef.current[index + 1]?.focus()
      }

      // Call onComplete when all digits are entered
      if (cleanValue.length === length && onComplete) {
        onComplete(cleanValue)
      }
    }, [value, onChange, onComplete, length])

    const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && !value[index] && index > 0) {
        inputsRef.current[index - 1]?.focus()
      }
    }, [value])

    const handlePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault()
      const paste = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, length)
      onChange(paste.padEnd(length, ''))
    }, [onChange, length])

    useEffect(() => {
      if (focusedIndex !== null && inputsRef.current[focusedIndex]) {
        inputsRef.current[focusedIndex].focus()
      }
    }, [focusedIndex])

    return (
      <div
        ref={ref}
        className={cn('flex gap-2', className)}
        {...props}
      >
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            ref={(el) => { inputsRef.current[index] = el }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[index] || ''}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={() => setFocusedIndex(index)}
            className="w-10 h-10 text-center bg-[var(--finkit-surface)] border border-[var(--finkit-border)] rounded-lg text-[var(--finkit-text-main)] font-mono tabular-nums focus:outline-none focus:ring-2 focus:ring-[var(--finkit-success)]/20 focus:border-[var(--finkit-success)]"
          />
        ))}
      </div>
    )
  }
)
PinInputRoot.displayName = 'PinInput.Root'

type PinInputCompoundComponent = typeof PinInputRoot & {
  Root: typeof PinInputRoot
}

export const PinInput = Object.assign(PinInputRoot, {
  Root: PinInputRoot,
}) as PinInputCompoundComponent