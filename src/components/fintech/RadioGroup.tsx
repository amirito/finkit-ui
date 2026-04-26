'use client'

import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/utils'

interface RadioGroupContextValue {
  value: string
  name: string
  setValue: (value: string) => void
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

function useRadioGroup() {
  const context = useContext(RadioGroupContext)

  if (!context) {
    throw new Error('RadioGroup.Item must be used within RadioGroup.Root')
  }

  return context
}

export interface RadioGroupRootProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string
  defaultValue?: string
  name?: string
  onChange?: (value: string) => void
  onValueChange?: (value: string) => void
  children: ReactNode
}

const RadioGroupRoot = forwardRef<HTMLDivElement, RadioGroupRootProps>(
  (
    {
      className,
      value,
      defaultValue = '',
      name,
      onChange,
      onValueChange,
      children,
      ...props
    },
    ref
  ) => {
    const generatedName = useId()
    const [internalValue, setInternalValue] = useState(defaultValue)
    const selectedValue = value ?? internalValue

    const setValue = (nextValue: string) => {
      if (value === undefined) {
        setInternalValue(nextValue)
      }

      onChange?.(nextValue)
      onValueChange?.(nextValue)
    }

    return (
      <RadioGroupContext.Provider
        value={{
          value: selectedValue,
          name: name ?? generatedName,
          setValue,
        }}
      >
        <div
          ref={ref}
          role="radiogroup"
          className={cn('finkit-root box-border flex w-full flex-col gap-4', className)}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    )
  }
)

RadioGroupRoot.displayName = 'RadioGroup.Root'

export interface RadioGroupItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'onChange' | 'value'> {
  value: string
  children: ReactNode
}

const RadioGroupItem = forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ className, value, children, disabled, onClick, type = 'button', ...props }, ref) => {
    const group = useRadioGroup()
    const selected = group.value === value

    const selectItem = () => {
      if (!disabled) {
        group.setValue(value)
      }
    }

    return (
      <button
        ref={ref}
        type={type}
        role="radio"
        aria-checked={selected}
        disabled={disabled}
        data-state={selected ? 'checked' : 'unchecked'}
        name={group.name}
        value={value}
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) {
            selectItem()
          }
        }}
        className={cn(
          'box-border flex w-full items-center gap-4 rounded-2xl border border-[var(--finkit-border)] bg-[var(--finkit-surface)] p-2 text-left text-[var(--finkit-text-main)] transition-colors',
          'hover:border-[var(--finkit-primary)]/50 hover:bg-[var(--finkit-primary)]/10',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--finkit-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--finkit-background)]',
          selected && 'border-[var(--finkit-primary)] bg-[var(--finkit-primary)]/10',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
        {...props}
      >
        <span
          aria-hidden="true"
          className={cn(
            'box-border flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--finkit-border)] bg-[var(--finkit-surface)] transition-all',
            selected && 'border-[var(--finkit-primary)] ring-2 ring-[var(--finkit-primary)]'
          )}
        >
          <span
            className={cn(
              'box-border h-2 w-2 rounded-full bg-[var(--finkit-primary)] opacity-0 transition-opacity',
              selected && 'opacity-100'
            )}
          />
        </span>
        <span className="box-border min-w-0 flex-1 text-sm font-medium text-[var(--finkit-text-main)]">
          {children}
        </span>
      </button>
    )
  }
)

RadioGroupItem.displayName = 'RadioGroup.Item'

type RadioGroupCompoundComponent = typeof RadioGroupRoot & {
  Root: typeof RadioGroupRoot
  Item: typeof RadioGroupItem
}

export const RadioGroup = Object.assign(RadioGroupRoot, {
  Root: RadioGroupRoot,
  Item: RadioGroupItem,
}) as RadioGroupCompoundComponent
