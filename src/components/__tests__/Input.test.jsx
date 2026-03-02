import React from 'react'
import { render, screen } from '@testing-library/react'
import Input, { Textarea, Select } from '../Input'

describe('Input', () => {
  it('renders input with label', () => {
    render(<Input label="Email" name="email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('renders required asterisk when required', () => {
    render(<Input label="Email" name="email" required />)
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('does not render asterisk when not required', () => {
    render(<Input label="Email" name="email" />)
    expect(screen.queryByText('*')).not.toBeInTheDocument()
  })

  it('renders error message when error prop is provided', () => {
    render(<Input label="Email" name="email" error="Invalid email" />)
    expect(screen.getByText('Invalid email')).toBeInTheDocument()
  })

  it('does not render error message when no error', () => {
    render(<Input label="Email" name="email" />)
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument()
  })

  it('passes placeholder to input', () => {
    render(<Input name="email" placeholder="Enter email" />)
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument()
  })

  it('renders without label when label not provided', () => {
    render(<Input name="email" />)
    expect(screen.queryByRole('label')).not.toBeInTheDocument()
  })
})

describe('Textarea', () => {
  it('renders textarea with label', () => {
    render(<Textarea label="Message" name="message" />)
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
  })

  it('renders required asterisk when required', () => {
    render(<Textarea label="Message" name="message" required />)
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('renders error message', () => {
    render(<Textarea label="Message" name="message" error="Message is required" />)
    expect(screen.getByText('Message is required')).toBeInTheDocument()
  })
})

describe('Select', () => {
  const options = [
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
  ]

  it('renders select with label', () => {
    render(<Select label="Role" name="role" options={options} />)
    expect(screen.getByLabelText('Role')).toBeInTheDocument()
  })

  it('renders all options', () => {
    render(<Select label="Role" name="role" options={options} />)
    expect(screen.getByText('Option A')).toBeInTheDocument()
    expect(screen.getByText('Option B')).toBeInTheDocument()
  })

  it('renders required asterisk when required', () => {
    render(<Select label="Role" name="role" options={options} required />)
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('renders error message', () => {
    render(<Select label="Role" name="role" options={options} error="Select a role" />)
    expect(screen.getByText('Select a role')).toBeInTheDocument()
  })
})
