import Link from 'next/link'
import {
  Target,
  Eye,
  Heart,
  Users,
  Shield,
  Zap,
  Globe,
  Award,
  ArrowRight,
  CheckCircle,
  Briefcase,
} from 'lucide-react'
import Container from '../components/Container'
import SectionHeader from '../components/SectionHeader'
import config from '../lib/config'

// Hero Section
function HeroSection() {
  return (
    <section className="pt-28 pb-16 bg-primary-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-30" />
      
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center px-3 py-1 rounded text-sm font-medium bg-white/5 border border-white/10 text-white mb-6">
            About GateFlux
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight">
            Built for{' '}
            <span className="text-primary-200">Structured Communities</span>
          </h1>
          <p className="text-base md:text-lg text-primary-300 leading-relaxed">
            GateFlux was created to address operational inefficiencies in modern 
            residential environments.
          </p>
        </div>
      </Container>
    </section>
  )
}

// Story Section
function StorySection() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded text-sm font-medium bg-primary-50 text-primary-700 mb-5">
              Our Story
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-5 tracking-tight">
              The Challenge We Solve
            </h2>
            <div className="space-y-4 text-primary-700 text-sm leading-relaxed">
              <p>
                Communities are evolving. Management complexity is increasing. Security risks are rising.
              </p>
              <p>
                We believe residential ecosystems require structured digital infrastructure — not fragmented tools.
              </p>
              <p>
                GateFlux was built to provide a unified platform that brings together every aspect of community 
                management into one intelligent ecosystem, serving communities across India and beyond.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-primary-50 to-neutral-100 rounded-3xl p-8 border border-primary-100">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-soft text-center">
                  <p className="text-4xl font-bold text-primary-900 mb-2">2026</p>
                  <p className="text-sm text-primary-600">Est.</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-soft text-center">
                  <p className="text-4xl font-bold text-primary-900 mb-2">10+</p>
                  <p className="text-sm text-primary-600">Team Members</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-soft text-center">
                  <p className="text-4xl font-bold text-primary-900 mb-2">India</p>
                  <p className="text-sm text-primary-600">Primary Market</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-soft text-center">
                  <p className="text-4xl font-bold text-primary-900 mb-2">Beta</p>
                  <p className="text-sm text-primary-600">Current Stage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

