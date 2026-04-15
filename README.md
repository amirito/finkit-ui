# Fintech-Kit

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.3-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.19-38B2AC)](https://tailwindcss.com/)

A modern, production-ready React component library designed specifically for fintech applications. Built with Next.js, TypeScript, and Tailwind CSS, featuring a sophisticated design system and flexible composition patterns.

## ✨ Features

### 🎯 Bento Grid Layout
Responsive dashboard layouts with intelligent grid systems that adapt to different screen sizes and content types.

### 🧩 Composition Pattern
Flexible compound components that allow developers to compose complex UIs from simple, reusable parts. Each component exposes sub-components for maximum customization.

### 🌙 Dark/Light Mode
Built-in theme support with seamless switching between dark and light modes, ensuring accessibility and user preference compliance.

### 🔒 Security-First Design
Privacy toggles for sensitive financial data, secure PIN input components, and data protection patterns built-in.

### 📊 Dynamic Data Visualization
Interactive charts and graphs that accept dynamic data arrays, enabling real-time financial insights and analytics.

### 🎨 Modern Design System
Consistent color palette, typography, and spacing with a focus on financial aesthetics and user experience.

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) - React framework for production
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) - Utility-first CSS framework
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Production-ready motion library
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful & consistent icon library
- **UI Primitives**: [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible UI components
- **Build Tool**: Turbopack (via Next.js) - Fast bundler for development and production

## 🚀 Getting Started

### Tech Requirements

- React 18+
- Next.js 14+
- Tailwind CSS
- Framer Motion

### Install and Run

1. Clone the repository:
```bash
git clone https://github.com/yourusername/fintech-kit.git
cd fintech-kit
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open the app in your browser:
```bash
http://localhost:3000
```

### Use FinKit in your project

If you want to reuse FinKit components in another project, copy the `src/components/fintech` folder into your local codebase and then import the components:

```tsx
import { HeroBalanceCard, AddMoneyModal } from '@/components/fintech'

export default function Dashboard() {
  return (
    <div>
      <HeroBalanceCard
        trend={{ label: 'from last month', value: '4.2%', direction: 'up' }}
      >
        <HeroBalanceCard.Balance amount={12450.0} currency="USD" />
        <HeroBalanceCard.Actions>
          <HeroBalanceCard.Action
            icon={<span>+</span>}
            label="Add Money"
            onClick={() => console.log('open add money')}
          />
        </HeroBalanceCard.Actions>
      </HeroBalanceCard>

      <AddMoneyModal
        isOpen={true}
        onClose={() => console.log('close modal')}
        linkedAccounts={[]}
        currentBalance={12450}
      />
    </div>
  )
}
```

### Tailwind Theme Configuration

Add the FinKit palette to your `tailwind.config.js` under `theme.extend.colors`:

```js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: '#121212',
        border: '#242424',
        success: '#00DB87',
        brand: '#3B82F6',
      },
    },
  },
  plugins: [],
}
```

This configuration ensures FinKit components render with the same deep, modern palette used throughout the library.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📁 Project Structure

```
fintech-kit/
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/          # Reusable UI components
│   │   └── fintech/         # Fintech-specific components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities and helpers
│   └── styles/              # Global styles
├── public/                  # Static assets
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## 🎨 Design System

### Color Palette

```css
--background: #050505;    /* Deep Black */
--surface: #121212;       /* Card backgrounds */
--border: #242424;        /* Borders & dividers */
--success: #00DB87;       /* Success states */
--brand: #3B82F6;         /* Primary brand blue */
--error: #FF4B4B;         /* Error states */
--warning: #F59E0B;       /* Warning states */
```

### Typography

- **UI Font**: Inter (sans-serif)
- **Code Font**: JetBrains Mono (monospace)

## 📦 Usage

Import components from the library:

```typescript
import {
  HeroBalanceCard,
  SpendingOverviewChart,
  SendMoneyModal,
  PinInput
} from '@/components/fintech'
```

Use compound components for flexible composition:

