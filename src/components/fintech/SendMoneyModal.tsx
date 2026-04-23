'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { X, ArrowRight, Check } from 'lucide-react'
import { cn } from '../../lib/utils'
import { formatCurrency } from '../../lib/formatters'
import { mockContacts, type Contact, mockAccounts, type Account } from '../../lib/mock-data'
import { PinInput } from './PinInput'
import { CurrencyInput } from './CurrencyInput'
import { AccountCardSelector } from './AccountCardSelector'

interface SendMoneyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSend?: (amount: number, recipient: Contact, account: Account) => void
  onVerifyPin?: (pin: string) => Promise<boolean>
  initialRecipient?: Contact
}

type Step = 'amount' | 'recipient' | 'account' | 'security' | 'confirm'

const quickAmounts = [10, 20, 50]


function AmountStep({
  amount,
  onAmountChange,
  onNext,
  onCancel,
  hasQuickPay = false
}: {
  amount: string
  onAmountChange: (value: string) => void
  onNext: () => void
  onCancel?: () => void
  hasQuickPay?: boolean
}) {
  const handleQuickAmount = (value: number) => {
    onAmountChange(value.toString())
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Send Money</h2>
        <p className="text-foreground/60">Enter the amount you want to send</p>
      </div>

      <div className="w-full">
        <CurrencyInput currency="USD" onCurrencyChange={() => {}} className="w-full">
          <CurrencyInput.Field
            autoFocus
            value={amount}
            onValueChange={onAmountChange}
            placeholder="0.00"
          />
        </CurrencyInput>
      </div>

      <div className="flex justify-center gap-3">
        {quickAmounts.map((value) => (
          <motion.button
            key={value}
            onClick={() => handleQuickAmount(value)}
            className="px-4 py-2 bg-surface border border-border rounded-full text-foreground hover:bg-surface-hover transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ${value}
          </motion.button>
        ))}
      </div>

      <div className="flex gap-3">
        {hasQuickPay ? (
          <motion.button
            onClick={onCancel}
            className="flex-1 py-4 bg-surface border border-border text-foreground font-semibold rounded-2xl hover:bg-surface-hover transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </motion.button>
        ) : null}
        <motion.button
          onClick={onNext}
          disabled={!amount || parseFloat(amount) <= 0}
          className="flex-1 py-4 bg-success text-black font-semibold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Continue
        </motion.button>
      </div>
    </div>
  )
}

