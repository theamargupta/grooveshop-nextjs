'use client'

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from 'react'
import { has, toggle as toggleId } from './wishlist-logic'

const STORAGE_KEY = 'grooveshop-wishlist'
const fallbackIds: number[] = []

interface WishlistContextValue {
  ids: number[]
  has: (id: number) => boolean
  toggle: (id: number) => void
}

const WishlistContext = createContext<WishlistContextValue>({
  ids: [],
  has: () => false,
  toggle: () => undefined,
})

function readStoredIds(): number[] {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === null) {
      return []
    }

    const parsed: unknown = JSON.parse(stored)
    return Array.isArray(parsed)
      ? [...new Set(parsed.filter((id): id is number => Number.isInteger(id)))]
      : []
  } catch {
    return []
  }
}

function persistIds(ids: number[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {
    // Storage can be unavailable, so the wishlist remains available for this session only.
  }
}

function sameIds(first: readonly number[], second: readonly number[]): boolean {
  return first.length === second.length && first.every((id, index) => id === second[index])
}

function createWishlistStore() {
  let ids = fallbackIds
  let hasLoaded = false
  const listeners = new Set<() => void>()

  function load(): void {
    if (hasLoaded) return
    hasLoaded = true
    const storedIds = readStoredIds()
    if (!sameIds(ids, storedIds)) {
      ids = storedIds
      listeners.forEach((listener) => listener())
    }
  }

  return {
    subscribe(listener: () => void): () => void {
      listeners.add(listener)
      load()
      return () => listeners.delete(listener)
    },
    getSnapshot(): number[] {
      return ids
    },
    getServerSnapshot(): number[] {
      return fallbackIds
    },
    toggle(id: number): void {
      load()
      ids = toggleId(ids, id)
      persistIds(ids)
      listeners.forEach((listener) => listener())
    },
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const store = useMemo(() => createWishlistStore(), [])
  const ids = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot)

  const toggle = useCallback((id: number) => {
    store.toggle(id)
  }, [store])

  const contains = useCallback((id: number) => has(ids, id), [ids])

  return (
    <WishlistContext.Provider value={{ ids, has: contains, toggle }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist(): WishlistContextValue {
  return useContext(WishlistContext)
}
