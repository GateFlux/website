import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SocietySignupPage from '../SocietySignupPage'

const mockGet = jest.fn()
const mockFetch = jest.fn()

function buildPublicPlansResponse() {
  return {
    success: true,
    data: [
      {
        slug: 'free',
        name: 'Free',
        display_name: 'Free',
        plan_version: 'v1',
        base_price: 0,
        per_unit_price: 0,
        trial_days: 30,
      },
      {
        slug: 'starter',
        name: 'Starter',
        display_name: 'Starter',
        plan_version: 'v1',
        base_price: 999,
        per_unit_price: 10,
        trial_days: 30,
      },
      {
        slug: 'essential',
        name: 'Essential',
        display_name: 'Essential',
        plan_version: 'v1',
        base_price: 1999,
        per_unit_price: 8,
        trial_days: 30,
      },
      {
        slug: 'professional',
        name: 'Professional',
        display_name: 'Professional',
        plan_version: 'v1',
        base_price: 3999,
        per_unit_price: 6,
        trial_days: 30,
      },
      {
        slug: 'enterprise',
        name: 'Enterprise',
        display_name: 'Enterprise',
        plan_version: 'v1',
        base_price: null,
        per_unit_price: null,
        trial_days: 30,
      },
    ],
  }
}

function buildSlugCheckResponse({ societyName, slug }) {
  if (slug === 'green-valley-residency' || slug === 'greenvalleyresidency' || societyName === 'Green Valley Residency') {
    return {
      success: true,
      data: {
        available: false,
        reason: 'taken',
        requested_slug: slug || 'green-valley-residency',
        resolved_slug: 'green-valley-residency-1',
        message: 'This workspace URL is already in use. We can use an available alternative instead.',
      },
    }
  }

  if (slug === 'custom-url' || slug === 'customurl') {
    return {
      success: true,
      data: {
        available: true,
        reason: null,
        requested_slug: slug || 'custom-url',
        resolved_slug: slug || 'custom-url',
        message: 'Workspace URL is available.',
      },
    }
  }

  return {
    success: true,
    data: {
      available: true,
      reason: null,
      requested_slug: 'blue-haven-residency',
      resolved_slug: 'blue-haven-residency',
      message: 'Workspace URL is available.',
    },
  }
}

jest.mock('next/link', () => {
  const MockLink = ({ children, href, ...props }) => <a href={href} {...props}>{children}</a>
  MockLink.displayName = 'MockLink'
  return MockLink
})

jest.mock('next/script', () => {
  const MockScript = () => null
  MockScript.displayName = 'MockScript'
  return MockScript
})

jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: mockGet,
  }),
}))

jest.mock('../../lib/config', () => ({
  __esModule: true,
  default: {
    api: { baseUrl: 'https://api.example.com' },
    app: { baseUrl: 'https://app.example.com' },
    recaptcha: { siteKey: '' },
  },
}))

