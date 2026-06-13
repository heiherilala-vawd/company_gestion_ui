import {
  mockSuccessResponse,
  mockErrorResponse,
  authResponseMock,
} from '../mocks/responses/auth-api'
import { loginInPage } from '../support/utils.ts'

describe('E2E: Password Change', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/auth/login', mockSuccessResponse(authResponseMock)).as('login')
    cy.intercept('GET', '**/auth/whoami', mockSuccessResponse(authResponseMock)).as('whoami')
    loginInPage()
  })

  it('should change password successfully', () => {
    cy.intercept('PUT', '**/auth/password', mockSuccessResponse({})).as('changePassword')

    cy.get('[data-testid="profile-menu-button"]').click()
    cy.get('[data-testid="menu-password-change"]').click()

    cy.url().should('include', '/profile/password')

    cy.get('[data-testid="input-old-password"] input').type('oldPass123')
    cy.get('[data-testid="input-new-password"] input').type('newPass456')
    cy.get('[data-testid="input-confirm-new-password"] input').type('newPass456')

    cy.get('[data-testid="submit-password-change"]').click()

    cy.wait('@changePassword')
    cy.get('.RaNotification-success').should('be.visible')
  })

  it('should show error when passwords do not match', () => {
    cy.get('[data-testid="profile-menu-button"]').click()
    cy.get('[data-testid="menu-password-change"]').click()

    cy.get('[data-testid="input-old-password"] input').type('oldPass123')
    cy.get('[data-testid="input-new-password"] input').type('newPass456')
    cy.get('[data-testid="input-confirm-new-password"] input').type('different')

    cy.get('[data-testid="submit-password-change"]').click()

    cy.get('[data-testid="input-confirm-new-password"]').should(
      'contain',
      'Les mots de passe ne correspondent pas',
    )
  })

  it('should show error on API failure', () => {
    cy.intercept(
      'PUT',
      '**/auth/password',
      mockErrorResponse('BadRequestException', 'Invalid old password', 400),
    ).as('changePasswordFail')

    cy.get('[data-testid="profile-menu-button"]').click()
    cy.get('[data-testid="menu-password-change"]').click()

    cy.get('[data-testid="input-old-password"] input').type('wrongOldPass')
    cy.get('[data-testid="input-new-password"] input').type('newPass456')
    cy.get('[data-testid="input-confirm-new-password"] input').type('newPass456')

    cy.get('[data-testid="submit-password-change"]').click()

    cy.wait('@changePasswordFail')
    cy.get('.RaNotification-error').should('be.visible')
  })
})
