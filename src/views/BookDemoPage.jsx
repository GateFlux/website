'use client'

import { useState } from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Calendar,
  CheckCircle,
  ArrowRight,
  Building,
  Users,
  MessageSquare,
  Send,
} from 'lucide-react'
import Container from '../components/Container'
import SectionHeader from '../components/SectionHeader'
import Input, { Textarea, Select } from '../components/Input'
import FAQ from '../components/FAQ'
import config from '../lib/config'
import { submitDemoRequest } from '../lib/leadsApi'

// Hero Section
function HeroSection() {
  return (
    <section className="pt-28 pb-14 bg-primary-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-30" />
      
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded text-sm font-medium bg-white/5 border border-white/10 text-white mb-6">
            <Calendar className="h-4 w-4" />
            Book a Demo
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight">
            Book an{' '}
            <span className="text-primary-200">Enterprise Demo</span>
          </h1>
          <p className="text-base md:text-lg text-primary-300 leading-relaxed">
            See how GateFlux can streamline your community operations. 
            Our team will show you a personalized demo tailored to your needs.
          </p>
        </div>
      </Container>
    </section>
  )
}

// Demo Benefits
function DemoBenefits() {
  const benefits = [
    {
      icon: Building,
      title: 'Tailored for Your Community',
      description: 'See features relevant to your specific community size and requirements.',
    },
    {
      icon: Users,
      title: 'Meet the Team',
      description: 'Talk to our product experts who understand community management challenges.',
    },
    {
      icon: MessageSquare,
      title: 'Get Your Questions Answered',
      description: 'No sales pitch—just honest answers about how GateFlux can help you.',
    },
  ]

  return (
    <section className="py-12 bg-white border-b border-primary-100">
      <Container>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                <benefit.icon className="h-6 w-6 text-accent-500" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-900 mb-1">{benefit.title}</h3>
                <p className="text-sm text-primary-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

// Contact Form
function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    communityName: '',
    companySize: '',
    jobTitle: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      await submitDemoRequest({
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        company_name: formData.communityName.trim(),
        job_title: formData.jobTitle || null,
        company_size: formData.companySize || null,
        message: formData.message.trim() || null,
      })

      setIsSubmitted(true)
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const companySizeOptions = [
    { value: '', label: 'Select number of units' },
    { value: '1-50', label: '1 - 50 units' },
    { value: '51-100', label: '51 - 100 units' },
    { value: '101-250', label: '101 - 250 units' },
    { value: '251-500', label: '251 - 500 units' },
    { value: '501-1000', label: '501 - 1000 units' },
    { value: '1000+', label: '1000+ units' },
  ]

  const roleOptions = [
    { value: '', label: 'Select your role' },
    { value: 'Committee Member', label: 'Committee Member' },
    { value: 'Builder', label: 'Builder' },
    { value: 'Facility Manager', label: 'Facility Manager' },
    { value: 'Resident', label: 'Resident' },
  ]

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-xl p-8 border border-primary-100 text-center">
        <div className="w-14 h-14 rounded-lg bg-green-50 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="h-7 w-7 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-primary-900 mb-2 tracking-tight">Thank You</h3>
        <p className="text-primary-700 text-sm mb-5">
          We've received your request and will get back to you within 24 hours to schedule your demo.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false)
            setFormData({
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              communityName: '',
              companySize: '',
              jobTitle: '',
              message: '',
            })
          }}
          className="text-primary-600 hover:text-primary-900 font-medium"
        >
          Submit another request
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-soft border border-primary-100">
      <h3 className="text-xl font-bold text-primary-900 mb-2">Request a Demo</h3>
      <p className="text-primary-600 text-sm mb-6">
        Fill out the form below and we'll reach out to schedule a personalized demo.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <div className="grid sm:grid-cols-2 gap-5">
          <Input
            label="First Name"
            name="firstName"
            placeholder="John"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <Input
            label="Last Name"
            name="lastName"
            placeholder="Smith"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="john@community.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            placeholder="+91 91210 92479"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <Input
            label="Community Name"
            name="communityName"
            placeholder="Green Valley Apartments"
            value={formData.communityName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <Select
            label="Number of Units"
            name="companySize"
            options={companySizeOptions}
            value={formData.companySize}
            onChange={handleChange}
            required
          />
          <Select
            label="Role"
            name="jobTitle"
            options={roleOptions}
            value={formData.jobTitle}
            onChange={handleChange}
            required
          />
        </div>

        <Textarea
          label="Message (Optional)"
          name="message"
          placeholder="Tell us about your community and what you're looking for..."
          value={formData.message}
          onChange={handleChange}
          rows={4}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-accent-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Book Demo
              <Send className="h-5 w-5" />
            </>
          )}
        </button>

        <p className="text-xs text-primary-500 text-center">
          By submitting this form, you agree to our{' '}
          <a href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</a>
          {' '}and{' '}
          <a href="/terms" className="text-primary-600 hover:underline">Terms of Service</a>.
        </p>
      </form>
    </div>
  )
}

