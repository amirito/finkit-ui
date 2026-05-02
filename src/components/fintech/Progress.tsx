'use client'

import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { cn } from '../../lib/utils'

function clampProgress(value: number) {
  return Math.min(100, Math.max(0, value))
}

export interface ProgressBarProps extends ComponentPropsWithoutRef<'div'> {
  value: number
  max?: number
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value, max = 100, ...props }, ref) => {
    const percent = clampProgress(max > 0 ? (value / max) * 100 : 0)
    const currentValue = Math.min(max, Math.max(0, value))

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={currentValue}
        className={cn(
          'finkit-root box-border h-2 w-full overflow-hidden rounded-full bg-[var(--finkit-surface)]',
          className
        )}
        {...props}
      >
        <div
          className="box-border h-full rounded-full bg-[var(--finkit-primary)] transition-[width] duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    )
  }
)

ProgressBar.displayName = 'ProgressBar'

export interface ProgressCircleProps extends ComponentPropsWithoutRef<'svg'> {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
}

export const ProgressCircle = forwardRef<SVGSVGElement, ProgressCircleProps>(
  ({ className, value, max = 100, size = 44, strokeWidth = 4, ...props }, ref) => {
    const percent = clampProgress(max > 0 ? (value / max) * 100 : 0)
    const currentValue = Math.min(max, Math.max(0, value))
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (percent / 100) * circumference

    return (
      <svg
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={currentValue}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={cn('finkit-root box-border -rotate-90', className)}
        {...props}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="fill-none stroke-[var(--finkit-surface)]"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="fill-none stroke-[var(--finkit-primary)] transition-[stroke-dashoffset] duration-300 ease-out"
        />
      </svg>
    )
  }
)

ProgressCircle.displayName = 'ProgressCircle'
