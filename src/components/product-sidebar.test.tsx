import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ProductSidebar } from './product-sidebar'

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
  navigation.params = new URLSearchParams('category=audio')
  navigation.push.mockReset()
})

describe('ProductSidebar', () => {
  const props = {
    categories: [{ slug: 'audio', name: 'Audio', count: 4 }],
    brands: [{ slug: 'groove', name: 'Groove', count: 2 }],
    colors: [{ name: 'Black', hex: '#17171A', count: 3 }],
  }

  it('pushes a brand filter while preserving existing filters', async () => {
    const user = userEvent.setup()
    render(<ProductSidebar {...props} />)

    await user.click(screen.getByRole('button', { name: 'Groove' }))

    expect(navigation.push).toHaveBeenCalledWith('/products?category=audio&brand=groove')
  })

  it('pushes a color filter', async () => {
    const user = userEvent.setup()
    render(<ProductSidebar {...props} />)

    await user.click(screen.getByRole('button', { name: 'Black' }))

    expect(navigation.push).toHaveBeenCalledWith('/products?category=audio&color=Black')
  })

  it('pushes a minimum price filter', async () => {
    const user = userEvent.setup()
    render(<ProductSidebar {...props} />)

    await user.type(screen.getByRole('spinbutton', { name: 'Minimum price' }), '100')

    expect(navigation.push).toHaveBeenLastCalledWith('/products?category=audio&minPrice=100')
  })
})
