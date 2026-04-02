import Link from 'next/link'
import SignupLink from '../components/SignupLink'
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
            Run your entire residential society from{' '}
            <span className="text-primary-200">one platform</span>
          </h1>
          <p className="text-base md:text-lg text-primary-300 leading-relaxed">
            GateFlux brings security, finance, governance, and community management together in one modern system.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <SignupLink href="/signup?plan=starter" className="btn-primary px-6 py-3">
              Start Free Trial
            </SignupLink>
            <Link
              href="/book-demo"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors"
            >
              Book Demo
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}

// Quick Stats
function QuickStats() {
  const stats = [
    { icon: Shield, value: '57', label: 'Implemented Modules' },
    { icon: Settings, value: '15', label: 'Module Categories' },
    { icon: CreditCard, value: '5', label: 'Finance & Billing Modules' },
    { icon: Smartphone, value: '4', label: 'Platform Surfaces' },
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
      description: 'Residents can pre-authorize visitors with approval flows, OTP, and audit visibility before arrival.',
    },
    {
      icon: QrCode,
      title: 'QR & OTP Entry Validation',
      description: 'Generate QR codes and OTPs for instant entry verification and controlled access.',
    },
    {
      icon: Truck,
      title: 'Delivery Logging & History',
      description: 'Track delivery and service visitor movement from gate entry to checkout with full timestamps.',
    },
    {
      icon: User,
      title: 'Domestic Help Registry',
      description: 'Manage recurring visitors and domestic support profiles with schedule-based access.',
    },
    {
      icon: Car,
      title: 'Vehicle Access Management',
      description: 'Support resident vehicle registration plus guard verification and lookup workflows.',
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
          description="One layer of the platform focused on gate operations, visitor flow, and controlled access across the community."
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
      description: 'Publish notices, announcements, and targeted communication with acknowledgment tracking.',
    },
    {
      icon: FileText,
      title: 'Smart Notice Board',
      description: 'Operate a structured notice board with publish, archive, pin, expiry, and engagement controls.',
    },
    {
      icon: Calendar,
      title: 'Event Management',
      description: 'Run event lifecycles with RSVP management, attendee visibility, and calendar views.',
    },
    {
      icon: MessageSquare,
      title: 'Service Requests Workflow',
      description: 'Handle service requests with assignment, SLA, escalation, attachments, and status tracking.',
    },
    {
      icon: Vote,
      title: 'Polls & Voting Modules',
      description: 'Run polls and committee election flows with voting and transparent result visibility.',
    },
    {
      icon: AlertTriangle,
      title: 'Emergency SOS Alerts',
      description: 'Broadcast emergency alerts with panic-trigger support and member acknowledgment workflows.',
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
      description: 'Configure billing rules with recurring and one-time charge templates and late-fee controls.',
    },
    {
      icon: CreditCard,
      title: 'Online Payment Gateway',
      description: 'Collect payments through Razorpay and Stripe with receipts and status synchronization.',
    },
    {
      icon: FileText,
      title: 'Ledger View Per Flat',
      description: 'Maintain unit-level ledger, invoice trails, and finance-ready transaction history.',
    },
    {
      icon: PiggyBank,
      title: 'Expense Entry Management',
      description: 'Track expenses with categories, attachments, approvals, and analytics reporting.',
    },
    {
      icon: BarChart3,
      title: 'Financial Summary Dashboard',
      description: 'Surface finance dashboards with trial balance, statements, and operational summaries.',
    },
    {
      icon: ClipboardList,
      title: 'Audit-Ready Logs',
      description: 'Preserve audit logs and exportable reports for finance and compliance operations.',
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
      icon: Shield,
      title: '2FA, Password & Session Security',
      description: 'Built-in account protection with 2FA setup, password changes, and active session controls.',
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
      title: 'Society Settings Workspace',
      description: 'Dedicated settings sections for profile, compliance, banking, billing, documents, and notifications.',
    },
    {
      icon: Globe,
      title: 'Platform Console for Operators',
      description: 'Platform admins can manage tenants, plans, provider catalog, inbound requests, and system health.',
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
          title="Society Administration & Governance"
          description="Run administration with capability-based access, settings workspaces, provider controls, and governance operations."
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
    { name: 'Payment Gateways', icon: CreditCard, description: 'Razorpay, Stripe' },
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
              subtitle="Access GateFlux from any device. Native apps for members and gate staff, plus a powerful web society administration console."
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
                    <span className="text-white font-medium text-sm">Member App</span>
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
            <SignupLink
              href="/signup?plan=starter"
              className="btn-primary-lg"
            >
              Start Free Trial
            </SignupLink>
            <Link
              href="/book-demo"
              className="btn-primary-lg group"
            >
              Book Demo
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
