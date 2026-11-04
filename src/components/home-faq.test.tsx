import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { HomeFaq } from './home-faq'

describe('HomeFaq', () => {
  it('reveals an answer when its question is clicked and hides it on the second click', async () => {
    const user = userEvent.setup()
    render(<HomeFaq />)

    const question = screen.getByRole('button', { name: 'How long does delivery take?' })

    expect(screen.queryByText('Most orders arrive within 2–4 business days.')).not.toBeInTheDocument()

    await user.click(question)
    expect(screen.getByText('Most orders arrive within 2–4 business days.')).toBeInTheDocument()

    await user.click(question)
    expect(screen.queryByText('Most orders arrive within 2–4 business days.')).not.toBeInTheDocument()
  })
})
