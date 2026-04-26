'use client'

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode, useMemo, useState } from 'react'
import { cn } from '../../lib/utils'

type EntityType = 'merchant' | 'user'

const avatarPalette = [
  'var(--finkit-avatar-1)',
  'var(--finkit-avatar-2)',
  'var(--finkit-avatar-3)',
  'var(--finkit-avatar-4)',
  'var(--finkit-avatar-5)',
  'var(--finkit-avatar-6)',
]

const EntityAvatarRoot = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'> & {
  type: EntityType
  src?: string
  alt?: string
  fallback?: ReactNode
  children?: ReactNode // for badge
}>(
  ({ type, src, alt, fallback, className, children, ...props }, ref) => {
    const [hasError, setHasError] = useState(false)
    const fallbackLabel = typeof fallback === 'string' ? fallback : alt?.charAt(0).toUpperCase() ?? '?'
    const backgroundColor = useMemo(() => {
      const code = fallbackLabel.charCodeAt(0) || 0
      return avatarPalette[code % avatarPalette.length]
    }, [fallbackLabel])

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex-shrink-0 flex items-center justify-center overflow-hidden',
          type === 'merchant' ? 'rounded-lg' : 'rounded-full',
          className
        )}
        {...props}
      >
        {src && !hasError ? (
          <img
            src={src}
            alt={alt ?? 'entity avatar'}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[var(--finkit-text-main)]" style={{ backgroundColor }}>
            {fallback ?? <span className="text-sm font-semibold uppercase">{fallbackLabel}</span>}
          </div>
        )}
        {children}
      </div>
    )
  }
)
EntityAvatarRoot.displayName = 'EntityAvatar.Root'

const EntityAvatarBadge = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'> & {
  children: ReactNode
}>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'absolute -top-1 -right-1 w-5 h-5 bg-[var(--finkit-surface)] border border-[var(--finkit-border)] rounded-full flex items-center justify-center text-xs font-bold',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
EntityAvatarBadge.displayName = 'EntityAvatar.Badge'

export const EntityAvatar = Object.assign(EntityAvatarRoot, {
  Badge: EntityAvatarBadge,
})