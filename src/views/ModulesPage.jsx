import Link from 'next/link'
import {
  Shield,
  Users,
  QrCode,
  Car,
  Bell,
  Calendar,
  MessageSquare,
  CreditCard,
  UserCheck,
  Package,
  Building2,
  Vote,
  BarChart3,
  Settings,
  Layers,
  Cpu,
  Globe,
  Smartphone,
  Check,
  ArrowRight,
  Truck,
  FileText,
  ClipboardList,
  Key,
  Wrench,
  Database,
  Zap,
  AlertTriangle,
  UserCog,
  Crown,
} from 'lucide-react'
import Container from '../components/Container'

const PLATFORM_TAGS = {
  web: { label: 'Web', className: 'bg-blue-100 text-blue-700' },
  api: { label: 'Connected', className: 'bg-green-100 text-green-700' },
  mobile: { label: 'Mobile', className: 'bg-purple-100 text-purple-700' },
  stub: { label: 'Hardware', className: 'bg-orange-100 text-orange-700' },
}

const categories = [
  {
    id: 'platform',
    icon: Crown,
    title: 'Platform Console',
    color: 'bg-amber-50 text-amber-600',
    modules: [
      {
        name: 'Platform Overview Dashboard',
        description: 'Central console for super admins to monitor tenant growth, requests, providers, and platform activity.',
        capabilities: ['Platform KPI dashboard', 'Cross-tenant analytics summary', 'Operational snapshots for support teams'],
        platforms: ['web', 'api'],
      },
      {
        name: 'Tenant Lifecycle Management',
        description: 'Provision, manage, and support tenant societies from a dedicated society administration workspace.',
        capabilities: ['Tenant CRUD & status updates', 'Invitation resend and onboarding support', 'Tenant-level audit visibility'],
        platforms: ['web', 'api'],
      },
      {
        name: 'Plans, Requests & Inboxes',
        description: 'Manage plans and process inbound demand from marketing funnels in one place.',
        capabilities: ['Plan & pricing administration', 'Demo request management', 'Contact submissions queue'],
        platforms: ['web', 'api'],
      },
      {
        name: 'Platform Providers & Health',
        description: 'Configure provider catalog and track platform health endpoints from the same console.',
        capabilities: ['Provider catalog management', 'Health and uptime checks', 'Platform settings controls'],
        platforms: ['web', 'api'],
      },
    ],
  },
  {
    id: 'auth',
    icon: Key,
    title: 'Authentication & Identity',
    color: 'bg-indigo-50 text-indigo-600',
    modules: [
      {
        name: 'Authentication',
        description: 'Email/password and OTP-based login with tenant-scoped sessions, push token registration, and session management.',
        capabilities: ['Login, Register, Logout flows', 'Mobile OTP verification', 'FCM push token registration', 'Session list & revoke', 'Tenant impersonation'],
        platforms: ['web', 'api', 'mobile'],
      },
      {
        name: 'Two-Factor Authentication (2FA)',
        description: 'TOTP-based 2FA with recovery codes for enhanced account security.',
        capabilities: ['Setup, confirm & disable 2FA', 'Recovery code generation', 'Login-time verification challenge'],
        platforms: ['web', 'api'],
      },
      {
        name: 'Role-Based Access Control',
        description: 'Granular capability-based permission system with role templates and dynamic navigation scoping.',
        capabilities: ['Role listing & assignment', 'Per-user capability overrides', 'Capability-gated middleware', 'Dynamic navigation per role'],
        platforms: ['web', 'api'],
      },
      {
        name: 'Profile Security Controls',
        description: 'Self-service account security pages for password updates, session control, and 2FA setup.',
        capabilities: ['Change password flow', 'Active session list & revoke', 'Security setup from profile area'],
        platforms: ['web', 'api'],
      },
    ],
  },
  {
    id: 'visitor',
    icon: UserCheck,
    title: 'Security & Access',
    color: 'bg-green-50 text-green-600',
    modules: [
      {
        name: 'Access & Entry Lifecycle',
        description: 'Access lifecycle with pre-approval, check-in/out, overstay tracking, identity capture, and operational analytics.',
        capabilities: ['Pre-approve, approve & reject', 'Guard check-in / check-out', 'Overstay detection', 'Photo & ID proof upload', 'Visitor history per unit', 'Analytics & peak hour trends'],
        platforms: ['web', 'api', 'mobile'],
      },
      {
        name: 'Recurring Visitors',
        description: 'Manage regular visitors like domestic help and tutors with quick check-in for guards.',
        capabilities: ['Recurring visitor profiles (CRUD)', 'Schedule-based access control', 'Guard quick check-in flow'],
        platforms: ['web', 'api', 'mobile'],
      },
      {
        name: 'Providers Catalog',
        description: 'Platform-level catalog of delivery & service providers (Swiggy, Amazon, etc.) for visitor classification.',
        capabilities: ['Global provider catalog', 'Category grouping & stats', 'Tenant-visible listing'],
        platforms: ['web', 'api'],
      },
    ],
  },
  {
    id: 'resident-property',
    icon: Building2,
    title: 'Resident & Property',
    color: 'bg-lime-50 text-lime-600',
    modules: [
      {
        name: 'Resident Management',
        description: 'Member onboarding, profile management, unit assignments, and invitation workflows.',
        capabilities: ['Resident listing & profile view', 'Invitation & onboarding flow', 'Unit assignment & ownership', 'Member status management'],
        platforms: ['web', 'api', 'mobile'],
      },
      {
        name: 'Property & Unit Configuration',
        description: 'Organize towers, blocks, floors, and units with customizable hierarchies and ownership tracking.',
        capabilities: ['Block & floor structure setup', 'Unit CRUD & categorization', 'Ownership history tracking', 'Unit-wise dashboard view'],
        platforms: ['web', 'api', 'mobile'],
      },
      {
        name: 'Family & Household Members',
        description: 'Manage household members per unit including family and domestic staff registrations.',
        capabilities: ['Family member profiles', 'Domestic staff registration', 'Household listing per unit'],
        platforms: ['api', 'mobile'],
      },
    ],
  },
  {
    id: 'gate',
    icon: Shield,
    title: 'Gate Operations',
    color: 'bg-red-50 text-red-600',
    modules: [
      {
        name: 'Gate Management',
        description: 'Physical gate definitions with QR/OTP-based visitor verification, manual entry, and activity logs.',
        capabilities: ['Gate CRUD (admin)', 'QR & OTP verification', 'Manual entry by guard', 'Gate activity logs & summary'],
        platforms: ['web', 'api', 'mobile'],
      },
      {
        name: 'Vehicle Management',
        description: 'Member vehicle registration and guard-side verification for parking & entry control.',
        capabilities: ['Vehicle CRUD (member)', 'Vehicle verify & lookup (guard)', 'Parking integration support'],
        platforms: ['api', 'mobile'],
      },
      {
        name: 'Blacklist Management',
        description: 'Person/vehicle blacklisting with activation controls and global promotion for multi-property deployments.',
        capabilities: ['Blacklist CRUD & activate/deactivate', 'Guard-side verify check', 'Global blacklist promotion'],
        platforms: ['web', 'api'],
      },
      {
        name: 'RFID Integration',
        description: 'RFID reader registration and automated tag-scan processing for hands-free entry/exit.',
        capabilities: ['Reader registration & listing', 'Tag scan processing', 'Reader status monitoring'],
        platforms: ['api', 'stub'],
      },
      {
        name: 'Boom Barrier & LPR',
        description: 'Automated boom barrier control with License Plate Recognition for vehicle-based auto-entry.',
        capabilities: ['Barrier open / close / status', 'LPR processing', 'Trigger-based auto-open', 'Activity log'],
        platforms: ['api', 'stub'],
      },
    ],
  },
  {
    id: 'helpdesk',
    icon: MessageSquare,
    title: 'Service Requests & Work Orders',
    color: 'bg-orange-50 text-orange-600',
    modules: [
      {
        name: 'Service Requests',
        description: 'Full request management with category controls, assignment, SLA tracking, attachments, ratings, and analytics.',
        capabilities: ['Raise / view / update / close service requests', 'Category & staff assignment', 'File attachments & ratings', 'SLA compliance tracking', 'Analytics & escalation heatmap'],
        platforms: ['web', 'api', 'mobile'],
      },
      {
        name: 'SLA & Escalation Engine',
        description: 'Configurable SLA timers with automatic escalation rules for overdue service requests.',
        capabilities: ['SLA configuration CRUD', 'Automatic escalation rules', 'SLA metrics dashboard', 'Manual escalation & history'],
        platforms: ['web', 'api'],
      },
      {
        name: 'Work Orders',
        description: 'Admin-created work orders linked to vendors with line items, cost tracking, and auto invoice generation.',
        capabilities: ['Work order CRUD & vendor assignment', 'Status lifecycle management', 'Line items (materials + labor)', 'Auto-generate invoice from work order'],
        platforms: ['web', 'api'],
      },
      {
        name: 'Maintenance Management',
        description: 'Scheduled and on-demand maintenance cycles with request tracking and billing integration.',
        capabilities: ['Maintenance request CRUD', 'Cycle scheduling & tracking', 'Maintenance billing integration', 'Request status lifecycle'],
        platforms: ['web', 'api'],
      },
    ],
  },
  {
    id: 'community',
    icon: Bell,
    title: 'Community & Communication',
    color: 'bg-cyan-50 text-cyan-600',
    modules: [
      {
        name: 'Notices & Announcements',
        description: 'Society-wide notice board with pinned/expired notices, acknowledgment tracking, and comments.',
        capabilities: ['CRUD notices with pin & expiry', 'Publish / archive lifecycle', 'Member acknowledgment tracking', 'Comments with pin/unpin'],
        platforms: ['web', 'api', 'mobile'],
      },
      {
        name: 'Polls & Voting',
        description: 'Community polls with multiple options, voting, and real-time result tracking.',
        capabilities: ['Create / publish / close polls', 'Add/remove options', 'Cast & remove votes', 'Results view'],
        platforms: ['web', 'api', 'mobile'],
      },
      {
        name: 'Events',
        description: 'Society events with RSVP management, calendar view, and attendance tracking.',
        capabilities: ['Create / publish / cancel / complete', 'RSVP & cancel RSVP', 'Calendar view & attendee list'],
        platforms: ['web', 'api', 'mobile'],
      },
      {
        name: 'Emergency Broadcasts',
        description: 'Critical emergency alerts with SOS panic button and member acknowledgment.',
        capabilities: ['Create & broadcast emergencies', 'One-tap panic SOS (guard)', 'Member acknowledgment tracking', 'Activity timeline & dashboard'],
        platforms: ['api', 'mobile'],
      },
      {
        name: 'Notifications',
        description: 'Multi-channel notification system (in-app, push, email, SMS) with delivery tracking and preferences.',
        capabilities: ['In-app, push, email, SMS channels', 'Notification triggers on events', 'Per-user opt-in/out preferences', 'Delivery tracking & retry'],
        platforms: ['web', 'api', 'mobile'],
      },
    ],
  },
  {
    id: 'finance',
    icon: CreditCard,
    title: 'Finance & Billing',
    color: 'bg-emerald-50 text-emerald-600',
    modules: [
      {
        name: 'Invoicing',
        description: 'Generate, manage, and email invoices for maintenance charges, amenity bookings, and other fees.',
        capabilities: ['Invoice CRUD & batch generation', 'PDF generation & email delivery', 'GST calculations'],
        platforms: ['web', 'api', 'mobile'],
      },
      {
        name: 'Payments',
        description: 'Payment collection with Razorpay & Stripe integration, manual recording, receipts, and automatic status updates.',
        capabilities: ['Gateway payment (Razorpay / Stripe)', 'Manual payment recording', 'Payment receipts & email', 'Automatic payment status sync'],
        platforms: ['web', 'api', 'mobile'],
      },
      {
        name: 'Expense Management',
        description: 'Society expense tracking with categories, attachments, approval workflows, and reporting.',
        capabilities: ['Expense CRUD & categorization', 'Receipt attachments', 'Approval workflow', 'Expense analytics'],
        platforms: ['api'],
      },
      {
        name: 'Fund Accounting',
        description: 'Double-entry ledger with chart of accounts, journal entries, trial balance, and financial reports.',
        capabilities: ['Chart of accounts & journal entries', 'Trial balance & P&L', 'Balance sheet generation', 'Fund transfer tracking'],
        platforms: ['web', 'api'],
      },
      {
        name: 'Billing Configuration',
        description: 'Configurable billing rules per society — late fees, tax settings, and charge templates.',
        capabilities: ['Billing configuration CRUD', 'Charge templates (recurring & one-time)', 'Late fee automation'],
        platforms: ['web', 'api'],
      },
    ],
  },
  {
    id: 'staff',
    icon: Users,
    title: 'Staff & HR',
    color: 'bg-violet-50 text-violet-600',
    modules: [
      {
        name: 'Staff Management',
        description: 'Society staff profiles with roles, shift assignments, and performance tracking.',
        capabilities: ['Staff CRUD & role assignment', 'Shift scheduling', 'Attendance tracking', 'Biometric attendance sync'],
        platforms: ['web', 'api', 'mobile'],
      },
      {
        name: 'Payroll',
        description: 'Salary management with deductions, allowances, and payslip generation.',
        capabilities: ['Payroll CRUD & processing', 'Deductions & allowances', 'Payslip PDF generation'],
        platforms: ['api'],
      },
      {
        name: 'Guard Device Management',
        description: 'Control which devices guards can use to log in, with per-user device listing and login history.',
        capabilities: ['Device registration / activate / deactivate', 'Per-user device listing', 'Guard login history'],
        platforms: ['api'],
      },
      {
        name: 'Vendor Management',
        description: 'Tenant-level vendor onboarding with contracts, visit passes, ratings, and performance analytics.',
        capabilities: ['Vendor CRUD & onboarding', 'Contract management', 'Visit pass generation', 'Vendor ratings & analytics'],
        platforms: ['web', 'api'],
      },
    ],
  },
  {
    id: 'amenities',
    icon: Calendar,
    title: 'Amenities & Facilities',
    color: 'bg-teal-50 text-teal-600',
    modules: [
      {
        name: 'Amenity Booking',
        description: 'Online booking system for clubhouses, swimming pools, gyms, and other shared facilities.',
        capabilities: ['Amenity CRUD & availability slots', 'Booking with payment integration', 'Booking approval workflow', 'Cancellation & refunds', 'Calendar view'],
        platforms: ['web', 'api', 'mobile'],
      },
      {
        name: 'Asset Management',
        description: 'Track society assets with maintenance schedules, depreciation, and service history.',
        capabilities: ['Asset CRUD & categorization', 'Maintenance scheduling', 'Service history tracking'],
        platforms: ['api'],
      },
    ],
  },
  {
    id: 'governance',
    icon: Vote,
    title: 'Governance',
    color: 'bg-amber-50 text-amber-600',
    modules: [
      {
        name: 'Committee Management',
        description: 'Full committee lifecycle with roles, member assignments, permissions, and audit trails.',
        capabilities: ['Committee CRUD & member assignment', 'Role & permission management', 'Committee audit trail', 'Member listing & history'],
        platforms: ['web', 'api', 'mobile'],
      },
      {
        name: 'Board Meetings',
        description: 'Schedule and manage AGMs, committee meetings with agenda, minutes, and RSVP tracking.',
        capabilities: ['Meeting CRUD & scheduling', 'Agenda management', 'Minutes recording', 'RSVP & attendance'],
        platforms: ['web', 'api'],
      },
      {
        name: 'Committee Elections',
        description: 'Digital elections with candidate nominations, voter eligibility, and secure ballot counting.',
        capabilities: ['Election CRUD & nomination period', 'Voter eligibility checks', 'Ballot casting & counting', 'Result declaration'],
        platforms: ['web', 'api'],
      },
      {
        name: 'Document Repository',
        description: 'Categorised document storage (bylaws, minutes, circulars) with download tracking and pinning.',
        capabilities: ['Category management & uploads', 'Pin/unpin documents', 'Download with tracking', 'Popular & recent views'],
        platforms: ['api', 'mobile'],
      },
    ],
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'Analytics & Dashboards',
    color: 'bg-blue-50 text-blue-600',
    modules: [
      {
        name: 'Operational Dashboard',
        description: 'Real-time overview of operations, access events, service requests, and financial health.',
        capabilities: ['Live access & gate metrics', 'Service request KPIs', 'Financial summary widgets', 'Recent activity feed'],
        platforms: ['web', 'api', 'mobile'],
      },
      {
        name: 'Access Analytics',
        description: 'Deep access-flow analysis with peak hours, purpose breakdown, and trend charts.',
        capabilities: ['Traffic trends over time', 'Purpose & provider breakdown', 'Peak hour heatmap', 'Gate-wise analysis'],
        platforms: ['web', 'api'],
      },
      {
        name: 'Audit Logs',
        description: 'Tamper-proof audit trail of all system actions with cryptographic checksums.',
        capabilities: ['User activity & login tracking', 'Admin action audit trail', 'Security event monitoring', 'CSV export for compliance'],
        platforms: ['web', 'api'],
      },
      {
        name: 'Custom Reports',
        description: 'Exportable reports for visitor logs, financials, service requests, and staff attendance.',
        capabilities: ['Date range & filter support', 'Excel & PDF export', 'Scheduled email reports', 'Custom column selection'],
        platforms: ['web', 'api'],
      },
    ],
  },
  {
    id: 'enterprise',
    icon: Layers,
    title: 'Enterprise Features',
    color: 'bg-pink-50 text-pink-600',
    modules: [
      {
        name: 'White-Label Branding',
        description: 'Fully customizable branding with your logo, colors, and custom domain.',
        capabilities: ['Custom logo & color scheme', 'Custom domain support', 'Branded email templates', 'White-label mobile apps'],
        platforms: ['api'],
      },
      {
        name: 'Advanced Integrations',
        description: 'Connect GateFlux with ERP, accounting, and third-party tools with reliable real-time sync.',
        capabilities: ['Secure integration connectors', 'Real-time data sync', 'High-volume processing support', 'Integration setup guidance'],
        platforms: ['api'],
      },
      {
        name: 'Single Sign-On (SSO)',
        description: 'Enterprise SSO via SAML or OAuth for seamless integration with existing identity providers.',
        capabilities: ['SAML 2.0 & OAuth 2.0', 'LDAP / Active Directory integration', 'JIT user provisioning'],
        platforms: ['web', 'api'],
      },
      {
        name: 'Multi-Property Management',
        description: 'Centralized dashboard for builders and property managers overseeing multiple communities.',
        capabilities: ['Portfolio dashboard across communities', 'Cross-property reporting', 'Tenant isolation & data boundaries', 'Centralized admin controls'],
        platforms: ['api'],
      },
    ],
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile Apps',
    color: 'bg-slate-50 text-slate-600',
    modules: [
      {
        name: 'Member App',
        description: 'iOS & Android app for members to manage visitors, payments, complaints, amenities, community, and household.',
        capabilities: ['Visitor pre-approval & tracking', 'Maintenance billing & payments', 'Service requests & complaints', 'Amenity & facility booking', 'Community feed, documents & committee', 'Family, vehicles & unit management', 'Notifications & emergency contacts'],
        platforms: ['mobile'],
      },
      {
        name: 'Security Guard App',
        description: 'Dedicated gate app for QR/OTP access verification, manual entry, visitor check-ins, and activity logging.',
        capabilities: ['QR code & OTP scan verification', 'Manual visitor entry & logging', 'Visitor check-in / check-out', 'Gate activity logs & history', 'Visitor detail review', 'Profile & help access'],
        platforms: ['mobile'],
      },
    ],
  },
  {
    id: 'administration',
    icon: UserCog,
    title: 'Society Administration Workspace',
    color: 'bg-sky-50 text-sky-600',
    modules: [
      {
        name: 'Society Settings Workspace',
        description: 'Structured society administration area covering profile, contact, compliance, banking, and operational settings.',
        capabilities: ['General profile setup', 'Contact and compliance details', 'Banking and payment method configuration'],
        platforms: ['web', 'api'],
      },
      {
        name: 'Billing & Subscription Settings',
        description: 'Dedicated settings pages to manage billing behavior, invoice preferences, and subscription controls.',
        capabilities: ['Invoice and billing preferences', 'Subscription settings tab', 'Billing-specific configuration pages'],
        platforms: ['web', 'api'],
      },
      {
        name: 'Document & Notification Controls',
        description: 'Admin-level settings for society document governance and notification behaviors.',
        capabilities: ['Documents settings section', 'Notification settings section', 'Policy-aligned admin controls'],
        platforms: ['web', 'api'],
      },
      {
        name: 'User Preferences & Help',
        description: 'Per-user preferences and in-app help center access for tenant users and admins.',
        capabilities: ['Personal preference management', 'In-app help and guidance', 'Role-aware access to support content'],
        platforms: ['web', 'api'],
      },
    ],
  },
]

