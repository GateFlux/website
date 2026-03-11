'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, ArrowRight } from 'lucide-react'
import Container from '../components/Container'
import Input, { Textarea, Select } from '../components/Input'
import config from '../lib/config'
import { submitContactSubmission } from '../lib/leadsApi'

function HeroSection() {
  return (
    <section className="pt-28 pb-14 bg-primary-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-30" />
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded text-sm font-medium bg-white/5 border border-white/10 text-white mb-6">
            Contact GateFlux
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight">
            Talk to the <span className="text-primary-200">GateFlux Team</span>
          </h1>
          <p className="text-base md:text-lg text-primary-300 leading-relaxed">
            Need help, sales information, partnership details, or support? Send us a message and our team will respond shortly.
          </p>
        </div>
      </Container>
    </section>
  )
}

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    inquiryType: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      await submitContactSubmission({
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim() || null,
        company_name: formData.companyName.trim() || null,
        inquiry_type: formData.inquiryType || 'general',
        subject: formData.subject.trim() || null,
        message: formData.message.trim(),
        source: 'website-contact',
      })
      setIsSubmitted(true)
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const inquiryOptions = [
    { value: '', label: 'Select inquiry type' },
    { value: 'general', label: 'General Inquiry' },
    { value: 'sales', label: 'Sales' },
    { value: 'support', label: 'Support' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'other', label: 'Other' },
  ]

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-primary-100 text-center shadow-soft">
        <div className="w-14 h-14 rounded-lg bg-green-50 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="h-7 w-7 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-primary-900 mb-2 tracking-tight">Message Received</h3>
        <p className="text-primary-700 text-sm mb-5">
          Thank you for contacting us. Our team will get back to you within 24 business hours.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false)
            setFormData({
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              companyName: '',
              inquiryType: '',
              subject: '',
              message: '',
            })
          }}
          className="text-primary-600 hover:text-primary-900 font-medium"
        >
          Submit another message
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-soft border border-primary-100">
      <h3 className="text-xl font-bold text-primary-900 mb-2">Contact Us</h3>
      <p className="text-primary-600 text-sm mb-6">Share your message and we will route it to the right team.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error ? <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

        <div className="grid sm:grid-cols-2 gap-5">
          <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
          <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <Input label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required />
          <Input label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <Input label="Company / Community" name="companyName" value={formData.companyName} onChange={handleChange} />
          <Select label="Inquiry Type" name="inquiryType" options={inquiryOptions} value={formData.inquiryType} onChange={handleChange} required />
        </div>

        <Input label="Subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="How can we help?" />
        <Textarea label="Message" name="message" value={formData.message} onChange={handleChange} rows={5} required />

        <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 bg-accent-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? 'Submitting...' : 'Send Message'}
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  )
}

function ContactInfo() {
  return (
    <div className="space-y-4">
      <a href={`mailto:${config.email.support}`} className="flex items-center gap-4 p-4 rounded-xl bg-primary-50 hover:bg-primary-100 transition-colors">
        <Mail className="h-5 w-5 text-accent-500" />
        <div>
          <p className="text-sm text-primary-500">Email</p>
          <p className="font-medium text-primary-900">{config.email.support}</p>
        </div>
      </a>
      <a href="tel:+919121092479" className="flex items-center gap-4 p-4 rounded-xl bg-primary-50 hover:bg-primary-100 transition-colors">
        <Phone className="h-5 w-5 text-accent-500" />
        <div>
          <p className="text-sm text-primary-500">Phone</p>
          <p className="font-medium text-primary-900">+91 91210 92479</p>
        </div>
      </a>
      <div className="flex items-center gap-4 p-4 rounded-xl bg-primary-50">
        <MapPin className="h-5 w-5 text-accent-500" />
        <div>
          <p className="text-sm text-primary-500">Office</p>
          <p className="font-medium text-primary-900">Hyderabad, India</p>
        </div>
      </div>
      <div className="flex items-center gap-4 p-4 rounded-xl bg-primary-50">
        <Clock className="h-5 w-5 text-accent-500" />
        <div>
          <p className="text-sm text-primary-500">Response</p>
          <p className="font-medium text-primary-900">Within 24 business hours</p>
        </div>
      </div>
      <Link href="/book-demo" className="inline-flex items-center gap-2 text-primary-700 hover:text-primary-900 font-medium">
        Need a product walkthrough? Book a demo <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )
}

export default function ContactPage() {
  return (
    <>
      <HeroSection />
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
    </>
  )
}
