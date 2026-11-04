import type { Metadata } from 'next'
import { CartProvider } from '@/lib/cart/cart-context'
import { SiteHeader } from '@/components/site-header'
import './globals.css'

export const metadata: Metadata = {
  title: 'GrooveShop',
  description: 'Everyday tech for your rhythm.',
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-slate-50 text-slate-950">
        <CartProvider>
          <SiteHeader />
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        </CartProvider>
      </body>
    </html>
  );
}
