'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/formatters'
import type { Transaction } from '@/lib/mock-data'

interface TransactionDetailDrawerProps {
  open: boolean
  transaction: Transaction | null
  onOpenChange: (open: boolean) => void
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function DataPoint({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs uppercase tracking-[0.25em] text-foreground-secondary font-medium">{label}</span>
      <span className="text-sm text-foreground font-semibold">{value}</span>
    </div>
  )
}

export function TransactionDetailDrawer({ open, transaction, onOpenChange }: TransactionDetailDrawerProps) {
  if (!transaction) return null

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[8px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        </Dialog.Overlay>

        <Dialog.Content asChild>
          <motion.div
            className="fixed inset-x-0 bottom-0 z-50 flex justify-end md:inset-y-0 md:right-0 md:left-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="w-full max-w-[420px] h-[calc(100vh-2rem)] md:h-full bg-surface border border-border rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none shadow-2xl overflow-hidden flex flex-col">
              <div className="px-6 py-5 border-b border-border">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-3xl bg-border overflow-hidden flex items-center justify-center">
                      {transaction.icon ? (
                        <img
                          src={transaction.icon}
                          alt={`${transaction.merchant} logo`}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-2xl font-semibold text-foreground">
                          {transaction.merchant.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <Dialog.Title className="text-sm text-foreground/60 uppercase tracking-[0.25em] font-semibold">
                        Transaction detail
                      </Dialog.Title>
                      <h2 className="mt-2 text-2xl font-semibold text-foreground">
                        {transaction.merchant}
                      </h2>
                    </div>
                  </div>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/60 hover:bg-white/5 transition"
                      aria-label="Close transaction detail"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </Dialog.Close>
                </div>
                <div className="mt-5">
                  <span className={cn(
                    'inline-flex items-center rounded-full px-3 py-2 text-sm font-semibold',
                    transaction.status === 'cleared'
                      ? 'bg-emerald-500/10 text-emerald-200 border border-emerald-300/20'
                      : transaction.status === 'pending'
                      ? 'bg-amber-500/10 text-amber-200 border border-amber-300/20'
                      : 'bg-red-500/10 text-red-200 border border-red-300/20'
                  )}
                  >
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                <div className="space-y-4">
                  <DataPoint label="Date" value={formatDate(transaction.date)} />
                  <DataPoint label="Category" value={transaction.category} />
                  <DataPoint
                    label="Payment method"
                    value={transaction.paymentMethod ?? 'Visa •••• 1234'}
                  />
                  <DataPoint
                    label="Reference ID"
                    value={transaction.referenceId ?? transaction.id}
                  />
                </div>

                <div className="space-y-3">
                  <button
                    type="button"
                    className="w-full inline-flex items-center justify-center rounded-2xl bg-success px-4 py-3 text-sm font-semibold text-black shadow-lg shadow-success/20 hover:bg-success/90 transition"
                  >
                    Download PDF Receipt
                  </button>
                  <button
                    type="button"
                    className="w-full text-sm font-semibold text-foreground/80 hover:text-foreground transition"
                  >
                    Dispute Transaction
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
