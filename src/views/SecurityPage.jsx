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

// Compliance Section
function ComplianceSection() {
  const compliances = [
    {
      icon: FileCheck,
      title: 'Data Privacy Requirements',
      description: 'Full compliance with data protection and privacy requirements for residential communities.',
    },
    {
      icon: ShieldCheck,
      title: 'Financial Audit Compliance',
      description: 'Architecture designed to support financial audit requirements with complete audit trails.',
    },
    {
      icon: FileText,
      title: 'Multi-Community Data Isolation',
      description: 'Each community operates in logically isolated environments with no data mixing.',
    },
    {
      icon: Globe,
      title: 'Infrastructure-Grade Design',
      description: 'GateFlux is built as operational infrastructure, not just an application.',
    },
  ]

  return (
    <section className="section-padding bg-primary-900">
      <Container>
        <SectionHeader
          badge="Compliance"
          title="Compliance-Ready Architecture"
          subtitle="GateFlux is designed to meet stringent regulatory requirements, making compliance audits simpler for your community."
          light={true}
        />

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {compliances.map((compliance) => (
            <div
              key={compliance.title}
              className="bg-primary-800 rounded-lg p-5 border border-primary-700"
            >
              <div className="w-10 h-10 rounded-lg bg-primary-700 flex items-center justify-center mb-4">
                <compliance.icon className="h-5 w-5 text-primary-200" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{compliance.title}</h3>
              <p className="text-primary-300 text-sm">{compliance.description}</p>
            </div>
          ))}
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
                      <span className="text-primary-600">API Response Time</span>
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
      <InfrastructureSection />
      <AccessControlSection />
      <SecurityPracticesSection />
      <CTASection />
    </>
  )
}
