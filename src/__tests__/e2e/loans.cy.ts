import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  loan1Mock,
  loan3Mock,
  crupdateLoanMock,
  createOrUpdateLoans,
} from '../mocks/responses/loans-api'
import {
  expandMonetarySections,
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectEnumType,
} from '../support/utils.ts'

describe('E2E: Loans', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateLoanMock[0]
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click()
      cy.get('[data-testid="input-id"] input').then(($input) => {
        $input.val('newId')
        $input.trigger('change')
      })
    } else {
      cy.contains(<string>loan1Mock.lender).click()
      cy.wait('@getLoan')
      cy.get('.RaEditButton-root').click()
    }
    cy.get('[data-testid="input-lender"] input')
      .clear()
      .type(<string>crupdatedData.lender)
    cy.get('[data-testid="input-amount"] input')
      .clear()
      .type(<string>(<unknown>crupdatedData.amount))
    cy.get('[data-testid="input-interest_rate"] input')
      .clear()
      .type(<string>(<unknown>crupdatedData.interest_rate))
    cy.get('[data-testid="input-start_date"] input').clear().type('2024-06-01')
    selectEnumType('input-status', 'Actif')
    cy.get('[data-testid="input-description"] textarea:visible')
      .first()
      .clear()
      .type(<string>crupdatedData.description, { force: true })
    cy.get('button[type="submit"]').click({ force: true })
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-item-home"]').scrollTo('bottom', { duration: 500 })
    cy.wait(200)
    expandMonetarySections()
    cy.get('[data-testid="menu-loans"]').click()
    cy.wait('@getLoans')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.wait(1000)
    cy.get('[class*="RaSidebarToggleButton"]').first().click({ force: true })
    cy.wait(1000)
    cy.get('[data-testid="menu-item-home"]', { timeout: 10000 }).should('exist')
    expandMonetarySections()
    cy.get('[data-testid="menu-loans"]').click({ force: true })
    cy.wait('@getLoans')
    cy.get('[class*="RaSidebarToggleButton"]').first().click({ force: true })
    cy.wait(500)
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>loan1Mock.lender).should('be.visible')
    cy.contains(<string>loan3Mock.lender).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>loan1Mock.lender).click()
    cy.wait('@getLoan')
    cy.contains(<string>loan1Mock.lender).should('exist')
    cy.contains(<string>loan1Mock.description).should('exist')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/loans', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateLoans(req.body)))
    }).as('createLoan')
    creatOrUpdate(true)
    cy.wait(3000)
    cy.wait('@createLoan')
    cy.url().should('include', '/loans')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/loans', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateLoans(req.body)))
    }).as('updateLoan')
    creatOrUpdate(false)
    cy.wait(3000)
    cy.wait('@updateLoan')
    cy.url().should('include', '/loans')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    interceptGeneralEndpoint()
    cy.intercept('GET', '**/loans*', mockSuccessResponse([loan1Mock, loan3Mock])).as('getLoans')
    cy.intercept('GET', '**/loans/loan1_id', mockSuccessResponse(loan1Mock)).as('getLoan')
    loginInPage()
    insertInToLocalStorage()
  })

  it('should display loans list', () => showList(true))
  it('should show loan details', () => showDetails(true))
  it('should create a new loan', () => canCreate(true))
  it('should update an existing loan', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/loans',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createLoanFail')
    creatOrUpdate(true)
    cy.wait('@createLoanFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/loans',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateLoanFail')
    creatOrUpdate(false)
    cy.wait('@updateLoanFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display loans list on mobile', () => showList(false))
  it('should show loan details on mobile', () => showDetails(false))
  it('should create a new loan on mobile', () => canCreate(false))
  it('should update an existing loan on mobile', () => canUpdate(false))
})
