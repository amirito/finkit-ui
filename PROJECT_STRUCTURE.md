# Fintech-Kit Project Structure & Configuration

## Complete File Tree

```
fintech-kit/
│
├── src/                           # Source directory (new structure)
│   │
│   ├── app/
│   │   ├── globals.css            # Global styles with Tailwind directives
│   │   ├── layout.tsx             # Root layout (sidebar + navigation + main)
│   │   └── page.tsx               # Dashboard with bento grid layout
│   │
│   ├── components/                # React components
│   │   ├── Sidebar.tsx            # Left navigation sidebar with menu items
│   │   ├── Navigation.tsx         # Top header with search & notifications
│   │   ├── fintech/               # Fintech-specific UI components
│   │   │   ├── TransactionRow.tsx       # Transaction display component
│   │   │   ├── HeroBalanceCard.tsx      # Main balance card with actions
│   │   │   ├── SpendingOverviewChart.tsx # Animated balance chart
│   │   │   └── index.ts           # Component exports
│   │   └── index.ts               # Main component barrel export
│   │
│   ├── hooks/                     # Custom React hooks
│   │   ├── usePrivacyToggle.ts    # Privacy toggle for sensitive data
│   │   ├── useCurrency.ts        # Currency formatting & conversion
│   │   └── index.ts              # Hook exports
│   │
│   └── lib/                       # Utility functions & data
│       ├── utils.ts              # cn() helper for Tailwind merging
│       ├── formatters.ts         # Currency, number, date formatters
│       └── mock-data.ts          # Mock transactions & balance data
│
├── tailwind.config.ts             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
├── tsconfig.json                  # TypeScript configuration
├── next.config.ts                 # Next.js configuration
├── package.json                   # Dependencies & scripts
├── README.md                      # Project documentation
│
└── (old files - to be removed)
    ├── app/                       # Previous app directory structure
    ├── components/                # Previous components directory
    ├── constants/                 # Previous constants directory
    ├── hooks/                     # Previous hooks directory
    └── lib/                       # Previous lib directory
```

## Key Configuration Files

### `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: '#121212',
        border: '#242424',
        success: '#00DB87',
        brand: '#3B82F6',
      },
      fontFamily: {
        sans: 'var(--font-inter)',
        mono: 'var(--font-mono)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-gradient': `
          linear-gradient(135deg, rgba(59, 130, 246, 0.1), transparent),
          linear-gradient(225deg, rgba(0, 219, 135, 0.1), transparent)
        `,
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
}

export default config
```

### `src/lib/utils.ts`

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines Tailwind CSS classes with intelligent merging to prevent style conflicts.
 * Combines clsx for conditional classes with tailwind-merge for conflict resolution.
 *
 * @param inputs - Class names (strings, objects, or arrays)
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### `src/lib/formatters.ts`

```typescript
export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string

export function formatPercentage(value: number, decimals?: number): string

export function formatNumber(value: number, decimals?: number): string

export function formatBytes(bytes: number): string
```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Components Overview

### UI Components

- **Sidebar** - Dark sidebar with navigation menu and logout
- **Navigation** - Header with search bar and command palette

### Fintech Components

- **TransactionRow** - Transaction item with status badge and subscription pill
- **HeroBalanceCard** - Large balance card with visibility toggle and action buttons
- **SpendingOverviewChart** - Animated line chart with gradient fill

## Hooks

### `usePrivacyToggle()`
Manages showing/hiding sensitive financial data

### `useCurrency()`
Handles currency conversion with support for USD, EUR, GBP, JPY, AUD, CAD

## Mock Data

- **mockTransactions** - 12 realistic fintech transactions
- **mockBalanceHistory** - 30-day balance trend data
- **mockDashboardStats** - Summary statistics (balance, spending, income, savings rate)

## Next Steps

1. Delete the old `/app`, `/components`, `/constants`, `/hooks`, and `/lib` directories
2. Ensure Node.js v20.9.0+ is installed  
3. Run `npm install` to install dependencies
4. Run `npm run dev` to start development server
5. Visit `http://localhost:3000` to see the dashboard

## Design Tokens

| Token | Value |
|-------|-------|
| Background | #050505 |
| Surface | #121212 |
| Border | #242424 |
| Success | #00DB87 |
| Brand | #3B82F6 |
| Error | #FF4B4B |
| Warning | #F59E0B |

## Font Setup

- **Sans (UI)**: Inter from Google Fonts
- **Mono (Data)**: JetBrains Mono from Google Fonts

---

This structured, enterprise-ready setup allows for easy expansion and is optimized for publishing as an npm package.
