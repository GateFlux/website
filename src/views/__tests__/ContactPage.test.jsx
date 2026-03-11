import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookDemoPage from '../BookDemoPage'
import { submitDemoRequest } from '../../lib/leadsApi'

jest.mock('../../lib/leadsApi', () => ({
  submitDemoRequest: jest.fn(),
}))

jest.mock('lucide-react', () => {
  const Icon = ({ className }) => <svg className={className} />
  Icon.displayName = 'MockIcon'
  return new Proxy({}, { get: () => Icon })
})

jest.mock('../../components/Container', () => {
  const MockContainer = ({ children, className }) => <div className={className}>{children}</div>
  MockContainer.displayName = 'MockContainer'
  return MockContainer
})

jest.mock('../../components/SectionHeader', () => {
  const MockSectionHeader = () => <div data-testid="section-header" />
  MockSectionHeader.displayName = 'MockSectionHeader'
  return MockSectionHeader
})

jest.mock('../../components/FAQ', () => {
  const MockFaq = ({ items }) => <ul>{items.map((item) => <li key={item.question}>{item.question}</li>)}</ul>
  MockFaq.displayName = 'MockFaq'
  return MockFaq
})

describe('BookDemoPage', () => {
  beforeEach(() => {
    submitDemoRequest.mockReset()
  })

  it('renders demo form and submits payload', async () => {
    submitDemoRequest.mockResolvedValue({ success: true })
    const user = userEvent.setup()

    render(<BookDemoPage />)

    await user.type(screen.getByLabelText(/first name/i), 'Jane')
    await user.type(screen.getByLabelText(/last name/i), 'Doe')
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com')
    await user.type(screen.getByLabelText(/phone number/i), '+919999999999')
    await user.type(screen.getByLabelText(/community name/i), 'Green Valley')
    fireEvent.change(screen.getByLabelText(/number of units/i), { target: { value: '51-100' } })
    fireEvent.change(screen.getByLabelText(/role/i), { target: { value: 'Committee Member' } })
    await user.type(screen.getByLabelText(/message/i), 'Need a walkthrough')

    await user.click(screen.getByRole('button', { name: /book demo/i }))

    await waitFor(() => {
      expect(submitDemoRequest).toHaveBeenCalledWith({
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'jane@example.com',
        phone: '+919999999999',
        company_name: 'Green Valley',
        job_title: 'Committee Member',
        company_size: '51-100',
        message: 'Need a walkthrough',
      })
    })

    expect(await screen.findByText(/thank you/i)).toBeInTheDocument()
  })

  it('shows API error when request fails', async () => {
    submitDemoRequest.mockRejectedValue(new Error('Submission failed'))
    const user = userEvent.setup()

    render(<BookDemoPage />)

    await user.type(screen.getByLabelText(/first name/i), 'Jane')
    await user.type(screen.getByLabelText(/last name/i), 'Doe')
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com')
    await user.type(screen.getByLabelText(/phone number/i), '+919999999999')
    await user.type(screen.getByLabelText(/community name/i), 'Green Valley')
    fireEvent.change(screen.getByLabelText(/number of units/i), { target: { value: '51-100' } })
    fireEvent.change(screen.getByLabelText(/role/i), { target: { value: 'Committee Member' } })

    await user.click(screen.getByRole('button', { name: /book demo/i }))

    expect(await screen.findByText(/submission failed/i)).toBeInTheDocument()
  })
})