describe('SocietySignupPage', () => {
  beforeEach(() => {
    mockGet.mockReset()
    mockGet.mockReturnValue(null)
    mockFetch.mockReset()
    mockFetch.mockImplementation(async (input, init = {}) => {
      const url = String(input)

      if (url.includes('/public/society-signup/check-slug?')) {
        const parsedUrl = new URL(url)
        const societyName = parsedUrl.searchParams.get('society_name') || ''
        const slug = parsedUrl.searchParams.get('slug') || ''

        return {
          ok: true,
          json: async () => buildSlugCheckResponse({ societyName, slug }),
        }
      }

      if (url.includes('/public/plans')) {
        return {
          ok: true,
          json: async () => buildPublicPlansResponse(),
        }
      }

      return {
        ok: true,
        json: async () => ({ success: true, data: {} }),
      }
    })
    global.fetch = mockFetch
  })

  it('shows selected plan details after choosing a plan on the signup page', async () => {
    const user = userEvent.setup()

    render(<SocietySignupPage />)

    await screen.findByRole('option', { name: /starter/i })

    const planSelect = screen.getByLabelText(/choose your plan/i)

    await user.selectOptions(planSelect, 'starter')

    const selectedPlanCard = screen.getByText(/selected plan/i).closest('div')

    expect(selectedPlanCard).not.toBeNull()
    expect(within(selectedPlanCard).getByText('Starter (v1)')).toBeInTheDocument()
    expect(within(selectedPlanCard).getByText('₹999/month base')).toBeInTheDocument()
    expect(planSelect).toHaveValue('starter')
  })

  it('shows preselected plan details when arriving from pricing links', async () => {
    mockGet.mockImplementation((key) => (key === 'plan' ? 'essential' : null))

    render(<SocietySignupPage />)

    await screen.findByRole('option', { name: /essential/i })

    const selectedPlanCard = screen.getByText(/selected plan/i).closest('div')

    expect(screen.getByLabelText(/choose your plan/i)).toHaveValue('essential')
    expect(selectedPlanCard).not.toBeNull()
    expect(within(selectedPlanCard).getByText('Essential (v1)')).toBeInTheDocument()
    expect(within(selectedPlanCard).getByText('₹1,999/month base')).toBeInTheDocument()
  })

  it('does not allow enterprise as a self-serve signup option', () => {
    mockGet.mockImplementation((key) => (key === 'plan' ? 'enterprise' : null))

    render(<SocietySignupPage />)

    const planSelect = screen.getByLabelText(/choose your plan/i)

    expect(planSelect).toHaveValue('')
    expect(screen.queryByRole('option', { name: 'Enterprise' })).not.toBeInTheDocument()
    expect(screen.getByText(/enterprise onboarding is handled by our sales team/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact sales for enterprise/i })).toHaveAttribute('href', '/book-demo')
  })

  it('checks workspace URL availability on society name blur', async () => {
    const user = userEvent.setup()

    render(<SocietySignupPage />)

    const societyNameInput = screen.getByLabelText(/society name/i)

    await user.type(societyNameInput, 'Blue Haven Residency')
    await user.tab()

    expect(await screen.findByText('Workspace URL is available.')).toBeInTheDocument()
    expect(screen.getByText('Workspace preview: https://app.example.com/blue-haven-residency/setup')).toBeInTheDocument()
  })

  it('shows a suggested workspace URL when the derived slug is taken', async () => {
    const user = userEvent.setup()

    render(<SocietySignupPage />)

    const societyNameInput = screen.getByLabelText(/society name/i)

    await user.type(societyNameInput, 'Green Valley Residency')
    await user.tab()

    expect(await screen.findByText(/this workspace url is already in use/i)).toBeInTheDocument()
    expect(screen.getByText('Workspace preview: https://app.example.com/green-valley-residency-1/setup')).toBeInTheDocument()
  })

  it('allows user to edit workspace URL and validate it on blur', async () => {
    const user = userEvent.setup()

    render(<SocietySignupPage />)

    await user.click(screen.getByRole('button', { name: /edit workspace url/i }))

    const workspaceSlugInput = screen.getByLabelText(/workspace url/i)
    await user.clear(workspaceSlugInput)
    await user.type(workspaceSlugInput, 'custom-url')
    await user.tab()

    expect(await screen.findByText('Workspace URL is available.')).toBeInTheDocument()
    expect(screen.getByText('Workspace preview: https://app.example.com/customurl/setup')).toBeInTheDocument()
  })

  it('lets user accept suggested URL for custom workspace slug', async () => {
    const user = userEvent.setup()

    render(<SocietySignupPage />)

    await user.click(screen.getByRole('button', { name: /edit workspace url/i }))

    const workspaceSlugInput = screen.getByLabelText(/workspace url/i)
    await user.clear(workspaceSlugInput)
    await user.type(workspaceSlugInput, 'green-valley-residency')
    await user.tab()

    expect(await screen.findByText(/suggested url: https:\/\/app\.example\.com\/green-valley-residency-1\/setup/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /use suggested url/i }))

    expect(workspaceSlugInput).toHaveValue('green-valley-residency-1')
    expect(screen.getByText('Workspace preview: https://app.example.com/green-valley-residency-1/setup')).toBeInTheDocument()
  })
})