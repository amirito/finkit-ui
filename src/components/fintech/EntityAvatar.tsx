'use client'

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type EntityType = 'merchant' | 'user'

const EntityAvatarRoot = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'> & {
  type: EntityType
  src?: string
  alt?: string
  fallback?: ReactNode
  children?: ReactNode // for badge
}>(
  ({ type, src, alt, fallback, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative flex items-center justify-center overflow-hidden',
        type === 'merchant' ? 'rounded-lg' : 'rounded-full',
        className
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt ?? 'entity avatar'} className="w-full h-full object-cover" loading="lazy" />
      ) : (
        fallback ?? <span className="text-sm font-semibold uppercase text-foreground/80">?</span>
      )}
      {children}
    </div>
  )
)
EntityAvatarRoot.displayName = 'EntityAvatar.Root'

const EntityAvatarBadge = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'> & {
  children: ReactNode
}>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'absolute -top-1 -right-1 w-5 h-5 bg-surface border border-border rounded-full flex items-center justify-center text-xs font-bold',
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