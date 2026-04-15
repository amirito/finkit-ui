'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TransactionRow, TransactionDetailDrawer, SendMoneyModal, HeroBalanceCard, SpendingOverviewChart, StatCard, Stat, ThemeToggle } from '@/components'
import { mockTransactions, mockDashboardStats, chartDataSets, type Transaction, type Contact } from '@/lib/mock-data'
import { usePrivacyToggle } from '@/hooks'
import { formatCurrency, formatNumber } from '@/lib/formatters'
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
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('week')

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

  const handleSendMoney = (amount: number, recipient: Contact) => {
    console.log(`Sending $${amount} to ${recipient.name}`)
    // Here you would integrate with your payment API
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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
                onClick={() => console.log('Add money')}
              />
              <HeroBalanceCard.Action
                icon={<ArrowUpRight className="h-4 w-4" />}
                label="Send Money"
                onClick={() => setSendMoneyOpen(true)}
              />
            </HeroBalanceCard.Actions>
          </HeroBalanceCard>
        </div>

        {/* Spending Chart - Takes 1 column */}
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
        onOpenChange={setSendMoneyOpen}
        onSend={handleSendMoney}
        onVerifyPin={handleVerifyPin}
      />
    </motion.div>
  )
}

