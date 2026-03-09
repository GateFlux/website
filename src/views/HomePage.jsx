import Link from 'next/link'
import {
  Shield,
  Users,
  Lock,
  Server,
  QrCode,
  Bell,
  Truck,
  Wrench,
  FileText,
  Building,
  Calendar,
  UserCheck,
  MessageSquare,
  CreditCard,
  BarChart3,
  Smartphone,
  CheckCircle,
  ArrowRight,
  Zap,
  Globe,
  Layers,
  Settings,
} from 'lucide-react'
import Container from '../components/Container'
import SectionHeader from '../components/SectionHeader'
import FeatureCard from '../components/FeatureCard'
import ComparisonTable from '../components/ComparisonTable'
import FAQ from '../components/FAQ'

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-primary-900" />
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-40" />

      <Container className="relative z-10 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded text-sm text-white/90 mb-6">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              Enterprise Infrastructure
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
              Run your entire residential society from{' '}
              <span className="text-primary-200">one platform.</span>
            </h1>
            
            <p className="text-base md:text-lg text-primary-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              GateFlux brings security, finance, governance, and community management together in one modern system.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/contact"
                className="btn-primary-lg"
              >
                Start Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="btn-outline px-8 py-4"
              >
                Book Demo
              </Link>
            </div>

            {/* Support Line */}
            <div className="mt-8">
              <p className="text-sm text-primary-400">
                Apartments • Gated Villas • Housing Societies • High-Rise Complexes
              </p>
            </div>
          </div>

          {/* Visual */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Dashboard Mockup */}
              <div className="bg-primary-800 border border-primary-700 rounded-lg overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-primary-900 border-b border-primary-700">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary-600" />
                    <div className="w-2.5 h-2.5 rounded-full bg-primary-600" />
                    <div className="w-2.5 h-2.5 rounded-full bg-primary-600" />
                  </div>
                  <div className="flex-1 text-center">
                    <div className="bg-primary-800 rounded px-4 py-1 text-xs text-primary-400 inline-block font-mono">
                      app.gateflux.co/dashboard
                    </div>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-primary-900 border border-primary-700 rounded p-3">
                      <p className="text-xs text-primary-500 uppercase tracking-wide">Collections Today</p>
                      <p className="text-xl font-semibold text-white mt-1">247</p>
                    </div>
                    <div className="bg-primary-900 border border-primary-700 rounded p-3">
                      <p className="text-xs text-primary-500 uppercase tracking-wide">Outstanding</p>
                      <p className="text-xl font-semibold text-accent-500 mt-1">12</p>
                    </div>
                    <div className="bg-primary-900 border border-primary-700 rounded p-3">
                      <p className="text-xs text-primary-500 uppercase tracking-wide">Service Requests</p>
                      <p className="text-xl font-semibold text-white mt-1">8</p>
                    </div>
                  </div>
                  {/* Activity List */}
                  <div className="bg-primary-900 border border-primary-700 rounded p-3 space-y-2">
                    <p className="text-xs text-primary-500 uppercase tracking-wide mb-3">Recent Activity</p>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      <span className="text-primary-300 font-mono text-xs">14:23</span>
                      <span className="text-primary-200">Auto invoice batch generated — Tower A</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      <span className="text-primary-300 font-mono text-xs">14:18</span>
                      <span className="text-primary-200">Amenity slot utilization updated</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                      <span className="text-primary-300 font-mono text-xs">14:12</span>
                      <span className="text-primary-200">Committee vote cycle opened</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile App Preview */}
              <div className="absolute -bottom-6 -right-6 w-44">
                <div className="bg-primary-800 border border-primary-700 rounded-lg overflow-hidden">
                  <div className="bg-primary-900 p-3">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 rounded bg-primary-700 flex items-center justify-center">
                        <QrCode className="w-4 h-4 text-primary-300" />
                      </div>
                      <span className="text-white text-sm font-medium">Quick Entry</span>
                    </div>
                    <div className="bg-white rounded p-2 mb-2">
                      <div className="w-full h-16 bg-primary-100 rounded flex items-center justify-center">
                        <QrCode className="w-10 h-10 text-primary-400" />
                      </div>
                    </div>
                    <p className="text-xs text-primary-400 text-center">Scan to enter</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

