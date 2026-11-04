import type { Product } from '@/lib/types'

type ProductSeed = Omit<Product, 'currency' | 'discountPercent' | 'image'>

function product(seed: ProductSeed): Product {
  const discountPercent = seed.price === seed.finalPrice
    ? null
    : Math.round((1 - seed.finalPrice / seed.price) * 100)

  return { ...seed, currency: 'EUR', discountPercent, image: `/products/${seed.slug}.svg` }
}

const audio = (id: number, slug: string, name: string, price: number, finalPrice: number, stock: number, brand: string, brandSlug: string, color: string, colorHex: string, description: string): Product => product({
  id, slug, name, description, price, finalPrice, priorPrice: price === finalPrice ? null : price, stock, brand, brandSlug, color, colorHex,
  categorySlug: 'audio', categoryName: 'Audio', reviewAverage: 4.6, reviewCount: 120 + id,
})

const wearable = (id: number, slug: string, name: string, price: number, finalPrice: number, stock: number, brand: string, brandSlug: string, color: string, colorHex: string, description: string): Product => product({
  id, slug, name, description, price, finalPrice, priorPrice: price === finalPrice ? null : price, stock, brand, brandSlug, color, colorHex,
  categorySlug: 'wearables', categoryName: 'Wearables', reviewAverage: 4.5, reviewCount: 120 + id,
})

const accessory = (id: number, slug: string, name: string, price: number, finalPrice: number, stock: number, brand: string, brandSlug: string, color: string, colorHex: string, description: string): Product => product({
  id, slug, name, description, price, finalPrice, priorPrice: price === finalPrice ? null : price, stock, brand, brandSlug, color, colorHex,
  categorySlug: 'accessories', categoryName: 'Accessories', reviewAverage: 4.4, reviewCount: 120 + id,
})

