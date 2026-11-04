import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { ThemeProvider, useTheme } from './theme-provider'

const mediaListeners = new Set<() => void>()
function mockMatchMedia(prefersDark: boolean) {
  mediaListeners.clear()
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: prefersDark,
    media: query,
    addEventListener: (_: string, cb: () => void) => mediaListeners.add(cb),
    removeEventListener: (_: string, cb: () => void) => mediaListeners.delete(cb),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
    onchange: null,
  }))
}
function fireMediaChange() { mediaListeners.forEach((cb) => cb()) }

function Consumer() {
  const { theme, toggleTheme } = useTheme()
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>toggle</button>
    </div>
  )
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.className = ''
    mockMatchMedia(false)
  })

  it('defaults to light and applies the light color scheme', () => {
    render(<ThemeProvider><Consumer /></ThemeProvider>)
    expect(screen.getByTestId('theme').textContent).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('cycles light → dark → system → light and persists the choice', () => {
    render(<ThemeProvider><Consumer /></ThemeProvider>)
    const button = screen.getByRole('button', { name: 'toggle' })

    act(() => button.click())
    expect(screen.getByTestId('theme').textContent).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(window.localStorage.getItem('grooveshop-theme')).toBe('dark')

    act(() => button.click())
    expect(screen.getByTestId('theme').textContent).toBe('system')

    act(() => button.click())
    expect(screen.getByTestId('theme').textContent).toBe('light')
  })

  it('reads a previously stored theme on mount', () => {
    window.localStorage.setItem('grooveshop-theme', 'dark')
    render(<ThemeProvider><Consumer /></ThemeProvider>)
    expect(screen.getByTestId('theme').textContent).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('treats a corrupt stored value as light', () => {
    window.localStorage.setItem('grooveshop-theme', 'purple')
    render(<ThemeProvider><Consumer /></ThemeProvider>)
    expect(screen.getByTestId('theme').textContent).toBe('light')
  })

  it('re-applies the system theme when the OS preference changes', () => {
    window.localStorage.setItem('grooveshop-theme', 'system')
    mockMatchMedia(true) // OS prefers dark
    render(<ThemeProvider><Consumer /></ThemeProvider>)
    expect(screen.getByTestId('theme').textContent).toBe('system')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    // flipping the OS preference triggers the registered change handler
    act(() => fireMediaChange())
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})
