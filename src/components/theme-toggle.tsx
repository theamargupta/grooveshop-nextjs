'use client'

import { useTheme } from './theme-provider'

export function ThemeToggle() {
  const { toggleTheme } = useTheme()

  return (
    <button
      aria-label="Toggle theme"
      className="grid size-10 place-items-center rounded-full border border-line text-lg text-foreground transition hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
      onClick={toggleTheme}
      type="button"
    >
      <span aria-hidden="true">◐</span>
    </button>
  )
}
