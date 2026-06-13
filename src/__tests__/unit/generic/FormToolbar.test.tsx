import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import FormToolbar from '../../../generic/FormToolbar'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

vi.mock('react-admin', () => ({
  Toolbar: ({ children, sx }: any) => <div data-testid="mock-toolbar">{children}</div>,
  SaveButton: () => <button data-testid="save-button">Save</button>,
}))

describe('FormToolbar', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('renders Retour button and Save button', () => {
    render(<FormToolbar />)
    expect(screen.getByText('Retour')).toBeTruthy()
    expect(screen.getByTestId('save-button')).toBeTruthy()
  })

  it('clicking Retour calls navigate(-1)', () => {
    render(<FormToolbar />)
    fireEvent.click(screen.getByText('Retour'))
    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })
})