function RecipientStep({
  selectedRecipient,
  onRecipientSelect,
  onNext,
  onBack
}: {
  selectedRecipient: Contact | null
  onRecipientSelect: (contact: Contact) => void
  onNext: () => void
  onBack: () => void
}) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Choose Recipient</h2>
        <p className="text-foreground/60">Select who you want to send money to</p>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 px-4">
          {mockContacts.map((contact) => (
            <motion.button
              key={contact.id}
              onClick={() => onRecipientSelect(contact)}
              className={cn(
                "flex-shrink-0 flex flex-col items-center gap-3 p-4 rounded-2xl border transition-colors min-w-[100px]",
                selectedRecipient?.id === contact.id
                  ? "bg-success/10 border-success"
                  : "bg-surface border-border hover:bg-surface-hover"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-border">
                {contact.avatar ? (
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-border flex items-center justify-center text-foreground font-semibold">
                    {contact.initials}
                  </div>
                )}
              </div>
              <span className="text-sm text-foreground font-medium text-center">
                {contact.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <motion.button
          onClick={onBack}
          className="flex-1 py-4 bg-surface border border-border text-foreground font-semibold rounded-2xl hover:bg-surface-hover transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Back
        </motion.button>
        <motion.button
          onClick={onNext}
          disabled={!selectedRecipient}
          className="flex-1 py-4 bg-success text-black font-semibold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Continue
        </motion.button>
      </div>
    </div>
  )
}

function AccountStep({
  selectedAccount,
  onAccountSelect,
  onNext,
  onBack
}: {
  selectedAccount: Account | null
  onAccountSelect: (account: Account) => void
  onNext: () => void
  onBack: () => void
}) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Select Account</h2>
        <p className="text-foreground/60">Choose funding source for this transfer</p>
      </div>

      <div className="space-y-3">
        {mockAccounts.map((account) => (
          <AccountCardSelector
            key={account.id}
            balance={account.balance}
            lastFour={account.lastFour}
            provider={account.provider}
            isSelected={selectedAccount?.id === account.id}
            onSelect={() => onAccountSelect(account)}
          />
        ))}
      </div>

      <div className="flex gap-3">
        <motion.button
          onClick={onBack}
          className="flex-1 py-4 bg-surface border border-border text-foreground font-semibold rounded-2xl hover:bg-surface-hover transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Back
        </motion.button>
        <motion.button
          onClick={onNext}
          disabled={!selectedAccount}
          className="flex-1 py-4 bg-success text-black font-semibold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Continue
        </motion.button>
      </div>
    </div>
  )
}

function SecurityStep({
  onConfirm,
  onBack,
  onVerifyPin,
  isLoading
}: {
  onConfirm: () => void
  onBack: () => void
  onVerifyPin?: (pin: string) => Promise<boolean>
  isLoading: boolean
}) {
  const [pin, setPin] = useState('')
  const [isWrong, setIsWrong] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const shakeRef = useRef<HTMLDivElement>(null)

  const handlePinComplete = async (completedPin: string) => {
    if (onVerifyPin) {
      const isValid = await onVerifyPin(completedPin)
      if (isValid) {
        setIsCorrect(true)
        setTimeout(() => onConfirm(), 800)
      } else {
        setIsWrong(true)
        setPin('')
        setTimeout(() => setIsWrong(false), 500)
      }
    } else {
      // Fallback for demo
      if (completedPin === '1234') {
        setIsCorrect(true)
        setTimeout(() => onConfirm(), 800)
      } else {
        setIsWrong(true)
        setPin('')
        setTimeout(() => setIsWrong(false), 500)
      }
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Security Check</h2>
        <p className="text-foreground/60">Enter your 4-digit PIN to confirm</p>
      </div>

      <motion.div
        ref={shakeRef}
        animate={isWrong ? { x: [0, -10, 10, -10, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        <PinInput.Root
          value={pin}
          onChange={setPin}
          onComplete={handlePinComplete}
          length={4}
          className={cn(
            'justify-center',
            isCorrect && 'pointer-events-none'
          )}
        />
      </motion.div>

      {isCorrect && (
        <motion.div
          className="flex justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center border border-success">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              <Check className="w-8 h-8 text-success" />
            </motion.div>
          </div>
        </motion.div>
      )}

      {isLoading && (
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 bg-surface border border-border rounded-full flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-success border-t-transparent rounded-full animate-spin"></div>
          </div>
        </motion.div>
      )}

      {isWrong && (
        <motion.p
          className="text-center text-red-400 text-sm font-medium"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.6 }}
        >
          Incorrect PIN. Please try again.
        </motion.p>
      )}

      <div className="flex gap-3">
        <motion.button
          onClick={onBack}
          disabled={isCorrect || isLoading}
          className="flex-1 py-4 bg-surface border border-border text-foreground font-semibold rounded-2xl hover:bg-surface-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Back
        </motion.button>
      </div>
    </div>
  )
}

function ConfirmStep({
  amount,
  recipient,
  account,
  onConfirm,
  onBack
}: {
  amount: string
  recipient: Contact
  account: Account
  onConfirm: () => void
  onBack: () => void
}) {
  const dragX = useMotionValue(0)
  const dragProgress = useTransform(dragX, [0, 200], [0, 1])
  const backgroundOpacity = useTransform(dragProgress, [0, 1], [0.1, 1])

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (info.offset.x > 150) {
      onConfirm()
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Confirm Transfer</h2>
        <p className="text-foreground/60">Review and send your money</p>
      </div>

      <div className="bg-surface rounded-2xl p-6 space-y-4 border border-border">
        <div className="flex items-center justify-between">
          <span className="text-foreground-secondary">Amount</span>
          <span className="text-2xl font-mono text-success">
            {formatCurrency(parseFloat(amount))}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-foreground-secondary">To</span>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-border">
              {recipient.avatar ? (
                <img
                  src={recipient.avatar}
                  alt={recipient.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-border flex items-center justify-center text-foreground font-semibold text-sm">
                  {recipient.initials}
                </div>
              )}
            </div>
            <span className="text-foreground font-medium">{recipient.name}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-foreground-secondary">From</span>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-lg">💳</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-foreground capitalize">{account.provider}</div>
              <div className="text-xs text-foreground-secondary">•••• {account.lastFour}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <motion.button
          onClick={onBack}
          className="w-full py-4 bg-surface border border-border text-foreground font-semibold rounded-2xl hover:bg-surface-hover transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Back
        </motion.button>

        <div className="relative">
          <motion.div
            className="w-full h-16 bg-success rounded-2xl flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
            style={{ backgroundColor: backgroundOpacity }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 200 }}
              dragElastic={0.1}
              style={{ x: dragX }}
              onDragEnd={handleDragEnd}
              className="absolute left-2 w-12 h-12 bg-surface rounded-xl flex items-center justify-center shadow-lg"
            >
              <ArrowRight className="w-6 h-6 text-success" />
            </motion.div>
            <motion.span
              className="relative text-black font-semibold text-lg ml-16"
              initial={{ opacity: 0.9 }}
              animate={{ backgroundPosition: ['-150% 0%', '150% 0%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)', backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', color: 'transparent' }}
            >
              Swipe to Send
            </motion.span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export function SendMoneyModal({ open, onOpenChange, onSend, onVerifyPin, initialRecipient }: SendMoneyModalProps) {
  const [step, setStep] = useState<Step>('amount')
  const [amount, setAmount] = useState('')
  const [selectedRecipient, setSelectedRecipient] = useState<Contact | null>(null)
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (open) {
      if (initialRecipient) {
        setSelectedRecipient(initialRecipient)
      }
      setSelectedAccount((prev) => prev ?? mockAccounts[0] ?? null)
    }
  }, [open, initialRecipient])

  const skipRecipientStep = Boolean(initialRecipient)

  useEffect(() => {
    if (open) {
      setStep('amount')
      setSelectedRecipient(initialRecipient ?? null)
      setSelectedAccount((prev) => prev ?? mockAccounts[0] ?? null)
    }
  }, [open, initialRecipient])

  const resetModal = () => {
    setStep('amount')
    setAmount('')
    setSelectedRecipient(null)
    setSelectedAccount(null)
    setIsLoading(false)
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      resetModal()
    }
    onOpenChange(isOpen)
  }

  const handleNext = () => {
    if (step === 'amount') {
      if (skipRecipientStep) {
        setStep('account')
      } else {
        setStep('recipient')
      }
    } else if (step === 'recipient') {
      setStep('account')
    } else if (step === 'account') {
      setStep('security')
    } else if (step === 'security') {
      setStep('confirm')
    }
  }

  const handleBack = () => {
    if (step === 'amount' && skipRecipientStep) {
      handleOpenChange(false)
      return
    }

    if (step === 'recipient') {
      setStep('amount')
    } else if (step === 'account') {
      setStep('recipient')
    } else if (step === 'security') {
      setStep('account')
    } else if (step === 'confirm') {
      setStep('account')
    }
  }

  const handleConfirm = () => {
    if (selectedRecipient && selectedAccount && amount) {
      onSend?.(parseFloat(amount), selectedRecipient, selectedAccount)
      handleOpenChange(false)
    }
  }

  const verifyPin = async (pin: string) => {
    if (!onVerifyPin) {
      return pin === '1234'
    }

    setIsLoading(true)
    const isValid = await onVerifyPin(pin)
    setIsLoading(false)
    return isValid
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
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
            className="fixed inset-x-4 top-10 -translate-y-0 z-50 w-full max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <motion.div className="bg-surface border border-border rounded-3xl p-6 shadow-2xl max-w-md overflow-visible mx-auto" layout>
              <div className="flex items-center justify-between mb-6">
                <Dialog.Title className="text-xl font-semibold text-foreground">
                  {step === 'amount' && 'Enter Amount'}
                  {step === 'recipient' && 'Choose Recipient'}
                  {step === 'account' && 'Select Account'}
                  {step === 'security' && 'Security Check'}
                  {step === 'confirm' && 'Confirm Transfer'}
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground/60 hover:bg-surface-hover transition-colors"
                    aria-label="Close send money modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </Dialog.Close>
              </div>

              <AnimatePresence mode="wait">
                {step === 'amount' && (
                  <motion.div
                    key="amount"
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <AmountStep
                      amount={amount}
                      onAmountChange={setAmount}
                      onNext={handleNext}
                      onCancel={() => handleOpenChange(false)}
                      hasQuickPay={skipRecipientStep}
                    />
                  </motion.div>
                )}

                {step === 'recipient' && (
                  <motion.div
                    key="recipient"
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <RecipientStep
                      selectedRecipient={selectedRecipient}
                      onRecipientSelect={setSelectedRecipient}
                      onNext={handleNext}
                      onBack={handleBack}
                    />
                  </motion.div>
                )}

                {step === 'account' && (
                  <motion.div
                    key="account"
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <AccountStep
                      selectedAccount={selectedAccount}
                      onAccountSelect={setSelectedAccount}
                      onNext={handleNext}
                      onBack={handleBack}
                    />
                  </motion.div>
                )}

                {step === 'security' && (
                  <motion.div
                    key="security"
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <SecurityStep
                      onConfirm={handleNext}
                      onBack={handleBack}
                      onVerifyPin={verifyPin}
                      isLoading={isLoading}
                    />
                  </motion.div>
                )}

                {step === 'confirm' && selectedAccount && selectedRecipient && (
                  <motion.div
                    key="confirm"
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <ConfirmStep
                      amount={amount}
                      recipient={selectedRecipient}
                      account={selectedAccount}
                      onConfirm={handleConfirm}
                      onBack={handleBack}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}