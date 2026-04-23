'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TransactionRow, TransactionDetailDrawer, SendMoneyModal, AddMoneyModal, HeroBalanceCard, SpendingOverviewChart, StatCard, Stat, ThemeToggle, FintechSkeleton, EntityAvatar, UsageMeter, StatusTimeline, CurrencyInput, AccountCardSelector } from '@/components'
import { mockTransactions, mockDashboardStats, chartDataSets, mockContacts, mockBankAccounts, type Transaction, type Contact, type Account } from '../lib/mock-data'
import { usePrivacyToggle } from '@/hooks'
import { formatCurrency, formatNumber } from '../lib/formatters'
import { TrendingUp, TrendingDown, Wallet, CreditCard, Plus, ArrowUpRight } from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

export default function Dashboard() {
  const { isVisible, toggle } = usePrivacyToggle(true)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [sendMoneyOpen, setSendMoneyOpen] = useState(false)
  const [isAddMoneyModalOpen, setIsAddMoneyModalOpen] = useState(false)
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('week')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Dynamic balance trend data
  const balanceTrend = {
    label: 'from last month',
    value: '4.2%',
    direction: 'up' as const
  }

  // Get chart data based on time range
  const chartData = chartDataSets[timeRange]

  const openTransactionDetail = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setDetailOpen(true)
  }

  const handleSendMoney = (amount: number, recipient: Contact, account: Account) => {
    console.log(`Sending $${amount} to ${recipient.name} from ${account.provider} •••• ${account.lastFour}`)
    // Here you would integrate with your payment API
  }

  const handleQuickPay = (contact: Contact) => {
    setSelectedContact(contact)
    setSendMoneyOpen(true)
  }

  const handleCloseAddMoneyModal = () => {
    setIsAddMoneyModalOpen(false)
  }

  const handleVerifyPin = async (pin: string): Promise<boolean> => {
    // Simulate backend verification
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(pin === '1234') // Demo PIN
      }, 1500)
    })
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {isLoading ? (
        <div className="flex items-center justify-center py-24">
          <FintechSkeleton.BalanceCard className="w-full max-w-2xl" />
        </div>
      ) : (
        <>
          {/* Header */}
          <motion.div variants={item} className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-foreground-secondary mt-1">
                Welcome back! Here's your financial overview.
              </p>
            </div>
            <ThemeToggle />
          </motion.div>

      {/* Bento Grid Layout */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
      >
        {/* Total Balance Card */}
        <Stat.Root>
          <div className="flex items-center justify-between mb-3">
            <Stat.Label>Total Balance</Stat.Label>
            <Wallet className="w-4 h-4 text-foreground-secondary group-hover:text-success transition-colors" />
          </div>
          <div className="space-y-2">
            <Stat.Value isVisible={isVisible}>{formatCurrency(mockDashboardStats.totalBalance)}</Stat.Value>
            <Stat.Trend change={4.2} format="currency" />
          </div>
        </Stat.Root>

        {/* Monthly Spending Card */}
        <Stat.Root>
          <div className="flex items-center justify-between mb-3">
            <Stat.Label>Monthly Spending</Stat.Label>
            <TrendingDown className="w-4 h-4 text-foreground-secondary group-hover:text-success transition-colors" />
          </div>
          <div className="space-y-2">
            <Stat.Value isVisible={isVisible}>{formatCurrency(mockDashboardStats.monthlySpending)}</Stat.Value>
            <Stat.Trend change={-2.1} format="currency" />
          </div>
        </Stat.Root>

        {/* Monthly Income Card */}
        <Stat.Root>
          <div className="flex items-center justify-between mb-3">
            <Stat.Label>Monthly Income</Stat.Label>
            <TrendingUp className="w-4 h-4 text-foreground-secondary group-hover:text-success transition-colors" />
          </div>
          <div className="space-y-2">
            <Stat.Value isVisible={isVisible}>{formatCurrency(mockDashboardStats.monthlyIncome)}</Stat.Value>
            <Stat.Trend change={12.5} format="currency" />
          </div>
        </Stat.Root>

        {/* Savings Rate Card */}
        <Stat.Root>
          <div className="flex items-center justify-between mb-3">
            <Stat.Label>Savings Rate</Stat.Label>
            <CreditCard className="w-4 h-4 text-foreground-secondary group-hover:text-success transition-colors" />
          </div>
          <div className="space-y-2">
            <Stat.Value isVisible={isVisible}>{formatNumber(mockDashboardStats.savingsRate)}%</Stat.Value>
            <Stat.Trend change={8.3} format="percentage" />
          </div>
        </Stat.Root>

        {/* Account Health Card */}
        <div className="p-6 bg-surface border border-border rounded-xl">
          <UsageMeter
            current={750}
            limit={1000}
            label="Monthly Budget"
            warningThreshold={0.8}
          />
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hero Card - Takes 2 columns */}
        <div className="lg:col-span-2">
          <HeroBalanceCard trend={balanceTrend}>
            <HeroBalanceCard.Balance
              amount={isVisible ? mockDashboardStats.totalBalance : '****.**'}
              currency="USD"
            />
            <HeroBalanceCard.Actions>
              <HeroBalanceCard.Action
                icon={<Plus className="h-4 w-4" />}
                label="Add Money"
                onClick={() => setIsAddMoneyModalOpen(true)}
              />
              <HeroBalanceCard.Action
                icon={<ArrowUpRight className="h-4 w-4" />}
                label="Send Money"
                onClick={() => setSendMoneyOpen(true)}
              />
            </HeroBalanceCard.Actions>
          </HeroBalanceCard>
        </div>

        {/* Quick Pay Section */}
        <div className="space-y-4">
          <div className="p-6 bg-surface border border-border rounded-xl">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Pay</h3>
            <div className="grid grid-cols-2 gap-4 justify-between">
              {mockContacts.slice(0, 4).map((contact) => (
                <motion.button
                  key={contact.id}
                  type="button"
                  onClick={() => handleQuickPay(contact)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex flex-col items-center justify-between gap-3 rounded-3xl border border-border bg-surface p-4 text-center transition-all hover:border-success/40"
                >
                  <EntityAvatar
                    type="user"
                    src={contact.avatar}
                    alt={contact.name}
                    fallback={contact.initials}
                    className="w-12 h-12"
                  />
                  <span className="text-sm text-foreground-secondary truncate">
                    {contact.name.split(' ')[0]}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Spending Chart */}
          <div className="p-6 bg-surface border border-border rounded-xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Balance Trend</h3>
                <p className="text-sm text-foreground-secondary">Last 7 days</p>
              </div>
            </div>

            {/* Time Range Selector */}
            <div className="flex gap-2 mb-4">
              {['day', 'week', 'month', 'year'].map((range) => (
                <motion.button
                  key={range}
                  onClick={() => setTimeRange(range as any)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    timeRange === range
                      ? 'bg-success text-black'
                      : 'bg-surface-hover text-foreground-secondary hover:text-foreground'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </motion.button>
              ))}
            </div>

            <SpendingOverviewChart data={chartData} />
          </div>
        </div>
      </motion.div>

      {/* Transactions Section */}
      <motion.div variants={item} className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Recent Transactions</h2>
            <p className="text-foreground/60 text-sm mt-1">Your latest financial activity</p>
          </div>
          <a href="/transactions" className="text-sm text-success hover:text-success/80 transition-colors font-medium">
            View all →
          </a>
        </div>

        <motion.div
          className="space-y-2"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {mockTransactions.slice(0, 6).map((transaction, index) => (
            <motion.div key={transaction.id} variants={item}>
              <TransactionRow
                merchant={transaction.merchant}
                category={transaction.category}
                subText={transaction.subText}
                amount={transaction.amount}
                status={transaction.status}
                isSubscription={transaction.isSubscription}
                iconUrl={transaction.icon}
                onClick={() => openTransactionDetail(transaction)}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <TransactionDetailDrawer
        open={detailOpen}
        transaction={selectedTransaction}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setSelectedTransaction(null)
          }
          setDetailOpen(isOpen)
        }}
      />
      <SendMoneyModal
        open={sendMoneyOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setSelectedContact(null)
          }
          setSendMoneyOpen(isOpen)
        }}
        onSend={handleSendMoney}
        onVerifyPin={handleVerifyPin}
        initialRecipient={selectedContact ?? undefined}
      />
      <AnimatePresence>
        {isAddMoneyModalOpen && (
          <AddMoneyModal
            isOpen={isAddMoneyModalOpen}
            onClose={handleCloseAddMoneyModal}
            linkedAccounts={mockBankAccounts}
            currentBalance={mockDashboardStats.totalBalance}
            onAdd={(amount, account) => {
              console.log(`Adding $${amount} to ${account.provider} •••• ${account.lastFour}`)
            }}
          />
        )}
      </AnimatePresence>
        </>
      )}
    </motion.div>
  )
}

