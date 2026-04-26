'use client'

import {
  forwardRef,
  useEffect,
  useId,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../lib/utils'

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  isOpen: boolean
  onClose: () => void
  title?: ReactNode
  description?: ReactNode
  children: ReactNode
  closeOnOverlayClick?: boolean
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      className,
      isOpen,
      onClose,
      title,
      description,
      children,
      closeOnOverlayClick = true,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const titleId = useId()
    const descriptionId = useId()

    useEffect(() => {
      if (!isOpen) return

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose()
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, onClose])

    if (!isOpen || typeof document === 'undefined') {
      return null
    }

    return createPortal(
      <div className="finkit-root fixed inset-0 z-50 box-border flex items-center justify-center p-4">
        <div
          className="absolute inset-0 box-border bg-black/60 backdrop-blur-sm"
          onClick={closeOnOverlayClick ? onClose : undefined}
          aria-hidden="true"
        />
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : ariaLabelledBy}
          aria-describedby={description ? descriptionId : ariaDescribedBy}
          className={cn(
            'relative z-10 box-border w-full max-w-lg rounded-3xl border border-[var(--finkit-border)] bg-[var(--finkit-surface)] p-6 text-[var(--finkit-text-main)] shadow-2xl',
            className
          )}
          {...props}
        >
          {title ? (
            <h2 id={titleId} className="box-border text-xl font-semibold text-[var(--finkit-text-main)]">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p id={descriptionId} className="box-border mt-2 text-sm text-[var(--finkit-text-muted)]">
              {description}
            </p>
          ) : null}
          <div className={cn('box-border', (title || description) && 'mt-6')}>{children}</div>
        </div>
      </div>,
      document.body
    )
  }
)

Modal.displayName = 'Modal'
