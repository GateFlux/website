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
  Building,
  ArrowRight,
  Linkedin,
  Twitter,
  CheckCircle,
  MapPin,
  Briefcase,
} from 'lucide-react'
import Container from '../components/Container'
import SectionHeader from '../components/SectionHeader'

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
                  <p className="text-4xl font-bold text-primary-900 mb-2">2022</p>
                  <p className="text-sm text-primary-600">Founded</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-soft text-center">
                  <p className="text-4xl font-bold text-primary-900 mb-2">500+</p>
                  <p className="text-sm text-primary-600">Communities</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-soft text-center">
                  <p className="text-4xl font-bold text-primary-900 mb-2">1M+</p>
                  <p className="text-sm text-primary-600">Residents</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-soft text-center">
                  <p className="text-4xl font-bold text-primary-900 mb-2">50+</p>
                  <p className="text-sm text-primary-600">Team Members</p>
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
      name: 'Rajesh Kumar',
      role: 'Co-founder & CEO',
      bio: 'Former engineering lead at Flipkart. IIT Delhi alumnus.',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'Priya Sharma',
      role: 'Co-founder & CTO',
      bio: 'Ex-Amazon principal engineer. Expert in distributed systems.',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'Arjun Menon',
      role: 'VP Product',
      bio: 'Previously led product at Swiggy. IIIT Hyderabad alumnus.',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'Sneha Patel',
      role: 'VP Engineering',
      bio: 'Built engineering teams at Ola and Razorpay.',
      linkedin: '#',
      twitter: '#',
    },
  ]

  return (
    <section className="section-padding bg-primary-50" id="team">
      <Container>
        <SectionHeader
          badge="Leadership"
          title="Meet Our Team"
          subtitle="Industry veterans united by a passion for building great products."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-xl p-5 border border-primary-100 text-center"
            >
              <div className="w-20 h-20 rounded-lg bg-primary-50 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-700">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="text-base font-bold text-primary-900 mb-1 tracking-tight">{member.name}</h3>
              <p className="text-primary-700 text-sm font-medium mb-2">{member.role}</p>
              <p className="text-primary-600 text-xs mb-4">{member.bio}</p>
              <div className="flex items-center justify-center gap-3">
                <a
                  href={member.linkedin}
                  className="text-primary-400 hover:text-primary-700 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={member.twitter}
                  className="text-primary-400 hover:text-primary-700 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
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
    <section className="section-padding bg-white">
      <Container>
        <SectionHeader
          badge="Backed By"
          title="Our Investors"
          subtitle="Supported by leading venture capital firms and industry experts."
        />

        <div className="mt-12 flex flex-wrap items-center justify-center gap-12">
          {/* Placeholder for investor logos */}
          {['Sequoia Capital', 'Accel Partners', 'Matrix Partners', 'Elevation Capital'].map((investor) => (
            <div
              key={investor}
              className="px-8 py-4 rounded-xl bg-primary-50 text-primary-400 font-semibold"
            >
              {investor}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

// Careers Section
function CareersSection() {
  const openings = [
    { title: 'Senior Backend Engineer', location: 'Bangalore', type: 'Full-time' },
    { title: 'Product Designer', location: 'Remote', type: 'Full-time' },
    { title: 'Customer Success Manager', location: 'Mumbai', type: 'Full-time' },
    { title: 'Growth Marketing Manager', location: 'Bangalore', type: 'Full-time' },
  ]

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
              href="mailto:careers@gateflux.com"
              className="inline-flex items-center gap-2 text-primary-700 hover:text-primary-900 font-medium"
            >
              Send your resume
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div>
            <div className="bg-white rounded-2xl p-6 shadow-soft border border-primary-100">
              <h3 className="font-semibold text-primary-900 mb-4">Open Positions</h3>
              <div className="space-y-3">
                {openings.map((job) => (
                  <div
                    key={job.title}
                    className="flex items-center justify-between p-4 rounded-xl bg-primary-50 hover:bg-primary-100 transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="font-medium text-primary-900">{job.title}</p>
                      <div className="flex items-center gap-3 text-sm text-primary-500 mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-3 w-3" />
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-primary-400" />
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-primary-100 text-center">
                <a
                  href="mailto:careers@gateflux.com"
                  className="text-sm text-primary-600 hover:text-primary-900 font-medium"
                >
                  View all openings →
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

// Press Section
function PressSection() {
  const pressItems = [
    {
      publication: 'TechCrunch',
      headline: 'GateFlux raises $10M to modernize apartment management in India',
      date: 'Jan 2024',
    },
    {
      publication: 'Economic Times',
      headline: 'How GateFlux is solving India\'s community management challenges',
      date: 'Dec 2023',
    },
    {
      publication: 'YourStory',
      headline: 'GateFlux: The startup making gated communities smarter',
      date: 'Nov 2023',
    },
  ]

  return (
    <section className="section-padding bg-white" id="press">
      <Container>
        <SectionHeader
          badge="Press"
          title="In the News"
          subtitle="What others are saying about GateFlux."
        />

        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {pressItems.map((item) => (
            <div
              key={item.headline}
              className="bg-primary-50 rounded-2xl p-6 hover:bg-primary-100 transition-colors cursor-pointer"
            >
              <p className="text-sm text-primary-600 font-semibold mb-2">{item.publication}</p>
              <p className="text-primary-900 font-medium mb-3">{item.headline}</p>
              <p className="text-sm text-primary-500">{item.date}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-primary-600">
            For press inquiries, contact{' '}
            <a href="mailto:press@gateflux.com" className="text-primary-700 hover:text-primary-900 font-medium underline">
              press@gateflux.com
            </a>
          </p>
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
            Join hundreds of communities that have already made the switch to GateFlux.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
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
