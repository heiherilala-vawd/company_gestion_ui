import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useMediaQuery } from '@mui/material'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

vi.mock('@mui/material', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useMediaQuery: vi.fn(),
  }
})

vi.mock('../../../style/components', () => ({
  datagridStyles: {
    container: {},
    responsive: {},
  },
}))

vi.mock('react-admin', () => ({
  Datagrid: ({ children, sx, rowClick, bulkActionButtons }: any) => (
    <div data-testid="mock-datagrid" data-row-click={rowClick} data-bulk={bulkActionButtons}>
      {children}
    </div>
  ),
}))

describe('ResponsiveDatagrid', () => {
  const mockUseMediaQuery = vi.mocked(useMediaQuery)

  const renderWithBreakpoint = (breakpoint: 'xs' | 'sm' | 'md' | 'lg') => {
    mockUseMediaQuery.mockReset()
    const returnValues = {
      xs: [true, false, false],
      sm: [false, true, false],
      md: [false, false, true],
      lg: [false, false, false],
    }
    const values = returnValues[breakpoint]
    let callIndex = 0
    mockUseMediaQuery.mockImplementation(() => values[callIndex++])
  }

  beforeEach(() => {
    mockUseMediaQuery.mockReset()
  })

  const children = [
    <div key="id" data-testid="field-id" source="id" />,
    <div key="name" data-testid="field-name" source="name" />,
    <div key="email" data-testid="field-email" source="email" />,
    <div key="phone" data-testid="field-phone" source="phone" />,
    <div key="actions" data-testid="field-actions" />,
  ]

  it('renders Datagrid with rowClick="show" and bulkActionButtons={false}', () => {
    renderWithBreakpoint('lg')
    render(<ResponsiveDatagrid>{children}</ResponsiveDatagrid>)
    const datagrid = screen.getByTestId('mock-datagrid')
    expect(datagrid.getAttribute('data-row-click')).toBe('show')
    expect(datagrid.getAttribute('data-bulk')).toBe('false')
  })

  it('includes children without source (actions) on XS', () => {
    renderWithBreakpoint('xs')
    render(<ResponsiveDatagrid priorityFields={['name', 'email']}>{children}</ResponsiveDatagrid>)
    expect(screen.getByTestId('field-actions')).toBeTruthy()
  })

  it('shows only priority fields up to descriptionNumber on XS', () => {
    renderWithBreakpoint('xs')
    const { container } = render(
      <ResponsiveDatagrid priorityFields={['name', 'email']} descriptionNumber={2}>
        {children}
      </ResponsiveDatagrid>,
    )

    expect(screen.getByTestId('field-actions')).toBeTruthy()
    expect(screen.getByTestId('field-name')).toBeTruthy()
    expect(screen.getByTestId('field-email')).toBeTruthy()
    expect(screen.queryByTestId('field-id')).toBeFalsy()
    expect(screen.queryByTestId('field-phone')).toBeFalsy()
  })

  it('shows additional priority fields on SM (descriptionNumber + 1)', () => {
    renderWithBreakpoint('sm')
    render(
      <ResponsiveDatagrid priorityFields={['name', 'email', 'phone']} descriptionNumber={2}>
        {children}
      </ResponsiveDatagrid>,
    )

    expect(screen.getByTestId('field-name')).toBeTruthy()
    expect(screen.getByTestId('field-email')).toBeTruthy()
    expect(screen.getByTestId('field-phone')).toBeTruthy()
    expect(screen.queryByTestId('field-id')).toBeFalsy()
  })

  it('shows even more priority fields on MD (descriptionNumber + 3)', () => {
    renderWithBreakpoint('md')
    render(
      <ResponsiveDatagrid priorityFields={['name', 'email', 'phone', 'id']} descriptionNumber={2}>
        {children}
      </ResponsiveDatagrid>,
    )

    expect(screen.getByTestId('field-name')).toBeTruthy()
    expect(screen.getByTestId('field-email')).toBeTruthy()
    expect(screen.getByTestId('field-phone')).toBeTruthy()
    expect(screen.getByTestId('field-id')).toBeTruthy()
  })

  it('shows all fields on LG/XL (up to 8)', () => {
    renderWithBreakpoint('lg')
    render(
      <ResponsiveDatagrid priorityFields={['name', 'email', 'phone']}>
        {children}
      </ResponsiveDatagrid>,
    )

    expect(screen.getByTestId('field-id')).toBeTruthy()
    expect(screen.getByTestId('field-name')).toBeTruthy()
    expect(screen.getByTestId('field-email')).toBeTruthy()
    expect(screen.getByTestId('field-phone')).toBeTruthy()
    expect(screen.getByTestId('field-actions')).toBeTruthy()
  })

  it('shows all children when priorityFields is not provided', () => {
    renderWithBreakpoint('xs')
    render(<ResponsiveDatagrid>{children}</ResponsiveDatagrid>)

    expect(screen.getByTestId('field-id')).toBeTruthy()
    expect(screen.getByTestId('field-name')).toBeTruthy()
    expect(screen.getByTestId('field-email')).toBeTruthy()
    expect(screen.getByTestId('field-phone')).toBeTruthy()
    expect(screen.getByTestId('field-actions')).toBeTruthy()
  })
})