```tsx
<HeroBalanceCard trend={{ label: 'from last month', value: '4.2%', direction: 'up' }}>
  <HeroBalanceCard.Balance amount={2847.92} currency="USD" />
  <HeroBalanceCard.Actions>
    <HeroBalanceCard.Action
      icon={<PlusIcon className="h-4 w-4" />}
      label="Add Money"
      onClick={handleAddMoney}
    />
  </HeroBalanceCard.Actions>
</HeroBalanceCard>
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- UI primitives by [Radix UI](https://www.radix-ui.com/)
cn('px-2 py-1', 'px-4') // Result: 'py-1 px-4'
```

### Formatters (`src/lib/formatters.ts`)

```typescript
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/formatters'

formatCurrency(1234.56)           // '$1,234.56'
formatCurrency(1234.56, 'EUR')    // '€1,234.56'
formatNumber(1000000)              // '1,000,000'
formatPercentage(25.5)             // '25.5%'
```

### Hooks

#### `usePrivacyToggle()`

```typescript
import { usePrivacyToggle } from '@/hooks'

const { isVisible, toggle } = usePrivacyToggle(true)
// Shows/hides sensitive data like balance
```

#### `useCurrency()`

```typescript
import { useCurrency } from '@/hooks'

const { currency, format, changeCurrency } = useCurrency('USD')
format(1234.56) // '$1,234.56'
changeCurrency('EUR')
```

### Mock Data (`src/lib/mock-data.ts`)

Provides:
- `mockTransactions` - Array of realistic fintech transactions
- `mockBalanceHistory` - 30-day balance history for charts
- `mockDashboardStats` - Summary statistics

## 🎯 Core Components

### TransactionRow

Display individual transactions with status badges and subscription indicators.

```tsx
<TransactionRow
  merchant="Netflix"
  category="Entertainment"
  subText="Monthly subscription"
  amount={-15.99}
  status="cleared"
  isSubscription
/>
```

### HeroBalanceCard

Display the main balance with visibility toggle and action buttons.

```tsx
<HeroBalanceCard
  balance={12345.67}
  isVisible={isVisible}
  onToggleVisibility={toggle}
  onAddMoney={() => {}}
  onSend={() => {}}
/>
```

### SpendingOverviewChart

Animated line chart showing balance trends.

```tsx
<SpendingOverviewChart />
```

## 🎨 Tailwind Configuration

The Tailwind config includes:
- Custom fintech color palette
- Font family setup for Inter and JetBrains Mono
- Gradient utilities for mesh backgrounds
- Extended theme for fintech-specific needs

## 🔧 Configuration Files

### `tailwind.config.ts`
- Content paths configured for `src/` directory
- Extended theme with fintech colors
- Custom font family variables

### `tsconfig.json`
- Path alias: `@/*` → `./src/*`
- Strict mode enabled
- React JSX optimized

### `next.config.ts`
- Standard Next.js 15 configuration
- Ready for deployment

## 📚 Package Dependencies

```json
{
  "next": "^16.0.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "tailwindcss": "^3.4.19",
  "framer-motion": "^12.0.0",
  "lucide-react": "^1.8.0",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.5.0"
}
```

## 🌟 Features

✅ **Dark Mode First** - Premium dark theme optimized for fintech
✅ **Responsive Design** - Mobile, tablet, and desktop support
✅ **Animations** - Smooth Framer Motion animations
✅ **Type Safe** - Full TypeScript support
✅ **Accessible** - WCAG compliant components
✅ **Mock Data** - Ready-to-use demo data
✅ **Modular** - Component-based architecture
✅ **Extensible** - Easy to customize and add new components

## 📖 Development Workflow

1. **Create new components** in `src/components/fintech/`
2. **Export from index** in `src/components/fintech/index.ts`
3. **Add utilities** in `src/lib/` as needed
4. **Create hooks** in `src/hooks/` for reusable logic
5. **Test with mock data** from `src/lib/mock-data.ts`

## 🚢 Deployment

The project is ready to deploy to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Any Node.js hosting provider**

## 📄 License

Built as a modern fintech component library for premium applications.

## 🤝 Contributing

This is a solo developer project. Feel free to fork and customize for your needs.

---

**Last Updated**: April 13, 2026
