import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  createOrUpdateUsers,
  crupdateUsersMock,
  user1Mock,
  user2Mock,
} from '../mocks/responses/users-api'
import { insertInToLocalStorage, interceptGeneralEndpoint, loginInPage } from '../support/utils.ts'

describe('E2E: Users', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateUsersMock[0]
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click()
    } else {
      cy.contains(<string>user1Mock.first_name).click()
      cy.wait('@getUser')
      cy.get('.RaEditButton-root').click()
    }
    cy.get('[data-testid="input-email"] input')
      .clear()
      .type(<string>crupdatedData.email)
    cy.get('[data-testid="input-first_name"] input')
      .clear()
      .type(<string>crupdatedData.first_name)
    cy.get('[data-testid="input-last_name"] input')
      .clear()
      .type(<string>crupdatedData.last_name)
    cy.get('[data-testid="input-sex"]').click()
    cy.contains('Femme').click({ force: true })
    cy.get('[data-testid="input-role"]').click()
    cy.contains('Employé').click({ force: true })
    cy.get('[data-testid="input-password"] input')
      .clear()
      .type(<string>crupdatedData.password || 'password123')
    cy.get('button[type="submit"]').click({ force: true })
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-users"]').click()
    cy.wait('@getUsers')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.get('[data-testid="menu-item-home"]').should('exist')
    cy.get('[data-testid="menu-users"]').scrollIntoView()
    cy.get('[data-testid="menu-users"]').click({ force: true })
    cy.wait('@getUsers')
    cy.get('body').then(($body) => {
      if ($body.find('.RaSidebar-modal').length) {
        cy.get('body').click(0, 0) // clique hors menu
      }
    })
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>user1Mock.first_name).should('be.visible')
    cy.contains(<string>user2Mock.first_name).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>user1Mock.first_name).click()
    cy.wait('@getUser')
    cy.contains(<string>user1Mock.first_name).should('be.visible')
    cy.contains(<string>user1Mock.email).should('be.visible')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/users*', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateUsers(req.body)))
    }).as('updateUser')
    creatOrUpdate(false)
    cy.wait(3000)
    cy.wait('@updateUser')
    cy.url().should('include', '/users')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
  })

  it('should display users list', () => showList(true))
  it('should show user details', () => showDetails(true))
  it('should update an existing user', () => canUpdate(true))

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/users',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateUserFail')
    creatOrUpdate(false)
    cy.wait('@updateUserFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display users list on mobile', () => showList(false))
  it('should show user details on mobile', () => showDetails(false))
  it('should update an existing user on mobile', () => canUpdate(false))
})
