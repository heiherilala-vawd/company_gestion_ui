import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CustomLogin } from '../../../auth/CustomLogin'

const { mockLogin, mockNotify, mockNavigate } = vi.hoisted(() => ({
  mockLogin: vi.fn(),
  mockNotify: vi.fn(),
  mockNavigate: vi.fn(),
}))

vi.mock('react-admin', () => ({
  useLogin: () => mockLogin,
  useNotify: () => mockNotify,
  useTranslate: () => (key: string) => key,
}))

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

vi.mock('@mui/material/styles', () => ({
  useTheme: () => ({ palette: { mode: 'light' } }),
  alpha: (color: string) => color,
}))

vi.mock('../../../style/themeConfig', () => ({
  gradients: { primary: 'mock-gradient', primaryHorizontal: 'mock-gradient' },
  getShadow: () => 'mock-shadow',
  transitions: { default: '0.2s' },
  colors: { primary: { main: '#6366F1', dark: '#4F46E5' } },
  borderRadius: { xl: 16, md: 8 },
}))

describe('CustomLogin', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CustomLogin />)
  })

  it('has a username input', () => {
    const { container } = render(<CustomLogin />)
    expect(container.querySelector('input[type="text"]')).toBeInTheDocument()
  })

  it('has a password input', () => {
    const { container } = render(<CustomLogin />)
    expect(container.querySelector('input[type="password"]')).toBeInTheDocument()
  })

  it('has a submit button with sign in text', () => {
    render(<CustomLogin />)
    expect(screen.getByRole('button', { name: 'ra.auth.sign_in' })).toBeInTheDocument()
  })

  it('shows spinner when loading', async () => {
    mockLogin.mockReturnValue(new Promise(() => {}))
    const { container } = render(<CustomLogin />)
    const usernameInput = container.querySelector('input[type="text"]')!
    const passwordInput = container.querySelector('input[type="password"]')!
    fireEvent.change(usernameInput, { target: { value: 'test' } })
    fireEvent.change(passwordInput, { target: { value: 'pass' } })
    fireEvent.click(screen.getByRole('button', { name: 'ra.auth.sign_in' }))
    await waitFor(() => {
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })
  })

  it('calls notify with error when login fails', async () => {
    mockLogin.mockRejectedValue('Invalid credentials')
    const { container } = render(<CustomLogin />)
    const usernameInput = container.querySelector('input[type="text"]')!
    const passwordInput = container.querySelector('input[type="password"]')!
    fireEvent.change(usernameInput, { target: { value: 'test' } })
    fireEvent.change(passwordInput, { target: { value: 'pass' } })
    fireEvent.click(screen.getByRole('button', { name: 'ra.auth.sign_in' }))
    await waitFor(() => {
      expect(mockNotify).toHaveBeenCalledWith('Invalid credentials', { type: 'error' })
    })
  })

  it('navigates to /register when register link is clicked', () => {
    render(<CustomLogin />)
    fireEvent.click(screen.getByText('ra.auth.create_account'))
    expect(mockNavigate).toHaveBeenCalledWith('/register')
  })
})