function PlatformTag({ type }) {
  const tag = PLATFORM_TAGS[type]
  if (!tag) return null
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tag.className}`}>
      {tag.label}
    </span>
  )
}

function ModuleCard({ module }) {
  return (
    <div className="bg-white rounded-xl border border-primary-100 p-5 hover:border-accent-300 hover:shadow-md transition-all duration-200">
      <h4 className="font-bold text-primary-900 mb-1.5 text-sm">{module.name}</h4>
      <p className="text-primary-600 text-xs mb-3 leading-relaxed">{module.description}</p>
      <ul className="mb-3 space-y-1">
        {module.capabilities.map((cap) => (
          <li key={cap} className="flex items-start gap-1.5 text-xs text-primary-700">
            <Check className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
            {cap}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-1">
        {module.platforms.map((p) => (
          <PlatformTag key={p} type={p} />
        ))}
      </div>
    </div>
  )
}

function CategorySection({ category }) {
  return (
    <div id={category.id} className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${category.color}`}>
          <category.icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-primary-900">{category.title}</h2>
          <p className="text-xs text-primary-500">{category.modules.length} module{category.modules.length !== 1 ? 's' : ''}</p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.modules.map((mod) => (
          <ModuleCard key={mod.name} module={mod} />
        ))}
      </div>
    </div>
  )
}

