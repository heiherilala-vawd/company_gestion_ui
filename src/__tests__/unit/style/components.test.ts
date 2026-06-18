import {
  appBarStyles,
  menuStyles,
  formStyles,
  datagridStyles,
  sectionHubStyles,
  listFilters,
  showStyles,
  homePageStyles,
  bottomNavStyles,
  emptyStateStyles,
  layoutStyles,
  dashboardStyles,
  operationFormStyles,
  skeletonStyles,
  pausedFeature,
  pausedBadge,
  profileStyles,
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

  describe('listFilters', () => {
    it('exists and is an array', () => {
      expect(listFilters).toBeDefined()
      expect(Array.isArray(listFilters)).toBe(true)
    })
  })

  describe('showStyles', () => {
    it('exists and has page and card', () => {
      expect(showStyles).toBeDefined()
      expect(showStyles.page).toBeDefined()
      expect(showStyles.card).toBeDefined()
    })
    it('has infoCard and fieldRow', () => {
      expect(showStyles.infoCard).toBeDefined()
      expect(showStyles.fieldRow).toBeDefined()
    })
  })

  describe('homePageStyles', () => {
    it('exists and has container, title, welcomeBox', () => {
      expect(homePageStyles).toBeDefined()
      expect(homePageStyles.container).toBeDefined()
      expect(homePageStyles.title).toBeDefined()
      expect(homePageStyles.welcomeBox).toBeDefined()
    })
    it('has gridContainer and illustrationCard', () => {
      expect(homePageStyles.gridContainer).toBeDefined()
      expect(homePageStyles.illustrationCard).toBeDefined()
    })
  })

  describe('bottomNavStyles', () => {
    it('exists and has paper, nav, action', () => {
      expect(bottomNavStyles).toBeDefined()
      expect(bottomNavStyles.paper).toBeDefined()
      expect(bottomNavStyles.nav).toBeDefined()
      expect(bottomNavStyles.action).toBeDefined()
    })
  })

  describe('emptyStateStyles', () => {
    it('exists and is an object with SxProps shape', () => {
      expect(emptyStateStyles).toBeDefined()
      expect(typeof emptyStateStyles).toBe('object')
    })
  })

  describe('layoutStyles', () => {
    it('exists and has container, content, sidebar', () => {
      expect(layoutStyles).toBeDefined()
      expect(layoutStyles.container).toBeDefined()
      expect(layoutStyles.content).toBeDefined()
      expect(layoutStyles.sidebar).toBeDefined()
    })
    it('has raLayout', () => {
      expect(layoutStyles.raLayout).toBeDefined()
    })
  })

  describe('dashboardStyles', () => {
    it('exists and has container, header, chartCard', () => {
      expect(dashboardStyles).toBeDefined()
      expect(dashboardStyles.container).toBeDefined()
      expect(dashboardStyles.header).toBeDefined()
      expect(dashboardStyles.chartCard).toBeDefined()
    })
    it('has metricsGrid', () => {
      expect(dashboardStyles.metricsGrid).toBeDefined()
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

  describe('operationFormStyles', () => {
    it('exists and has card, flexRow, divider, submitBox', () => {
      expect(operationFormStyles).toBeDefined()
      expect(operationFormStyles.card).toBeDefined()
      expect(operationFormStyles.flexRow).toBeDefined()
      expect(operationFormStyles.divider).toBeDefined()
      expect(operationFormStyles.submitBox).toBeDefined()
    })
    it('has toggleBox and collapseContent', () => {
      expect(operationFormStyles.toggleBox).toBeDefined()
      expect(operationFormStyles.collapseContent).toBeDefined()
    })
  })

  describe('skeletonStyles', () => {
    it('exists and has container, headerBox, filterBox', () => {
      expect(skeletonStyles).toBeDefined()
      expect(skeletonStyles.container).toBeDefined()
      expect(skeletonStyles.headerBox).toBeDefined()
      expect(skeletonStyles.filterBox).toBeDefined()
    })
    it('has skeletonItem and row', () => {
      expect(skeletonStyles.skeletonItem).toBeDefined()
      expect(skeletonStyles.row).toBeDefined()
    })
  })

  describe('pausedFeature', () => {
    it('exists and has expected shape', () => {
      expect(pausedFeature).toBeDefined()
      expect(typeof pausedFeature).toBe('object')
    })
  })

  describe('pausedBadge', () => {
    it('exists and is an object', () => {
      expect(pausedBadge).toBeDefined()
      expect(typeof pausedBadge).toBe('object')
    })
  })

  describe('profileStyles', () => {
    it('exists and has page, card, header, avatar, name, roleBadge', () => {
      expect(profileStyles).toBeDefined()
      expect(profileStyles.page).toBeDefined()
      expect(profileStyles.card).toBeDefined()
      expect(profileStyles.header).toBeDefined()
      expect(profileStyles.avatar).toBeDefined()
      expect(profileStyles.name).toBeDefined()
      expect(profileStyles.roleBadge).toBeDefined()
    })
    it('has body, fieldRow', () => {
      expect(profileStyles.body).toBeDefined()
      expect(profileStyles.fieldRow).toBeDefined()
    })
  })
})
