import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import GenericCreate from '../../../generic/GenericCreate'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

vi.mock('react-admin', () => ({
  Create: ({ children, mutationOptions, ...props }: any) => (
    <div data-testid="mock-create">
      <span data-testid="redirect-value">{String(props.redirect)}</span>
      <span data-testid="mutation-mode">{props.mutationMode || 'undefined'}</span>
      <button data-testid="trigger-success" onClick={() => mutationOptions?.onSuccess?.()}>
        Trigger Success
      </button>
      {children}
    </div>
  ),
}))

describe('GenericCreate', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
    vi.unstubAllEnvs()
  })

  it('renders a Create component with redirect={false}', () => {
    render(<GenericCreate />)
    expect(screen.getByTestId('redirect-value').textContent).toBe('false')
  })

  it('has mutationMode pessimistic when VITE_MUTATION_MODE is pessimistic', () => {
    vi.stubEnv('VITE_MUTATION_MODE', 'pessimistic')
    render(<GenericCreate />)
    expect(screen.getByTestId('mutation-mode').textContent).toBe('pessimistic')
  })

  it('mutationMode is undefined when env is not pessimistic', () => {
    vi.stubEnv('VITE_MUTATION_MODE', 'optimistic')
    render(<GenericCreate />)
    expect(screen.getByTestId('mutation-mode').textContent).toBe('undefined')
  })

  it('calls navigate(-1) on success', () => {
    render(<GenericCreate />)
    fireEvent.click(screen.getByTestId('trigger-success'))
    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })

  it('calls original onSuccess before navigate', () => {
    const originalOnSuccess = vi.fn()
    render(<GenericCreate mutationOptions={{ onSuccess: originalOnSuccess }} />)
    fireEvent.click(screen.getByTestId('trigger-success'))
    expect(originalOnSuccess).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })
})
