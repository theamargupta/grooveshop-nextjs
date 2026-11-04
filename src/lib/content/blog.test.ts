import { describe, it, expect } from 'vitest'
import { blogPosts, getBlogPost } from './blog'

describe('blog content', () => {
  it('exposes at least one post, each with the required fields', () => {
    expect(blogPosts.length).toBeGreaterThan(0)
    for (const post of blogPosts) {
      expect(post.slug).toBeTruthy()
      expect(post.title).toBeTruthy()
      expect(post.excerpt).toBeTruthy()
      expect(post.category).toBeTruthy()
      expect(post.readTime).toMatch(/min read/)
      expect(Array.isArray(post.body)).toBe(true)
      expect(post.body.length).toBeGreaterThan(0)
    }
  })

  it('has unique slugs', () => {
    const slugs = blogPosts.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('getBlogPost returns the matching post for a known slug', () => {
    const known = blogPosts[0].slug
    expect(getBlogPost(known)?.slug).toBe(known)
  })

  it('getBlogPost returns undefined for an unknown slug', () => {
    expect(getBlogPost('no-such-post')).toBeUndefined()
  })
})
