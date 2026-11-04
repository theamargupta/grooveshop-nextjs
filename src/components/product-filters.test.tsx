import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ProductFilters } from './product-filters'

const navigation = vi.hoisted(() => ({
  params: new URLSearchParams(),
  push: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  usePathname: () => '/products',
  useRouter: () => ({ push: navigation.push }),
  useSearchParams: () => navigation.params,
}))

beforeEach(() => {
  navigation.params = new URLSearchParams()
  navigation.push.mockReset()
})

describe('ProductFilters', () => {
  it('pushes a category query when a category is selected', async () => {
    const user = userEvent.setup()
    render(<ProductFilters categories={[{ slug: 'audio', name: 'Audio' }]} />)

    await user.click(screen.getByRole('button', { name: 'Audio' }))

    expect(navigation.push).toHaveBeenCalledWith('/products?category=audio')
  })

  it('pushes a search query as the user types', async () => {
    const user = userEvent.setup()
    render(<ProductFilters categories={[]} />)

    await user.type(screen.getByRole('searchbox', { name: 'Search products' }), 'headphones')

    expect(navigation.push).toHaveBeenLastCalledWith('/products?q=headphones')
  })

  it('removes the category query when all products is selected', async () => {
    navigation.params = new URLSearchParams('category=audio')
    const user = userEvent.setup()
    render(<ProductFilters categories={[{ slug: 'audio', name: 'Audio' }]} />)

    await user.click(screen.getByRole('button', { name: 'All products' }))

    expect(navigation.push).toHaveBeenCalledWith('/products')
  })
})
