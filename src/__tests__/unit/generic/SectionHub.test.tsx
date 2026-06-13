import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SectionHub } from '../../../generic/SectionHub'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

vi.mock('../../../style/themeConfig', () => ({
  accentGradients: {
    sapphire: 'linear-gradient(...)',
    emerald: 'linear-gradient(...)',
    amber: 'linear-gradient(...)',
  },
}))

vi.mock('../../../style/components', () => ({
  sectionHubStyles: {
    container: { p: 2 },
    title: { fontWeight: 700 },
    grid: { justifyContent: 'center' },
    gridItem: { display: 'flex' },
    actionBox: { display: 'flex' },
    linkBox: { display: 'flex' },
    circle: { borderRadius: '50%' },
    circleIcon: { color: '#fff' },
    label: { fontWeight: 600 },
    desc: { fontSize: '0.75rem' },
  },
  pausedFeature: { opacity: 0.45 },
  pausedBadge: { fontSize: '0.6rem' },
}))

describe('SectionHub', () => {
  const testItems = [
    {
      label: 'Test Item',
      icon: () => <div data-testid="icon-test" />,
      to: '/test',
      color: 'sapphire' as const,
    },
    {
      label: 'Action Item',
      icon: () => <div data-testid="icon-action" />,
      to: '/action',
      color: 'emerald' as const,
      desc: 'Description text',
    },
    {
      label: 'Disabled Item',
      icon: () => <div data-testid="icon-disabled" />,
      to: '/disabled',
      color: 'amber' as const,
      disabled: true,
    },
  ]

  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('renders title from props', () => {
    render(<SectionHub title="My Title" items={testItems} />)
    expect(screen.getByText('My Title')).toBeTruthy()
  })

  it('renders all items', () => {
    render(<SectionHub title="Test" items={testItems} />)
    expect(screen.getByText('Test Item')).toBeTruthy()
    expect(screen.getByText('Action Item')).toBeTruthy()
    expect(screen.getByText('Disabled Item')).toBeTruthy()
  })

  it('navigates on click for non-disabled items', () => {
    render(<SectionHub title="Test" items={testItems} />)
    fireEvent.click(screen.getByText('Test Item'))
    expect(mockNavigate).toHaveBeenCalledWith('/test')
  })

  it('shows "Bientôt" badge for disabled items', () => {
    render(<SectionHub title="Test" items={testItems} />)
    expect(screen.getByText('Bientôt')).toBeTruthy()
  })

  it('renders description text for action items', () => {
    render(<SectionHub title="Test" items={testItems} />)
    expect(screen.getByText('Description text')).toBeTruthy()
  })

  it('does not navigate when clicking disabled item', () => {
    render(<SectionHub title="Test" items={testItems} />)
    fireEvent.click(screen.getByText('Disabled Item'))
    expect(mockNavigate).not.toHaveBeenCalled()
  })
})
