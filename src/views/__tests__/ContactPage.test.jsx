import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactPage from '../ContactPage'

// Mock lucide-react icons to avoid SVG rendering issues in tests
jest.mock('lucide-react', () => {
  const Icon = ({ className }) => <svg className={className} />
  return new Proxy({}, { get: () => Icon })
})

// Mock sub-components that aren't under test
jest.mock('../../components/Container', () => ({ children, className }) => (
  <div className={className}>{children}</div>
))
jest.mock('../../components/SectionHeader', () => () => <div data-testid="section-header" />)
jest.mock('../../components/FAQ', () => ({ items }) => (
  <ul>{items.map((item) => <li key={item.question}>{item.question}</li>)}</ul>
))

describe('ContactPage', () => {
  it('renders the contact form', () => {
    render(<ContactPage />)
    expect(screen.getByText('Request a Demo')).toBeInTheDocument()
  })
})

describe('ContactForm', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    render(<ContactPage />)
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('renders all required form fields', () => {
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/community name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/number of units/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/role/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })

  it('renders all required fields with required indicator', () => {
    // The Input component renders a * for required fields
    const nameInput = screen.getByLabelText(/full name/i)
    const emailInput = screen.getByLabelText(/email address/i)
    const phoneInput = screen.getByLabelText(/phone number/i)
    const communityInput = screen.getByLabelText(/community name/i)

    expect(nameInput).toBeRequired()
    expect(emailInput).toBeRequired()
    expect(phoneInput).toBeRequired()
    expect(communityInput).toBeRequired()
  })

  it('message field is optional (not required)', () => {
    const messageField = screen.getByLabelText(/message/i)
    expect(messageField).not.toBeRequired()
  })

  it('renders unit options in the select', () => {
    const select = screen.getByLabelText(/number of units/i)
    const options = Array.from(select.querySelectorAll('option')).map((o) => o.value)
    expect(options).toContain('1-50')
    expect(options).toContain('51-100')
    expect(options).toContain('1000+')
  })

  it('renders role options in the select', () => {
    const select = screen.getByLabelText(/role/i)
    const options = Array.from(select.querySelectorAll('option')).map((o) => o.value)
    expect(options).toContain('committee')
    expect(options).toContain('facility-manager')
    expect(options).toContain('resident')
  })

  it('updates field values on input', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const nameInput = screen.getByLabelText(/full name/i)
    await user.type(nameInput, 'Jane Doe')
    expect(nameInput).toHaveValue('Jane Doe')
  })

  it('shows submitting state while form is being submitted', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe')
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com')
    await user.type(screen.getByLabelText(/phone number/i), '+91 91210 92479')
    await user.type(screen.getByLabelText(/community name/i), 'Test Apartments')

    const submitButton = screen.getByRole('button', { name: /book demo/i })
    fireEvent.click(submitButton)

    expect(screen.getByText(/submitting/i)).toBeInTheDocument()
    expect(submitButton).toBeDisabled()
  })

  it('shows success state after form submission completes', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe')
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com')
    await user.type(screen.getByLabelText(/phone number/i), '+91 91210 92479')
    await user.type(screen.getByLabelText(/community name/i), 'Test Apartments')

    fireEvent.click(screen.getByRole('button', { name: /book demo/i }))

    // Fast-forward past the 1500ms simulated delay
    await waitFor(() => {
      jest.advanceTimersByTime(1500)
    })

    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument()
    })

    expect(screen.getByText(/we've received your request/i)).toBeInTheDocument()
  })

  it('resets form when "Submit another request" is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe')

    fireEvent.click(screen.getByRole('button', { name: /book demo/i }))

    await waitFor(() => {
      jest.advanceTimersByTime(1500)
    })

    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText(/submit another request/i))

    // Form should be back
    expect(screen.getByText('Request a Demo')).toBeInTheDocument()
    expect(screen.queryByText(/thank you/i)).not.toBeInTheDocument()

    // Fields should be cleared
    expect(screen.getByLabelText(/full name/i)).toHaveValue('')
  })
})
