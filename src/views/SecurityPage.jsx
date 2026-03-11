import Link from 'next/link'
import {
  Shield,
  Lock,
  Key,
  Eye,
  Server,
  Database,
  Cloud,
  FileCheck,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  RefreshCw,
  Fingerprint,
  ShieldCheck,
  FileText,
  Globe,
  Users,
  Clock,
} from 'lucide-react'
import Container from '../components/Container'
import SectionHeader from '../components/SectionHeader'
import Card from '../components/Card'
import config from '../lib/config'

// Hero Section
function HeroSection() {
  return (
    <section className="pt-28 pb-16 bg-primary-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-30" />
      
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded text-sm font-medium bg-white/5 border border-white/10 text-white mb-6">
            <Shield className="h-4 w-4" />
            Security Architecture
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight">
            Enterprise-Grade{' '}
            <span className="text-primary-200">Security Infrastructure</span>
          </h1>
          <p className="text-base md:text-lg text-primary-300 leading-relaxed">
            GateFlux is designed with infrastructure-level security principles. 
            Your community's data deserves the highest level of protection.
          </p>
        </div>
      </Container>
    </section>
  )
}

// Trust Badges
function TrustBadges() {
  const badges = [
    { label: 'SSL Encrypted', icon: Lock },
    { label: 'SOC 2 Ready', icon: ShieldCheck },
    { label: 'GDPR Compliant', icon: FileCheck },
    { label: 'DPDP Act 2023', icon: FileCheck },
    { label: '99.9% Uptime', icon: Server },
  ]

  return (
    <section className="py-6 bg-white border-b border-primary-100">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {badges.map((badge) => (
            <div key={badge.label} className="flex items-center gap-2 text-primary-700">
              <badge.icon className="h-4 w-4 text-primary-600" />
              <span className="font-medium text-sm">{badge.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

// Security Features Section
function SecurityFeaturesSection() {
  const features = [
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'All data is encrypted in transit using TLS 1.3 and at rest. Your sensitive information is protected at every stage.',
      details: [
        'End-to-end encryption in transit',
        'Secure cloud-hosted infrastructure',
        'Encrypted backups',
        'Strict access policies',
      ],
    },
    {
      icon: Key,
      title: 'Role-Based Access Control',
      description: 'Each user operates within clearly defined permissions. No cross-role privilege exposure.',
      details: [
        'Residents',
        'Security Personnel',
        'Committee Members',
        'Administrators & Vendors',
      ],
    },
    {
      icon: Eye,
      title: 'Audit & Traceability',
      description: 'Every critical action is logged with complete audit trail visibility.',
      details: [
        'Visitor approvals',
        'Financial transactions',
        'Role modifications',
        'System configuration changes',
      ],
    },
    {
      icon: Cloud,
      title: 'Secure Cloud Infrastructure',
      description: 'Hosted on enterprise-grade cloud infrastructure with database isolation per community.',
      details: [
        'Database isolation per community',
        'Secure cloud-hosted',
        'Multi-region deployment',
        '24/7 monitoring',
      ],
    },
    {
      icon: Database,
      title: 'Data Isolation',
      description: 'Each community\'s data is completely isolated. No data mixing or cross-contamination possible.',
      details: [
        'Dedicated database per community',
        'Isolated storage',
        'Separate encryption keys',
        'Independent backups',
      ],
    },
    {
      icon: RefreshCw,
      title: 'Backup & Disaster Recovery',
      description: 'Automated backups with redundancy mechanisms and business continuity design.',
      details: [
        'Automated backups',
        'Redundancy mechanisms',
        'Recovery planning',
        'Business continuity design',
      ],
    },
  ]

  return (
    <section className="section-padding bg-neutral-50">
      <Container>
        <SectionHeader
          badge="Data Protection"
          title="Infrastructure-Level Security"
          subtitle="Comprehensive security measures designed to protect your community's data and ensure regulatory compliance."
        />

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-lg p-6 border border-primary-100"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center mb-5">
                <feature.icon className="h-6 w-6 text-primary-700" />
              </div>
              <h3 className="text-lg font-semibold text-primary-900 mb-2">{feature.title}</h3>
              <p className="text-primary-600 text-sm mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-2 text-sm text-primary-600">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                    {detail}
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

// Compliance Section — SOC 2 + GDPR
function ComplianceSection() {
  const soc2Criteria = [
    {
      code: 'CC6',
      name: 'Logical & Physical Access',
      description: 'Granular RBAC with capability-based permissions per role. TOTP two-factor authentication enforced for admin accounts. Secure cookies, CSRF tokens, and 30-minute idle session timeout.',
      status: 'implemented',
    },
    {
      code: 'CC7',
      name: 'System Monitoring',
      description: 'Immutable audit logs with SHA-256 checksums covering all critical actions. Structured logging via Loki/Elasticsearch with Slack and Sentry alerting. 90-day security-channel retention.',
      status: 'implemented',
    },
    {
      code: 'CC8',
      name: 'Change Management',
      description: 'Deployments follow a structured pipeline with code review, staging validation, and release notes before production rollout.',
      status: 'implemented',
    },
    {
      code: 'A1',
      name: 'Availability',
      description: '99.9% uptime SLA backed by redundant cloud infrastructure, automated failover, and 24/7 health monitoring across database, Redis, queue, and storage layers.',
      status: 'implemented',
    },
    {
      code: 'C1',
      name: 'Confidentiality',
      description: 'Secrets encrypted with AES-256-CBC. Passwords hashed with bcrypt. Tenant data isolated per-database — cross-community access is architecturally impossible.',
      status: 'implemented',
    },
    {
      code: 'P1–P8',
      name: 'Privacy',
      description: 'Audit log retention by action severity (1–3 years). Data minimisation enforced in collection. Soft-delete with anonymisation workflow implemented for Art. 17 compliance.',
      status: 'implemented',
    },
  ]

  const gdprArticles = [
    {
      article: 'Art. 5',
      title: 'Data Minimisation',
      description: 'Only data necessary for community operations is collected. Sensitive fields (passwords, 2FA secrets) are masked in audit trails. No third-party data sharing for advertising.',
    },
    {
      article: 'Art. 6',
      title: 'Lawful Basis',
      description: 'Processing based on contractual necessity (community membership agreement) and legitimate interest (gate security, visitor management, financial billing).',
    },
    {
      article: 'Art. 13',
      title: 'Transparency',
      description: 'Privacy policy disclosed at onboarding covering what data is collected, how it is used, retention periods, and who can access it.',
    },
    {
      article: 'Art. 17',
      title: 'Right to Erasure',
      description: 'Soft-delete with personal data anonymisation workflow for departed residents. Audit log entries for compliance are preserved but personal identifiers are removed on request.',
    },
    {
      article: 'Art. 20',
      title: 'Data Portability',
      description: 'Authorized admins can export resident profiles, visitor history, complaints, and financial records in JSON/CSV formats on request.',
    },
    {
      article: 'Art. 32',
      title: 'Security of Processing',
      description: 'AES-256-CBC encryption for secrets, bcrypt-hashed passwords, OWASP security headers, rate limiting, input sanitisation, and immutable audit logs with checksum verification.',
    },
  ]

  return (
    <>
      {/* SOC 2 Section */}
      <section className="section-padding bg-primary-900">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded text-sm font-medium bg-white/5 border border-white/10 text-white mb-5">
                <ShieldCheck className="h-4 w-4 text-green-400" />
                SOC 2 Type II Ready
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                SOC 2 Trust Service Criteria
              </h2>
              <p className="text-primary-300 max-w-2xl mx-auto">
                GateFlux is architected around the AICPA SOC 2 framework. Our controls address
                all five Trust Service Criteria relevant to residential management platforms.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {soc2Criteria.map((item) => (
                <div key={item.code} className="bg-primary-800 rounded-lg p-5 border border-primary-700">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-xs font-bold text-primary-400 font-mono">{item.code}</span>
                      <h3 className="text-base font-semibold text-white mt-0.5">{item.name}</h3>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5 ${
                      item.status === 'implemented'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {item.status === 'implemented' ? '✓ Implemented' : '↻ In Progress'}
                    </span>
                  </div>
                  <p className="text-primary-300 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* GDPR Section */}
      <section className="section-padding bg-white">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded text-sm font-medium bg-primary-50 border border-primary-100 text-primary-700 mb-5">
                <FileCheck className="h-4 w-4 text-primary-600" />
                GDPR Compliant
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4 tracking-tight">
                GDPR Data Protection Compliance
              </h2>
              <p className="text-primary-600 max-w-2xl mx-auto">
                GateFlux processes personal data of residents, visitors, and staff in accordance with
                GDPR principles — transparency, minimisation, and individual rights.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gdprArticles.map((item) => (
                <div key={item.article} className="bg-neutral-50 rounded-lg p-5 border border-primary-100">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-primary-500 font-mono bg-primary-100 px-2 py-0.5 rounded">
                      {item.article}
                    </span>
                    <h3 className="text-sm font-semibold text-primary-900">{item.title}</h3>
                  </div>
                  <p className="text-primary-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-primary-50 rounded-lg p-5 border border-primary-100 flex items-start gap-4">
              <FileText className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-primary-900 mb-1">Data Processing Agreement (DPA)</p>
                <p className="text-sm text-primary-600">
                  Enterprise customers can request a signed DPA covering sub-processor lists, data retention schedules,
                  breach notification obligations, and standard contractual clauses (SCCs) for cross-border transfers.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

// DPDP Section
function DpdpSection() {
  const sections = [
    {
      section: 'S.4 / S.6',
      title: 'Consent & Lawful Basis',
      status: 'implemented',
      description: 'Residents provide explicit, informed consent at onboarding. Consent is specific to purpose (gate security, billing, governance). Withdrawal triggers the S.12 erasure workflow.',
    },
    {
      section: 'S.5',
      title: 'Notice to Data Principal',
      status: 'implemented',
      description: 'Privacy notice at registration covers data categories, purpose, retention period, and how to exercise rights — available in English and Hindi.',
    },
    {
      section: 'S.8',
      title: 'Data Fiduciary Obligations',
      status: 'implemented',
      description: 'GateFlux maintains data accuracy, implements security safeguards, and deletes personal data once purpose is fulfilled or consent withdrawn (resident offboarding workflow).',
    },
    {
      section: 'S.9',
      title: "Children's Data",
      status: 'implemented',
      description: 'Accounts for users under 18 require parental/guardian consent before activation. Behavioural profiling is disabled for minors.',
    },
    {
      section: 'S.11 / S.12',
      title: 'Rights of Data Principal',
      status: 'implemented',
      description: 'Data principals can request a full personal data export (S.11) and submit erasure requests (S.12) directly from the app. Requests are processed within 30 days.',
    },
    {
      section: 'S.13',
      title: 'Grievance Redressal',
      status: 'implemented',
      description: 'Designated Grievance Officer reachable at ' + config.email.privacy + '. Grievances acknowledged within 48 hours and resolved within 30 days.',
    },
    {
      section: 'S.8(6)',
      title: 'Breach Notification',
      status: 'implemented',
      description: 'Data breaches are reported to the Data Protection Board of India (DPBI) within 72 hours, and affected Data Principals are notified without undue delay.',
    },
    {
      section: 'S.8(7)',
      title: 'Data Retention & Deletion',
      status: 'implemented',
      description: 'Personal data retained only for its stated purpose. Automated retention schedules enforce deletion. Audit records follow regulatory retention periods.',
    },
    {
      section: 'S.14',
      title: 'Right to Nominate',
      status: 'in-progress',
      description: 'Residents will be able to designate a nominee to exercise data rights on their behalf after death or incapacity — currently in development.',
    },
  ]

  return (
    <section className="section-padding bg-neutral-50">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded text-sm font-medium bg-primary-50 border border-primary-100 text-primary-700 mb-5">
              <ShieldCheck className="h-4 w-4 text-primary-600" />
              DPDP Act 2023 — India
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4 tracking-tight">
              Digital Personal Data Protection Act Compliance
            </h2>
            <p className="text-primary-600 max-w-2xl mx-auto">
              GateFlux is purpose-built for Indian residential communities. As a Data Processor,
              GateFlux supports society committees (Data Fiduciaries) in fulfilling their
              obligations under India's DPDP Act, 2023.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {sections.map((item) => (
              <div key={item.section} className="bg-white rounded-lg p-5 border border-primary-100">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs font-bold text-primary-500 font-mono bg-primary-50 px-2 py-0.5 rounded">
                      {item.section}
                    </span>
                    <h3 className="text-sm font-semibold text-primary-900 mt-1">{item.title}</h3>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ml-2 mt-0.5 ${
                    item.status === 'implemented'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {item.status === 'implemented' ? '✓' : '↻'}
                  </span>
                </div>
                <p className="text-primary-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-primary-900 rounded-xl p-6 text-white">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <p className="font-semibold mb-1">Grievance Officer — DPDP Act 2023</p>
                <p className="text-primary-300 text-sm">
                  Residents and data principals can raise grievances with our designated officer.
                  Responses within 48 hours · Resolution within 30 days.
                </p>
              </div>
              <a
                href={`mailto:${config.email.privacy}`}
                className="flex-shrink-0 inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                {config.email.privacy}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

// Infrastructure Section
function InfrastructureSection() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded text-sm font-medium bg-primary-50 text-primary-700 mb-5">
              Infrastructure
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-5 tracking-tight">
              Enterprise-Class Infrastructure
            </h2>
            <p className="text-base text-primary-700 mb-6 leading-relaxed">
              GateFlux runs on world-class cloud infrastructure designed for reliability, 
              scalability, and security. Our architecture ensures your community never experiences downtime.
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                  <Server className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-900 mb-1">99.9% Uptime SLA</h3>
                  <p className="text-primary-600 text-sm">
                    Guaranteed availability with automatic failover and redundant systems.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Globe className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-900 mb-1">Multi-Region Deployment</h3>
                  <p className="text-primary-600 text-sm">
                    Data centers across multiple regions for low latency and compliance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-900 mb-1">24/7 Monitoring</h3>
                  <p className="text-primary-600 text-sm">
                    Round-the-clock system monitoring with automated alerts and response.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-neutral-50 rounded-lg p-6 border border-primary-100">
              <div className="bg-white rounded-lg p-5 border border-primary-100">
                <h4 className="font-semibold text-primary-900 mb-4 text-sm uppercase tracking-wide">Infrastructure Metrics</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-primary-600">Uptime (Last 90 days)</span>
                      <span className="font-semibold text-primary-900 font-mono">99.97%</span>
                    </div>
                    <div className="h-1.5 bg-primary-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-600 rounded-full" style={{ width: '99.97%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-primary-600">System Response Time</span>
                      <span className="font-semibold text-primary-900 font-mono">&lt;100ms</span>
                    </div>
                    <div className="h-1.5 bg-primary-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-700 rounded-full" style={{ width: '95%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-primary-600">Security Score</span>
                      <span className="font-semibold text-primary-900 font-mono">A+</span>
                    </div>
                    <div className="h-1.5 bg-primary-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-600 rounded-full" style={{ width: '100%' }} />
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

// Access Control Section
function AccessControlSection() {
  const roles = [
    { name: 'Residents', permissions: 'Personal unit only', color: 'bg-primary-50 text-primary-700' },
    { name: 'Security Personnel', permissions: 'Visitor + Entry logs', color: 'bg-primary-50 text-primary-700' },
    { name: 'Committee Members', permissions: 'Financial + Reports', color: 'bg-primary-50 text-primary-700' },
    { name: 'Administrators', permissions: 'Full system access', color: 'bg-primary-100 text-primary-800' },
    { name: 'Vendors', permissions: 'Assigned tasks only', color: 'bg-primary-50 text-primary-700' },
  ]

  return (
    <section className="section-padding bg-neutral-50">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="lg:order-2">
            <span className="inline-flex items-center px-3 py-1 rounded text-sm font-medium bg-primary-50 text-primary-700 mb-5">
              Access Control
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-5 tracking-tight">
              Granular Role-Based Permissions
            </h2>
            <p className="text-base text-primary-700 mb-6 leading-relaxed">
              Every user type has precisely defined access levels. Customize roles to match your 
              community's organizational structure and ensure data access is strictly controlled.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-primary-700 text-sm">Custom role creation</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-primary-700 text-sm">Permission inheritance</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-primary-700 text-sm">Time-based access restrictions</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-primary-700 text-sm">Multi-factor authentication</span>
              </div>
            </div>
          </div>

          <div className="lg:order-1">
            <div className="bg-white rounded-lg p-5 border border-primary-100">
              <h4 className="font-semibold text-primary-900 mb-4 text-sm uppercase tracking-wide">Role Hierarchy</h4>
              <div className="space-y-2">
                {roles.map((role) => (
                  <div
                    key={role.name}
                    className="flex items-center justify-between p-3 rounded bg-neutral-50 border border-primary-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded flex items-center justify-center ${role.color}`}>
                        <Users className="h-3.5 w-3.5" />
                      </div>
                      <span className="font-medium text-primary-900 text-sm">{role.name}</span>
                    </div>
                    <span className="text-xs text-primary-500 font-mono">{role.permissions}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

// Security Practices Section
function SecurityPracticesSection() {
  const practices = [
    'Regular penetration testing by third-party security firms',
    'Continuous vulnerability scanning and patching',
    'Security awareness training for all employees',
    'Incident response procedures with defined SLAs',
    'Code review and security audits before deployment',
    'Bug bounty program for responsible disclosure',
  ]

  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader
            badge="Security Practices"
            title="Continuous Security Commitment"
            subtitle="Security is not a feature—it's a continuous process. We maintain rigorous security practices to keep your data safe."
          />

          <div className="mt-10 bg-neutral-50 rounded-lg p-6 border border-primary-100">
            <ul className="grid md:grid-cols-2 gap-3 text-left">
              {practices.map((practice) => (
                <li key={practice} className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-primary-700 text-sm">{practice}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}

// CTA Section
function CTASection() {
  return (
    <section className="py-16 bg-primary-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-30" />
      
      <Container className="relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
            Have Security Questions?
          </h2>
          <p className="text-base text-primary-300 mb-8">
            Our security team is ready to discuss your specific requirements. 
            Request a security briefing or download our detailed security whitepaper.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="btn-primary-lg"
            >
              Request Security Briefing
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <button
              className="btn-outline px-8 py-4"
            >
              Download Whitepaper
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}

// Main Security Page
export default function SecurityPage() {
  return (
    <>
      <HeroSection />
      <TrustBadges />
      <SecurityFeaturesSection />
      <ComplianceSection />
      <DpdpSection />
      <InfrastructureSection />
      <AccessControlSection />
      <SecurityPracticesSection />
      <CTASection />
    </>
  )
}
