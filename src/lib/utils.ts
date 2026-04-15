import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines Tailwind CSS classes with intelligent merging to prevent style conflicts.
 * Combines clsx for conditional classes with tailwind-merge for conflict resolution.
 *
 * @param inputs - Class names (strings, objects, or arrays)
 * @returns Merged class string
 *
 * @example
 * cn('px-2 py-1', 'px-4') // 'py-1 px-4'
 * cn('text-red-500', { 'text-blue-500': isActive }) // conditional classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
