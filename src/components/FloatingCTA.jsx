'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Calendar } from 'lucide-react'

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  // Don't show on contact page
  const isContactPage = pathname === '/contact'

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px
      setIsVisible(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (isContactPage) return null

  return (
    <div
      className={`fixed bottom-0 right-6 py-3 z-40 transition-all duration-300 ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-16 opacity-0 pointer-events-none'
      }`}
    >
      <Link
        href="/contact"
        className="flex items-center gap-2 bg-accent-500 text-white px-4 py-2.5 rounded-lg shadow-lg hover:bg-accent-600 transition-colors"
      >
        <Calendar className="h-4 w-4" />
        <span className="font-medium text-sm">Book Demo</span>
      </Link>
    </div>
  )
}