// Mission & Vision Section
function MissionVisionSection() {
  return (
    <section className="section-padding bg-primary-900">
      <Container>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          <div className="bg-primary-800/50 rounded-xl p-6 lg:p-8 border border-primary-700">
            <div className="w-12 h-12 rounded-lg bg-primary-700/50 flex items-center justify-center mb-5">
              <Target className="h-6 w-6 text-primary-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4 tracking-tight">Our Approach</h3>
            <ul className="space-y-3 text-primary-300 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Enterprise-first architecture</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Clear operational hierarchy</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Controlled access models</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Scalable modular system</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Continuous enhancement roadmap</span>
              </li>
            </ul>
          </div>

          <div className="bg-primary-800/50 rounded-xl p-6 lg:p-8 border border-primary-700">
            <div className="w-12 h-12 rounded-lg bg-primary-700/50 flex items-center justify-center mb-5">
              <Eye className="h-6 w-6 text-primary-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4 tracking-tight">Our Vision</h3>
            <p className="text-primary-300 text-sm leading-relaxed">
              To become the trusted digital infrastructure layer for residential communities 
              across India and beyond.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

// Values Section
function ValuesSection() {
  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'We never compromise on security. Every feature is built with data protection and privacy at its core.',
    },
    {
      icon: Users,
      title: 'Community Focused',
      description: "Our decisions are driven by what's best for the communities we serve, not just business metrics.",
    },
    {
      icon: Zap,
      title: 'Relentless Innovation',
      description: 'We continuously push boundaries to bring cutting-edge technology to community management.',
    },
    {
      icon: Heart,
      title: 'Genuine Care',
      description: 'We treat every community like our own, providing support that goes beyond just technical assistance.',
    },
    {
      icon: Globe,
      title: 'Inclusive Design',
      description: 'Our platform is built to be accessible and usable by everyone, regardless of technical expertise.',
    },
    {
      icon: Award,
      title: 'Excellence Always',
      description: 'We hold ourselves to the highest standards in everything we do, from code quality to customer service.',
    },
  ]

  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionHeader
          badge="Our Values"
          title="What Drives Us"
          subtitle="These principles guide every decision we make and every product we build."
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value) => (
            <div
              key={value.title}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-100 mb-6">
                <value.icon className="h-8 w-8 text-accent-500" />
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-3">{value.title}</h3>
              <p className="text-primary-600">{value.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

// Team Section
function TeamSection() {
  const team = [
    {
      name: 'Swetha Bala',
      nameNote: 'Loukya',
      initials: 'SB',
      role: 'Founder & CEO',
      bio: [
        'Swetha Bala leads GateFlux with a focus on governance integrity and financial transparency for residential communities. She defines the company’s strategic direction, ensuring disciplined execution and long-term institutional reliability.',
      ],
    },
    {
      name: 'Ravikanth Katkam',
      initials: 'RK',
      role: 'Co-Founder & CTO',
      bio: [
        'Ravikanth Katkam brings over 15 years of experience building scalable, enterprise-grade systems. He leads platform architecture and financial intelligence infrastructure, ensuring audit-ready reliability and performance at scale.',
      ],
    },
    {
      name: 'Kranthi Kumar',
      initials: 'KK',
      role: 'VP – Product',
      bio: [
        'Kranthi Kumar leads product strategy, designing structured workflows that enable committees to operate with clarity and control. His focus is on decision-centric dashboards and precise financial reporting systems.',
      ],
    },
  ]

  return (
    <section className="section-padding bg-neutral-50 border-t border-neutral-100" id="team">
      <Container>
        <SectionHeader
          badge="Leadership"
          title="Meet Our Team"
          subtitle="The people building GateFlux."
        />

        <div className="mt-14 grid lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden flex flex-col"
            >
              {/* Card header strip */}
              <div className="h-1.5 bg-gradient-to-r from-primary-800 to-primary-600" />

              <div className="p-7 flex flex-col flex-1">
                {/* Avatar + identity */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-primary-900 flex items-center justify-center flex-shrink-0">
                    <span className="text-base font-bold text-white">{member.initials}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-primary-900 tracking-tight leading-tight">
                      {member.name}
                    </h3>
                    {member.nameNote && (
                      <p className="text-xs text-neutral-400 mt-0.5">({member.nameNote})</p>
                    )}
                    <p className="text-[11px] font-semibold text-accent-600 uppercase tracking-widest mt-1">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Bio paragraphs */}
                <div className="flex-1 border-t border-neutral-100 pt-5 space-y-3">
                  {member.bio.map((para, i) => (
                    <p key={i} className="text-sm text-neutral-600 leading-relaxed">{para}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

// Investors Section
function InvestorsSection() {
  return (
    <section className="section-padding bg-white" id="partners">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded text-sm font-medium bg-primary-50 text-primary-700 mb-5">
                Investor Relations
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-5 tracking-tight">
                Building the Infrastructure Layer for India's Communities
              </h2>
              <p className="text-primary-700 text-sm leading-relaxed mb-6">
                India has over 100,000 registered housing societies. The tools they rely on
                today are fragmented, manual, or built for the wrong audience. GateFlux is
                building the unified governance, finance, and security platform this market
                has never had.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  'Large, underpenetrated market across urban India',
                  'SaaS model with predictable recurring revenue',
                  'Deep compliance and data infrastructure from day one',
                  'Early-stage — right time to get involved',
                ].map(item => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent-500 flex-shrink-0 mt-0.5" />
                    <span className="text-primary-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <a
                href={`mailto:${config.email.investors}`}
                className="inline-flex items-center gap-2 bg-primary-900 text-white font-medium px-5 py-3 rounded-lg hover:bg-primary-800 transition-colors"
              >
                Get in Touch
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="bg-primary-50 border border-primary-100 rounded-2xl p-8">
              <p className="text-xs font-semibold text-primary-500 uppercase tracking-wider mb-6">
                What We're Looking For
              </p>
              <div className="space-y-5">
                {[
                  {
                    title: 'Strategic Seed Investors',
                    desc: 'Investors with experience in SaaS, PropTech, or Indian consumer infrastructure.',
                  },
                  {
                    title: 'Angel Advisors',
                    desc: 'Operators with networks in RWAs, housing societies, or cooperative governance.',
                  },
                  {
                    title: 'Industry Partners',
                    desc: 'Technology partners, system integrators, or distribution channel partners.',
                  },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent-500 flex-shrink-0 mt-1.5" />
                    <div>
                      <p className="font-semibold text-primary-900 text-sm">{title}</p>
                      <p className="text-primary-600 text-xs mt-0.5 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-primary-200">
                <p className="text-xs text-primary-500">
                  Deck and financial projections available on request.{' '}
                  <a href={`mailto:${config.email.investors}`} className="text-primary-700 hover:text-primary-900 font-medium underline">
                    {config.email.investors}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

// Careers Section
function CareersSection() {
  return (
    <section className="section-padding bg-primary-50" id="careers">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded text-sm font-medium bg-primary-100 text-primary-700 mb-5">
              Careers
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-5 tracking-tight">
              Join Our Mission
            </h2>
            <p className="text-base text-primary-700 mb-5 leading-relaxed">
              We're building something special and looking for talented individuals who want to
              make a real impact. If you're passionate about technology and community, we'd love
              to hear from you.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-primary-700 text-sm">Competitive compensation + equity</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-primary-700 text-sm">Flexible remote work options</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-primary-700 text-sm">Health insurance for family</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-primary-700 text-sm">Learning & development budget</span>
              </div>
            </div>

            <a
              href={`mailto:${config.email.careers}`}
              className="inline-flex items-center gap-2 text-primary-700 hover:text-primary-900 font-medium"
            >
              Send your resume
              <ArrowRight className="h-4 w-4 transition-transform" />
            </a>
          </div>

          <div>
            <div className="bg-white rounded-2xl p-8 shadow-soft border border-primary-100 text-center">
              <div className="w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-5">
                <Briefcase className="h-6 w-6 text-primary-400" />
              </div>
              <h3 className="font-semibold text-primary-900 mb-2">No Open Positions</h3>
              <p className="text-sm text-primary-600 leading-relaxed mb-5">
                We don't have any open positions right now, but we're always interested in
                meeting talented people. Send us your resume and we'll keep you in mind for
                future opportunities.
              </p>
              <a
                href={`mailto:${config.email.careers}`}
                className="inline-flex items-center gap-2 bg-primary-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-primary-800 transition-colors"
              >
                Express Interest
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

// Press Section
function PressSection() {
  return (
    <section className="section-padding bg-white" id="press">
      <Container>
        <SectionHeader
          badge="Press"
          title="Press & Media"
          subtitle="GateFlux is currently in development. We'll update this section as coverage becomes available."
        />

        <div className="mt-10 max-w-2xl mx-auto">
          <div className="bg-primary-50 border border-primary-100 rounded-2xl p-8 text-center">
            <p className="text-primary-700 text-sm leading-relaxed mb-6">
              If you're a journalist or content creator interested in covering GateFlux,
              we'd love to connect. We can arrange product demos, founder interviews, and
              provide background on our vision for community management in India.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
              <a
                href={`mailto:${config.email.press}`}
                className="inline-flex items-center gap-2 bg-primary-900 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-primary-800 transition-colors"
              >
                Press Enquiries
                <ArrowRight className="h-4 w-4" />
              </a>
              <span className="text-primary-500">{config.email.press}</span>
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
    <section className="py-20 bg-primary-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-10" />
      
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Community?
          </h2>
          <p className="text-lg text-primary-200 mb-8">
            Be among the first communities to experience smarter, structured management with GateFlux.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book-demo"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl bg-accent-500 text-white hover:bg-accent-600 transition-colors duration-300"
            >
              Book a Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/features"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl border-2 border-white/30 text-white hover:border-white hover:bg-white/10 transition-colors duration-300"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}

// Main About Page
export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <StorySection />
      <MissionVisionSection />
      <ValuesSection />
      <TeamSection />
      <InvestorsSection />
      <CareersSection />
      <PressSection />
      <CTASection />
    </>
  )
}
