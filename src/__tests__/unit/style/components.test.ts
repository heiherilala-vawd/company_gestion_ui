import {
  appBarStyles,
  menuStyles,
  formStyles,
  datagridStyles,
  sectionHubStyles,
} from '../../../style/components'

describe('components style objects', () => {
  describe('appBarStyles', () => {
    it('exists and has container with display flex', () => {
      expect(appBarStyles).toBeDefined()
      expect(appBarStyles.container).toBeDefined()
      expect(appBarStyles.container.display).toBe('flex')
    })
    it('has appBar and iconButton keys', () => {
      expect(appBarStyles.appBar).toBeDefined()
      expect(appBarStyles.iconButton).toBeDefined()
      expect(appBarStyles.expandedSection).toBeDefined()
    })
  })

  describe('menuStyles', () => {
    it('exists and has sectionDot', () => {
      expect(menuStyles).toBeDefined()
      expect(menuStyles.sectionDot).toBeDefined()
      expect(typeof menuStyles.sectionDot).toBe('object')
    })
    it('has container key', () => {
      expect(menuStyles.container).toBeDefined()
    })
  })

  describe('formStyles', () => {
    it('exists and has selectorBox with borderRadius', () => {
      expect(formStyles).toBeDefined()
      expect(formStyles.selectorBox).toBeDefined()
      expect(formStyles.selectorBox).toHaveProperty('borderRadius')
    })
    it('has selectorIcon, selectorLabel, selectorWrapper', () => {
      expect(formStyles.selectorIcon).toBeDefined()
      expect(formStyles.selectorLabel).toBeDefined()
      expect(formStyles.selectorWrapper).toBeDefined()
    })
  })

  describe('datagridStyles', () => {
    it('exists and has container, cell, header', () => {
      expect(datagridStyles).toBeDefined()
      expect(datagridStyles.container).toBeDefined()
      expect(datagridStyles.cell).toBeDefined()
      expect(datagridStyles.header).toBeDefined()
    })
  })

  describe('sectionHubStyles', () => {
    it('exists and has container, title, grid, gridItem, actionBox', () => {
      expect(sectionHubStyles).toBeDefined()
      expect(sectionHubStyles.container).toBeDefined()
      expect(sectionHubStyles.title).toBeDefined()
      expect(sectionHubStyles.grid).toBeDefined()
      expect(sectionHubStyles.gridItem).toBeDefined()
      expect(sectionHubStyles.actionBox).toBeDefined()
    })
  })
})
