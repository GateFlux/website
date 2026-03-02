import { Fragment } from 'react'
import Link from 'next/link'
import {
  Check,
  Minus,
  ArrowRight,
  Download,
  Calendar,
  Building2,
  Users,
  Landmark,
  Server,
  Shield,
  FileText,
  Database,
  Settings,
  Phone,
  Mail,
  Clock,
} from 'lucide-react'
import Container from '../components/Container'
import FAQ from '../components/FAQ'

// Hero Section
function HeroSection() {
  return (
    <section className="pt-28 pb-16 bg-primary-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-30" />
      
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight leading-tight">
            Structured Pricing for Modern Residential Infrastructure
          </h1>
          <p className="text-base md:text-lg text-primary-300 leading-relaxed mb-8 max-w-2xl mx-auto">
            GateFlux pricing is aligned with operational scale, governance complexity, 
            and long-term digital infrastructure value.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors"
            >
              <Calendar className="h-5 w-5" />
              Schedule Consultation
            </Link>
            <a
              href="/pricing-overview.pdf"
              className="inline-flex items-center gap-2 text-white border border-white/20 px-6 py-3 rounded-lg font-medium hover:bg-white/5 transition-colors"
            >
              <Download className="h-5 w-5" />
              Download Pricing Overview
            </a>
          </div>
          
          <p className="text-sm text-primary-400">
            Annual subscription model • Minimum unit commitment applies
          </p>
        </div>
      </Container>
    </section>
  )
}

