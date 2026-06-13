import {
  getVisibleQuickActions,
  getVisibleValidationButtons,
  buttonThemes,
  quickActionButtons,
  validationButtons,
} from '../../../config/homeButtons'

beforeEach(() => {
  localStorage.clear()
})

describe('buttonThemes', () => {
  const expectedColors = ['sapphire', 'emerald', 'amber', 'rose', 'violet', 'teal', 'cyan'] as const

  it('has all expected color keys', () => {
    for (const color of expectedColors) {
      expect(buttonThemes).toHaveProperty(color)
    }
  })

  it('each theme has gradient, glow, and hoverGlow as strings', () => {
    for (const color of expectedColors) {
      const theme = buttonThemes[color]
      expect(typeof theme.gradient).toBe('string')
      expect(typeof theme.glow).toBe('string')
      expect(typeof theme.hoverGlow).toBe('string')
    }
  })
})

describe('quickActionButtons', () => {
  it('has 4 buttons with correct labels', () => {
    expect(quickActionButtons).toHaveLength(4)
    expect(quickActionButtons[0].label).toBe('Achats')
    expect(quickActionButtons[1].label).toBe('Déplacements')
    expect(quickActionButtons[2].label).toBe('Revenus / Emprunts')
    expect(quickActionButtons[3].label).toBe('Dépenses')
  })

  it('each button has the expected properties', () => {
    for (const btn of quickActionButtons) {
      expect(btn).toHaveProperty('label')
      expect(btn).toHaveProperty('icon')
      expect(btn).toHaveProperty('to')
      expect(btn).toHaveProperty('desc')
      expect(btn).toHaveProperty('color')
      expect(btn).toHaveProperty('checkResources')
    }
  })
})

describe('validationButtons', () => {
  it('has 2 buttons with correct labels', () => {
    expect(validationButtons).toHaveLength(2)
    expect(validationButtons[0].label).toBe('Valider paiement / Retourner emprunt')
    expect(validationButtons[1].label).toBe('Valider Réception')
  })

  it('each button has the expected properties', () => {
    for (const btn of validationButtons) {
      expect(btn).toHaveProperty('label')
      expect(btn).toHaveProperty('icon')
      expect(btn).toHaveProperty('to')
      expect(btn).toHaveProperty('desc')
      expect(btn).toHaveProperty('color')
      expect(btn).toHaveProperty('checkResources')
    }
  })
})

describe('getVisibleQuickActions', () => {
  it('returns empty array with no role set', () => {
    expect(getVisibleQuickActions()).toHaveLength(0)
  })

  it('returns all 4 buttons with ADMIN role', () => {
    localStorage.setItem('user_role', 'ADMIN')
    const visible = getVisibleQuickActions()
    expect(visible).toHaveLength(4)
  })
})

describe('getVisibleValidationButtons', () => {
  it('returns empty array with no role set', () => {
    expect(getVisibleValidationButtons()).toHaveLength(0)
  })

  it('returns both buttons with ADMIN role', () => {
    localStorage.setItem('user_role', 'ADMIN')
    const visible = getVisibleValidationButtons()
    expect(visible).toHaveLength(2)
  })
})
