import { mockSuccessResponse, authResponseMock } from '../mocks/responses/auth-api'
import { user1Mock, createOrUpdateUsers } from '../mocks/responses/users-api'
import { insertInToLocalStorage, loginInPage } from '../support/utils.ts'

describe('E2E: Profile', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/auth/login', mockSuccessResponse(authResponseMock)).as('login')
    cy.intercept(
      'GET',
      '**/auth/whoami',
      mockSuccessResponse({ ...authResponseMock, ...user1Mock }),
    ).as('whoami')
    cy.intercept('GET', '**/users/user1_id', mockSuccessResponse(user1Mock)).as('getUser')
    insertInToLocalStorage()
    loginInPage()
    // SPA passthrough for profile routes
    cy.intercept('GET', '**/profile*', (req) => req.continue()).as('profilePassthrough')
  })

  it('should display user profile and navigate to edit', () => {
    cy.get('[data-testid="profile-menu-button"]').click()
    cy.get('[data-testid="menu-profile"]').click()

    cy.url().should('include', '/profile')

    cy.contains(user1Mock.email).should('be.visible')
    cy.contains(`${user1Mock.first_name} ${user1Mock.last_name}`).should('be.visible')

    cy.get('[data-testid="edit-profile-button"]').click()

    cy.get('[data-testid="input-profile-first_name"]').should('be.visible')
    cy.get('[data-testid="input-profile-last_name"]').should('be.visible')
    cy.get('[data-testid="input-profile-email"]').should('be.visible')
  })

  it('should update profile', () => {
    cy.intercept(
      'PUT',
      '**/users**',
      mockSuccessResponse(createOrUpdateUsers([{ ...user1Mock, first_name: 'UpdatedName' }])),
    ).as('updateProfile')

    cy.get('[data-testid="profile-menu-button"]').click()
    cy.get('[data-testid="menu-profile"]').click()

    cy.get('[data-testid="edit-profile-button"]').click()

    cy.get('[data-testid="input-profile-first_name"] input').clear().type('UpdatedName')

    cy.get('[data-testid="save-profile-button"]').click()

    cy.wait('@updateProfile')
    cy.get('.RaNotification-success').should('be.visible')
  })

  it('should navigate to password change from profile', () => {
    cy.get('[data-testid="profile-menu-button"]').click()
    cy.get('[data-testid="menu-profile"]').click()

    cy.get('[data-testid="change-password-button"]').click()

    cy.url().should('include', '/profile/password')
    cy.contains('Changer le mot de passe').should('be.visible')
  })
})
