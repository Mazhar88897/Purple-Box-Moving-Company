import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Purple Box Moving Company - Professional Moving Services in UAE',
  description: 'Purple Box Moving Company provides professional moving and packing services in the UAE. Fast quotes, secure packing, COI handling, and reliable local & commercial moves.',
  keywords: ['Moving Company', 'Packing Services', 'UAE Moving', 'COI Certificate', 'Professional Movers', 'Local Moving', 'Commercial Moving', 'Dubai Movers', 'Abu Dhabi Movers'],
  authors: [{ name: 'Purple Box Moving Company', url: 'https://purpleboxmovers.com' }],
  creator: 'Purple Box Moving Company',
  publisher: 'Purple Box Moving Company',
  icons: {
    icon: [
      {
        url: "/box.png",
        type: "image/png",
        sizes: "any",
      },
      {
        url: "/favicon.ico",
        sizes: "16x16",
        type: "image/x-icon",
      },
    ],
    apple: [
      {
        url: "/box.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
 
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <body className={inter.className}>{children}</body>
    </html>
  )
}
