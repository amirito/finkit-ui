# FinKit UI

FinKit UI is a zero-config React component library for premium fintech products. It provides polished account, transaction, transfer, charting, and atomic UI components built with TypeScript, Tailwind CSS utility classes, CSS variables, and accessible React patterns.

The library is designed to drop into modern React and Next.js apps with peer dependencies for React, pre-compiled CSS, and a small provider that installs FinKit theme variables.
[![Next.js](https://img.shields.io/badge/Next.js-16.2.3-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.19-38B2AC)](https://tailwindcss.com/)



## Installation

Install directly from GitHub:

```bash
npm install github:amirito/fintech-kit
```

FinKit expects React to be provided by your application:

```bash
npm install react react-dom
```

## Setup

Import the compiled stylesheet once in your app entry point.

```tsx
// app/layout.tsx, pages/_app.tsx, or src/main.tsx
import 'finkit-ui/dist/index.css'
```

Wrap your application with `FinKitProvider`.

```tsx
import { FinKitProvider } from 'finkit-ui'

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <FinKitProvider theme="dark">
      {children}
    </FinKitProvider>
  )
}
```

Then import components from the package root:

```tsx
import { Button, Card, HeroBalanceCard } from 'finkit-ui'
```

## Theming

FinKit components read design tokens from CSS variables. `FinKitProvider` sets sensible dark and light defaults, and you can override any token globally or within a scoped container.

```css
:root {
  --finkit-background: #050505;
  --finkit-surface: #111111;
  --finkit-primary: #22c55e;
  --finkit-border: rgba(255, 255, 255, 0.1);
  --finkit-text-main: #ffffff;
  --finkit-text-muted: rgba(255, 255, 255, 0.55);
  --finkit-success: #22c55e;
  --finkit-warning: #f59e0b;
  --finkit-error: #ef4444;
  --finkit-danger: var(--finkit-error);
}

.brand-blue {
  --finkit-primary: #3b82f6;
  --finkit-surface: #0b1220;
  --finkit-border: rgba(148, 163, 184, 0.22);
}
```

```tsx
<section className="brand-blue">
  <Button>Branded action</Button>
</section>
```

## Component Reference

### HeroBalanceCard

Main balance display for wallet, banking, and portfolio dashboards.

```tsx
import { Plus, Send } from 'lucide-react'
import { HeroBalanceCard } from 'finkit-ui'

export function BalanceHero() {
  return (
    <HeroBalanceCard trend={{ label: 'this month', value: '8.4%', direction: 'up' }}>
      <HeroBalanceCard.Balance amount={24890.42} currency="USD" />
      <HeroBalanceCard.Actions>
        <HeroBalanceCard.Action icon={<Plus className="h-4 w-4" />} label="Add Money" />
        <HeroBalanceCard.Action icon={<Send className="h-4 w-4" />} label="Send" />
      </HeroBalanceCard.Actions>
    </HeroBalanceCard>
  )
}
```

### Button

Button primitive with `primary`, `secondary`, and `text` variants plus loading and disabled states.

```tsx
import { Button } from 'finkit-ui'

export function ButtonExamples() {
  return (
    <div className="flex gap-3">
      <Button variant="primary">Transfer</Button>
      <Button variant="secondary">Review</Button>
      <Button variant="text">Cancel</Button>
      <Button isLoading>Processing</Button>
    </div>
  )
}
```

### TextInput

Accessible text input with label, error messaging, and FinKit focus states.

```tsx
import { TextInput } from 'finkit-ui'

export function AccountNameField() {
  return (
    <TextInput
      label="Account nickname"
      placeholder="Everyday checking"
      error={undefined}
    />
  )
}
```

### Badge

Compact status tag with subdued backgrounds for labels and transaction states.

```tsx
import { Badge } from 'finkit-ui'

export function StatusBadges() {
  return (
    <div className="flex gap-2">
      <Badge variant="primary">Cleared</Badge>
      <Badge variant="secondary">Pending review</Badge>
      <Badge variant="text">Draft</Badge>
    </div>
  )
}
```

### Toggle

Switch-style toggle for settings such as privacy mode or instant transfer.

```tsx
'use client'

import { useState } from 'react'
import { Toggle } from 'finkit-ui'

export function PrivacyToggle() {
  const [checked, setChecked] = useState(false)

  return <Toggle checked={checked} onCheckedChange={setChecked} aria-label="Hide balances" />
}
```

### RadioGroup

Compound radio group for selecting accounts, methods, plans, and transfer speeds.

```tsx
'use client'

import { RadioGroup } from 'finkit-ui'

export function TransferSpeed() {
  return (
    <RadioGroup.Root defaultValue="standard" onValueChange={(value) => console.log(value)}>
      <RadioGroup.Item value="instant">Instant transfer</RadioGroup.Item>
      <RadioGroup.Item value="standard">Standard transfer</RadioGroup.Item>
      <RadioGroup.Item value="scheduled">Schedule for later</RadioGroup.Item>
    </RadioGroup.Root>
  )
}
```

### Modal

Accessible overlay dialog with Escape handling, backdrop blur, and optional title and description.

```tsx
'use client'

import { useState } from 'react'
import { Button, Modal } from 'finkit-ui'

export function ReviewModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Review transfer</Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Confirm transfer"
        description="Review the destination and amount before sending."
      >
        <Button onClick={() => setOpen(false)}>Confirm</Button>
      </Modal>
    </>
  )
}
```

### Card

Generic FinKit container for balances, settings, insights, and summaries.

```tsx
import { Card } from 'finkit-ui'

export function LimitCard() {
  return (
    <Card>
      <p className="text-sm text-[var(--finkit-text-muted)]">Daily limit</p>
      <p className="mt-2 text-2xl font-semibold text-[var(--finkit-text-main)]">$5,000</p>
    </Card>
  )
}
```

### Skeleton

Simple loading placeholder with rectangular and circular variants.

```tsx
import { Skeleton } from 'finkit-ui'

export function LoadingAccount() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton variant="circle" width={40} height={40} />
      <div className="space-y-2">
        <Skeleton width={160} height={16} />
        <Skeleton width={96} height={12} />
      </div>
    </div>
  )
}
```

### Avatar and AvatarGroup

Avatar supports image sources and fallback initials. `AvatarGroup` overlaps avatars for user or team stacks.

```tsx
import { Avatar, AvatarGroup } from 'finkit-ui'

export function Approvers() {
  return (
    <div className="flex items-center gap-4">
      <Avatar alt="Sarah Chen" fallback="SC" />
      <AvatarGroup.Root>
        <AvatarGroup.Avatar alt="Maya Patel" fallback="MP" />
        <AvatarGroup.Avatar alt="Jordan Lee" fallback="JL" />
        <AvatarGroup.Count>+3</AvatarGroup.Count>
      </AvatarGroup.Root>
    </div>
  )
}
```

### ProgressBar and ProgressCircle

Linear and circular progress indicators with smooth value transitions.

```tsx
import { ProgressBar, ProgressCircle } from 'finkit-ui'

export function BudgetProgress() {
  return (
    <div className="flex items-center gap-4">
      <ProgressBar value={640} max={1000} aria-label="Budget used" />
      <ProgressCircle value={72} aria-label="Savings goal progress" />
    </div>
  )
}
```

### Tooltip

CSS-based hover and focus label for controls, values, and compact icons.

```tsx
import { Info } from 'lucide-react'
import { Tooltip } from 'finkit-ui'

export function FeeTooltip() {
  return (
    <Tooltip label="Includes network and processing fees">
      <button type="button" aria-label="Fee details">
        <Info className="h-4 w-4" />
      </button>
    </Tooltip>
  )
}
```

### Dropdown

Compound dropdown menu with trigger, floating content, keyboard handling, and dismiss behavior.

```tsx
import { Dropdown } from 'finkit-ui'

export function AccountMenu() {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger>Account actions</Dropdown.Trigger>
      <Dropdown.Content align="end">
        <Dropdown.Item onClick={() => console.log('rename')}>Rename account</Dropdown.Item>
        <Dropdown.Item onClick={() => console.log('statements')}>Download statements</Dropdown.Item>
        <Dropdown.Item onClick={() => console.log('freeze')}>Freeze card</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  )
}
```

`DropdownMenu` is also exported as an alias for `Dropdown`.

### Transaction and TransactionRow

Use `TransactionRow` for a ready-made list item, or `Transaction` compound parts for custom rows.

```tsx
import { Transaction, TransactionRow } from 'finkit-ui'

export function Transactions() {
  return (
    <div className="space-y-3">
      <TransactionRow
        merchant="Spotify"
        category="Entertainment"
        subText="Premium plan"
        amount={-9.99}
        status="cleared"
        isSubscription
      />

      <Transaction.Root>
        <div className="flex items-center gap-3">
          <Transaction.Icon fallback="AC" />
          <Transaction.Info title="Acme Payroll" sub="Income" />
        </div>
        <Transaction.Amount value={4200} />
      </Transaction.Root>
    </div>
  )
}
```

### TransactionDetailDrawer

Responsive transaction detail drawer with status timeline, receipt action, and Radix dialog behavior.

```tsx
'use client'

import { TransactionDetailDrawer } from 'finkit-ui'

const transaction = {
  id: 'txn_123',
  merchant: 'Apple',
  category: 'Software',
  subText: 'iCloud subscription',
  amount: -2.99,
  status: 'cleared' as const,
  date: new Date(),
}

export function DetailExample() {
  return (
    <TransactionDetailDrawer
      open={true}
      transaction={transaction}
      onOpenChange={(open) => console.log(open)}
    />
  )
}
```

### SendMoneyModal

Multi-step send-money flow with amount entry, recipient selection, funding source, PIN, and confirmation.

```tsx
'use client'

import { SendMoneyModal } from 'finkit-ui'

export function SendMoneyExample() {
  return (
    <SendMoneyModal
      open={true}
      onOpenChange={(open) => console.log(open)}
      onSend={(amount, recipient, account) => {
        console.log({ amount, recipient, account })
      }}
      onVerifyPin={async (pin) => pin === '1234'}
    />
  )
}
```

### AddMoneyModal

Top-up flow for adding funds from a linked account, with optional PIN security for larger amounts.

```tsx
'use client'

import { AddMoneyModal } from 'finkit-ui'

const linkedAccounts = [
  { id: 'acc_1', balance: 8400, lastFour: '4242', provider: 'visa' as const, type: 'checking' as const },
]

export function AddMoneyExample() {
  return (
    <AddMoneyModal
      isOpen={true}
      onClose={() => console.log('close')}
      currentBalance={12450}
      linkedAccounts={linkedAccounts}
      onAdd={(amount, account) => console.log({ amount, account })}
    />
  )
}
```

### SpendingOverviewChart

Animated SVG balance trend chart with summary statistics.

```tsx
import { SpendingOverviewChart } from 'finkit-ui'

const data = [
  { label: 'Mon', value: 11200 },
  { label: 'Tue', value: 11050 },
  { label: 'Wed', value: 12250 },
  { label: 'Thu', value: 12100 },
]

export function BalanceTrend() {
  return <SpendingOverviewChart data={data} />
}
```

### Stat and StatCard

Metric cards for balances, income, spending, and account insights. `StatCard` is the prop-based convenience API.

```tsx
import { Wallet } from 'lucide-react'
import { Stat, StatCard } from 'finkit-ui'

export function Metrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Stat.Root>
        <Stat.Label>Monthly income</Stat.Label>
        <Stat.Value>$8,240</Stat.Value>
        <Stat.Trend change={12} format="percentage" />
      </Stat.Root>

      <StatCard
        label="Cash balance"
        value="$24,890"
        change={4.2}
        icon={Wallet}
        isVisible={true}
      />
    </div>
  )
}
```

### CurrencyInput

Compound currency input with formatted display and built-in currency selector.

```tsx
'use client'

import { useState } from 'react'
import { CurrencyInput } from 'finkit-ui'

export function AmountInput() {
  const [amount, setAmount] = useState('')

  return (
    <CurrencyInput currency="USD" onCurrencyChange={(currency) => console.log(currency)}>
      <CurrencyInput.Field
        value={amount}
        onValueChange={setAmount}
        placeholder="0.00"
      />
    </CurrencyInput>
  )
}
```

### PinInput

Segmented numeric PIN input with paste support, auto-advance, and completion callback.

```tsx
'use client'

import { useState } from 'react'
import { PinInput } from 'finkit-ui'

export function SecurityPin() {
  const [pin, setPin] = useState('')

  return (
    <PinInput.Root
      value={pin}
      onChange={setPin}
      onComplete={(value) => console.log('complete', value)}
      length={4}
    />
  )
}
```

### EntityAvatar

Legacy entity avatar for merchants and users, with optional badge composition.

```tsx
import { EntityAvatar } from 'finkit-ui'

export function MerchantAvatar() {
  return (
    <EntityAvatar type="merchant" alt="Stripe" fallback="S" className="h-12 w-12">
      <EntityAvatar.Badge>1</EntityAvatar.Badge>
    </EntityAvatar>
  )
}
```

### MarketTicker

Compact compound ticker for market symbols, prices, and percentage changes.

```tsx
import { MarketTicker } from 'finkit-ui'

export function Ticker() {
  return (
    <MarketTicker>
      <MarketTicker.Symbol symbol="AAPL" />
      <MarketTicker.Price price={192.44} />
      <MarketTicker.Change change={1.28} />
    </MarketTicker>
  )
}
```

### FintechSkeleton

Prebuilt skeleton layouts for common FinKit dashboard surfaces.

```tsx
import { FintechSkeleton } from 'finkit-ui'

export function DashboardLoading() {
  return (
    <div className="space-y-4">
      <FintechSkeleton.BalanceCard />
      <FintechSkeleton.Transaction />
    </div>
  )
}
```

### AccountCardSelector

Selectable account card for transfer and funding-source flows.

```tsx
import { AccountCardSelector } from 'finkit-ui'

export function FundingCard() {
  return (
    <AccountCardSelector
      balance={8400}
      lastFour="4242"
      provider="visa"
      isSelected
      onSelect={() => console.log('selected')}
    />
  )
}
```

### AccountSelector

List selector for linked cards and bank accounts.

```tsx
import { AccountSelector } from 'finkit-ui'

const accounts = [
  { id: 'acc_1', balance: 8400, lastFour: '4242', provider: 'visa' as const, type: 'checking' as const },
  { id: 'acc_2', balance: 2250, lastFour: '1881', provider: 'mastercard' as const, type: 'savings' as const },
]

export function FundingSource() {
  return (
    <AccountSelector
      accounts={accounts}
      selectedAccountId="acc_1"
      onSelect={(account) => console.log(account)}
    />
  )
}
```

### StatusTimeline

Compound status timeline for transaction, transfer, and verification progress.

```tsx
import { StatusTimeline } from 'finkit-ui'

export function TransferTimeline() {
  return (
    <StatusTimeline>
      <StatusTimeline.Item title="Created" state="success" timestamp="10:24 AM" />
      <StatusTimeline.Item title="Processing" state="current" description="Awaiting bank response" />
      <StatusTimeline.Item title="Settled" state="pending" />
    </StatusTimeline>
  )
}
```

### UsageMeter

Budget, limit, or quota meter with warning and limit-reached states.

```tsx
import { UsageMeter } from 'finkit-ui'

export function CardLimit() {
  return (
    <UsageMeter
      label="Monthly card spend"
      current={2750}
      limit={5000}
      warningThreshold={0.8}
    />
  )
}
```

## Utilities

FinKit also exports formatting helpers and `cn` from the package root.

```tsx
import { cn, formatCurrency } from 'finkit-ui'

const className = cn('rounded-xl', 'border')
const amount = formatCurrency(24890.42)
```

## Notes

- Components are TypeScript-first and forward refs where appropriate.
- Interactive components are marked with `'use client'` for Next.js App Router compatibility.
- Styling is driven by CSS variables, so brand theming does not require editing Tailwind config.
- React and React DOM are peer dependencies supplied by your application.


## 📄 License

Built as a modern fintech component library for premium applications.
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🤝 Contributing

This is a solo developer project. Feel free to fork and customize for your needs.