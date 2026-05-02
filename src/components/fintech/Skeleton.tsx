'use client'

import { forwardRef, type CSSProperties, type HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

export type SkeletonVariant = 'rect' | 'circle'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: CSSProperties['width']
  height?: CSSProperties['height']
  variant?: SkeletonVariant
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, width = '100%', height = '1rem', variant = 'rect', style, ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        'finkit-root box-border animate-pulse bg-[var(--finkit-surface)]',
        'relative overflow-hidden',
        variant === 'circle' ? 'rounded-full' : 'rounded-md',
        className
      )}
      style={{
        width,
        height,
        ...style,
      }}
      {...props}
    />
  )
)

Skeleton.displayName = 'Skeleton'
