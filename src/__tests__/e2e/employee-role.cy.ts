import {
  mockSuccessResponse,
  authResponseMock,
  whoamiResponseMock,
  loginRequestMock,
} from '../mocks/responses/auth-api'
import { employeePaymentsMock } from '../mocks/responses/employee-payments-api'

const employeeAuthMock = { ...authResponseMock, role: 'EMPLOYEE' }
const employeeWhoamiMock = { ...whoamiResponseMock, role: 'EMPLOYEE' }

function loginAsEmployee(): void {
  cy.clearLocalStorage()
  cy.clearCookies()
  cy.viewport(1280, 720)
  cy.intercept('POST', '**/auth/login', mockSuccessResponse(employeeAuthMock)).as('employeeLogin')
  cy.intercept('GET', '**/auth/whoami', mockSuccessResponse(employeeWhoamiMock)).as('employeeWhoami')
  cy.intercept('GET', '**/employee_payments*', mockSuccessResponse(employeePaymentsMock)).as('getEmployeePayments')

  cy.visit('/', { failOnStatusCode: false })
  cy.contains('button', 'Se connecter', { timeout: 10000 }).click()
  cy.get('#wp-email', { timeout: 10000 }).should('be.visible').type(<string>loginRequestMock.email)
  cy.get('#wp-password').type(<string>loginRequestMock.password)
  cy.get('.wp-modal__submit').click()
  cy.wait('@employeeLogin', { timeout: 10000 }).its('response.statusCode').should('eq', 200)
  cy.wait('@employeeWhoami', { timeout: 10000 }).its('response.statusCode').should('eq', 200)
  cy.url({ timeout: 15000 }).should('not.include', '/login')
  cy.wait(2000)
}

describe('E2E: Employee Role', () => {
  it('should restrict UI for employee role', () => {
    loginAsEmployee()

    cy.get('[data-testid="bottom-nav"]').should('not.exist')
    cy.get('body').should('contain', 'GestPro')
    cy.contains('Company:').should('not.exist')
    cy.contains('Job:').should('not.exist')

    cy.get('[class*="RaSidebar"]', { timeout: 5000 }).should('be.visible')
    cy.get('[data-testid="menu-item-home"]', { timeout: 5000 }).should('exist')
    cy.get('[data-testid="menu-item-home"]').within(() => {
      cy.contains('Salaire').should('be.visible')
      cy.contains('Transport personnel').should('be.visible')
      cy.contains('Tâche').should('be.visible')
      cy.contains('Emprunt équipement').should('be.visible')

      cy.contains('Société').should('not.exist')
      cy.contains('RH').should('not.exist')
      cy.contains('Stock').should('not.exist')
      cy.contains('Équipement').should('not.exist')
      cy.contains('Base de déplacement').should('not.exist')

      cy.contains('Entreprises').should('not.exist')
      cy.contains('Utilisateurs').should('not.exist')
      cy.contains('Entrepôts').should('not.exist')
      cy.contains('Équipements').should('not.exist')
    })
  })

  it('should not show create or edit buttons on employee pages', () => {
    loginAsEmployee()

    cy.get('[data-testid="menu-item-home"]').within(() => {
      cy.contains('Salaire').click()
    })
    cy.wait('@getEmployeePayments', { timeout: 10000 })

    cy.get('button').contains('Créer').should('not.exist')
    cy.get('[class*="RaCreateButton"]').should('not.exist')
    cy.get('[class*="RaEditButton"]').should('not.exist')
  })
})

