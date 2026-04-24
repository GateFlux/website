import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, Lock, ShieldCheck, FileCheck, Server } from 'lucide-react'
import Logo from './Logo'
import Container from './Container'

const footerLinks = {
  product: [
    { name: 'Features', href: '/features' },
    { name: 'Modules', href: '/modules' },
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
    { name: 'Documentation', href: 'https://docs.gateflux.co', external: true },
    { name: 'User Guides', href: '/user-guides' },
    { name: 'Download Apps', href: '/#mobile-apps' },
    { name: 'Contact Support', href: '/contact' },
  ],
  legal: [
    { name: 'Terms of Use', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Cancellation & Refund', href: '/refund-policy' },
    { name: 'Data Deletion', href: '/data-deletion' },
  ],
  trust: [
    { name: 'Security & Compliance', href: '/security' },
    { name: 'Service Level Agreement', href: '/sla' },
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 lg:gap-10">
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
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <a
                href="/downloads/GateFlux-Resident.apk"
                download
                className="inline-block hover:opacity-80 transition-opacity"
              >
                <img src="/badges/google-play.svg" alt="Get it on Google Play" className="w-[120px] h-auto" />
              </a>
              <span className="inline-block opacity-30 cursor-default" title="Coming Soon">
                <img src="/badges/app-store.svg" alt="App Store — Coming Soon" className="w-[120px] h-auto grayscale" />
              </span>
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
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-300 hover:text-accent-400 text-sm transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-primary-300 hover:text-accent-400 text-sm transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  )}
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

          {/* Trust & Security */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Trust
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.trust.map((item) => (
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
                <a href="mailto:hello@gateflux.co" className="text-white hover:text-accent-400 transition-colors">
                  hello@gateflux.co
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

      {/* Compliance Badges */}
      <div className="border-t border-primary-800">
        <Container className="py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              { icon: Lock,       label: 'SSL Encrypted' },
              { icon: ShieldCheck, label: 'SOC 2 Ready' },
              { icon: FileCheck,   label: 'GDPR Compliant' },
              { icon: FileCheck,   label: 'DPDP Compliant' },
              { icon: Server,      label: '99.9% Uptime' },
            ].map(({ icon: Icon, label }) => (
              <Link
                key={label}
                href="/security"
                className="flex items-center gap-2 text-primary-400 hover:text-primary-200 transition-colors text-sm"
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-800">
        <Container className="py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-400 text-sm">
              © {new Date().getFullYear()} GateFlux Pvt. Ltd. All rights reserved.
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
