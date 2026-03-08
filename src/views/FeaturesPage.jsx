import Link from 'next/link'
import {
  Shield,
  Users,
  UserCheck,
  QrCode,
  Truck,
  Car,
  User,
  Bell,
  Calendar,
  AlertTriangle,
  MessageSquare,
  Vote,
  CreditCard,
  Receipt,
  PiggyBank,
  FileText,
  ClipboardList,
  Settings,
  Building,
  Key,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Smartphone,
  Globe,
  Zap,
  Clock,
} from 'lucide-react'
import Container from '../components/Container'
import SectionHeader from '../components/SectionHeader'

// Feature Category Component
function FeatureCategory({ icon: Icon, title, description, features, reversed = false }) {
  return (
    <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${reversed ? 'lg:flex-row-reverse' : ''}`}>
      <div className={reversed ? 'lg:order-2' : ''}>
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-100 mb-6">
          <Icon className="h-7 w-7 text-accent-500" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4">{title}</h3>
        <p className="text-primary-600 text-lg mb-8">{description}</p>
        <ul className="space-y-4">
          {features.map((feature) => (
            <li key={feature.title} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                <feature.icon className="h-5 w-5 text-accent-500" />
              </div>
              <div>
                <h4 className="font-semibold text-primary-900">{feature.title}</h4>
                <p className="text-primary-600 text-sm">{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={`${reversed ? 'lg:order-1' : ''}`}>
        <div className="bg-gradient-to-br from-primary-50 to-neutral-100 rounded-3xl p-8 border border-primary-100">
          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <div className="space-y-4">
              {features.slice(0, 4).map((feature, index) => (
                <div
                  key={feature.title}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-primary-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                    <feature.icon className="h-5 w-5 text-accent-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-primary-900 text-sm">{feature.title}</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hero Section
function HeroSection() {
  return (
    <section className="pt-28 pb-16 bg-primary-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-30" />
      
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center px-3 py-1 rounded text-sm font-medium bg-white/5 border border-white/10 text-white mb-6">
            Platform Capabilities
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight">
            Built Across Four{' '}
            <span className="text-primary-200">Operational Layers</span>
          </h1>
          <p className="text-base md:text-lg text-primary-300 leading-relaxed">
            GateFlux is a modern community operating system for residential governance, finance,
            operations, security, and engagement.
          </p>
        </div>
      </Container>
    </section>
  )
}

// Quick Stats
function QuickStats() {
  const stats = [
    { icon: Shield, value: '50+', label: 'Operations & Access Controls' },
    { icon: Users, value: '20+', label: 'Community & Governance Tools' },
    { icon: CreditCard, value: '15+', label: 'Finance Automations' },
    { icon: Smartphone, value: '3', label: 'Native Apps' },
  ]

  return (
    <section className="py-10 bg-white border-b border-primary-100">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary-50 mb-3">
                <stat.icon className="h-5 w-5 text-primary-700" />
              </div>
              <p className="text-2xl font-bold text-primary-900">{stat.value}</p>
              <p className="text-primary-600 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

// Security & Access Section
function VisitorSecuritySection() {
  const features = [
    {
      icon: UserCheck,
      title: 'Access Request Workflow',
      description: 'Members can pre-authorize access requests with OTP verification before arrival.',
    },
    {
      icon: QrCode,
      title: 'QR & OTP Entry Validation',
      description: 'Generate QR codes and OTPs for instant entry verification and controlled access.',
    },
    {
      icon: Truck,
      title: 'Delivery Logging & History',
      description: 'Track all deliveries from gate entry to handover with complete timestamped history.',
    },
    {
      icon: User,
      title: 'Domestic Help Registry',
      description: 'Register domestic staff with role tagging, attendance tracking, and access schedules.',
    },
    {
      icon: Car,
      title: 'Vehicle Access Management',
      description: 'Monitor vehicle entries and exits with logging and parking management.',
    },
    {
      icon: AlertTriangle,
      title: 'Blacklist & Watchlist Controls',
      description: 'Maintain blacklist and watchlist for enhanced security screening at entry points.',
    },
  ]

  return (
    <section className="section-padding bg-white" id="visitor-security">
      <Container>
        <FeatureCategory
          icon={Shield}
          title="Security & Access"
          description="Control access across gates, deliveries, and vehicles while maintaining a fast, predictable entry flow."
          features={features}
        />
      </Container>
    </section>
  )
}

// Community Section
function CommunitySection() {
  const features = [
    {
      icon: Bell,
      title: 'Broadcast Announcements',
      description: 'Send community-wide announcements with instant delivery and read receipts.',
    },
    {
      icon: FileText,
      title: 'Smart Notice Board',
      description: 'Digital notices with categorization, scheduling, and notification preferences.',
    },
    {
      icon: Calendar,
      title: 'Event Management',
      description: 'Organize community events with RSVP tracking and calendar integration.',
    },
    {
      icon: MessageSquare,
      title: 'Service Request Workflow',
      description: 'Structured request management with assignment, escalation, and SLA monitoring.',
    },
    {
      icon: Vote,
      title: 'Polls & Voting Modules',
      description: 'Conduct community polls and elections with transparent, verifiable results.',
    },
    {
      icon: AlertTriangle,
      title: 'Emergency SOS Alerts',
      description: 'One-tap emergency alerts that notify security and management instantly.',
    },
  ]

  return (
    <section className="section-padding bg-primary-50" id="community">
      <Container>
        <FeatureCategory
          icon={Users}
          title="Community & Communication"
          description="Keep everyone connected and engaged. From announcements to event management, build a vibrant community with seamless communication tools."
          features={features}
          reversed={true}
        />
      </Container>
    </section>
  )
}

// Financial Section
function FinancialSection() {
  const features = [
    {
      icon: Receipt,
      title: 'Automated Maintenance Billing',
      description: 'Automated billing with one-time and recurring charges, unit-wise calculations.',
    },
    {
      icon: CreditCard,
      title: 'Online Payment Gateway',
      description: 'Accept payments via UPI, cards, net banking with instant reconciliation.',
    },
    {
      icon: FileText,
      title: 'Ledger View Per Flat',
      description: 'Complete financial ledger for each unit with transaction history.',
    },
    {
      icon: PiggyBank,
      title: 'Expense Entry Management',
      description: 'Track all community expenses with categories, vendor mapping, and approvals.',
    },
    {
      icon: BarChart3,
      title: 'Financial Summary Dashboard',
      description: 'Comprehensive dashboard with income statements and downloadable reports.',
    },
    {
      icon: ClipboardList,
      title: 'Audit-Ready Logs',
      description: 'Complete audit trail of all financial transactions with timestamps.',
    },
  ]

  return (
    <section className="section-padding bg-white" id="financial">
      <Container>
        <FeatureCategory
          icon={CreditCard}
          title="Financial & Billing"
          description="Transparent and efficient financial operations. From billing to reporting, manage your community's finances with complete visibility."
          features={features}
        />
      </Container>
    </section>
  )
}

// Admin Control Section
function AdminControlSection() {
  const features = [
    {
      icon: Key,
      title: 'Role-Based User Access',
      description: 'Granular permissions for committee members, managers, accountants, and security.',
    },
    {
      icon: Building,
      title: 'Tower & Unit Configuration',
      description: 'Organize units by towers, blocks, and floors with customizable hierarchies.',
    },
    {
      icon: User,
      title: 'Vendor Onboarding & Access',
      description: 'Onboard vendors with controlled access and track their service delivery.',
    },
    {
      icon: Settings,
      title: 'Committee Management Panel',
      description: 'Dedicated panel for committee members with governance tools.',
    },
    {
      icon: FileText,
      title: 'Data Export Controls',
      description: 'Export data with controlled access and format options.',
    },
    {
      icon: BarChart3,
      title: 'Centralized Dashboard Insights',
      description: 'Real-time dashboards with activity logs and community analytics.',
    },
  ]

  return (
    <section className="section-padding bg-primary-50" id="admin">
      <Container>
        <FeatureCategory
          icon={Settings}
          title="Administration & Governance"
          description="Full control over your community operations. Configure settings, manage access, and gain insights from comprehensive analytics."
          features={features}
          reversed={true}
        />
      </Container>
    </section>
  )
}

// Integration Section
function IntegrationSection() {
  const integrations = [
    { name: 'Payment Gateways', icon: CreditCard, description: 'Razorpay, PayU, Paytm' },
    { name: 'SMS & WhatsApp', icon: MessageSquare, description: 'Automated notifications' },
    { name: 'Accounting', icon: FileText, description: 'Tally, Zoho Books' },
    { name: 'Access Control', icon: Key, description: 'RFID, Biometric systems' },
  ]

  return (
    <section className="section-padding bg-white" id="integrations">
      <Container>
        <SectionHeader
          badge="Integrations"
          title="Seamlessly Connected"
          subtitle="GateFlux integrates with the tools you already use, ensuring smooth operations without disrupting existing workflows."
        />

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="bg-neutral-50 rounded-xl p-5 border border-primary-100"
            >
              <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center mb-3">
                <integration.icon className="h-5 w-5 text-primary-700" />
              </div>
              <h3 className="font-semibold text-primary-900 mb-1 text-sm">{integration.name}</h3>
              <p className="text-xs text-primary-600">{integration.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

// Platform Section
function PlatformSection() {
  return (
    <section className="section-padding bg-primary-900">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              badge="Platform"
              title="Available Everywhere"
              subtitle="Access GateFlux from any device. Native apps for members and gate staff, plus a powerful web administration console."
              centered={false}
              light={true}
            />

            <div className="mt-8 grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-1">Mobile Apps</h4>
                <p className="text-sm text-primary-300">iOS & Android</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-1">Web Dashboard</h4>
                <p className="text-sm text-primary-300">Any browser</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-accent-500" />
                </div>
                <h4 className="font-semibold text-white mb-1">Easy Integrations</h4>
                <p className="text-sm text-primary-300">Works with your tools</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-primary-800/50 rounded-xl p-5 border border-primary-700">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Smartphone className="h-4 w-4 text-white" />
                    <span className="text-white font-medium text-sm">Resident App</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-primary-300">
                      <CheckCircle className="h-3 w-3 text-green-400" /> Community announcements
                    </div>
                    <div className="flex items-center gap-2 text-xs text-primary-300">
                      <CheckCircle className="h-3 w-3 text-green-400" /> Society payments
                    </div>
                    <div className="flex items-center gap-2 text-xs text-primary-300">
                      <CheckCircle className="h-3 w-3 text-green-400" /> Service requests & amenities
                    </div>
                  </div>
                </div>
                <div className="bg-primary-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-4 w-4 text-white" />
                    <span className="text-white font-medium text-sm">Security App</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-primary-300">
                      <CheckCircle className="h-3 w-3 text-green-400" /> Access control checks
                    </div>
                    <div className="flex items-center gap-2 text-xs text-primary-300">
                      <CheckCircle className="h-3 w-3 text-green-400" /> Visitor & delivery handling
                    </div>
                    <div className="flex items-center gap-2 text-xs text-primary-300">
                      <CheckCircle className="h-3 w-3 text-green-400" /> Gate operations reporting
                    </div>
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

// CTA Section
function CTASection() {
  return (
    <section className="section-padding bg-accent-50">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Ready to Transform Your Community?
          </h2>
          <p className="text-lg text-primary-600 mb-8">
            See all these features in action. Book a personalized demo with our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="btn-primary-lg group"
            >
              Book a Demo
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/pricing"
              className="btn-secondary px-8 py-4 text-lg"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}

// Main Features Page
export default function FeaturesPage() {
  return (
    <>
      <HeroSection />
      <QuickStats />
      <VisitorSecuritySection />
      <CommunitySection />
      <FinancialSection />
      <AdminControlSection />
      <IntegrationSection />
      <PlatformSection />
      <CTASection />
    </>
  )
}
