import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { RegisterPage } from '../../../auth/RegisterPage'

const { mockRegister, mockNotify, mockNavigate } = vi.hoisted(() => ({
  mockRegister: vi.fn().mockResolvedValue(undefined),
  mockNotify: vi.fn(),
  mockNavigate: vi.fn(),
}))

vi.mock('react-admin', () => ({
  useNotify: () => mockNotify,
  useAuthProvider: () => ({
    register: mockRegister,
  }),
}))

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

vi.mock('../../../utili/utils', () => ({
  default: () => 'mocked-uuid',
}))

vi.mock('@mui/material/styles', () => ({
  useTheme: () => ({ palette: { mode: 'light' } }),
}))

vi.mock('../../../style/themeConfig', () => ({
  gradients: { primary: 'mock-gradient', primaryHorizontal: 'mock-gradient' },
  getShadow: () => 'mock-shadow',
  transitions: { default: '0.2s' },
  colors: { primary: { main: '#6366F1', dark: '#4F46E5' } },
  borderRadius: { xl: 16, md: 8 },
}))

describe('RegisterPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders without error', () => {
    render(<RegisterPage />)
  })

  it('shows Créer un compte title', () => {
    render(<RegisterPage />)
    expect(screen.getByText('Créer un compte')).toBeInTheDocument()
  })

  it('has Prénom, Nom, Email, Mot de passe, Confirmer le mot de passe fields', () => {
    const { container } = render(<RegisterPage />)
    expect(screen.getByRole('textbox', { name: 'Prénom' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Nom' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument()
    const passwordInputs = container.querySelectorAll('input[type="password"]')
    expect(passwordInputs.length).toBe(2)
  })

  it('has plus de détails section with sex select', () => {
    render(<RegisterPage />)
    expect(screen.getByText('Options avancées')).toBeInTheDocument()
  })

  it('submits form and calls authProvider.register without company_ids', async () => {
    const { container } = render(<RegisterPage />)
    const prenomInput = screen.getByRole('textbox', { name: 'Prénom' })
    const nomInput = screen.getByRole('textbox', { name: 'Nom' })
    const emailInput = screen.getByRole('textbox', { name: 'Email' })
    const passwordInputs = container.querySelectorAll('input[type="password"]')
    const passwordInput = passwordInputs[0]
    const confirmPasswordInput = passwordInputs[1]
    fireEvent.change(prenomInput, { target: { value: 'John' } })
    fireEvent.change(nomInput, { target: { value: 'Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@test.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } })
    const form = container.querySelector('form')!
    fireEvent.submit(form)
    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        email: 'john@test.com',
        password: 'password123',
        first_name: 'John',
        last_name: 'Doe',
        sex: 'M',
        id: 'mocked-uuid',
      })
    })
  })

  it('shows error when passwords do not match', async () => {
    const { container } = render(<RegisterPage />)
    const passwordInputs = container.querySelectorAll('input[type="password"]')
    const passwordInput = passwordInputs[0]
    const confirmPasswordInput = passwordInputs[1]
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'different' } })
    const form = container.querySelector('form')!
    fireEvent.submit(form)
    await waitFor(() => {
      expect(mockNotify).toHaveBeenCalledWith('Les mots de passe ne correspondent pas', {
        type: 'error',
      })
    })
    expect(mockRegister).not.toHaveBeenCalled()
  })

  it('calls notify with error when register fails', async () => {
    mockRegister.mockRejectedValue(new Error('Email already exists'))
    const { container } = render(<RegisterPage />)
    const emailInput = screen.getByRole('textbox', { name: 'Email' })
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
    const passwordInputs = container.querySelectorAll('input[type="password"]')
    fireEvent.change(passwordInputs[0], { target: { value: 'password123' } })
    fireEvent.change(passwordInputs[1], { target: { value: 'password123' } })
    const form = container.querySelector('form')!
    fireEvent.submit(form)
    await waitFor(() => {
      expect(mockNotify).toHaveBeenCalledWith('Email already exists', { type: 'error' })
    })
  })

  it('navigates to /login when login link is clicked', () => {
    render(<RegisterPage />)
    fireEvent.click(screen.getByText('Déjà un compte ? Connectez-vous'))
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })
})
