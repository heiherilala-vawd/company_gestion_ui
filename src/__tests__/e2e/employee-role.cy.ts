import {
  mockSuccessResponse,
  authResponseMock,
  whoamiResponseMock,
  loginRequestMock,
} from '../mocks/responses/auth-api'

const employeeAuthMock = { ...authResponseMock, role: 'EMPLOYEE' }
const employeeWhoamiMock = { ...whoamiResponseMock, role: 'EMPLOYEE' }

describe('E2E: Employee Role', () => {
  it('should hide bottom nav and selectors for employee', () => {
    cy.clearLocalStorage()
    cy.clearCookies()
    cy.viewport(1280, 720)
    cy.intercept('POST', '**/auth/login', mockSuccessResponse(employeeAuthMock)).as('employeeLogin')
    cy.intercept('GET', '**/auth/whoami', mockSuccessResponse(employeeWhoamiMock)).as('employeeWhoami')

    cy.visit('/', { failOnStatusCode: false })
    cy.contains('button', 'Se connecter', { timeout: 10000 }).click()
    cy.get('#wp-email', { timeout: 10000 }).should('be.visible').type(<string>loginRequestMock.email)
    cy.get('#wp-password').type(<string>loginRequestMock.password)
    cy.get('.wp-modal__submit').click()
    cy.wait('@employeeLogin', { timeout: 10000 }).its('response.statusCode').should('eq', 200)
    cy.wait('@employeeWhoami', { timeout: 10000 }).its('response.statusCode').should('eq', 200)
    cy.wait(3000)
    cy.url().then((url) => cy.log('URL after login:', url))
    cy.url({ timeout: 15000 }).should('not.include', '/login')

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
})
