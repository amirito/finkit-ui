'use client'

import {
  createContext,
  forwardRef,
  useContext,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/utils'

export interface AvatarProps extends ComponentPropsWithoutRef<'div'> {
  src?: string
  alt?: string
  fallback?: ReactNode
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, children, ...props }, ref) => {
    const [hasError, setHasError] = useState(false)
    const fallbackLabel = fallback ?? alt?.trim().charAt(0).toUpperCase() ?? '?'

    return (
      <div
        ref={ref}
        className={cn(
          'finkit-root box-border inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--finkit-border)] bg-[var(--finkit-surface)] text-sm font-semibold text-[var(--finkit-text-main)]',
          className
        )}
        {...props}
      >
        {src && !hasError ? (
          <img
            src={src}
            alt={alt ?? ''}
            loading="lazy"
            onError={() => setHasError(true)}
            className="box-border h-full w-full object-cover"
          />
        ) : (
          <span className="box-border flex h-full w-full items-center justify-center uppercase">
            {fallbackLabel}
          </span>
        )}
        {children}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

interface AvatarGroupContextValue {
  sizeClassName: string
}

const AvatarGroupContext = createContext<AvatarGroupContextValue | null>(null)

export interface AvatarGroupRootProps extends ComponentPropsWithoutRef<'div'> {
  sizeClassName?: string
}

const AvatarGroupRoot = forwardRef<HTMLDivElement, AvatarGroupRootProps>(
  ({ className, sizeClassName = 'h-10 w-10', children, ...props }, ref) => (
    <AvatarGroupContext.Provider value={{ sizeClassName }}>
      <div
        ref={ref}
        className={cn('finkit-root box-border flex items-center', className)}
        {...props}
      >
        {children}
      </div>
    </AvatarGroupContext.Provider>
  )
)

AvatarGroupRoot.displayName = 'AvatarGroup.Root'

const AvatarGroupAvatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, ...props }, ref) => {
    const context = useContext(AvatarGroupContext)

    return (
      <Avatar
        ref={ref}
        className={cn(
          'relative -ml-2 first:ml-0 ring-2 ring-[var(--finkit-surface)]',
          context?.sizeClassName,
          className
        )}
        {...props}
      />
    )
  }
)

AvatarGroupAvatar.displayName = 'AvatarGroup.Avatar'

export interface AvatarGroupCountProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode
}

const AvatarGroupCount = forwardRef<HTMLDivElement, AvatarGroupCountProps>(
  ({ className, children, ...props }, ref) => {
    const context = useContext(AvatarGroupContext)

    return (
      <div
        ref={ref}
        className={cn(
          'box-border relative -ml-2 inline-flex items-center justify-center rounded-full border border-[var(--finkit-border)] bg-[var(--finkit-surface)] text-xs font-semibold text-[var(--finkit-text-main)] ring-2 ring-[var(--finkit-surface)] first:ml-0',
          context?.sizeClassName ?? 'h-10 w-10',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

AvatarGroupCount.displayName = 'AvatarGroup.Count'

type AvatarGroupCompoundComponent = typeof AvatarGroupRoot & {
  Root: typeof AvatarGroupRoot
  Avatar: typeof AvatarGroupAvatar
  Count: typeof AvatarGroupCount
}

export const AvatarGroup = Object.assign(AvatarGroupRoot, {
  Root: AvatarGroupRoot,
  Avatar: AvatarGroupAvatar,
  Count: AvatarGroupCount,
}) as AvatarGroupCompoundComponent
