import Link from 'next/link'
import {
  Check,
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
function PlanCard({ plan, highlighted = false }) {
  return (
    <div
      className={`relative rounded-xl p-6 flex flex-col h-full ${
        highlighted
          ? 'bg-white border-2 border-accent-500'
          : 'bg-white border border-primary-200'
      }`}
    >
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
            <plan.icon className="h-5 w-5 text-primary-700" />
          </div>
          <h3 className="text-xl font-bold text-primary-900">{plan.name}</h3>
        </div>
        <p className="text-primary-600 text-sm mb-4">{plan.tagline}</p>
        
        <div className="space-y-2 text-sm text-primary-700 mb-4">
          <p><span className="font-medium">Best For:</span> {plan.bestFor}</p>
          <p><span className="font-medium">Minimum Billing:</span> {plan.minimumUnits} units</p>
        </div>
      </div>

      <div className="mb-6 pb-6 border-b border-primary-100">
        <div className="mb-2">
          <span className="text-2xl font-bold text-primary-900">₹{plan.pricePerUnit.toLocaleString()}</span>
          <span className="text-primary-600 text-sm"> per flat per year</span>
        </div>
        <p className="text-sm text-primary-500">
          Minimum Annual Billing: ₹{plan.minimumBilling.toLocaleString()}
        </p>
        {plan.example && (
          <p className="text-sm text-primary-500 mt-1">
            Example: {plan.example}
          </p>
        )}
        <p className="text-sm text-primary-500 mt-2">
          Setup Fee: ₹{plan.setupFee}
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
          highlighted
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
      name: 'Core',
      icon: Building2,
      tagline: 'Structured Essentials for Growing Communities',
      bestFor: 'Up to 150 units',
      minimumUnits: 100,
      pricePerUnit: 1350,
      minimumBilling: 135000,
      setupFee: '25,000 (one-time)',
      features: [
        'Visitor Management',
        'Security App',
        'Complaint Management',
        'Maintenance Billing',
        'Online Payments',
        'Standard Reports',
        'Role-Based Access',
      ],
      cta: 'Request Quote',
    },
    {
      name: 'Professional',
      icon: Users,
      tagline: 'Governance-Ready Community Operations',
      bestFor: '150–500 units',
      minimumUnits: 150,
      pricePerUnit: 1950,
      minimumBilling: 292500,
      example: '300 units → ₹5,85,000 annually',
      setupFee: '50,000–75,000',
      includesLabel: 'Everything in Core, plus',
      features: [
        'QR Entry System',
        'Domestic Help Registry',
        'Polls & Voting',
        'Vendor Management',
        'Advanced Reports',
        'Audit Logs',
        'Multi-Tower Support',
      ],
      cta: 'Schedule Consultation',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      icon: Landmark,
      tagline: 'Infrastructure-Grade Control for Large Complexes',
      bestFor: '500+ units, Builders & Multi-Property Operators',
      minimumUnits: 500,
      pricePerUnit: 2950,
      minimumBilling: 1475000,
      example: '800 units → ₹23,60,000 annually',
      setupFee: '1,00,000–2,50,000',
      includesLabel: 'Everything in Professional, plus',
      features: [
        'Multi-Community Dashboard',
        'Advanced Audit Trails',
        'Data Isolation',
        'Custom Configuration',
        'API / Integration Support',
        'Deployment Planning',
      ],
      cta: 'Request Enterprise Proposal',
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
            Select a plan based on your community size and governance requirements.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <PlanCard 
              key={plan.name} 
              plan={plan} 
              highlighted={plan.highlighted} 
            />
          ))}
        </div>
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
