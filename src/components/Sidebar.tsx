import { Home, CreditCard, TrendingUp, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/', badge: null },
    { icon: CreditCard, label: 'Transactions', href: '/transactions', badge: null },
    { icon: TrendingUp, label: 'Analytics', href: '/analytics', badge: null },
    { icon: Settings, label: 'Settings', href: '/settings', badge: null },
  ]

  return (
    <aside className={cn('w-64 bg-surface border-r border-border h-screen flex flex-col', className)}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-success rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">FinKIT</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-between px-4 py-3 rounded-lg text-foreground/70 hover:text-foreground hover:bg-border transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            {item.badge && (
              <span className="text-xs bg-success text-background px-2 py-1 rounded-full">{item.badge}</span>
            )}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-foreground/70 hover:text-foreground hover:bg-border transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
