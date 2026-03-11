import Link from 'next/link'
import {
  Server,
  Clock,
  ShieldCheck,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Activity,
  Zap,
  RefreshCw,
  Mail,
} from 'lucide-react'
import Container from '../components/Container'
import SectionHeader from '../components/SectionHeader'
import config from '../lib/config'

// Hero
function HeroSection() {
  return (
    <section className="pt-28 pb-16 bg-primary-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-30" />
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded text-sm font-medium bg-white/5 border border-white/10 text-white mb-6">
            <Activity className="h-4 w-4" />
            Service Level Agreement — v1.0
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight">
            Reliability You Can{' '}
            <span className="text-primary-200">Count On</span>
          </h1>
          <p className="text-base md:text-lg text-primary-300 leading-relaxed max-w-2xl mx-auto">
            GateFlux maintains enterprise-grade uptime commitments backed by defined
            response times, service credits, and 24x7 critical incident coverage.
          </p>
          <p className="text-xs text-primary-500 mt-4">Effective: 28 Feb, 2026</p>
        </div>
      </Container>
    </section>
  )
}

// Uptime Tiers
function UptimeSection() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionHeader
          badge="Availability"
          title="Uptime Commitments"
          subtitle="Choose the plan that matches your community's operational requirements."
        />
        <div className="grid md:grid-cols-2 gap-6 mt-10 max-w-3xl mx-auto">
          {/* Standard */}
          <div className="border border-neutral-200 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Standard Plans</span>
                <p className="text-xs text-neutral-400 mt-0.5">Starter · Growth · Professional</p>
              </div>
              <Server className="h-6 w-6 text-primary-300" />
            </div>
            <div className="mb-6">
              <span className="text-6xl font-black text-primary-900">99.5</span>
              <span className="text-2xl font-bold text-primary-900">%</span>
              <p className="text-sm text-neutral-500 mt-1">Monthly Uptime Availability</p>
            </div>
            <ul className="space-y-2 text-sm text-neutral-600">
              {[
                'Max 3.65 hours downtime/month',
                '24-hour notice for scheduled maintenance',
                'Target max 4 hours maintenance/month',
              ].map(item => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Elite */}
          <div className="border-2 border-primary-900 rounded-2xl p-8 relative bg-primary-900 text-white">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-accent-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Mission-Critical
              </span>
            </div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-semibold text-primary-300 uppercase tracking-wider">Elite Plan</span>
                <p className="text-xs text-primary-400 mt-0.5">Enterprise</p>
              </div>
              <ShieldCheck className="h-6 w-6 text-accent-400" />
            </div>
            <div className="mb-6">
              <span className="text-6xl font-black text-white">99.9</span>
              <span className="text-2xl font-bold text-white">%</span>
              <p className="text-sm text-primary-300 mt-1">Monthly Uptime Availability</p>
            </div>
            <ul className="space-y-2 text-sm text-primary-200">
              {[
                'Max 43.8 minutes downtime/month',
                'Priority incident escalation',
                'Enhanced credit structure',
              ].map(item => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-center text-xs text-neutral-400 mt-6">
          Uptime = ((Total Minutes – Downtime) ÷ Total Minutes) × 100, calculated monthly.
          Excludes scheduled maintenance, force majeure, and third-party failures.
        </p>
      </Container>
    </section>
  )
}

// Response Times
function ResponseSection() {
  const levels = [
    {
      code: 'P1',
      label: 'Critical',
      color: 'bg-red-50 border-red-200 text-red-800',
      badgeColor: 'bg-red-100 text-red-700',
      definition: 'Platform unavailable or financial operations blocked',
      response: '1 hour',
      resolution: '4 hours',
      coverage: '24×7',
      highlight: true,
    },
    {
      code: 'P2',
      label: 'High',
      color: 'bg-orange-50 border-orange-200 text-orange-800',
      badgeColor: 'bg-orange-100 text-orange-700',
      definition: 'Major feature impaired, affecting majority of users',
      response: '4 hours',
      resolution: '1 business day',
      coverage: '24×7',
    },
    {
      code: 'P3',
      label: 'Medium',
      color: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      badgeColor: 'bg-yellow-100 text-yellow-700',
      definition: 'Partial degradation or workaround available',
      response: '1 business day',
      resolution: '2–3 business days',
      coverage: '9 AM–6 PM IST (Mon–Fri)',
    },
    {
      code: 'P4',
      label: 'Low',
      color: 'bg-neutral-50 border-neutral-200 text-neutral-700',
      badgeColor: 'bg-neutral-100 text-neutral-600',
      definition: 'Minor or cosmetic issue',
      response: '2 business days',
      resolution: 'Best effort / next release',
      coverage: 'Business hours',
    },
  ]

  return (
    <section className="section-padding bg-neutral-50">
      <Container>
        <SectionHeader
          badge="Support"
          title="Incident Response Targets"
          subtitle="Defined response and resolution targets for every severity level."
        />
        <div className="mt-10 space-y-4 max-w-4xl mx-auto">
          {levels.map(level => (
            <div
              key={level.code}
              className={`border rounded-xl p-6 ${level.color}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${level.badgeColor} flex-shrink-0 mt-0.5`}>
                    {level.code}
                  </span>
                  <div>
                    <p className="font-semibold">{level.label}</p>
                    <p className="text-sm opacity-80 mt-0.5">{level.definition}</p>
                  </div>
                </div>
                <div className="flex gap-6 text-sm flex-shrink-0">
                  <div className="text-center">
                    <p className="font-bold text-lg leading-tight">{level.response}</p>
                    <p className="text-xs opacity-70">Response</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-lg leading-tight">{level.resolution}</p>
                    <p className="text-xs opacity-70">Resolution</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-xs leading-tight">{level.coverage}</p>
                    <p className="text-xs opacity-70">Coverage</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

// Service Credits
function CreditsSection() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionHeader
          badge="Service Credits"
          title="Credit Structure"
          subtitle="If we fall below committed uptime, you're entitled to service credits applied to your next invoice."
        />
        <div className="grid md:grid-cols-2 gap-8 mt-10 max-w-4xl mx-auto">
          {/* Standard */}
          <div>
            <h3 className="text-base font-semibold text-primary-900 mb-4 flex items-center gap-2">
              <Server className="h-4 w-4 text-primary-400" />
              Starter / Growth / Professional (99.5% SLA)
            </h3>
            <div className="overflow-hidden rounded-xl border border-neutral-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary-900 text-white">
                    <th className="text-left px-4 py-3 font-medium">Actual Uptime</th>
                    <th className="text-right px-4 py-3 font-medium">Credit</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['99.0%–99.5%', '5% of monthly fee'],
                    ['98.0%–99.0%', '10% of monthly fee'],
                    ['Below 98.0%', '15% of monthly fee'],
                  ].map(([range, credit], i) => (
                    <tr key={range} className={i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                      <td className="px-4 py-3 text-neutral-700">{range}</td>
                      <td className="px-4 py-3 text-right font-medium text-primary-800">{credit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Elite */}
          <div>
            <h3 className="text-base font-semibold text-primary-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent-500" />
              Elite Plan (99.9% SLA)
            </h3>
            <div className="overflow-hidden rounded-xl border border-neutral-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary-900 text-white">
                    <th className="text-left px-4 py-3 font-medium">Actual Uptime</th>
                    <th className="text-right px-4 py-3 font-medium">Credit</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['99.5%–99.9%', '5% of monthly fee'],
                    ['99.0%–99.5%', '10% of monthly fee'],
                    ['Below 99.0%', '20% of monthly fee'],
                  ].map(([range, credit], i) => (
                    <tr key={range} className={i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                      <td className="px-4 py-3 text-neutral-700">{range}</td>
                      <td className="px-4 py-3 text-right font-medium text-primary-800">{credit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-6 max-w-4xl mx-auto">
          <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 flex flex-wrap gap-6 text-sm text-neutral-600">
            {[
              'Credits must be requested within 30 days of the qualifying month',
              'Applied to future invoices only — not cash refunds',
              'Shall not exceed the total monthly subscription fee',
            ].map(note => (
              <div key={note} className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-neutral-400 flex-shrink-0 mt-0.5" />
                <span>{note}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

// Maintenance
function MaintenanceSection() {
  return (
    <section className="section-padding bg-neutral-50">
      <Container>
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            badge="Maintenance"
            title="Scheduled & Emergency Maintenance"
          />
          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <RefreshCw className="h-6 w-6 text-primary-400 mb-4" />
              <h3 className="font-semibold text-primary-900 mb-3">Scheduled Maintenance</h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                {[
                  'Conducted outside peak hours where feasible',
                  '24-hour prior notice for planned windows',
                  'Target maximum: 4 hours per calendar month',
                  'Does not count toward downtime SLA',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary-300 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <Zap className="h-6 w-6 text-accent-500 mb-4" />
              <h3 className="font-semibold text-primary-900 mb-3">Emergency Maintenance</h3>
              <ul className="space-y-2 text-sm text-neutral-600">
                {[
                  'May occur without prior notice',
                  'Required to prevent security risks or data loss',
                  'Post-event notification provided',
                  'Does not count toward downtime SLA',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent-300 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

// Security incident
function SecuritySection() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            badge="Security"
            title="Security Incident Response"
          />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Zap, step: '1', title: 'Triage & Contain', desc: 'Immediate triage and containment to limit impact' },
              { icon: Clock, step: '2', title: 'Notify Controller', desc: 'Notification to Data Controller without undue delay' },
              { icon: ShieldCheck, step: '3', title: 'Regulatory Notice', desc: 'Regulatory notifications within legally mandated timelines' },
              { icon: RefreshCw, step: '4', title: 'Post-Incident Review', desc: 'Root cause analysis and documented remediation' },
            ].map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary-50 border border-primary-100 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-5 w-5 text-primary-600" />
                </div>
                <p className="text-xs font-bold text-primary-400 uppercase tracking-wider mb-1">Step {step}</p>
                <p className="font-semibold text-primary-900 mb-1 text-sm">{title}</p>
                <p className="text-xs text-neutral-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

// CTA
function CtaSection() {
  return (
    <section className="section-padding bg-primary-900">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Need the Full SLA Document?
          </h2>
          <p className="text-primary-300 mb-8 text-sm leading-relaxed">
            The complete Service Level Agreement is available as part of the Society
            Subscription & Governance Agreement. Contact our team to receive a copy
            or to discuss custom SLA terms for Enterprise deployments.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Contact Sales
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`mailto:${config.email.support}`}
              className="inline-flex items-center gap-2 text-primary-200 hover:text-white transition-colors text-sm"
            >
              <Mail className="h-4 w-4" />
              {config.email.support}
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default function SlaPage() {
  return (
    <>
      <HeroSection />
      <UptimeSection />
      <ResponseSection />
      <CreditsSection />
      <MaintenanceSection />
      <SecuritySection />
      <CtaSection />
    </>
  )
}
