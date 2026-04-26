import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Sidebar, Navigation } from '@/components'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Fintech-Kit | Component Library',
  description: 'A modern React component library for fintech applications built with Next.js, Tailwind CSS, and Framer Motion.',
  keywords: 'fintech, components, react, next.js, tailwind, ui-kit',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <div className="flex h-screen bg-[var(--finkit-background)] text-[var(--finkit-text-main)]">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Navigation */}
            <Navigation />

            {/* Page Content */}
            <main className="flex-1 overflow-y-auto">
              <div className="p-8">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
