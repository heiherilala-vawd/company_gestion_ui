import { mockSuccessResponse } from '../mocks/responses/auth-api'
import { createOrUpdateUsers } from '../mocks/responses/users-api'
import { insertInToLocalStorage, interceptGeneralEndpoint, loginInPage } from '../support/utils.ts'

describe('E2E: Users Bulk Create', () => {
  beforeEach(() => {
    interceptGeneralEndpoint()
    insertInToLocalStorage()
    loginInPage()
  })

  it('should bulk create users from name list', () => {
    cy.intercept('PUT', '**/users*', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateUsers(req.body)))
    }).as('createUsers')

    cy.get('[data-testid="menu-users"]').click()
    cy.wait('@getUsers')

    // Click create button to go to bulk create page
    cy.get('[class*="RaCreateButton"]').click()

    cy.contains("Création en masse d'utilisateurs").should('be.visible')

    cy.get('[data-testid="input-bulk-users"]').type('Jean Dupont\nMarie Martin')

    cy.get('[data-testid="submit-bulk-create"]').click()

    // Should create 2 users
    cy.wait('@createUsers')
    cy.get('.RaNotification-success').should('be.visible')
  })

  it('should show error when no names entered', () => {
    cy.get('[data-testid="menu-users"]').click()
    cy.wait('@getUsers')

    cy.get('[class*="RaCreateButton"]').click()

    cy.get('[data-testid="submit-bulk-create"]').click()

    cy.get('.RaNotification-error').should('be.visible')
  })
})
