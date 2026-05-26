import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: '라핀 | 홈페이지 제작 에이전시',
  description: '소상공인·스타트업을 위한 랜딩페이지·기업 홈페이지 제작 전문 1인 에이전시. 빠르고 깔끔한 웹사이트를 합리적인 가격에.',
  openGraph: {
    title: '라핀 | 홈페이지 제작 에이전시',
    description: '소상공인·스타트업을 위한 랜딩페이지·기업 홈페이지 제작 전문 1인 에이전시.',
    type: 'website',
    locale: 'ko_KR',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={inter.variable}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
