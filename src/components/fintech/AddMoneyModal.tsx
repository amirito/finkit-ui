'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { X, Check, ArrowUpRight } from 'lucide-react'
import { cn } from '../../lib/utils'
import { formatAmount } from '../../lib/formatters'
import { type Account } from '../../lib/mock-data'
import { CurrencyInput } from './CurrencyInput'
import { AccountSelector } from './AccountSelector'
import { PinInput } from './PinInput'

interface AddMoneyModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd?: (amount: number, account: Account) => void
  currentBalance?: number
  linkedAccounts: Account[]
}

type Step = 'amount' | 'security' | 'confirm'

export function AddMoneyModal({
  isOpen,
  onClose,
  onAdd,
  currentBalance = 0,
  linkedAccounts,
}: AddMoneyModalProps) {
  const [step, setStep] = useState<Step>('amount')
  const [amount, setAmount] = useState('')
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setStep('amount')
      setAmount('')
      setPin('')
      setPinError(false)
      setShowSuccess(false)
      setIsLoading(false)
      setSelectedAccount((prev) => prev ?? linkedAccounts[0] ?? null)
    }
  }, [isOpen, linkedAccounts])

  const amountValue = parseFloat(amount)
  const isAmountValid = !Number.isNaN(amountValue) && amountValue > 0
  const needsSecurity = isAmountValid && amountValue >= 500
  const canContinue = isAmountValid && Boolean(selectedAccount)

  const previewBalance = useMemo(() => {
    if (!isAmountValid) return currentBalance
    return currentBalance + amountValue
  }, [amountValue, currentBalance, isAmountValid])

  const handleClose = () => {
    setStep('amount')
    setAmount('')
    setSelectedAccount(null)
    setShowSuccess(false)
    setIsLoading(false)
    onClose()
  }

  const handleNext = () => {
    if (!canContinue) return
    if (needsSecurity) {
      setStep('security')
    } else {
      setStep('confirm')
    }
  }

  const handleConfirm = () => {
    if (!selectedAccount || !isAmountValid) return
    setShowSuccess(true)
    onAdd?.(amountValue, selectedAccount)
    window.setTimeout(() => {
      handleClose()
    }, 850)
  }

  const handlePinComplete = async (completedPin: string) => {
    setIsLoading(true)
    await new Promise((resolve) => window.setTimeout(resolve, 650))
    setIsLoading(false)

    if (completedPin === '1234') {
      setPinError(false)
      setStep('confirm')
    } else {
      setPinError(true)
      setPin('')
      setTimeout(() => setPinError(false), 900)
    }
  }

  const statusLabel = needsSecurity ? 'Smart security required for amounts above $500' : 'Fast top-up, no PIN needed'

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) handleClose() }}>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        </Dialog.Overlay>

        <Dialog.Content asChild>
          <motion.div
            className="fixed inset-x-4 top-10 z-50 mx-auto w-full max-w-lg"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
          >
            <div className="relative overflow-hidden rounded-[32px] border border-border bg-surface p-6 shadow-2xl">
              <AnimatePresence mode="wait">
                {showSuccess && (
                  <motion.div
                    key="success-bg"
                    className="pointer-events-none absolute inset-0 bg-success/10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </AnimatePresence>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <Dialog.Title className="text-2xl font-semibold text-foreground">
                    {step === 'amount' && 'Add Funds'}
                    {step === 'security' && 'Verify Top-Up'}
                    {step === 'confirm' && 'Confirm Top-Up'}
                  </Dialog.Title>
                  <p className="mt-2 text-sm text-foreground-secondary">
                    {step === 'amount' && 'Choose a source and enter the amount you want to add.'}
                    {step === 'security' && 'Confirm this top-up with your secure PIN.'}
                    {step === 'confirm' && 'Review the new balance before adding funds.'}
                  </p>
                </div>

                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/70 hover:bg-surface-hover transition-colors"
                    aria-label="Close add funds modal"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </Dialog.Close>
              </div>

              <div className="mt-6 space-y-6">
                <div className="rounded-3xl border border-border bg-surface p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-foreground-secondary">Current balance</p>
                      <p className="text-2xl font-semibold text-foreground">{formatAmount(currentBalance)}</p>
                    </div>
                    <div className="rounded-3xl bg-foreground/5 px-4 py-2 text-sm text-foreground-secondary">
                      {statusLabel}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {showSuccess ? (
                      <motion.div
                        key="rising-balance"
                        className="mt-5 overflow-hidden rounded-3xl bg-success/10 p-4 text-success"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: -10 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.7 }}
                      >
                        <p className="text-xs uppercase tracking-[0.24em] text-success/70">New balance</p>
                        <p className="text-3xl font-semibold">{formatAmount(previewBalance)}</p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="preview-balance"
                        className="mt-5 rounded-3xl border border-border bg-surface p-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-xs uppercase tracking-[0.24em] text-foreground-secondary">New balance preview</p>
                        <p className="text-2xl font-semibold text-foreground">{formatAmount(previewBalance)}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                  {step === 'amount' && (
                    <motion.div
                      key="amount-step"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="space-y-5">
                        <div>
                          <p className="text-sm font-medium text-foreground">From</p>
                          <p className="text-sm text-foreground-secondary">Select the source for this top-up.</p>
                        </div>
                        <AccountSelector
                          accounts={linkedAccounts}
                          selectedAccountId={selectedAccount?.id}
                          onSelect={setSelectedAccount}
                        />

                        <div>
                          <label className="text-sm font-medium text-foreground">Amount</label>
                          <div className="mt-3">
                            <CurrencyInput currency="USD" onCurrencyChange={() => {}} className="w-full">
                              <CurrencyInput.Field
                                value={amount}
                                onValueChange={setAmount}
                                placeholder="0.00"
                                autoFocus
                              />
                            </CurrencyInput>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 'security' && (
                    <motion.div
                      key="security-step"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="space-y-6 rounded-3xl border border-border bg-surface p-5">
                        <div>
                          <p className="text-sm font-medium text-foreground">Secure approval</p>
                          <p className="text-sm text-foreground-secondary">Enter your 4-digit PIN to complete the top-up.</p>
                        </div>
                        <PinInput.Root
                          value={pin}
                          onChange={setPin}
                          onComplete={handlePinComplete}
                          length={4}
                          className="justify-center"
                        />
                        {pinError && (
                          <p className="text-center text-sm text-red-400">Incorrect PIN. Please try again.</p>
                        )}
                        {isLoading && (
                          <div className="flex items-center justify-center gap-2 text-sm text-foreground-secondary">
                            <div className="h-3 w-3 rounded-full animate-pulse bg-success" />
                            Verifying PIN...
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {step === 'confirm' && (
                    <motion.div
                      key="confirm-step"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="space-y-5 rounded-3xl border border-border bg-surface p-5">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm uppercase tracking-[0.24em] text-foreground-secondary">Amount to add</p>
                            <p className="text-3xl font-semibold text-foreground">{formatAmount(amountValue)}</p>
                          </div>
                          <div className="rounded-3xl bg-success/10 px-3 py-2 text-sm font-semibold text-success">
                            {selectedAccount?.type ?? 'Account'}
                          </div>
                        </div>

                        <div className="grid gap-3 rounded-3xl border border-border bg-surface p-4">
                          <div className="flex items-center justify-between text-sm text-foreground-secondary">
                            <span>Source</span>
                            <span>{selectedAccount ? `${selectedAccount.provider.toUpperCase()} •••• ${selectedAccount.lastFour}` : '-'}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm text-foreground-secondary">
                            <span>New balance</span>
                            <span>{formatAmount(previewBalance)}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    if (step === 'amount') {
                      handleClose()
                      return
                    }
                    setStep('amount')
                  }}
                  className="flex-1 rounded-2xl border border-border bg-surface py-4 text-sm font-semibold text-foreground transition-colors hover:bg-surface-hover"
                >
                  {step === 'amount' ? 'Cancel' : 'Back'}
                </button>
                <button
                  type="button"
                  onClick={step === 'confirm' ? handleConfirm : handleNext}
                  disabled={!canContinue || (step === 'security' && isLoading)}
                  className={cn(
                    'flex-1 rounded-2xl py-4 text-sm font-semibold transition-all',
                    step === 'confirm'
                      ? 'bg-success text-black hover:bg-success/90'
                      : 'bg-primary text-white hover:bg-primary/90',
                    (!canContinue || (step === 'security' && isLoading)) && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  {step === 'confirm'
                    ? `Add ${isAmountValid ? formatAmount(amountValue) : ''} Now`
                    : step === 'security'
                    ? 'Verify PIN'
                    : 'Continue'}
                </button>
              </div>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