// Contact Info
function ContactInfo() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-primary-900 mb-4">Get in Touch</h3>
        <p className="text-primary-600">
          Have questions before booking a demo? Our team is here to help.
        </p>
      </div>

      <div className="space-y-4">
        <a
          href={`mailto:${config.email.support}`}
          className="flex items-center gap-4 p-4 rounded-xl bg-primary-50 hover:bg-primary-100 transition-colors group"
        >
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-soft">
            <Mail className="h-6 w-6 text-accent-500" />
          </div>
          <div>
            <p className="text-sm text-primary-500">Email Us</p>
            <p className="font-medium text-primary-900 group-hover:text-primary-700 transition-colors">
              {config.email.support}
            </p>
          </div>
        </a>

        <a
          href="tel:+919121092479"
          className="flex items-center gap-4 p-4 rounded-xl bg-primary-50 hover:bg-primary-100 transition-colors group"
        >
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-soft">
            <Phone className="h-6 w-6 text-accent-500" />
          </div>
          <div>
            <p className="text-sm text-primary-500">Call Us</p>
            <p className="font-medium text-primary-900 group-hover:text-primary-700 transition-colors">
              +91 91210 92479
            </p>
          </div>
        </a>

        <div className="flex items-center gap-4 p-4 rounded-xl bg-primary-50">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-soft">
            <MapPin className="h-6 w-6 text-accent-500" />
          </div>
          <div>
            <p className="text-sm text-primary-500">Office</p>
            <p className="font-medium text-primary-900">
              Hyderabad, India
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-xl bg-primary-50">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-soft">
            <Clock className="h-6 w-6 text-accent-500" />
          </div>
          <div>
            <p className="text-sm text-primary-500">Response Time</p>
            <p className="font-medium text-primary-900">
              Within 24 business hours
            </p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="pt-6 border-t border-primary-100">
        <h4 className="font-semibold text-primary-900 mb-3">Quick Links</h4>
        <div className="space-y-2">
          <a href="/features" className="flex items-center gap-2 text-primary-600 hover:text-primary-900 transition-colors">
            <ArrowRight className="h-4 w-4" />
            Explore Features
          </a>
          <a href="/pricing" className="flex items-center gap-2 text-primary-600 hover:text-primary-900 transition-colors">
            <ArrowRight className="h-4 w-4" />
            View Pricing
          </a>
          <a href="/security" className="flex items-center gap-2 text-primary-600 hover:text-primary-900 transition-colors">
            <ArrowRight className="h-4 w-4" />
            Security & Compliance
          </a>
        </div>
      </div>
    </div>
  )
}

// Contact Section
function ContactSection() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
          <div className="lg:col-span-2">
            <ContactInfo />
          </div>
        </div>
      </Container>
    </section>
  )
}

// Enterprise Section
function EnterpriseSection() {
  const features = [
    'Dedicated account management',
    'Custom implementation support',
    'On-premise deployment options',
    'White-label branding',
    'Priority 24/7 support',
    'Custom integrations',
  ]

  return (
    <section className="section-padding bg-primary-900">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded text-sm font-medium bg-white/5 border border-white/10 text-white mb-5">
              Enterprise
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-5 tracking-tight">
              Request an Enterprise Proposal
            </h2>
            <p className="text-primary-300 text-base mb-6 leading-relaxed">
              For large communities, housing societies, or builder groups that need custom solutions, 
              our enterprise team will create a tailored proposal that meets your specific requirements.
            </p>

            <ul className="grid sm:grid-cols-2 gap-3 mb-6">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-primary-300 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href={`mailto:${config.email.support}`}
              className="inline-flex items-center gap-2 bg-accent-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-accent-600 transition-colors"
            >
              Contact Enterprise Sales
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="hidden lg:block">
            <div className="bg-primary-800/50 rounded-xl p-6 border border-primary-700">
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-primary-700">
                  <span className="text-primary-400 text-sm">Community Size</span>
                  <span className="text-white font-medium font-mono">5,000+ units</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-primary-700">
                  <span className="text-primary-400 text-sm">Deployment</span>
                  <span className="text-white font-medium font-mono">Cloud / On-premise</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-primary-700">
                  <span className="text-primary-400 text-sm">Support</span>
                  <span className="text-white font-medium font-mono">24/7 Priority</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary-400 text-sm">Pricing</span>
                  <span className="text-accent-400 font-medium font-mono">Custom</span>
                </div>
              </div>
            </div>
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
      question: 'How long is the demo?',
      answer: "Demos typically last 30-45 minutes, depending on your questions. We'll tailor the session to focus on features most relevant to your community.",
    },
    {
      question: 'Who should attend the demo?',
      answer: 'We recommend having committee members, facility managers, and anyone involved in decision-making attend. The more stakeholders present, the better we can address everyone\'s concerns.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes! After the demo, you can start a 14-day free trial to test GateFlux with your community. No credit card required.',
    },
    {
      question: 'How quickly can we get started?',
      answer: 'After you decide to proceed, most communities are fully onboarded within 2-3 weeks, including data migration and staff training.',
    },
    {
      question: 'Can you do demos in regional languages?',
      answer: 'Yes, we offer demos in Hindi, Tamil, Telugu, Kannada, and other regional languages. Let us know your preference when booking.',
    },
  ]

  return (
    <section className="section-padding bg-primary-50">
      <Container>
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            badge="FAQ"
            title="Demo Questions"
            subtitle="Common questions about booking and attending a demo."
          />

          <div className="mt-12 bg-white rounded-2xl p-6 md:p-8 shadow-soft border border-primary-100">
            <FAQ items={faqs} />
          </div>
        </div>
      </Container>
    </section>
  )
}

// Main Contact Page
export default function BookDemoPage() {
  return (
    <>
      <HeroSection />
      <DemoBenefits />
      <ContactSection />
      <EnterpriseSection />
      <FAQSection />
    </>
  )
}
