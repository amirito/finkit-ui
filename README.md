# FinKit UI

[![Next.js](https://img.shields.io/badge/Next.js-16.2.3-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.19-38B2AC)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

FinKit UI is a zero-config React component library for premium fintech products. It provides polished dashboard, input, feedback, user, and overlay components built with TypeScript, pre-compiled CSS, CSS variables, and accessible React patterns.

## Table of Contents

- [Setup](#setup)
  - [Installation](#installation)
  - [CSS](#css)
  - [Provider](#provider)
- [Theming](#theming)
- [Components](#components)
  - [Dashboard & Layout](#dashboard--layout)
    - [HeroBalanceCard](#herobalancecard)
    - [FinKitCard](#finkitcard)
  - [Inputs & Actions](#inputs--actions)
    - [FinKitButton](#finkitbutton)
    - [FinKitInput](#finkitinput)
    - [FinKitToggle](#finkittoggle)
    - [RadioGroup](#radiogroup)
    - [Dropdown](#dropdown)
  - [Feedback & Data](#feedback--data)
    - [FinKitBadge](#finkitbadge)
    - [ProgressBar](#progressbar)
    - [Skeleton](#skeleton)
    - [Tooltip](#tooltip)
  - [User & Overlays](#user--overlays)
    - [Avatar & AvatarGroup](#avatar--avatargroup)
    - [FinKitModal](#finkitmodal)
- [License](#license)

## Setup

### Installation

Install FinKit UI from GitHub:

```bash
npm install your-github-username/finkit-ui
```

FinKit UI uses React and React DOM as peer dependencies, so your app should provide them.

```bash
npm install react react-dom
```

### CSS

Import the pre-compiled stylesheet once in your app entry point.

```tsx
// app/layout.tsx, pages/_app.tsx, or src/main.tsx
import 'finkit-ui/dist/index.css'
```

### Provider

Wrap your application with `FinKitProvider` to install the default CSS variables.

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

## Theming

FinKit UI is themed with CSS variables. Override tokens globally or inside a scoped container to adapt the library to your brand.

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
import { Button as FinKitButton } from 'finkit-ui'

export function BrandedAction() {
  return (
    <section className="brand-blue">
      <FinKitButton>Send payment</FinKitButton>
    </section>
  )
}
```

## Components

### Dashboard & Layout

#### HeroBalanceCard

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

#### FinKitCard

Premium surface container for balances, settings, insights, and summaries.

```tsx
import { Card as FinKitCard } from 'finkit-ui'

export function LimitCard() {
  return (
    <FinKitCard>
      <p className="text-sm text-[var(--finkit-text-muted)]">Daily limit</p>
      <p className="mt-2 text-2xl font-semibold text-[var(--finkit-text-main)]">$5,000</p>
    </FinKitCard>
  )
}
```

### Inputs & Actions

#### FinKitButton

Action button with `primary`, `secondary`, and `text` variants plus loading and disabled states.

```tsx
import { Button as FinKitButton } from 'finkit-ui'

export function ButtonExamples() {
  return (
    <div className="flex gap-3">
      <FinKitButton variant="primary">Transfer</FinKitButton>
      <FinKitButton variant="secondary">Review</FinKitButton>
      <FinKitButton variant="text">Cancel</FinKitButton>
      <FinKitButton isLoading>Processing</FinKitButton>
    </div>
  )
}
```

#### FinKitInput

Accessible text input with label, error messaging, and fintech-focused states.

```tsx
import { TextInput as FinKitInput } from 'finkit-ui'

export function AccountNameField() {
  return (
    <FinKitInput
      label="Account nickname"
      placeholder="Everyday checking"
    />
  )
}
```

#### FinKitToggle

Switch-style toggle for settings such as privacy mode or instant transfers.

```tsx
'use client'

import { useState } from 'react'
import { Toggle as FinKitToggle } from 'finkit-ui'

export function PrivacyToggle() {
  const [checked, setChecked] = useState(false)

  return (
    <FinKitToggle
      checked={checked}
      onCheckedChange={setChecked}
      aria-label="Hide balances"
    />
  )
}
```

#### RadioGroup

Compound Component for selecting one option from a styled set of transfer, account, or plan choices.

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

#### Dropdown

Compound Component for action menus with trigger, floating content, keyboard handling, and dismiss behavior.

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

### Feedback & Data

#### FinKitBadge

Compact status tag with subdued backgrounds for transaction, account, and workflow labels.

```tsx
import { Badge as FinKitBadge } from 'finkit-ui'

export function StatusBadges() {
  return (
    <div className="flex gap-2">
      <FinKitBadge variant="primary">Cleared</FinKitBadge>
      <FinKitBadge variant="secondary">Pending review</FinKitBadge>
      <FinKitBadge variant="text">Draft</FinKitBadge>
    </div>
  )
}
```

#### ProgressBar

Linear progress indicator for limits, budgets, onboarding, and completion states.

```tsx
import { ProgressBar } from 'finkit-ui'

export function BudgetProgress() {
  return (
    <ProgressBar
      value={640}
      max={1000}
      aria-label="Budget used"
    />
  )
}
```

#### Skeleton

Loading placeholder with rectangular and circular variants.

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

#### Tooltip

Hover and focus label for compact controls, values, and icon buttons.

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

### User & Overlays

#### Avatar & AvatarGroup

Avatar renders user imagery or initials, while AvatarGroup is a Compound Component for overlapping user stacks.

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

#### FinKitModal

Accessible overlay dialog with backdrop blur, Escape handling, title, description, and custom content.

```tsx
'use client'

import { useState } from 'react'
import { Button as FinKitButton, Modal as FinKitModal } from 'finkit-ui'

export function ReviewModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <FinKitButton onClick={() => setOpen(true)}>Review transfer</FinKitButton>
      <FinKitModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Confirm transfer"
        description="Review the destination and amount before sending."
      >
        <FinKitButton onClick={() => setOpen(false)}>Confirm</FinKitButton>
      </FinKitModal>
    </>
  )
}
```

## License

Built as a modern fintech component library for premium applications.

MIT License.
