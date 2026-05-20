import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import { leave1Mock, crupdateLeavesMock, createOrUpdateLeaves } from '../mocks/responses/leaves-api'
import { leaveType1Mock } from '../mocks/responses/leave-types-api'
import { insertInToLocalStorage, interceptGeneralEndpoint, loginInPage } from '../support/utils.ts'

describe('E2E: Leaves', () => {
  function navigateToDesktop() {
    cy.get('[data-testid="menu-item-home"]').scrollTo('bottom', { duration: 500 })
    cy.wait(200)
    cy.get('[data-testid="menu-leaves"]').click()
    cy.wait('@getLeaves')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
  })

  it('should display leaves list', () => {
    navigateToDesktop()
    cy.contains(leaveType1Mock.name || '').should('be.visible')
  })

  it('should show leave details', () => {
    navigateToDesktop()
    cy.contains(leaveType1Mock.name || '')
      .first()
      .click()
    cy.wait('@getLeave')
    cy.contains(leave1Mock.reason || '').should('exist')
    cy.contains(String(leave1Mock.duration_days)).should('exist')
  })

  it('should create a new leave', () => {
    navigateToDesktop()
    cy.intercept('PUT', '**/leaves', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateLeaves(req.body)))
    }).as('createLeave')
    cy.get('[class*="RaCreateButton"]').click()
    cy.get('[data-testid="input-duration_days"] input')
      .clear()
      .type(String(crupdateLeavesMock[0].duration_days))
    cy.get('button[type="submit"]').click()
    cy.wait(3000)
    cy.wait('@createLeave')
    cy.url().should('include', '/leaves')
  })

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/leaves',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createLeaveFail')
    cy.get('[class*="RaCreateButton"]').click()
    cy.get('[data-testid="input-duration_days"] input')
      .clear()
      .type(String(crupdateLeavesMock[0].duration_days))
    cy.get('button[type="submit"]').click()
    cy.wait('@createLeaveFail')
    cy.get('.RaNotification-error').should('be.visible')
  })
})
