# Fintech-Kit Usage Examples

## Component Usage

### TransactionRow

```tsx
import { TransactionRow } from '@/components'

<TransactionRow
  merchant="Starbucks"
  category="Food & Drink"
  subText="Coffee purchase"
  amount={-5.75}
  status="cleared"
  isSubscription={false}
/>
```

**Props:**
- `merchant` (string) - Merchant name
- `category` (string) - Transaction category
- `subText` (string) - Additional description
- `amount` (number) - Amount (negative for spending, positive for income)
- `status` ('cleared' | 'pending' | 'failed')
- `isSubscription` (boolean, optional) - Show subscription badge
- `className` (string, optional) - Additional classes

### HeroBalanceCard

```tsx
import { HeroBalanceCard } from '@/components'
import { usePrivacyToggle } from '@/hooks'

export function MyDashboard() {
  const { isVisible, toggle } = usePrivacyToggle()

  return (
    <HeroBalanceCard
      balance={12345.67}
      isVisible={isVisible}
      onToggleVisibility={toggle}
      onAddMoney={() => console.log('Add Money')}
      onSend={() => console.log('Send Money')}
    />
  )
}
```

**Props:**
- `balance` (number) - Account balance
- `isVisible` (boolean) - Show/hide balance
- `onToggleVisibility` () - Toggle handler
- `onAddMoney` () - Add money button handler
- `onSend` () - Send button handler
- `className` (string, optional)

### SpendingOverviewChart

```tsx
import { SpendingOverviewChart } from '@/components'

<SpendingOverviewChart />
```

Uses mock balance history automatically. No props required.

## Hook Usage

### usePrivacyToggle

```tsx
import { usePrivacyToggle } from '@/hooks'

export function PrivateComponent() {
  const { isVisible, toggle, setIsVisible } = usePrivacyToggle(true)

  return (
    <div>
      <button onClick={toggle}>
        {isVisible ? 'Hide' : 'Show'} Balance
      </button>
      <p>{isVisible ? '$12,345.67' : '••••••'}</p>
    </div>
  )
}
```

### useCurrency

```tsx
import { useCurrency } from '@/hooks'

export function CurrencySelector() {
  const { currency, format, changeCurrency, supportedCurrencies } = useCurrency('USD')

  return (
    <div>
      <select value={currency} onChange={(e) => changeCurrency(e.target.value)}>
        {supportedCurrencies.map((code) => (
          <option key={code} value={code}>{code}</option>
        ))}
      </select>
      <p>Formatted: {format(1234.56)}</p>
    </div>
  )
}
```

## Utility Usage

### cn() - Class Merging

```tsx
import { cn } from '@/lib/utils'

// Basic usage
const buttonClass = cn(
  'px-4 py-2 rounded-lg',
  'bg-blue-500 hover:bg-blue-600'
)

// Conditional classes
const cardClass = cn(
  'p-4 border rounded-lg',
  isActive && 'bg-surface border-success',
  !isActive && 'bg-background border-border'
)

// Overriding classes
const cardClass = cn(
  'px-2 py-1 bg-blue-500',
  'px-4' // px-4 wins over px-2
)
```

## Formatters

### formatCurrency

```tsx
import { formatCurrency } from '@/lib/formatters'

formatCurrency(1234.56)              // '$1,234.56'
formatCurrency(1234.56, 'EUR')       // '€1,234.56'
formatCurrency(1234.56, 'GBP', 'en-GB') // '£1,234.56'
```

### formatNumber

```tsx
import { formatNumber } from '@/lib/formatters'

formatNumber(1000000)     // '1,000,000'
formatNumber(3.14159, 2)  // '3.14'
```

### formatPercentage

```tsx
import { formatPercentage } from '@/lib/formatters'

formatPercentage(25.5)    // '25.5%'
formatPercentage(33.333, 1) // '33.3%'
```

### formatBytes

```tsx
import { formatBytes } from '@/lib/formatters'

formatBytes(1024)         // '1 KB'
formatBytes(1048576)      // '1 MB'
formatBytes(1073741824)   // '1 GB'
```

## Mock Data

### Using Mock Transactions

```tsx
import { mockTransactions } from '@/lib/mock-data'

// mockTransactions is an array of Transaction objects
mockTransactions.forEach((tx) => {
  console.log(`${tx.merchant}: ${tx.amount}`)
})

// Filter transactions
const income = mockTransactions.filter((tx) => tx.amount > 0)
const cleared = mockTransactions.filter((tx) => tx.status === 'cleared')
```

### Using Balance History

```tsx
import { mockBalanceHistory } from '@/lib/mock-data'

// Use for charts
const data = mockBalanceHistory.map((history) => ({
  date: history.date.toLocaleDateString(),
  balance: history.balance,
}))
```

### Using Dashboard Stats

```tsx
import { mockDashboardStats } from '@/lib/mock-data'

console.log(mockDashboardStats)
// {
//   totalBalance: 11624.2,
//   monthlySpending: 468.69,
//   monthlyIncome: 6200.0,
//   savingsRate: 72.4,
// }
```

## Complete Example: Custom Dashboard

```tsx
'use client'

import { useState } from 'react'
import { TransactionRow, HeroBalanceCard, SpendingOverviewChart } from '@/components'
import { mockTransactions, mockDashboardStats } from '@/lib/mock-data'
import { usePrivacyToggle, useCurrency } from '@/hooks'
import { formatCurrency } from '@/lib/formatters'
import { cn } from '@/lib/utils'

export default function CustomDashboard() {
  const { isVisible, toggle } = usePrivacyToggle(true)
  const { currency, format, changeCurrency } = useCurrency('USD')
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date')

  const sortedTransactions = [...mockTransactions].sort((a, b) => {
    if (sortBy === 'date') {
      return b.date.getTime() - a.date.getTime()
    }
    return Math.abs(b.amount) - Math.abs(a.amount)
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <select
          value={currency}
          onChange={(e) => changeCurrency(e.target.value)}
          className={cn(
            'px-4 py-2 rounded-lg',
            'bg-surface border border-border text-foreground'
          )}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-surface rounded-lg">
          <h3 className="text-sm text-foreground/60">Total Balance</h3>
          <p className="text-2xl font-bold">
            {isVisible ? format(mockDashboardStats.totalBalance) : '••••'}
          </p>
        </div>
        <div className="p-4 bg-surface rounded-lg">
          <h3 className="text-sm text-foreground/60">Monthly Spending</h3>
          <p className="text-2xl font-bold">
            {format(mockDashboardStats.monthlySpending)}
          </p>
        </div>
      </div>

      {/* Hero Card */}
      <HeroBalanceCard
        balance={mockDashboardStats.totalBalance}
        isVisible={isVisible}
        onToggleVisibility={toggle}
        onAddMoney={() => alert('Add Money')}
        onSend={() => alert('Send Money')}
      />

      {/* Chart */}
      <SpendingOverviewChart />

      {/* Transactions with Sorting */}
      <div className="space-y-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">Transactions</h2>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'amount')}
            className={cn(
              'px-3 py-1 text-sm rounded',
              'bg-surface border border-border text-foreground'
            )}
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </select>
        </div>

        <div className="space-y-2">
          {sortedTransactions.slice(0, 10).map((tx) => (
            <TransactionRow
              key={tx.id}
              merchant={tx.merchant}
              category={tx.category}
              subText={tx.subText}
              amount={tx.amount}
              status={tx.status}
              isSubscription={tx.isSubscription}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
```

---

For more examples and advanced usage, refer to the main dashboard implementation in `src/app/page.tsx`.
