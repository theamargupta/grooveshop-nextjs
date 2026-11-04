export interface BlogPost {
  slug: string
  category: string
  title: string
  excerpt: string
  publishedAt: string
  readTime: string
  body: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'build-a-better-focus-playlist',
    category: 'Sound',
    title: 'How to build a better focus playlist',
    excerpt: 'Small rituals for days that need a little more flow.',
    publishedAt: 'April 18, 2026',
    readTime: '4 min read',
    body: [
      'A focus playlist is less about finding the perfect genre and more about giving your day a reliable starting signal. Pick music with a steady energy level, then let repetition do the rest.',
      'Begin with two or three familiar tracks that ease you in. Keep the middle of the playlist consistent, and save anything lyrical or high-energy for a break rather than a deep-work block.',
      'When the work is done, stop the playlist on purpose. That small ending helps keep your listening ritual useful instead of turning it into background noise.',
    ],
  },
  {
    slug: 'the-desk-reset-that-changes-everything',
    category: 'Guides',
    title: 'The desk reset that changes everything',
    excerpt: 'Five useful upgrades that make work feel lighter.',
    publishedAt: 'May 2, 2026',
    readTime: '5 min read',
    body: [
      'A better desk does not need a complete makeover. Start by removing the friction between you and the next small task: a clear surface, dependable power, and lighting that feels easy on the eyes.',
      'Choose one home for every daily essential. A charging dock, a compact hub, and a stand that brings your screen to eye level are simple improvements that quietly save time every day.',
      'End each afternoon with a two-minute reset. Tomorrow starts with a little more space, and the work in front of you gets the attention it deserves.',
    ],
  },
  {
    slug: 'make-your-morning-walk-a-ritual',
    category: 'Movement',
    title: 'Make your morning walk a ritual',
    excerpt: 'Tiny tech, fresh air, and a soundtrack you love.',
    publishedAt: 'May 15, 2026',
    readTime: '3 min read',
    body: [
      'The best morning walks are easy to repeat. Lay out what you need the night before, pick a short route, and keep the goal small enough that it fits even a busy day.',
      'Bring only the tools that support the feeling you want: comfortable headphones, a lightweight tracker, and a playlist that matches your pace instead of pushing it.',
      'Try noticing one familiar detail differently each time you go. A regular walk becomes a ritual when it gives you a little room to arrive before the day asks anything of you.',
    ],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}
