export interface Transaction {
  id: string
  merchant: string
  category: string
  subText: string
  amount: number
  status: 'cleared' | 'pending' | 'failed'
  isSubscription?: boolean
  date: Date
  icon?: string
  paymentMethod?: string
  referenceId?: string
}

export interface BalanceHistory {
  date: Date
  balance: number
}

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    merchant: 'Starbucks',
    category: 'Food & Drink',
    subText: 'Coffee purchase',
    amount: -5.75,
    status: 'cleared',
    date: new Date('2024-04-12'),
  },
  {
    id: '2',
    merchant: 'Salary Deposit',
    category: 'Income',
    subText: 'Monthly paycheck from Acme Corp',
    amount: 5000.0,
    status: 'cleared',
    date: new Date('2024-04-01'),
  },
  {
    id: '3',
    merchant: 'Uber',
    category: 'Transportation',
    subText: 'Ride to SFO airport',
    amount: -42.5,
    status: 'cleared',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png',
    date: new Date('2024-04-10'),
  },
  {
    id: '4',
    merchant: 'Netflix',
    category: 'Entertainment',
    subText: 'Premium subscription',
    amount: -15.99,
    status: 'cleared',
    isSubscription: true,
    icon: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    date: new Date('2024-04-01'),
  },
  {
    id: '5',
    merchant: 'Amazon',
    category: 'Shopping',
    subText: 'MacBook Pro accessories',
    amount: -299.99,
    status: 'pending',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    date: new Date('2024-04-08'),
  },
  {
    id: '6',
    merchant: 'Whole Foods',
    category: 'Food & Drink',
    subText: 'Weekly groceries & supplies',
    amount: -127.43,
    status: 'failed',
    date: new Date('2024-04-11'),
  },
  {
    id: '7',
    merchant: 'Planet Fitness',
    category: 'Health & Fitness',
    subText: 'Monthly gym membership',
    amount: -49.99,
    status: 'pending',
    isSubscription: true,
    icon: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Planet_Fitness_logo.svg',
    date: new Date('2024-04-05'),
  },
  {
    id: '8',
    merchant: 'Upwork Payout',
    category: 'Income',
    subText: 'Freelance project completion',
    amount: 1200.0,
    status: 'cleared',
    date: new Date('2024-04-03'),
  },
  {
    id: '9',
    merchant: 'Spotify',
    category: 'Entertainment',
    subText: 'Premium subscription + family plan',
    amount: -9.99,
    status: 'cleared',
    isSubscription: true,
    date: new Date('2024-04-01'),
  },
  {
    id: '10',
    merchant: 'Shell Gas Station',
    category: 'Transportation',
    subText: 'Premium fuel - 12 gallons',
    amount: -54.36,
    status: 'failed',
    date: new Date('2024-04-12'),
  },
  {
    id: '11',
    merchant: 'Twitter/X Premium',
    category: 'Entertainment',
    subText: 'Monthly premium',
    amount: -8.0,
    status: 'cleared',
    isSubscription: true,
    date: new Date('2024-04-01'),
  },
  {
    id: '12',
    merchant: 'Apple',
    category: 'Tech',
    subText: 'iCloud+ storage upgrade',
    amount: -2.99,
    status: 'cleared',
    isSubscription: true,
    date: new Date('2024-04-01'),
  },
]

/**
 * Mock balance history for chart visualization.
 * Represents daily balance over the last 30 days.
 */
