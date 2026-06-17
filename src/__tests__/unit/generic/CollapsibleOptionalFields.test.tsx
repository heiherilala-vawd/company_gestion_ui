import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'

describe('CollapsibleOptionalFields', () => {
  it('renders children', () => {
    render(
      <CollapsibleOptionalFields>
        <div data-testid="child">Content</div>
      </CollapsibleOptionalFields>,
    )
    expect(screen.getByTestId('child')).toBeTruthy()
  })

  it('shows "Options avancées" button text', () => {
    render(
      <CollapsibleOptionalFields>
        <div>Content</div>
      </CollapsibleOptionalFields>,
    )
    expect(screen.getByText('Options avancées')).toBeTruthy()
  })

  it('starts open by default', () => {
    render(
      <CollapsibleOptionalFields>
        <div data-testid="child">Content</div>
      </CollapsibleOptionalFields>,
    )
    expect(screen.getByTestId('child')).toBeTruthy()
  })

  it('toggles content visibility on button click', () => {
    render(
      <CollapsibleOptionalFields>
        <div data-testid="child">Content</div>
      </CollapsibleOptionalFields>,
    )

    const button = screen.getByText('Options avancées')
    expect(screen.getByTestId('child')).toBeTruthy()

    fireEvent.click(button)

    const child = screen.queryByTestId('child')
    expect(child).toBeTruthy()
  })

  it('includes custom designation in button text', () => {
    render(
      <CollapsibleOptionalFields designation="personnalisées">
        <div>Content</div>
      </CollapsibleOptionalFields>,
    )
    expect(screen.getByText('Options avancées personnalisées')).toBeTruthy()
  })

  it('renders multiple children', () => {
    render(
      <CollapsibleOptionalFields>
        <div data-testid="child1">First</div>
        <div data-testid="child2">Second</div>
      </CollapsibleOptionalFields>,
    )
    expect(screen.getByTestId('child1')).toBeTruthy()
    expect(screen.getByTestId('child2')).toBeTruthy()
  })
})
