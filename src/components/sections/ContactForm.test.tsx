import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from '../ui/Toast'
import ContactForm from './ContactForm'

const renderContactForm = () => {
  return render(
    <BrowserRouter>
      <ToastProvider>
        <ContactForm />
      </ToastProvider>
    </BrowserRouter>
  )
}

describe('ContactForm', () => {
  test('renders without crashing', () => {
    renderContactForm()
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })

  test('displays all form fields', () => {
    renderContactForm()
    expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/your.email@example.com/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/tell me about/i)).toBeInTheDocument()
  })

  test('displays submit button', () => {
    renderContactForm()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  test('shows validation errors on empty submit', async () => {
    const user = userEvent.setup()
    renderContactForm()

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument()
      expect(screen.getByText(/email is required/i)).toBeInTheDocument()
      expect(screen.getByText(/message is required/i)).toBeInTheDocument()
    })
  })

  test('validates name minimum length', async () => {
    const user = userEvent.setup()
    renderContactForm()

    const nameInput = screen.getByPlaceholderText(/your name/i)
    await user.type(nameInput, 'A')

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument()
    })
  })

  test('validates email format', async () => {
    const user = userEvent.setup()
    renderContactForm()

    const emailInput = screen.getByPlaceholderText(/your.email@example.com/i)
    await user.type(emailInput, 'invalid-email')

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument()
    })
  })

  test('validates message minimum length', async () => {
    const user = userEvent.setup()
    renderContactForm()

    const messageInput = screen.getByPlaceholderText(/tell me about/i)
    await user.type(messageInput, 'Short')

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument()
    })
  })

  test('submits form with valid data', async () => {
    const user = userEvent.setup()
    renderContactForm()

    const nameInput = screen.getByPlaceholderText(/your name/i)
    const emailInput = screen.getByPlaceholderText(/your.email@example.com/i)
    const messageInput = screen.getByPlaceholderText(/tell me about/i)

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(messageInput, 'This is a test message with enough characters')

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/sending.../i)).toBeInTheDocument()
    })
  })

  test('disables submit button while submitting', async () => {
    const user = userEvent.setup()
    renderContactForm()

    const nameInput = screen.getByPlaceholderText(/your name/i)
    const emailInput = screen.getByPlaceholderText(/your.email@example.com/i)
    const messageInput = screen.getByPlaceholderText(/tell me about/i)

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(messageInput, 'This is a test message')

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(submitButton).toBeDisabled()
    })
  })

  test('shows success toast after submission', async () => {
    const user = userEvent.setup()
    renderContactForm()

    const nameInput = screen.getByPlaceholderText(/your name/i)
    const emailInput = screen.getByPlaceholderText(/your.email@example.com/i)
    const messageInput = screen.getByPlaceholderText(/tell me about/i)

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(messageInput, 'This is a test message')

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(
      () => {
        expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument()
      },
      { timeout: 2000 }
    )
  })

  test('resets form after successful submission', async () => {
    const user = userEvent.setup()
    renderContactForm()

    const nameInput = screen.getByPlaceholderText(/your name/i) as HTMLInputElement
    const emailInput = screen.getByPlaceholderText(/your.email@example.com/i) as HTMLInputElement
    const messageInput = screen.getByPlaceholderText(/tell me about/i) as HTMLTextAreaElement

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(messageInput, 'This is a test message')

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(
      () => {
        expect(nameInput.value).toBe('')
        expect(emailInput.value).toBe('')
        expect(messageInput.value).toBe('')
      },
      { timeout: 2000 }
    )
  })

  test('displays required fields note', () => {
    renderContactForm()
    expect(screen.getByText(/\* required fields/i)).toBeInTheDocument()
  })

  test('has proper accessibility attributes', () => {
    renderContactForm()

    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const messageInput = screen.getByLabelText(/message/i)

    expect(nameInput).toHaveAttribute('id', 'name')
    expect(emailInput).toHaveAttribute('id', 'email')
    expect(messageInput).toHaveAttribute('id', 'message')
  })

  test('error messages have role="alert"', async () => {
    const user = userEvent.setup()
    renderContactForm()

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      const errorMessages = screen.getAllByRole('alert')
      expect(errorMessages.length).toBeGreaterThan(0)
    })
  })

  test('invalid inputs have aria-invalid attribute', async () => {
    const user = userEvent.setup()
    renderContactForm()

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      const nameInput = screen.getByLabelText(/name/i)
      expect(nameInput).toHaveAttribute('aria-invalid', 'true')
    })
  })

  test('error messages are linked via aria-describedby', async () => {
    const user = userEvent.setup()
    renderContactForm()

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      const nameInput = screen.getByLabelText(/name/i)
      const describedBy = nameInput.getAttribute('aria-describedby')
      expect(describedBy).toBeTruthy()
      
      if (describedBy) {
        const errorElement = document.getElementById(describedBy)
        expect(errorElement).toBeInTheDocument()
        expect(errorElement).toHaveAttribute('role', 'alert')
      }
    })
  })
})
