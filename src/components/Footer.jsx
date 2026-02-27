import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react'
import Logo from './Logo'
import Container from './Container'

const footerLinks = {
  product: [
    { name: 'Features', href: '/features' },
    { name: 'Security', href: '/security' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Integrations', href: '/features#integrations' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/about#careers' },
    { name: 'Press', href: '/about#press' },
    { name: 'Partners', href: '/about#partners' },
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Help Center', href: '/help' },
    { name: 'API Reference', href: '/api' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR', href: '/gdpr' },
  ],
}

const socialLinks = [
  { name: 'LinkedIn', href: 'https://linkedin.com/company/gateflux', icon: Linkedin },
  { name: 'Twitter', href: 'https://twitter.com/gateflux', icon: Twitter },
  { name: 'Facebook', href: 'https://facebook.com/gateflux', icon: Facebook },
  { name: 'Instagram', href: 'https://instagram.com/gateflux', icon: Instagram },
]

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white">
      {/* Main Footer */}
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Logo variant="light" className="h-10 w-auto" />
            <p className="mt-4 text-primary-300 text-sm leading-relaxed max-w-sm">
              Modern infrastructure for smarter communities. GateFlux unifies residents, 
              security, and management into one intelligent ecosystem.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:text-accent-400 transition-colors duration-200"
                  aria-label={item.name}
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Product
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.product.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-primary-300 hover:text-accent-400 text-sm transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-primary-300 hover:text-accent-400 text-sm transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Resources
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-primary-300 hover:text-accent-400 text-sm transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-primary-300 hover:text-accent-400 text-sm transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-primary-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-800 flex items-center justify-center">
                <Mail className="h-5 w-5 text-accent-400" />
              </div>
              <div>
                <p className="text-xs text-primary-400 uppercase tracking-wider">Email</p>
                <a href="mailto:hello@gateflux.com" className="text-white hover:text-accent-400 transition-colors">
                  hello@gateflux.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-800 flex items-center justify-center">
                <Phone className="h-5 w-5 text-accent-400" />
              </div>
              <div>
                <p className="text-xs text-primary-400 uppercase tracking-wider">Phone</p>
                <a href="tel:+919121092479" className="text-white hover:text-accent-400 transition-colors">
                  +91 91210 92479
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-800 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-accent-400" />
              </div>
              <div>
                <p className="text-xs text-primary-400 uppercase tracking-wider">Office</p>
                <p className="text-white">Hyderabad, India</p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-primary-800">
        <Container className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-400 text-sm">
              © {new Date().getFullYear()} GateFlux. All rights reserved.
            </p>
            <p className="text-primary-500 text-sm">
              Built with security and scale in mind.
            </p>
          </div>
        </Container>
      </div>
    </footer>
  )
}
