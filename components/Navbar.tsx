'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: '서비스', href: '#services' },
  { label: '프로세스', href: '#process' },
  { label: '포트폴리오', href: '#portfolio' },
  { label: '요금제', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-apple-black tracking-tight">
          lapin
        </Link>

        {/* 데스크톱 메뉴 */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-apple-gray hover:text-apple-black transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center bg-apple-blue text-white rounded-full px-5 py-2 text-sm font-medium hover:bg-apple-blue-hover transition-colors"
        >
          문의하기
        </a>

        {/* 모바일 햄버거 */}
        <button
          className="md:hidden p-2 text-apple-black"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>
      </nav>

      {/* 모바일 드롭다운 */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base text-apple-black py-1"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-2 inline-flex items-center justify-center bg-apple-blue text-white rounded-full px-5 py-3 text-sm font-medium"
            onClick={() => setMenuOpen(false)}
          >
            문의하기
          </a>
        </div>
      )}
    </header>
  )
}