// Trust Section
function TrustSection() {
  const trustPoints = [
    {
      icon: Shield,
      title: 'Secure Cloud Architecture',
      description: 'Enterprise-grade cloud infrastructure',
    },
    {
      icon: Lock,
      title: 'Role-Based Access Control',
      description: 'Granular permissions for every user type',
    },
    {
      icon: Server,
      title: 'End-to-End Data Protection',
      description: 'Complete data isolation per community',
    },
    {
      icon: Zap,
      title: 'Built for Scale',
      description: 'Across communities of all sizes',
    },
  ]

  return (
    <section className="py-12 bg-white border-b border-primary-100">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {trustPoints.map((point) => (
            <div key={point.title} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary-50 mb-3">
                <point.icon className="h-6 w-6 text-primary-700" />
              </div>
              <h3 className="font-semibold text-primary-900 mb-1 text-sm">{point.title}</h3>
              <p className="text-xs text-primary-600">{point.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

// Problem Section
function ProblemSection() {
  const painPoints = [
    'Manual tracking across finance and operations',
    'Unstructured communication via messaging apps',
    'Delayed complaint resolution',
    'Limited financial transparency',
    'Weak access control processes',
    'No centralized operational visibility',
  ]

  return (
    <section className="section-padding bg-neutral-50">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <SectionHeader
              badge="The Challenge"
              title="Traditional Apartment Management Is Fragmented"
              subtitle="Managing a residential community today often means dealing with fragmented systems and processes. As communities grow, inefficiencies multiply."
              centered={false}
            />
            <ul className="mt-8 space-y-3">
              {painPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded bg-primary-100 flex items-center justify-center mt-0.5">
                    <span className="text-primary-700 text-xs font-semibold">×</span>
                  </div>
                  <span className="text-primary-800">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="bg-white rounded-lg p-6 border border-primary-100">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-neutral-50 rounded p-4 border border-primary-100">
                  <div className="text-2xl font-bold text-primary-900 mb-1">73%</div>
                  <p className="text-sm text-primary-600">Communities face security incidents</p>
                </div>
                <div className="bg-neutral-50 rounded p-4 border border-primary-100">
                  <div className="text-2xl font-bold text-primary-900 mb-1">5+ hrs</div>
                  <p className="text-sm text-primary-600">Weekly time lost on manual tasks</p>
                </div>
                <div className="bg-neutral-50 rounded p-4 border border-primary-100">
                  <div className="text-2xl font-bold text-primary-900 mb-1">40%</div>
                  <p className="text-sm text-primary-600">Maintenance delays due to poor tracking</p>
                </div>
                <div className="bg-neutral-50 rounded p-4 border border-primary-100">
                  <div className="text-2xl font-bold text-accent-600 mb-1">₹12L</div>
                  <p className="text-sm text-primary-600">Average annual revenue leakage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

// Solution Section
function SolutionSection() {
  const pillars = [
    {
      icon: Shield,
      title: 'Society Operations',
      description: 'Run day-to-day operations from one control layer with service workflows, access control, and automated monitoring.',
      features: ['Access workflows', 'Delivery handling', 'Service tracking', 'Operational visibility'],
    },
    {
      icon: Users,
      title: 'Governance & Community',
      description: 'Keep everyone connected with instant broadcasts, notice boards, and seamless community engagement.',
      features: ['Digital notice board', 'Event announcements', 'Polls & voting', 'Emergency SOS alerts'],
    },
    {
      icon: CreditCard,
      title: 'Finance & Administration',
      description: 'Transparent financial management with automated billing, payment tracking, and detailed reports.',
      features: ['Auto billing', 'Online payments', 'Expense tracking', 'Audit logs'],
    },
  ]

  return (
    <section className="section-padding bg-primary-900">
      <Container>
        <SectionHeader
          badge="The Solution"
          title="A Unified Digital Ecosystem for Residential Communities"
          subtitle="GateFlux digitizes and centralizes your entire community operations. One platform. Controlled access. Complete oversight."
          centered={true}
          light={true}
        />

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-primary-800 rounded-lg p-6 border border-primary-700"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-700 flex items-center justify-center mb-5">
                <pillar.icon className="h-6 w-6 text-primary-200" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{pillar.title}</h3>
              <p className="text-primary-300 text-sm mb-5">{pillar.description}</p>
              <ul className="space-y-2">
                {pillar.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-primary-200">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

// Feature Highlights Section
function FeatureHighlightsSection() {
  const features = [
    { icon: UserCheck, title: 'Security & Access', description: 'Manage visitor and entry workflows with policy controls.' },
    { icon: QrCode, title: 'QR & OTP Verification', description: 'Seamless entry with QR codes and OTP validation.' },
    { icon: Truck, title: 'Delivery Tracking', description: 'Track deliveries and service personnel.' },
    { icon: Wrench, title: 'Domestic Help Registry', description: 'Registry with access controls for regular staff.' },
    { icon: Building, title: 'Vehicle Logging', description: 'Complete vehicle entry and exit tracking.' },
    { icon: Bell, title: 'Digital Notice Board', description: 'Instant community-wide announcements.' },
    { icon: Calendar, title: 'Event Announcements', description: 'Manage and broadcast community events.' },
    { icon: MessageSquare, title: 'Service Requests', description: 'Structured workflow for issue resolution and assignments.' },
    { icon: FileText, title: 'Polls & Voting', description: 'Community decisions made transparent.' },
    { icon: Shield, title: 'Emergency SOS Alerts', description: 'Instant emergency notifications.' },
  ]

  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionHeader
          badge="Features"
          title="Everything You Need to Manage Your Community"
          subtitle="Comprehensive tools designed to simplify operations and enhance the living experience."
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/features"
            className="inline-flex items-center gap-2 text-primary-700 hover:text-primary-900 font-semibold group"
          >
            Explore all features
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Container>
    </section>
  )
}

// Mobile Experience Section
function MobileExperienceSection() {
  const residentFeatures = [
    'Community updates and announcements',
    'Track society payments',
    'Raise and monitor service requests',
    'Book amenities and facilities',
    'Receive governance and finance alerts',
  ]

  const securityFeatures = [
    'Access control workflows',
    'Visitor check-ins and verification',
    'Delivery handling at gate',
    'Gate operations and event logs',
    'Shift-level instructions and alerts',
  ]

  return (
    <section className="section-padding bg-neutral-50">
      <Container>
        <SectionHeader
          badge="Mobile Apps"
          title="Designed for Speed, Clarity, and Control"
          subtitle="Native mobile experiences for residents and security guards, designed for operational efficiency."
        />

        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          {/* Resident App */}
          <div className="bg-white rounded-lg p-6 border border-primary-100">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center">
                <Smartphone className="h-6 w-6 text-primary-700" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary-900">Resident App</h3>
                <p className="text-primary-600 text-sm">iOS & Android</p>
              </div>
            </div>
            <ul className="grid sm:grid-cols-2 gap-2">
              {residentFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-primary-700 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Security App */}
          <div className="bg-white rounded-lg p-6 border border-primary-100">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-lg bg-primary-900 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary-200" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary-900">Security App</h3>
                <p className="text-primary-600 text-sm">iOS & Android</p>
              </div>
            </div>
            <ul className="grid sm:grid-cols-2 gap-2">
              {securityFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-primary-700 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}

// Comparison Section
function ComparisonSection() {
  const competitors = [
    { name: 'GateFlux', key: 'gateflux', highlight: true },
    { name: 'Others', key: 'others', highlight: false },
  ]

  const features = [
    { name: 'Modular & Scalable Architecture', gateflux: true, others: false },
    { name: 'Role-Based Access Control', gateflux: true, others: 'Basic' },
    { name: 'Builder-Ready Configuration', gateflux: true, others: false },
    { name: 'Complete Audit Trails', gateflux: true, others: 'Limited' },
    { name: 'Multi-Tower Support', gateflux: true, others: false },
    { name: 'Multi-Community Support', gateflux: true, others: false },
    { name: 'Data Export & Portability', gateflux: true, others: false },
    { name: 'Dedicated Support', gateflux: true, others: 'Limited' },
  ]

  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionHeader
          badge="Why GateFlux"
          title="Built for Structured Growth"
          subtitle="GateFlux is engineered as infrastructure — not just a utility app."
        />

        <div className="mt-12 max-w-3xl mx-auto bg-white rounded-2xl shadow-soft border border-primary-100 overflow-hidden">
          <ComparisonTable features={features} competitors={competitors} />
        </div>
      </Container>
    </section>
  )
}

// FAQ Section
function FAQSection() {
  const faqs = [
    {
      question: 'Is GateFlux suitable for small communities?',
      answer: 'Yes. The platform scales based on unit size and feature requirements.',
    },
    {
      question: 'Can we migrate from another system?',
      answer: 'Yes. Structured onboarding and migration assistance are available.',
    },
    {
      question: 'Is data isolated per community?',
      answer: 'Yes. Each community operates in logically isolated environments.',
    },
    {
      question: 'Do residents need training?',
      answer: 'No. The mobile experience is intuitive and streamlined.',
    },
  ]

  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            badge="FAQ"
            title="Frequently Asked Questions"
            subtitle="Common questions about the GateFlux platform."
          />

          <div className="mt-10 bg-neutral-50 rounded-lg p-6 border border-primary-100">
            <FAQ items={faqs} />
          </div>
        </div>
      </Container>
    </section>
  )
}

// CTA Section
function CTASection() {
  return (
    <section className="py-16 md:py-20 bg-primary-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-30" />

      <Container className="relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
            Digitize Your Community Infrastructure
          </h2>
          <p className="text-base text-primary-300 mb-8">
            Modern residential communities require structured digital infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="btn-primary-lg"
            >
              Start Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="btn-outline px-8 py-4"
            >
              Book Demo
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}

// Main HomePage Component
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <ProblemSection />
      <SolutionSection />
      <FeatureHighlightsSection />
      <MobileExperienceSection />
      <ComparisonSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
