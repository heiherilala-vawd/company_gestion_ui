import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider, useThemeMode } from '../../../style/ThemeContext'

function TestComponent() {
  const { mode, toggleMode } = useThemeMode()
  return (
    <div>
      <span data-testid="mode">{mode}</span>
      <button data-testid="toggle" onClick={toggleMode}>
        Toggle
      </button>
    </div>
  )
}

beforeEach(() => {
  localStorage.clear()
})

describe('ThemeContext', () => {
  it('default mode is light', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('mode').textContent).toBe('light')
  })

  it('toggles to dark after clicking', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    )
    fireEvent.click(screen.getByTestId('toggle'))
    expect(screen.getByTestId('mode').textContent).toBe('dark')
  })

  it('toggles back to light after two clicks', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    )
    fireEvent.click(screen.getByTestId('toggle'))
    fireEvent.click(screen.getByTestId('toggle'))
    expect(screen.getByTestId('mode').textContent).toBe('light')
  })

  it('persists mode to localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    )
    fireEvent.click(screen.getByTestId('toggle'))
    expect(localStorage.getItem('theme-mode')).toBe('dark')
    fireEvent.click(screen.getByTestId('toggle'))
    expect(localStorage.getItem('theme-mode')).toBe('light')
  })

  it('reads initial mode from localStorage', () => {
    localStorage.setItem('theme-mode', 'dark')
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('mode').textContent).toBe('dark')
  })
})
