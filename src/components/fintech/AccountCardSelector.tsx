'use client'

import React, { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { motion } from 'framer-motion'
import { CreditCardIcon, CheckIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

interface AccountCardSelectorProps extends ComponentPropsWithoutRef<'button'> {
  balance: number
  lastFour: string
  provider: 'visa' | 'mastercard' | 'amex' | 'discover'
  isSelected?: boolean
  onSelect?: () => void
}

const providerIcons = {
  visa: '💳', // Using emoji for simplicity, could be replaced with actual icons
  mastercard: '💳',
  amex: '💳',
  discover: '💳',
}

const AccountCardSelector = forwardRef<HTMLButtonElement, AccountCardSelectorProps>(
  ({ balance, lastFour, provider, isSelected = false, onSelect, className, ...props }, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <button
          ref={ref}
          onClick={onSelect}
          className={cn(
            'relative w-full p-4 bg-surface border rounded-xl text-left transition-all hover:bg-border/30 focus:outline-none focus:ring-2 focus:ring-success/20',
            isSelected ? 'border-success bg-success/5' : 'border-border',
            className
          )}
          {...props}
        >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-lg">{providerIcons[provider]}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground capitalize">{provider}</span>
                <span className="text-xs text-foreground-secondary">•••• {lastFour}</span>
              </div>
              <div className="text-lg font-bold text-foreground">
                ${balance.toLocaleString()}
              </div>
            </div>
          </div>
          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-6 h-6 bg-success rounded-full flex items-center justify-center"
            >
              <CheckIcon className="w-4 h-4 text-white" />
            </motion.div>
          )}
        </div>
        </button>
      </motion.div>
    )
  }
)

AccountCardSelector.displayName = 'AccountCardSelector'

export { AccountCardSelector }