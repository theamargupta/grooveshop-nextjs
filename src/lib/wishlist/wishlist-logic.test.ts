import { describe, expect, it } from 'vitest'
import { has, toggle } from './wishlist-logic'

describe('wishlist logic', () => {
  it('adds an id and then removes it when toggled again', () => {
    const added = toggle([], 42)

    expect(added).toEqual([42])
    expect(toggle(added, 42)).toEqual([])
  })

  it('reports whether an id is in the wishlist', () => {
    expect(has([7, 42], 42)).toBe(true)
    expect(has([7, 42], 9)).toBe(false)
  })
})
