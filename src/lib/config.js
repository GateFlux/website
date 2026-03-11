/**
 * GateFlux Website Configuration
 * Centralized environment variable management
 */

const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_GATEFLUX_API_BASE_URL || 'http://localhost:8000/api/v1',
  },

  app: {
    baseUrl: (process.env.NEXT_PUBLIC_APP_BASE_URL || 'https://app.gateflux.co').replace(/\/$/, ''),
  },

  website: {
    baseUrl: (process.env.NEXT_PUBLIC_WEBSITE_BASE_URL || 'https://gateflux.co').replace(/\/$/, ''),
  },

  email: {
    support: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'hello@gateflux.co',
    investors: process.env.NEXT_PUBLIC_INVESTORS_EMAIL || 'investors@gateflux.co',
    careers: process.env.NEXT_PUBLIC_CAREERS_EMAIL || 'careers@gateflux.co',
    press: process.env.NEXT_PUBLIC_PRESS_EMAIL || 'press@gateflux.co',
    privacy: process.env.NEXT_PUBLIC_PRIVACY_EMAIL || 'privacy@gateflux.co',
    billing: process.env.NEXT_PUBLIC_BILLING_EMAIL || 'billing@gateflux.co',
    legal: process.env.NEXT_PUBLIC_LEGAL_EMAIL || 'legal@gateflux.co',
  },

  recaptcha: {
    siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
  },
}

export default config