// Pricing Philosophy Section
function PhilosophySection() {
  const principles = [
    {
      icon: Clock,
      title: 'Annual Subscription Model',
      description: 'Predictable budgeting with stable annual pricing cycles.',
    },
    {
      icon: Shield,
      title: 'Governance-Grade System',
      description: 'Enterprise security, audit trails, and compliance built-in.',
    },
    {
      icon: Server,
      title: 'Includes Deployment Support',
      description: 'Configuration, migration, and admin training included.',
    },
    {
      icon: Building2,
      title: 'Structured for Scalability',
      description: 'Per-unit pricing that grows predictably with your community.',
    },
  ]

  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4 tracking-tight">
            Built for Long-Term Infrastructure, Not Short-Term Tools
          </h2>
          <p className="text-primary-600 leading-relaxed">
            GateFlux is designed as foundational community infrastructure. Our pricing reflects 
            the stability, security, and long-term value of a governance-grade platform—not 
            a transactional SaaS subscription.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {principles.map((item) => (
            <div key={item.title} className="text-center">
              <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center mx-auto mb-4">
                <item.icon className="h-6 w-6 text-primary-700" />
              </div>
              <h3 className="font-semibold text-primary-900 mb-2 text-sm">{item.title}</h3>
              <p className="text-primary-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

// Plan Card Component
function PlanCard({ plan }) {
  const isEnterprise = plan.priceMonthly === null
  const yearlySaving = plan.priceMonthly
    ? Math.round(((plan.priceMonthly * 12 - plan.priceYearly) / (plan.priceMonthly * 12)) * 100)
    : 0

  return (
    <div
      className={`relative rounded-xl p-6 flex flex-col h-full ${
        plan.highlighted
          ? 'bg-white border-2 border-accent-500 shadow-lg'
          : 'bg-white border border-primary-200'
      }`}
    >
      {plan.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
            <plan.icon className="h-5 w-5 text-primary-700" />
          </div>
          <h3 className="text-xl font-bold text-primary-900">{plan.name}</h3>
        </div>
        <p className="text-primary-600 text-sm">{plan.tagline}</p>
      </div>

      <div className="mb-5 pb-5 border-b border-primary-100">
        {isEnterprise ? (
          <div>
            <p className="text-2xl font-bold text-primary-900 mb-1">Custom Pricing</p>
            <p className="text-sm text-primary-500">Unlimited units & users</p>
          </div>
        ) : (
          <div>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-3xl font-bold text-primary-900">
                ₹{plan.priceMonthly.toLocaleString('en-IN')}
              </span>
              <span className="text-primary-500 text-sm mb-1">/month</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-primary-600">
                ₹{plan.priceYearly.toLocaleString('en-IN')}/year
              </span>
              {yearlySaving > 0 && (
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                  Save {yearlySaving}% annually
                </span>
              )}
            </div>
            <p className="text-sm text-primary-500 mt-2">
              Up to {plan.maxUnits.toLocaleString('en-IN')} units · {plan.maxUsers.toLocaleString('en-IN')} users
            </p>
          </div>
        )}
        <p className="text-sm text-primary-500 mt-2">
          {plan.trialDays}-day free trial included
        </p>
      </div>

      <div className="flex-grow mb-6">
        <p className="text-xs font-semibold text-primary-500 uppercase tracking-wider mb-3">
          {plan.includesLabel || 'Includes'}
        </p>
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-primary-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        href="/contact"
        className={`block w-full text-center py-3 px-6 rounded-lg font-semibold text-sm transition-colors ${
          plan.highlighted
            ? 'bg-accent-500 text-white hover:bg-accent-600'
            : 'bg-primary-900 text-white hover:bg-primary-800'
        }`}
      >
        {plan.cta}
      </Link>
    </div>
  )
}

// Plans Section
function PlansSection() {
  const plans = [
    {
      name: 'Starter',
      slug: 'basic',
      icon: Building2,
      tagline: 'Perfect for small societies getting started',
      priceMonthly: 1999,
      priceYearly: 19190,
      maxUnits: 50,
      maxUsers: 150,
      trialDays: 14,
      features: [
        'Visitor Management & Check-in/out',
        'QR Code Entry System',
        'Notices & Announcements',
        'Complaint Management',
        'Security Guard App',
        'Role-Based Access Control',
        'Basic Reports',
      ],
      cta: 'Start Free Trial',
      highlighted: false,
    },
    {
      name: 'Essential',
      slug: 'standard',
      icon: Users,
      tagline: 'Everything you need for a well-run society',
      priceMonthly: 5000,
      priceYearly: 48000,
      maxUnits: 500,
      maxUsers: 1500,
      trialDays: 14,
      includesLabel: 'Everything in Starter, plus',
      features: [
        'Maintenance Billing & Online Payments',
        'Amenity Booking & Management',
        'Staff & Shift Management',
        'Package / Parcel Tracking',
        'Vehicle Registration & Verification',
        'Recurring Visitor Management',
        'Vendor Management',
      ],
      cta: 'Start Free Trial',
      highlighted: false,
    },
    {
      name: 'Professional',
      slug: 'professional',
      icon: Landmark,
      tagline: 'Advanced tools for large communities',
      priceMonthly: 12000,
      priceYearly: 115200,
      maxUnits: 2000,
      maxUsers: 6000,
      trialDays: 14,
      includesLabel: 'Everything in Essential, plus',
      features: [
        'Work Orders & Maintenance Tracking',
        'Advanced Analytics & Dashboards',
        'Society Accounting',
        'Community Features (Events, Polls)',
        'Governance & Board Elections',
        'Two-Factor Authentication (2FA)',
        'Audit Logs & Activity Tracking',
      ],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      slug: 'enterprise',
      icon: Server,
      tagline: 'Unlimited power for property management firms',
      priceMonthly: null,
      priceYearly: null,
      maxUnits: null,
      maxUsers: null,
      trialDays: 30,
      includesLabel: 'Everything in Professional, plus',
      features: [
        'White-Label Branding',
        'Advanced Integrations',
        'Single Sign-On (SSO)',
        'Multi-Property Dashboard',
        'Dedicated Account Manager',
        'Priority Support & SLA',
        'Custom Integrations',
      ],
      cta: 'Request Enterprise Proposal',
      highlighted: false,
    },
  ]

  return (
    <section className="section-padding bg-neutral-50">
      <Container>
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4 tracking-tight">
            Subscription Plans
          </h2>
          <p className="text-primary-600 max-w-2xl mx-auto">
            Choose the plan that fits your community size. All plans include a free trial and can be cancelled anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        <p className="text-center text-sm text-primary-500 mt-6">
          All prices in INR · GST applicable · Annual billing saves 20%
        </p>
      </Container>
    </section>
  )
}

// Feature Comparison Table
function ComparisonTableSection() {
  const plans = ['Starter', 'Essential', 'Professional', 'Enterprise']

  // null = custom/unlimited, number = limit, true/false = included/not
  const scaleRows = [
    { label: 'Residential Units',   values: ['Up to 50', 'Up to 500', 'Up to 2,000', 'Unlimited'] },
    { label: 'User Accounts',        values: ['Up to 150', 'Up to 1,500', 'Up to 6,000', 'Unlimited'] },
    { label: 'Free Trial',           values: ['14 days', '14 days', '14 days', '30 days'] },
  ]

  const categories = [
    {
      title: 'Core Operations',
      rows: [
        { label: 'Visitor Management & Check-in/out', values: [true, true, true, true] },
        { label: 'QR Code Entry System',              values: [true, true, true, true] },
        { label: 'Notices & Announcements',            values: [true, true, true, true] },
        { label: 'Complaint Management',               values: [true, true, true, true] },
        { label: 'Recurring Visitor Management',       values: [false, true, true, true] },
        { label: 'Package / Parcel Tracking',          values: [false, true, true, true] },
        { label: 'Vehicle Registration',               values: [false, true, true, true] },
      ],
    },
    {
      title: 'Finance & Billing',
      rows: [
        { label: 'Maintenance Billing & Payments',     values: [false, true, true, true] },
        { label: 'Society Accounting',                 values: [false, false, true, true] },
        { label: 'Vendor Payments',                    values: [false, false, true, true] },
      ],
    },
    {
      title: 'Facilities & Staff',
      rows: [
        { label: 'Amenity Booking & Management',       values: [false, true, true, true] },
        { label: 'Staff & Shift Management',           values: [false, true, true, true] },
        { label: 'Vendor Management',                  values: [false, true, true, true] },
        { label: 'Work Orders & Maintenance Tracking', values: [false, false, true, true] },
      ],
    },
    {
      title: 'Community & Governance',
      rows: [
        { label: 'Events, Polls & Surveys',            values: [false, false, true, true] },
        { label: 'Governance & Board Elections',       values: [false, false, true, true] },
        { label: 'Document Management',                values: [false, false, true, true] },
      ],
    },
    {
      title: 'Analytics & Reports',
      rows: [
        { label: 'Basic Reports',                      values: [true, true, true, true] },
        { label: 'Advanced Analytics & Dashboards',    values: [false, false, true, true] },
        { label: 'Advanced Reports & Exports',         values: [false, false, true, true] },
        { label: 'Custom Report Builder',              values: [false, false, false, true] },
      ],
    },
    {
      title: 'Security & Compliance',
      rows: [
        { label: 'Role-Based Access Control',          values: [true, true, true, true] },
        { label: 'Audit Logs & Activity Tracking',     values: [false, false, true, true] },
        { label: 'Two-Factor Authentication (2FA)',     values: [false, false, true, true] },
        { label: 'Single Sign-On (SSO)',               values: [false, false, false, true] },
      ],
    },
    {
      title: 'Enterprise & Platform',
      rows: [
        { label: 'Advanced Integrations',              values: [false, false, false, true] },
        { label: 'White-Label Branding',               values: [false, false, false, true] },
        { label: 'Multi-Property Dashboard',           values: [false, false, false, true] },
        { label: 'Custom Integrations',                values: [false, false, false, true] },
        { label: 'Dedicated Account Manager',          values: [false, false, false, true] },
        { label: 'Priority Support & SLA',             values: [false, false, false, true] },
      ],
    },
  ]

  const planColors = [
    '',
    '',
    'text-accent-600 font-bold',
    '',
  ]

  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4 tracking-tight">
            Compare Plans
          </h2>
          <p className="text-primary-600 max-w-2xl mx-auto">
            See exactly which features are included in each plan.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-primary-200 shadow-sm">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="bg-primary-900">
                <th className="text-left px-5 py-4 text-sm font-semibold text-primary-300 w-2/5">
                  Feature
                </th>
                {plans.map((plan, i) => (
                  <th
                    key={plan}
                    className={`px-4 py-4 text-center text-sm font-semibold ${
                      i === 2 ? 'text-accent-400' : 'text-white'
                    }`}
                  >
                    {plan}
                    {i === 2 && (
                      <span className="ml-1.5 text-xs bg-accent-500 text-white px-1.5 py-0.5 rounded-full align-middle">
                        ★
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Scale rows */}
              <tr>
                <td colSpan={5} className="px-5 py-2 bg-primary-50 text-xs font-semibold text-primary-500 uppercase tracking-wider">
                  Scale & Limits
                </td>
              </tr>
              {scaleRows.map((row) => (
                <tr key={row.label} className="border-t border-primary-100 hover:bg-neutral-50 transition-colors">
                  <td className="px-5 py-3 text-sm text-primary-700">{row.label}</td>
                  {row.values.map((val, i) => (
                    <td key={i} className={`px-4 py-3 text-center text-sm font-medium ${i === 2 ? 'text-accent-600' : 'text-primary-800'}`}>
                      {val}
                    </td>
                  ))}
                </tr>
              ))}

              {/* Feature category rows */}
              {categories.map((cat) => (
                <Fragment key={cat.title}>
                  <tr>
                    <td colSpan={5} className="px-5 py-2 bg-primary-50 text-xs font-semibold text-primary-500 uppercase tracking-wider">
                      {cat.title}
                    </td>
                  </tr>
                  {cat.rows.map((row) => (
                    <tr key={row.label} className="border-t border-primary-100 hover:bg-neutral-50 transition-colors">
                      <td className="px-5 py-3 text-sm text-primary-700">{row.label}</td>
                      {row.values.map((included, i) => (
                        <td key={i} className="px-4 py-3 text-center">
                          {included ? (
                            <Check className={`h-4 w-4 mx-auto ${i === 2 ? 'text-accent-500' : 'text-green-600'}`} />
                          ) : (
                            <Minus className="h-4 w-4 mx-auto text-primary-200" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-primary-50 border-t-2 border-primary-200">
                <td className="px-5 py-4 text-sm font-medium text-primary-700">Get started</td>
                {plans.map((plan, i) => (
                  <td key={plan} className="px-4 py-4 text-center">
                    <Link
                      href="/contact"
                      className={`inline-block text-xs font-semibold px-4 py-2 rounded-lg transition-colors ${
                        i === 2
                          ? 'bg-accent-500 text-white hover:bg-accent-600'
                          : i === 3
                          ? 'bg-primary-900 text-white hover:bg-primary-800'
                          : 'bg-primary-100 text-primary-800 hover:bg-primary-200'
                      }`}
                    >
                      {i === 3 ? 'Contact Us' : 'Try Free'}
                    </Link>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>

        <p className="text-center text-xs text-primary-400 mt-4">
          All prices in INR · GST applicable · ★ Most Popular
        </p>
      </Container>
    </section>
  )
}

// Add-ons Section
function AddOnsSection() {
  const addOns = [
    {
      name: 'Advanced Analytics',
      description: 'Detailed operational insights with custom dashboards and trend analysis.',
    },
    {
      name: 'Builder Portfolio Dashboard',
      description: 'Centralized oversight across multiple communities and projects.',
    },
    {
      name: 'Dedicated SLA Support',
      description: 'Priority response times with assigned support representative.',
    },
    {
      name: 'Custom Integration Services',
      description: 'ERP, accounting, and third-party system integrations.',
    },
  ]

  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4 tracking-tight">
              Optional Modules
            </h2>
            <p className="text-primary-600">
              Extend your platform capabilities with specialized add-on modules.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-5">
            {addOns.map((addon) => (
              <div
                key={addon.name}
                className="bg-neutral-50 rounded-lg p-5 border border-primary-100"
              >
                <h3 className="font-semibold text-primary-900 mb-2">{addon.name}</h3>
                <p className="text-primary-600 text-sm">{addon.description}</p>
              </div>
            ))}
          </div>
          
          <p className="text-center text-sm text-primary-500 mt-6">
            Available for Professional and Enterprise plans. Contact us for pricing.
          </p>
        </div>
      </Container>
    </section>
  )
}

// Implementation Section
function ImplementationSection() {
  const services = [
    {
      icon: Server,
      title: 'Secure Cloud Deployment',
      description: 'Production-grade infrastructure setup',
    },
    {
      icon: Settings,
      title: 'Configuration Support',
      description: 'Community-specific settings and customization',
    },
    {
      icon: Database,
      title: 'Data Migration Assistance',
      description: 'Structured import from existing systems',
    },
    {
      icon: Users,
      title: 'Admin Training Session',
      description: 'Hands-on training for committee members',
    },
    {
      icon: FileText,
      title: 'Resident Onboarding Toolkit',
      description: 'Communication templates and guides',
    },
    {
      icon: Calendar,
      title: 'Rollout Planning',
      description: 'Enterprise-only phased deployment support',
    },
  ]

  return (
    <section className="section-padding bg-neutral-50">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4 tracking-tight">
              Structured Deployment & Onboarding
            </h2>
            <p className="text-primary-600">
              Every implementation includes comprehensive setup and training support.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-lg p-5 border border-primary-100"
              >
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center mb-4">
                  <service.icon className="h-5 w-5 text-primary-700" />
                </div>
                <h3 className="font-semibold text-primary-900 mb-1 text-sm">{service.title}</h3>
                <p className="text-primary-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

// Multi-Year Commitment Section
function CommitmentSection() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="bg-primary-50 rounded-xl p-8 border border-primary-100">
            <div className="text-center mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-primary-900 mb-3 tracking-tight">
                Long-Term Infrastructure Partnership
              </h2>
              <p className="text-primary-600 text-sm">
                Communities committing to multi-year agreements benefit from structured rate adjustments.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6 max-w-lg mx-auto">
              <div className="bg-white rounded-lg p-5 border border-primary-200 text-center">
                <p className="text-sm font-medium text-primary-600 mb-2">2-Year Commitment</p>
                <p className="text-2xl font-bold text-primary-900">8%</p>
                <p className="text-sm text-primary-500">rate reduction</p>
              </div>
              <div className="bg-white rounded-lg p-5 border border-primary-200 text-center">
                <p className="text-sm font-medium text-primary-600 mb-2">3-Year Commitment</p>
                <p className="text-2xl font-bold text-primary-900">12%</p>
                <p className="text-sm text-primary-500">rate reduction</p>
              </div>
            </div>
            
            <p className="text-center text-xs text-primary-500 mt-6">
              Multi-year commitments include rate protection and priority support escalation.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

// FAQ Section
function FAQSection() {
  const faqs = [
    {
      question: 'Is pricing per resident?',
      answer: 'No. GateFlux pricing is a community-level annual subscription based on the number of residential units (flats/homes), not individual residents. This provides predictable budgeting regardless of occupancy changes.',
    },
    {
      question: 'Is migration from existing systems supported?',
      answer: 'Yes. We provide structured onboarding that includes data migration assistance from existing systems. Our team will work with you to ensure a smooth transition with minimal disruption.',
    },
    {
      question: 'Are annual contracts required?',
      answer: 'Annual subscription is the standard model for GateFlux. Multi-year commitments are available for communities seeking long-term rate stability and additional support benefits.',
    },
    {
      question: 'Is pricing negotiable?',
      answer: 'Pricing is structured based on unit scale, selected modules, and implementation scope. For communities with specific requirements, we provide customized proposals that reflect the agreed configuration.',
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept bank transfers, cheques, and digital payment methods. Annual billing is standard, with quarterly options available for Enterprise plans upon request.',
    },
    {
      question: 'What happens after the contract period?',
      answer: 'Subscriptions renew annually at the then-current rates. Multi-year commitment customers receive advance notice and preferential renewal terms.',
    },
  ]

  return (
    <section className="section-padding bg-neutral-50">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4 tracking-tight">
              Pricing Questions
            </h2>
          </div>

          <div className="bg-white rounded-xl p-6 border border-primary-100">
            <FAQ items={faqs} />
          </div>
        </div>
      </Container>
    </section>
  )
}

// Bottom CTA Section
function CTASection() {
  return (
    <section className="py-16 bg-primary-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-30" />
      
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
            Digitize Your Community with Structured Governance Infrastructure
          </h2>
          <p className="text-primary-300 mb-8 max-w-xl mx-auto">
            Schedule a consultation to discuss your community's requirements and receive a structured proposal.
          </p>
          
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-accent-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-600 transition-colors"
          >
            Book Enterprise Demo
            <ArrowRight className="h-5 w-5" />
          </Link>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
            <a
              href="tel:+919121092479"
              className="flex items-center gap-2 text-primary-300 hover:text-white transition-colors"
            >
              <Phone className="h-4 w-4" />
              +91 91210 92479
            </a>
            <a
              href="mailto:contact@gateflux.co"
              className="flex items-center gap-2 text-primary-300 hover:text-white transition-colors"
            >
              <Mail className="h-4 w-4" />
              contact@gateflux.co
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}

// Sticky CTA (fixed bottom)
function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary-900 border-t border-primary-700 py-3 z-40 hidden md:block">
      <Container>
        <div className="flex items-center justify-between">
          <p className="text-white text-sm">
            Ready to discuss your community's infrastructure requirements?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-accent-500 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-accent-600 transition-colors"
          >
            Schedule Consultation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </div>
  )
}

// Main Pricing Page
export default function PricingPage() {
  return (
    <>
      <HeroSection />
      <PhilosophySection />
      <PlansSection />
      <ComparisonTableSection />
      <AddOnsSection />
      <ImplementationSection />
      <CommitmentSection />
      <FAQSection />
      <CTASection />
      <StickyCTA />
      {/* Add bottom padding for sticky CTA */}
      <div className="h-16 md:block hidden" />
    </>
  )
}
