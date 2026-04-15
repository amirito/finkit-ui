'use client'

import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

const FintechSkeletonTransaction = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center justify-between p-4 bg-surface border border-border rounded-lg animate-pulse', className)}
      {...props}
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-border rounded-full"></div>
        <div className="space-y-1">
          <div className="w-24 h-4 bg-border rounded"></div>
          <div className="w-16 h-3 bg-border rounded"></div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-16 h-4 bg-border rounded"></div>
        <div className="w-12 h-6 bg-border rounded-full"></div>
      </div>
    </div>
  )
)
FintechSkeletonTransaction.displayName = 'FintechSkeleton.Transaction'

const FintechSkeletonBalanceCard = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-6 bg-surface border border-border rounded-lg animate-pulse', className)}
      {...props}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="w-20 h-4 bg-border rounded"></div>
          <div className="w-32 h-8 bg-border rounded"></div>
        </div>
        <div className="flex justify-between">
          <div className="w-16 h-4 bg-border rounded"></div>
          <div className="w-16 h-4 bg-border rounded"></div>
        </div>
        <div className="w-full h-16 bg-border rounded"></div>
        <div className="flex gap-2">
          <div className="flex-1 h-10 bg-border rounded"></div>
          <div className="flex-1 h-10 bg-border rounded"></div>
        </div>
      </div>
    </div>
  )
)
FintechSkeletonBalanceCard.displayName = 'FintechSkeleton.BalanceCard'

export const FintechSkeleton = {
  Transaction: FintechSkeletonTransaction,
  BalanceCard: FintechSkeletonBalanceCard,
}