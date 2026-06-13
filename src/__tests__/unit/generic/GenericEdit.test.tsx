import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import GenericEdit from '../../../generic/GenericEdit'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

vi.mock('react-admin', () => ({
  Edit: ({ children, mutationOptions, ...props }: any) => (
    <div data-testid="mock-edit">
      <span data-testid="redirect-value">{String(props.redirect)}</span>
      <span data-testid="mutation-mode">{props.mutationMode || 'undefined'}</span>
      <button data-testid="trigger-success" onClick={() => mutationOptions?.onSuccess?.()}>
        Trigger Success
      </button>
      {children}
    </div>
  ),
}))

describe('GenericEdit', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('renders an Edit component with redirect={false}', () => {
    render(<GenericEdit />)
    expect(screen.getByTestId('redirect-value').textContent).toBe('false')
  })

  it('mutationMode is pessimistic', () => {
    render(<GenericEdit />)
    expect(screen.getByTestId('mutation-mode').textContent).toBe('pessimistic')
  })

  it('calls navigate(-1) on success', () => {
    render(<GenericEdit />)
    fireEvent.click(screen.getByTestId('trigger-success'))
    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })

  it('calls original onSuccess before navigate', () => {
    const originalOnSuccess = vi.fn()
    render(<GenericEdit mutationOptions={{ onSuccess: originalOnSuccess }} />)
    fireEvent.click(screen.getByTestId('trigger-success'))
    expect(originalOnSuccess).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })
})
