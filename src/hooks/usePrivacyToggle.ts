import { useState, useCallback } from 'react'

/**
 * Hook for managing privacy toggle state (show/hide sensitive data).
 * Useful for balance visibility and sensitive transaction details.
 *
 * @param initialState - Initial visibility state (default: true)
 * @returns Object with isVisible state and toggle function
 *
 * @example
 * const { isVisible, toggle } = usePrivacyToggle()
 */
export function usePrivacyToggle(initialState: boolean = true) {
  const [isVisible, setIsVisible] = useState(initialState)

  const toggle = useCallback(() => {
    setIsVisible((prev) => !prev)
  }, [])

  return { isVisible, toggle, setIsVisible }
}
