'use client'

import { Bell, User, Search } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

interface NavigationProps {
  className?: string
}

export function Navigation({ className }: NavigationProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <>
      <nav className={`h-16 bg-surface border-b border-border flex items-center justify-between px-6 ${className}`}>
        {/* Search Bar */}
        <div className="flex-1 max-w-sm">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full px-4 py-2 bg-border/50 text-foreground/60 rounded-lg flex items-center space-x-2 hover:bg-border transition-colors group"
          >
            <Search className="w-4 h-4" />
            <span className="text-sm">Search transactions...</span>
            <span className="ml-auto text-xs text-foreground/40 group-hover:hidden">⌘K</span>
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 ml-6">
          <button className="p-2 hover:bg-border rounded-lg transition-colors relative">
            <Bell className="w-5 h-5 text-foreground/70" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-success rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-border rounded-lg transition-colors">
            <User className="w-5 h-5 text-foreground/70" />
          </button>
        </div>
      </nav>

      {/* Search Modal */}
      {isSearchOpen && (
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      )}
    </>
  )
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')

  const results = [
    { id: 1, label: 'Dashboard', category: 'Navigation' },
    { id: 2, label: 'Transactions', category: 'Navigation' },
    { id: 3, label: 'Analytics', category: 'Navigation' },
    { id: 4, label: 'Settings', category: 'Navigation' },
  ].filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20"
    >
      <motion.div
        initial={{ scale: 0.95, y: -20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: -20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md"
      >
        <div className="bg-surface border border-border rounded-lg overflow-hidden shadow-lg">
          <div className="p-4 border-b border-border flex items-center space-x-2">
            <Search className="w-5 h-5 text-foreground/60" />
            <input
              autoFocus
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') onClose()
              }}
              className="flex-1 bg-transparent text-foreground outline-none text-sm"
            />
            <span className="text-xs text-foreground/40">ESC</span>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {results.length > 0 ? (
              results.map((result) => (
                <button
                  key={result.id}
                  onClick={onClose}
                  className="w-full px-4 py-3 text-left hover:bg-border transition-colors flex items-center justify-between group"
                >
                  <div>
                    <p className="text-foreground text-sm">{result.label}</p>
                    <p className="text-xs text-foreground/50">{result.category}</p>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-foreground/50 text-sm">No results found</div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
