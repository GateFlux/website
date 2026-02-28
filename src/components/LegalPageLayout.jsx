import Link from 'next/link'
import { FileText, Calendar, Tag, Mail } from 'lucide-react'
import Container from './Container'

export function LegalSection({ number, title, children }) {
  return (
    <section className="mb-12">
      <h2 className="text-lg font-bold text-primary-900 mb-4 pb-2 border-b-2 border-primary-100 flex items-baseline gap-2">
        {number && <span className="text-primary-400 font-normal">{number}.</span>}
        <span>{title}</span>
      </h2>
      <div className="space-y-4 text-neutral-700 leading-relaxed text-[15px]">
        {children}
      </div>
    </section>
  )
}

export function LegalSubSection({ number, title, children }) {
  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-primary-700 uppercase tracking-wider mb-3">
        {number && <span className="mr-1">{number}</span>}{title}
      </h3>
      <div className="space-y-3 text-[15px]">
        {children}
      </div>
    </div>
  )
}

export function LegalList({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-accent-500 flex-shrink-0" />
          <span className="text-neutral-700">{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function LegalHighlight({ children }) {
  return (
    <div className="bg-primary-50 border border-primary-100 rounded-lg px-5 py-4 my-2">
      <p className="text-primary-800 text-sm leading-relaxed">{children}</p>
    </div>
  )
}

export function LegalTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200 my-2">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-primary-900 text-white">
            {headers.map((h, i) => (
              <th key={i} className="text-left px-4 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 text-neutral-700 border-b border-neutral-100">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function LegalStep({ number, title, children }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-900 text-white flex items-center justify-center text-sm font-bold mt-0.5">
        {number}
      </div>
      <div className="flex-1 pb-8">
        <h4 className="font-semibold text-primary-900 mb-2">{title}</h4>
        <div className="text-neutral-600 text-sm leading-relaxed space-y-2">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function LegalPageLayout({
  badge,
  title,
  subtitle,
  version,
  effectiveDate,
  lastReviewed,
  contactEmail,
  contactLabel,
  children,
}) {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 bg-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-30" />
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded text-sm font-medium bg-white/5 border border-white/10 text-white mb-6">
              <FileText className="h-4 w-4" />
              {badge}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-primary-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        </Container>
      </section>

      {/* Metadata bar */}
      <div className="bg-neutral-50 border-b border-neutral-200">
        <Container className="py-3">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-neutral-500">
            <span className="flex items-center gap-1.5">
              <Tag className="h-3 w-3" />
              Version {version}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3" />
              Effective: {effectiveDate}
            </span>
            {lastReviewed && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                Last Reviewed: {lastReviewed}
              </span>
            )}
          </div>
        </Container>
      </div>

      {/* Content */}
      <div className="bg-white">
        <Container className="py-16 lg:py-20">
          <div className="max-w-3xl mx-auto">
            {children}
          </div>
        </Container>
      </div>

      {/* Contact strip */}
      {contactEmail && (
        <div className="bg-primary-900">
          <Container className="py-10">
            <div className="max-w-lg mx-auto text-center">
              <p className="text-primary-300 text-sm mb-3">
                {contactLabel || 'Questions about this policy?'}
              </p>
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center gap-2 text-white font-medium hover:text-accent-400 transition-colors"
              >
                <Mail className="h-4 w-4" />
                {contactEmail}
              </a>
            </div>
          </Container>
        </div>
      )}
    </>
  )
}
