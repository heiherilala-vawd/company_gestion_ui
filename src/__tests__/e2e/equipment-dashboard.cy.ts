import { mockSuccessResponse } from '../mocks/responses/auth-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
} from '../support/utils.ts'

describe('E2E: Equipment Dashboard', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    interceptGeneralEndpoint()
    loginInPage()
    insertInToLocalStorage()
  })

  function navigateToDesktop() {
    cy.get('[data-testid="menu-item-home"]').scrollTo('bottom', { duration: 500 })
    cy.wait(200)
    cy.get('[data-testid="menu-equipment-dashboard"]').click()
    cy.wait(['@getEquipmentDashboardSummary', '@getEquipmentDashboardBreakdown'], { timeout: 15000 })
    cy.wait(500)
  }

  it('should display equipment dashboard page', () => {
    navigateToDesktop()
    cy.contains('h4', 'Tableau de bord équipements').should('be.visible')
  })

  it('should display summary cards', () => {
    navigateToDesktop()
    cy.contains('Total').should('be.visible')
    cy.contains('Disponibles').should('be.visible')
  })

  it('should display filter button', () => {
    navigateToDesktop()
    cy.contains('Appliquer les filtres').should('be.visible')
  })
})