export const mockBalanceHistory: BalanceHistory[] = [
  { date: new Date('2024-03-13'), balance: 4500 },
  { date: new Date('2024-03-14'), balance: 4650 },
  { date: new Date('2024-03-15'), balance: 4320 },
  { date: new Date('2024-03-16'), balance: 4800 },
  { date: new Date('2024-03-17'), balance: 5100 },
  { date: new Date('2024-03-18'), balance: 4950 },
  { date: new Date('2024-03-19'), balance: 5200 },
  { date: new Date('2024-03-20'), balance: 5050 },
  { date: new Date('2024-03-21'), balance: 5300 },
  { date: new Date('2024-03-22'), balance: 5450 },
  { date: new Date('2024-03-23'), balance: 5600 },
  { date: new Date('2024-03-24'), balance: 5750 },
  { date: new Date('2024-03-25'), balance: 5900 },
  { date: new Date('2024-03-26'), balance: 6100 },
  { date: new Date('2024-03-27'), balance: 6250 },
  { date: new Date('2024-03-28'), balance: 6400 },
  { date: new Date('2024-03-29'), balance: 6500 },
  { date: new Date('2024-03-30'), balance: 6350 },
  { date: new Date('2024-03-31'), balance: 6200 },
  { date: new Date('2024-04-01'), balance: 11200 }, // Salary deposit
  { date: new Date('2024-04-02'), balance: 11050 },
  { date: new Date('2024-04-03'), balance: 12250 }, // Freelance income
  { date: new Date('2024-04-04'), balance: 12200 },
  { date: new Date('2024-04-05'), balance: 12150 },
  { date: new Date('2024-04-06'), balance: 12300 },
  { date: new Date('2024-04-07'), balance: 12150 },
  { date: new Date('2024-04-08'), balance: 11850 }, // Amazon purchase
  { date: new Date('2024-04-09'), balance: 11800 },
  { date: new Date('2024-04-10'), balance: 11757.5 }, // Uber ride
  { date: new Date('2024-04-11'), balance: 11630 }, // Groceries
  { date: new Date('2024-04-12'), balance: 11624.2 },
]

export const chartDataSets = {
  day: [
    { label: '00:00', value: 11624.2 },
    { label: '04:00', value: 11650.0 },
    { label: '08:00', value: 11700.0 },
    { label: '12:00', value: 11680.0 },
    { label: '16:00', value: 11720.0 },
    { label: '20:00', value: 11750.0 },
    { label: '23:59', value: 11800.0 },
  ],
  week: [
    { label: 'Mon', value: 11200 },
    { label: 'Tue', value: 11050 },
    { label: 'Wed', value: 12250 },
    { label: 'Thu', value: 12200 },
    { label: 'Fri', value: 12150 },
    { label: 'Sat', value: 12300 },
    { label: 'Sun', value: 12150 },
  ],
  month: [
    { label: 'Week 1', value: 11200 },
    { label: 'Week 2', value: 11600 },
    { label: 'Week 3', value: 11800 },
    { label: 'Week 4', value: 11624.2 },
  ],
  year: [
    { label: 'Jan', value: 4950 },
    { label: 'Feb', value: 5200 },
    { label: 'Mar', value: 6500 },
    { label: 'Apr', value: 11624.2 },
    { label: 'May', value: 12000 },
    { label: 'Jun', value: 12500 },
    { label: 'Jul', value: 13000 },
    { label: 'Aug', value: 13500 },
    { label: 'Sep', value: 14000 },
    { label: 'Oct', value: 14500 },
    { label: 'Nov', value: 15000 },
    { label: 'Dec', value: 15500 },
  ],
}

export interface Contact {
  id: string
  name: string
  avatar?: string
  initials: string
}

export interface Account {
  id: string
  balance: number
  lastFour: string
  provider: 'visa' | 'mastercard' | 'amex' | 'discover'
  type: 'checking' | 'savings' | 'credit'
}

/**
 * Mock contacts for send money feature.
 */
export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    initials: 'SC',
  },
  {
    id: '2',
    name: 'Mike Johnson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    initials: 'MJ',
  },
  {
    id: '3',
    name: 'Emma Davis',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    initials: 'ED',
  },
  {
    id: '4',
    name: 'Alex Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    initials: 'AR',
  },
  {
    id: '5',
    name: 'Lisa Wang',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    initials: 'LW',
  },
  {
    id: '6',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    initials: 'DK',
  },
]

/**
 * Mock accounts for account selection feature.
 */
export const mockAccounts: Account[] = [
  {
    id: '1',
    balance: 11624.2,
    lastFour: '4321',
    provider: 'visa',
    type: 'checking',
  },
  {
    id: '2',
    balance: 8500.0,
    lastFour: '8765',
    provider: 'mastercard',
    type: 'savings',
  },
  {
    id: '3',
    balance: 2500.0,
    lastFour: '1234',
    provider: 'amex',
    type: 'credit',
  },
]

/**
 * Summary stats for the dashboard.
 * These would normally come from an API.
 */
export const mockDashboardStats = {
  totalBalance: 11624.2,
  monthlySpending: 468.69,
  monthlyIncome: 6200.0,
  savingsRate: 72.4,
}
