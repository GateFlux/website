import {
  pushToDataLayer,
  trackPageView,
  trackCTAClick,
  trackFormSubmit,
  trackEvent,
  trackOutboundLink,
  initScrollTracking,
} from '../analytics'

// Mock web-vitals — we test our wrapper, not the library itself
jest.mock('web-vitals', () => ({
  onCLS: jest.fn(),
  onINP: jest.fn(),
  onLCP: jest.fn(),
  onFCP: jest.fn(),
  onTTFB: jest.fn(),
}))

describe('analytics module', () => {
  beforeEach(() => {
    // Reset dataLayer and window properties before each test
    delete window.dataLayer
    Object.defineProperty(window, 'innerWidth', { value: 1280, writable: true })
    Object.defineProperty(window, 'location', {
      value: { pathname: '/test' },
      writable: true,
    })
  })

  describe('pushToDataLayer', () => {
    it('initializes window.dataLayer if it does not exist', () => {
      expect(window.dataLayer).toBeUndefined()
      pushToDataLayer({ event: 'test' })
      expect(window.dataLayer).toBeDefined()
      expect(Array.isArray(window.dataLayer)).toBe(true)
    })

    it('appends events to window.dataLayer', () => {
      pushToDataLayer({ event: 'first' })
      pushToDataLayer({ event: 'second' })
      expect(window.dataLayer).toHaveLength(2)
      expect(window.dataLayer[0]).toEqual({ event: 'first' })
      expect(window.dataLayer[1]).toEqual({ event: 'second' })
    })

    it('preserves an existing dataLayer array', () => {
      window.dataLayer = [{ event: 'preexisting' }]
      pushToDataLayer({ event: 'new' })
      expect(window.dataLayer).toHaveLength(2)
    })
  })

  describe('trackPageView', () => {
    it('pushes a page_view event with path and title', () => {
      trackPageView('/about', 'About Us')
      expect(window.dataLayer[0]).toMatchObject({
        event: 'page_view',
        page_path: '/about',
        page_title: 'About Us',
      })
    })

    it('includes device_type in the payload', () => {
      trackPageView('/home', 'Home')
      expect(window.dataLayer[0]).toHaveProperty('device_type')
    })

    it('does not throw when called', () => {
      expect(() => trackPageView('/path', 'Title')).not.toThrow()
    })
  })

  describe('trackCTAClick', () => {
    it('pushes a cta_click event with name and location', () => {
      trackCTAClick('Book Demo', 'hero')
      expect(window.dataLayer[0]).toMatchObject({
        event: 'cta_click',
        cta_name: 'Book Demo',
        cta_location: 'hero',
      })
    })

    it('does not throw when called', () => {
      expect(() => trackCTAClick('Get Started', 'navbar')).not.toThrow()
    })
  })

  describe('trackFormSubmit', () => {
    it('pushes a form_submit event with form name', () => {
      trackFormSubmit('contact')
      expect(window.dataLayer[0]).toMatchObject({
        event: 'form_submit',
        form_name: 'contact',
      })
    })

    it('includes optional form_data payload', () => {
      trackFormSubmit('contact', { numberOfUnits: '51-100' })
      expect(window.dataLayer[0].form_data).toEqual({ numberOfUnits: '51-100' })
    })

    it('defaults form_data to empty object', () => {
      trackFormSubmit('contact')
      expect(window.dataLayer[0].form_data).toEqual({})
    })

    it('does not throw when called', () => {
      expect(() => trackFormSubmit('newsletter')).not.toThrow()
    })
  })

  describe('trackEvent', () => {
    it('pushes a custom event with the given name', () => {
      trackEvent('feature_view', { feature: 'gate-management' })
      expect(window.dataLayer[0]).toMatchObject({
        event: 'feature_view',
        feature: 'gate-management',
      })
    })

    it('includes timestamp in the payload', () => {
      trackEvent('my_event')
      expect(window.dataLayer[0]).toHaveProperty('timestamp')
      expect(typeof window.dataLayer[0].timestamp).toBe('string')
    })

    it('does not throw when called without extra params', () => {
      expect(() => trackEvent('bare_event')).not.toThrow()
    })
  })

  describe('trackOutboundLink', () => {
    it('pushes an outbound_link event with url and text', () => {
      trackOutboundLink('https://example.com', 'Example')
      expect(window.dataLayer[0]).toMatchObject({
        event: 'outbound_link',
        link_url: 'https://example.com',
        link_text: 'Example',
      })
    })

    it('does not throw when called', () => {
      expect(() => trackOutboundLink('https://example.com', 'Click')).not.toThrow()
    })
  })

  describe('initScrollTracking', () => {
    it('returns a cleanup function', () => {
      const cleanup = initScrollTracking()
      expect(typeof cleanup).toBe('function')
      cleanup()
    })

    it('attaches and removes scroll listener without throwing', () => {
      const addSpy = jest.spyOn(window, 'addEventListener')
      const removeSpy = jest.spyOn(window, 'removeEventListener')

      const cleanup = initScrollTracking()
      expect(addSpy).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true })

      cleanup()
      expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function))

      addSpy.mockRestore()
      removeSpy.mockRestore()
    })
  })

  describe('device type detection', () => {
    it('trackPageView includes "desktop" for wide screens', () => {
      window.innerWidth = 1280
      trackPageView('/test', 'Test')
      expect(window.dataLayer[0].device_type).toBe('desktop')
    })

    it('trackPageView includes "tablet" for medium screens', () => {
      window.innerWidth = 900
      trackPageView('/test', 'Test')
      expect(window.dataLayer[0].device_type).toBe('tablet')
    })

    it('trackPageView includes "mobile" for small screens', () => {
      window.innerWidth = 375
      trackPageView('/test', 'Test')
      expect(window.dataLayer[0].device_type).toBe('mobile')
    })
  })
})
