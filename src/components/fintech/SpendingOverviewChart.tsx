import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface DataPoint {
  label: string
  value: number
}

interface SpendingOverviewChartProps {
  data: DataPoint[]
  className?: string
}

export function SpendingOverviewChart({ data, className }: SpendingOverviewChartProps) {
  // Normalize data for SVG
  const maxValue = Math.max(...data.map((d) => d.value))
  const minValue = Math.min(...data.map((d) => d.value))
  const range = maxValue - minValue || 1

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100
    const y = 100 - ((d.value - minValue) / range) * 80 - 10
    return { x, y, value: d.value, label: d.label }
  })

  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

  return (
    <div className={cn('p-6 bg-surface border border-border rounded-xl', className)}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">Balance Trend</h3>
        <p className="text-sm text-foreground-secondary">Last {data.length} days</p>
      </div>

      <div className="relative h-48">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0">
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(0, 219, 135)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="rgb(0, 219, 135)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="0" y1="25" x2="100" y2="25" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
          <line x1="0" y1="75" x2="100" y2="75" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />

          {/* Animated area */}
          <motion.path
            d={`${pathData} L 100 100 L 0 100 Z`}
            fill="url(#chartGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />

          {/* Animated line */}
          <motion.path
            d={pathData}
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-success"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />

          {/* Data points */}
          {points.map((point, index) => (
            <motion.circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="1.5"
              className="fill-success"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
            />
          ))}
        </svg>

        {/* Axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-xs text-foreground/50">
          {points.map((point, index) => (
            <span key={index}>{point.label}</span>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-foreground/60">Highest</p>
            <p className="text-lg font-semibold text-success">
              ${Math.max(...data.map((d) => d.value)).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-foreground/60">Lowest</p>
            <p className="text-lg font-semibold text-foreground">
              ${Math.min(...data.map((d) => d.value)).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-foreground/60">Average</p>
            <p className="text-lg font-semibold text-foreground">
              ${Math.round(data.reduce((a, d) => a + d.value, 0) / data.length).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
