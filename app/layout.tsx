import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import DotGrid from '@/components/effects/dot-grid'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'RAMpage v2.6 | 24-Hour Innovation Challenge',
  description: 'A 24-hour continuous innovation challenge. Think smart. Build steadily. Improve continuously.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased overflow-x-hidden">
        <DotGrid
          dotSize={4}
          gap={20}
          baseColor="#271E37"
          activeColor="#5227FF"
          proximity={80}
          shockRadius={150}
          shockStrength={2}
          resistance={1500}
          returnDuration={3}
        />
        <div className="relative z-10">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}
