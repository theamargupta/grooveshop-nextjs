import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import { CartProvider } from '@/lib/cart/cart-context'
import { SiteHeader } from '@/components/site-header'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  title: 'GrooveShop',
  description: 'Everyday tech for your rhythm.',
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        <CartProvider>
          <SiteHeader />
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        </CartProvider>
      </body>
    </html>
  );
}
