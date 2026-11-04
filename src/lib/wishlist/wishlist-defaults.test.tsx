// Coverage for the provider-less default wishlist context (its no-op has/toggle).
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useWishlist } from './wishlist-context'

function Probe() {
  const { ids, has, toggle } = useWishlist()
  return (
    <output aria-label="w">{has(1) ? 'yes' : 'no'}:{ids.length}
      <button onClick={() => toggle(1)}>t</button>
    </output>
  )
}

describe('wishlist context — provider-less default', () => {
  it('reports nothing wishlisted and ignores toggles safely', () => {
    render(<Probe />)
    expect(screen.getByRole('status', { name: 'w' })).toHaveTextContent('no:0')
    expect(() => screen.getByRole('button', { name: 't' }).click()).not.toThrow()
  })
})