function HeroSection() {
  const totalModules = categories.reduce((sum, c) => sum + c.modules.length, 0)

  return (
    <section className="pt-28 pb-16 bg-primary-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-30" />
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight leading-tight">
            The modern operating system for residential communities
          </h1>
          <p className="text-base md:text-lg text-primary-300 leading-relaxed mb-8 max-w-2xl mx-auto">
            Explore every module across operations, finance, governance, community,
            infrastructure, and platform operations. Current baseline: 57 modules
            across 15 categories.
          </p>
          <Link
            href="/book-demo"
            className="inline-flex items-center gap-2 bg-accent-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors"
          >
            Book Demo
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { num: totalModules, label: 'Total Modules' },
            { num: categories.length, label: 'Categories' },
            { num: 3, label: 'Platforms' },
            { num: 2, label: 'Mobile Apps' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-white">{stat.num}</div>
              <div className="text-xs text-primary-300 mt-1 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function TableOfContents() {
  return (
    <div className="bg-white border-b border-primary-100 sticky top-16 z-30">
      <Container>
        <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-primary-600 hover:text-primary-900 hover:bg-primary-50 whitespace-nowrap transition-colors flex-shrink-0"
            >
              <cat.icon className="h-3.5 w-3.5" />
              {cat.title}
            </a>
          ))}
        </div>
      </Container>
    </div>
  )
}

function PlatformLegend() {
  return (
    <div className="bg-neutral-50 border border-primary-100 rounded-xl p-4 flex flex-wrap gap-4 text-sm mb-10">
      <span className="font-semibold text-primary-700 text-xs uppercase tracking-wider self-center mr-2">Platforms:</span>
      {Object.entries(PLATFORM_TAGS).map(([key, tag]) => (
        <span key={key} className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tag.className}`}>
          {tag.label}
        </span>
      ))}
    </div>
  )
}

export default function ModulesPage() {
  return (
    <>
      <HeroSection />
      <TableOfContents />

      <section className="section-padding bg-neutral-50">
        <Container>
          <PlatformLegend />
          <div className="space-y-16">
            {categories.map((category) => (
              <CategorySection key={category.id} category={category} />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-900">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
              Ready to see GateFlux in action?
            </h2>
            <p className="text-primary-300 mb-8">
              Schedule a demo and explore how GateFlux can be configured for your community.
            </p>
            <Link
              href="/book-demo"
              className="inline-flex items-center gap-2 bg-accent-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-600 transition-colors"
            >
              Book Demo
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
