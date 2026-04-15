'use client'

import React, { type ComponentPropsWithoutRef } from 'react'
import { motion } from 'framer-motion'
import { CheckIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Account } from '@/lib/mock-data'

interface AccountSelectorProps {
  accounts: Account[]
  selectedAccountId?: string
  onSelect: (account: Account) => void
}

const providerAccent: Record<Account['provider'], string> = {
  visa: 'border-blue-500/80 bg-blue-500/10',
  mastercard: 'border-orange-500/80 bg-orange-500/10',
  amex: 'border-teal-500/80 bg-teal-500/10',
  discover: 'border-amber-500/80 bg-amber-500/10',
}

const providerLabels: Record<Account['provider'], string> = {
  visa: 'Chase Checking',
  mastercard: 'Bank Savings',
  amex: 'Rewards Card',
  discover: 'Everyday Card',
}

export function AccountSelector({ accounts, selectedAccountId, onSelect }: AccountSelectorProps) {
  return (
    <div className="grid gap-3">
      {accounts.map((account) => {
        const isSelected = account.id === selectedAccountId
        return (
          <motion.button
            key={account.id}
            type="button"
            onClick={() => onSelect(account)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              'relative w-full overflow-hidden rounded-3xl border p-4 text-left transition-shadow focus:outline-none',
              providerAccent[account.provider],
              isSelected ? 'border-2 shadow-lg shadow-success/10 bg-surface' : 'border-border bg-surface',
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-white/10 text-sm text-foreground">
                    {account.provider.toUpperCase()}
                  </span>
                  <span className="text-sm font-semibold text-foreground">{providerLabels[account.provider]}</span>
                </div>
                <div className="text-xs uppercase tracking-[0.22em] text-foreground-secondary">
                  •••• {account.lastFour}
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-foreground-secondary">Available</p>
                <p className="text-lg font-semibold text-foreground">${account.balance.toLocaleString()}</p>
              </div>
            </div>

            {isSelected && (
              <span className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-success text-white shadow-sm">
                <CheckIcon className="h-4 w-4" />
              </span>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
