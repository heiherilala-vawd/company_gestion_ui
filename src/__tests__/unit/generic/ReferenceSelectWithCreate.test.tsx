import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ReferenceSelectWithCreate from '../../../generic/ReferenceSelectWithCreate'

globalThis.fetch = vi.fn()

const mockNotify = vi.fn()
const mockRefresh = vi.fn()
const mockDataProviderCreate = vi.fn().mockResolvedValue({ data: { id: 'new-456' } })

let mockFormData: Record<string, any> = { name: 'test-item', newId: 'new-123' }

vi.mock('react-admin', () => ({
  ReferenceInput: ({ children }: any) => <div data-testid="reference-input">{children}</div>,
  SelectInput: (props: any) => <select data-testid="select-input" {...props} />,
  useDataProvider: () => ({ create: mockDataProviderCreate }),
  useNotify: () => mockNotify,
  useRefresh: () => mockRefresh,
}))

vi.mock('react-hook-form', () => ({
  useForm: () => ({
    handleSubmit: (fn: any) => {
      const handler = (e?: any) => {
        if (e?.preventDefault) e.preventDefault()
        return fn(mockFormData)
      }
      return handler
    },
    reset: vi.fn(),
  }),
  FormProvider: ({ children }: any) => <div data-testid="form-provider">{children}</div>,
}))

vi.mock('@mui/material', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    Dialog: ({ open, children }: any) => (open ? <div data-testid="dialog">{children}</div> : null),
    DialogTitle: ({ children }: any) => <div data-testid="dialog-title">{children}</div>,
    DialogContent: ({ children }: any) => <div data-testid="dialog-content">{children}</div>,
    DialogActions: ({ children }: any) => <div data-testid="dialog-actions">{children}</div>,
  }
})

vi.mock('@mui/icons-material/Add', () => ({
  default: () => <span data-testid="add-icon">+</span>,
}))

describe('ReferenceSelectWithCreate', () => {
  const defaultProps = {
    source: 'test_id',
    reference: 'tests',
    label: 'Test',
  }

  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.setItem('token', 'test-token')
    mockFormData = { name: 'test-item', newId: 'new-123' }
  })

  it('renders with ReferenceInput and SelectInput', () => {
    render(<ReferenceSelectWithCreate {...defaultProps} />)
    expect(screen.getByTestId('reference-input')).toBeTruthy()
    expect(screen.getByTestId('select-input')).toBeTruthy()
  })

  it('renders create button only when createForm is provided', () => {
    const { rerender } = render(<ReferenceSelectWithCreate {...defaultProps} />)
    expect(screen.queryByTestId('add-icon')).toBeFalsy()

    rerender(
      <ReferenceSelectWithCreate {...defaultProps} createForm={<div data-testid="test-form" />} />,
    )
    expect(screen.getByTestId('add-icon')).toBeTruthy()
  })

  it('opens dialog when create button is clicked', () => {
    render(
      <ReferenceSelectWithCreate {...defaultProps} createForm={<div data-testid="test-form" />} />,
    )
    expect(screen.queryByTestId('dialog')).toBeFalsy()

    const addButton = screen.getByTestId('add-icon').closest('button')!
    fireEvent.click(addButton)
    expect(screen.getByTestId('dialog')).toBeTruthy()
  })

  it('dialog contains form and create button', () => {
    render(
      <ReferenceSelectWithCreate {...defaultProps} createForm={<div data-testid="test-form" />} />,
    )

    const addButton = screen.getByTestId('add-icon').closest('button')!
    fireEvent.click(addButton)

    expect(screen.getByTestId('form-provider')).toBeTruthy()
    expect(screen.getByTestId('dialog-title')).toBeTruthy()
    expect(screen.getByTestId('dialog-content')).toBeTruthy()
    expect(screen.getByTestId('dialog-actions')).toBeTruthy()
    expect(screen.getByText('Créer')).toBeTruthy()
  })

  it('submits form and calls fetch when createUrlEnd is provided', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 'new-item' }),
    })
    globalThis.fetch = mockFetch

    render(
      <ReferenceSelectWithCreate
        {...defaultProps}
        createForm={<div data-testid="test-form" />}
        createUrlEnd="/api/tests"
      />,
    )

    const addButton = screen.getByTestId('add-icon').closest('button')!
    fireEvent.click(addButton)

    const submitButton = screen.getByText('Créer')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/tests',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify([{ name: 'test-item', id: 'new-123' }]),
        }),
      )
    })

    expect(mockNotify).toHaveBeenCalledWith('Création réussie', { type: 'success' })
    expect(mockRefresh).toHaveBeenCalled()
  })

  it('submits form and calls dataProvider.create when no createUrlEnd', async () => {
    render(
      <ReferenceSelectWithCreate {...defaultProps} createForm={<div data-testid="test-form" />} />,
    )

    const addButton = screen.getByTestId('add-icon').closest('button')!
    fireEvent.click(addButton)

    const submitButton = screen.getByText('Créer')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockDataProviderCreate).toHaveBeenCalled()
    })

    expect(mockNotify).toHaveBeenCalledWith('Création réussie', { type: 'success' })
    expect(mockRefresh).toHaveBeenCalled()
  })

  it('handles fetch error', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
    })
    globalThis.fetch = mockFetch

    render(
      <ReferenceSelectWithCreate
        {...defaultProps}
        createForm={<div data-testid="test-form" />}
        createUrlEnd="/api/tests"
      />,
    )

    const addButton = screen.getByTestId('add-icon').closest('button')!
    fireEvent.click(addButton)

    const submitButton = screen.getByText('Créer')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockNotify).toHaveBeenCalledWith('Erreur: Erreur', { type: 'error' })
    })
  })

  it('extracts data using extractionPath', async () => {
    mockFormData = { items: [{ name: 'extracted', newId: 'ext-1' }] }
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 'new-item' }),
    })
    globalThis.fetch = mockFetch

    render(
      <ReferenceSelectWithCreate
        {...defaultProps}
        createForm={<div data-testid="test-form" />}
        createUrlEnd="/api/tests"
        extractionPath="items"
      />,
    )

    const addButton = screen.getByTestId('add-icon').closest('button')!
    fireEvent.click(addButton)
    fireEvent.click(screen.getByText('Créer'))

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/tests',
        expect.objectContaining({
          body: JSON.stringify([{ name: 'extracted', id: 'ext-1' }]),
        }),
      )
    })
  })

  it('shows error notification when extractionPath is invalid', async () => {
    mockFormData = { items: 'not-an-array' }

    render(
      <ReferenceSelectWithCreate
        {...defaultProps}
        createForm={<div data-testid="test-form" />}
        createUrlEnd="/api/tests"
        extractionPath="items"
      />,
    )

    const addButton = screen.getByTestId('add-icon').closest('button')!
    fireEvent.click(addButton)
    fireEvent.click(screen.getByText('Créer'))

    await waitFor(() => {
      expect(mockNotify).toHaveBeenCalledWith('Erreur: Structure de données invalide', {
        type: 'error',
      })
    })
  })
})