export const products: Product[] = [
  audio(1, 'orbit-pro-headphones', 'Orbit Pro Headphones', 350, 280, 18, 'Groove', 'groove', 'Black', '#17171A', 'Wireless over-ear headphones with adaptive noise cancellation.'),
  audio(2, 'studio-mini-speaker', 'Studio Mini Speaker', 129, 129, 32, 'Kabelo', 'kabelo', 'Sand', '#D6C4A8', 'Compact Bluetooth speaker with room-filling stereo sound.'),
  audio(3, 'nova-earbuds', 'Nova Earbuds', 160, 120, 0, 'Nexis', 'nexis', 'White', '#F5F5F4', 'Pocket-sized earbuds with clear calls and a charging case.'),
  wearable(4, 'pulse-fit-watch', 'Pulse Fit Watch', 220, 220, 14, 'Voltra', 'voltra', 'Black', '#17171A', 'Daily activity tracking, sleep insights, and a bright AMOLED display.'),
  wearable(5, 'halo-sleep-band', 'Halo Sleep Band', 150, 120, 0, 'Groove', 'groove', 'Lime', '#D6F94A', 'Lightweight sleep tracker with gentle vibration alarms.'),
  accessory(6, 'charge-dock-duo', 'Charge Dock Duo', 79, 79, 45, 'Kabelo', 'kabelo', 'White', '#F5F5F4', 'A tidy two-device wireless charger for your desk or bedside.'),
  accessory(7, 'signal-usb-c-hub', 'Signal USB-C Hub', 100, 75, 27, 'Nexis', 'nexis', 'Silver', '#B7BBC2', 'Seven-port aluminum hub with HDMI, USB-A, and card readers.'),
  accessory(8, 'arc-travel-case', 'Arc Travel Case', 45, 45, 0, 'Voltra', 'voltra', 'Black', '#17171A', 'Protective hard-shell case for headphones, cables, and adapters.'),
  audio(9, 'groove-air-speaker', 'Groove Air Speaker', 199, 199, 25, 'Groove', 'groove', 'Lime', '#D6F94A', 'Portable sound with a warm, full-range driver.'),
  audio(10, 'kabelo-tone-headphones', 'Kabelo Tone Headphones', 260, 208, 16, 'Kabelo', 'kabelo', 'Sand', '#D6C4A8', 'Balanced studio sound in a lightweight closed-back design.'),
  audio(11, 'nexis-pocket-radio', 'Nexis Pocket Radio', 89, 89, 30, 'Nexis', 'nexis', 'Silver', '#B7BBC2', 'A compact radio and Bluetooth speaker for every room.'),
  audio(12, 'voltra-bass-earbuds', 'Voltra Bass Earbuds', 140, 140, 22, 'Voltra', 'voltra', 'Black', '#17171A', 'Deep bass earbuds with a secure all-day fit.'),
  audio(13, 'groove-wave-speaker', 'Groove Wave Speaker', 310, 248, 12, 'Groove', 'groove', 'White', '#F5F5F4', 'A home speaker tuned for clear vocals and rich lows.'),
  audio(14, 'kabelo-call-earbuds', 'Kabelo Call Earbuds', 110, 110, 34, 'Kabelo', 'kabelo', 'Lime', '#D6F94A', 'Noise-reducing microphones for every conversation.'),
  audio(15, 'nexis-spatial-headphones', 'Nexis Spatial Headphones', 290, 290, 20, 'Nexis', 'nexis', 'Silver', '#B7BBC2', 'Immersive spatial audio with long-wear comfort.'),
  audio(16, 'voltra-mini-soundbar', 'Voltra Mini Soundbar', 180, 144, 18, 'Voltra', 'voltra', 'Black', '#17171A', 'A slim soundbar that brings detail to smaller spaces.'),
  audio(17, 'groove-dj-monitor', 'Groove DJ Monitor', 240, 240, 11, 'Groove', 'groove', 'Black', '#17171A', 'Crisp monitoring headphones for mixing on the move.'),
  audio(18, 'kabelo-room-speaker', 'Kabelo Room Speaker', 155, 155, 28, 'Kabelo', 'kabelo', 'Sand', '#D6C4A8', 'A durable speaker built for kitchen and patio sessions.'),
  wearable(19, 'nexis-run-watch', 'Nexis Run Watch', 280, 224, 19, 'Nexis', 'nexis', 'Silver', '#B7BBC2', 'GPS pace coaching and recovery tracking for runners.'),
  wearable(20, 'voltra-activity-band', 'Voltra Activity Band', 95, 95, 42, 'Voltra', 'voltra', 'Lime', '#D6F94A', 'An easy daily tracker with a bright color display.'),
  wearable(21, 'groove-move-watch', 'Groove Move Watch', 205, 205, 17, 'Groove', 'groove', 'Black', '#17171A', 'Movement goals, music controls, and a five-day battery.'),
  wearable(22, 'kabelo-recovery-ring', 'Kabelo Recovery Ring', 190, 152, 23, 'Kabelo', 'kabelo', 'Silver', '#B7BBC2', 'Sleep and recovery insights in a subtle everyday ring.'),
  wearable(23, 'nexis-commute-watch', 'Nexis Commute Watch', 175, 175, 31, 'Nexis', 'nexis', 'White', '#F5F5F4', 'Smart notifications and transit-ready tap controls.'),
  wearable(24, 'voltra-core-band', 'Voltra Core Band', 125, 125, 36, 'Voltra', 'voltra', 'Black', '#17171A', 'A featherweight band for pulse and stress tracking.'),
  wearable(25, 'groove-cycle-computer', 'Groove Cycle Computer', 230, 184, 15, 'Groove', 'groove', 'Lime', '#D6F94A', 'Ride metrics and turn cues in a weather-ready display.'),
  wearable(26, 'kabelo-swim-watch', 'Kabelo Swim Watch', 215, 215, 16, 'Kabelo', 'kabelo', 'Sand', '#D6C4A8', 'Pool and open-water tracking with a soft silicone strap.'),
  wearable(27, 'nexis-focus-band', 'Nexis Focus Band', 135, 135, 29, 'Nexis', 'nexis', 'White', '#F5F5F4', 'Gentle prompts to build focused work and rest routines.'),
  wearable(28, 'voltra-trail-watch', 'Voltra Trail Watch', 320, 256, 13, 'Voltra', 'voltra', 'Black', '#17171A', 'Altitude, route, and weather information for the trail.'),
  wearable(29, 'groove-sleep-ring', 'Groove Sleep Ring', 165, 165, 26, 'Groove', 'groove', 'Silver', '#B7BBC2', 'Quiet overnight tracking with a comfortable low profile.'),
  wearable(30, 'kabelo-step-band', 'Kabelo Step Band', 85, 85, 44, 'Kabelo', 'kabelo', 'Lime', '#D6F94A', 'Simple step, move, and hydration reminders all day.'),
  accessory(31, 'nexis-wireless-pad', 'Nexis Wireless Pad', 69, 55, 37, 'Nexis', 'nexis', 'White', '#F5F5F4', 'A soft-touch charging pad for phones and earbuds.'),
  accessory(32, 'voltra-cable-kit', 'Voltra Cable Kit', 39, 39, 52, 'Voltra', 'voltra', 'Black', '#17171A', 'Three braided cables for every bag and desk.'),
  accessory(33, 'groove-laptop-stand', 'Groove Laptop Stand', 89, 89, 33, 'Groove', 'groove', 'Silver', '#B7BBC2', 'A folding aluminum stand for a cleaner desk setup.'),
  accessory(34, 'kabelo-power-bank', 'Kabelo Power Bank', 99, 79, 24, 'Kabelo', 'kabelo', 'Sand', '#D6C4A8', 'Fast USB-C backup power in a pocket-friendly shell.'),
  accessory(35, 'nexis-desk-lamp', 'Nexis Desk Lamp', 115, 115, 21, 'Nexis', 'nexis', 'White', '#F5F5F4', 'A focused task light with adjustable warmth and angle.'),
  accessory(36, 'voltra-key-tracker', 'Voltra Key Tracker', 29, 29, 60, 'Voltra', 'voltra', 'Lime', '#D6F94A', 'Find keys, bags, and more from your phone.'),
  accessory(37, 'groove-mic-arm', 'Groove Mic Arm', 130, 104, 14, 'Groove', 'groove', 'Black', '#17171A', 'A smooth, quiet arm for podcasts and calls.'),
  accessory(38, 'kabelo-webcam-cover', 'Kabelo Webcam Cover', 19, 19, 74, 'Kabelo', 'kabelo', 'Silver', '#B7BBC2', 'A slim sliding cover for laptops and monitors.'),
  accessory(39, 'nexis-travel-adapter', 'Nexis Travel Adapter', 59, 59, 39, 'Nexis', 'nexis', 'White', '#F5F5F4', 'Compact worldwide power with USB-C fast charging.'),
  accessory(40, 'voltra-phone-grip', 'Voltra Phone Grip', 25, 25, 58, 'Voltra', 'voltra', 'Black', '#17171A', 'A secure low-profile grip for your daily carry.'),
  accessory(41, 'groove-screen-cleaner', 'Groove Screen Cleaner', 22, 22, 65, 'Groove', 'groove', 'Lime', '#D6F94A', 'A reusable cloth and spray set for clear screens.'),
  accessory(42, 'kabelo-device-sleeve', 'Kabelo Device Sleeve', 49, 49, 41, 'Kabelo', 'kabelo', 'Sand', '#D6C4A8', 'A padded sleeve that keeps everyday devices protected.'),
]
