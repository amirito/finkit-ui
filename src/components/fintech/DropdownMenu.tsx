'use client'

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type MutableRefObject,
  type ReactNode,
  type Ref,
} from 'react'
import { cn } from '../../lib/utils'

interface DropdownContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  contentId: string
  triggerId: string
  rootRef: MutableRefObject<HTMLDivElement | null>
}

const DropdownContext = createContext<DropdownContextValue | null>(null)

function useDropdown() {
  const context = useContext(DropdownContext)

  if (!context) {
    throw new Error('Dropdown components must be used within Dropdown.Root')
  }

  return context
}

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref) {
    const mutableRef = ref as MutableRefObject<T | null>
    mutableRef.current = value
  }
}

function focusMenuItem(container: HTMLElement, direction: 'first' | 'last' | 'next' | 'previous') {
  const items = Array.from(
    container.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)')
  )

  if (items.length === 0) {
    return
  }

  const activeIndex = items.indexOf(document.activeElement as HTMLButtonElement)
  const nextIndex =
    direction === 'first'
      ? 0
      : direction === 'last'
        ? items.length - 1
        : direction === 'next'
          ? (activeIndex + 1) % items.length
          : (activeIndex - 1 + items.length) % items.length

  items[nextIndex]?.focus()
}

export interface DropdownRootProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
}

const DropdownRoot = forwardRef<HTMLDivElement, DropdownRootProps>(
  ({ className, open, defaultOpen = false, onOpenChange, children, ...props }, ref) => {
    const rootRef = useRef<HTMLDivElement | null>(null)
    const contentId = useId()
    const triggerId = useId()
    const [internalOpen, setInternalOpen] = useState(defaultOpen)
    const isOpen = open ?? internalOpen

    const setOpen = useCallback((nextOpen: boolean) => {
      if (open === undefined) {
        setInternalOpen(nextOpen)
      }

      onOpenChange?.(nextOpen)
    }, [onOpenChange, open])

    useEffect(() => {
      if (!isOpen) {
        return
      }

      const handlePointerDown = (event: PointerEvent) => {
        if (!rootRef.current?.contains(event.target as Node)) {
          setOpen(false)
        }
      }

      document.addEventListener('pointerdown', handlePointerDown)

      return () => {
        document.removeEventListener('pointerdown', handlePointerDown)
      }
    }, [isOpen, setOpen])

    return (
      <DropdownContext.Provider value={{ open: isOpen, setOpen, contentId, triggerId, rootRef }}>
        <div
          ref={(node) => {
            rootRef.current = node
            assignRef(ref, node)
          }}
          className={cn('finkit-root relative inline-block text-left', className)}
          {...props}
        >
          {children}
        </div>
      </DropdownContext.Provider>
    )
  }
)

DropdownRoot.displayName = 'Dropdown.Root'

export interface DropdownTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

const DropdownTrigger = forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  ({ className, children, disabled, onClick, onKeyDown, type = 'button', ...props }, ref) => {
    const dropdown = useDropdown()

    const openAndFocusFirst = () => {
      dropdown.setOpen(true)
      requestAnimationFrame(() => {
        const content = document.getElementById(dropdown.contentId)
        if (content) {
          focusMenuItem(content, 'first')
        }
      })
    }

    return (
      <button
        ref={ref}
        id={dropdown.triggerId}
        type={type}
        aria-haspopup="menu"
        aria-controls={dropdown.contentId}
        aria-expanded={dropdown.open}
        disabled={disabled}
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented && !disabled) {
            dropdown.setOpen(!dropdown.open)
          }
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event)
          if (event.defaultPrevented || disabled) {
            return
          }

          if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            openAndFocusFirst()
          }
        }}
        className={cn(
          'box-border inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[var(--finkit-border)] bg-[var(--finkit-surface)] px-3 py-2 text-sm font-semibold text-[var(--finkit-text-main)] transition-colors',
          'hover:border-[var(--finkit-primary)]/50 hover:bg-[var(--finkit-primary)]/10',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--finkit-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--finkit-background)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

DropdownTrigger.displayName = 'Dropdown.Trigger'

export interface DropdownContentProps extends HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'end'
  children: ReactNode
}

const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ className, align = 'start', children, onKeyDown, ...props }, ref) => {
    const dropdown = useDropdown()

    if (!dropdown.open) {
      return null
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event)
      if (event.defaultPrevented) {
        return
      }

      if (event.key === 'Escape') {
        event.preventDefault()
        dropdown.setOpen(false)
        document.getElementById(dropdown.triggerId)?.focus()
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        focusMenuItem(event.currentTarget, 'next')
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        focusMenuItem(event.currentTarget, 'previous')
      }

      if (event.key === 'Home') {
        event.preventDefault()
        focusMenuItem(event.currentTarget, 'first')
      }

      if (event.key === 'End') {
        event.preventDefault()
        focusMenuItem(event.currentTarget, 'last')
      }
    }

    return (
      <div
        ref={ref}
        id={dropdown.contentId}
        role="menu"
        aria-labelledby={dropdown.triggerId}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={cn(
          'absolute top-full z-50 mt-2 min-w-44 rounded-xl border border-[var(--finkit-border)] bg-[var(--finkit-surface)] p-1 shadow-lg outline-none',
          align === 'end' ? 'right-0' : 'left-0',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

DropdownContent.displayName = 'Dropdown.Content'

export interface DropdownItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

const DropdownItem = forwardRef<HTMLButtonElement, DropdownItemProps>(
  ({ className, children, disabled, onClick, type = 'button', ...props }, ref) => {
    const dropdown = useDropdown()

    return (
      <button
        ref={ref}
        type={type}
        role="menuitem"
        disabled={disabled}
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) {
            dropdown.setOpen(false)
          }
        }}
        className={cn(
          'box-border flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-[var(--finkit-text-main)] transition-colors',
          'hover:bg-[var(--finkit-primary)]/10 focus:bg-[var(--finkit-primary)]/10',
          'focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

DropdownItem.displayName = 'Dropdown.Item'

type DropdownCompoundComponent = typeof DropdownRoot & {
  Root: typeof DropdownRoot
  Trigger: typeof DropdownTrigger
  Content: typeof DropdownContent
  Item: typeof DropdownItem
}

export const Dropdown = Object.assign(DropdownRoot, {
  Root: DropdownRoot,
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Item: DropdownItem,
}) as DropdownCompoundComponent

export const DropdownMenu = Dropdown
