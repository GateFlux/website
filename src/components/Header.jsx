'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import Container from './Container'

const navigation = [
  { name: 'Features', href: '/features' },
  { name: 'Security', href: '/security' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const isActive = (href) => pathname === href

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-primary-900 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <Container>
        <nav className={`flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'h-16' : 'h-20'
        }`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Logo variant="light" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 relative ${
                  isActive(item.href)
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent-500" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              className="btn-primary"
            >
              Book a Demo
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 text-white/70 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-200 ${
            mobileMenuOpen ? 'max-h-96 pb-6' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-1 pt-4 border-t border-white/10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-3 text-base font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-white border-l-2 border-accent-500 bg-white/5'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-white/10">
              <Link
                href="/contact"
                className="btn-primary w-full text-center"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}
