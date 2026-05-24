import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  loanRepayment1Mock,
  loanRepayment2Mock,
  loanRepaymentsMock,
  crupdateLoanRepaymentsMock,
  createOrUpdateLoanRepayments,
} from '../mocks/responses/loan-repayments-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectReferenceWithCreate,
} from '../support/utils.ts'
import { loan1Mock } from '../mocks/responses/loans-api'

describe('E2E: Loan Repayments', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateLoanRepaymentsMock[0]
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click()
      cy.get('[data-testid="input-id"] input').then(($input) => {
        $input.val('newId')
        $input.trigger('change')
      })
    } else {
      cy.contains(String(loanRepayment1Mock.amount)).click()
      cy.wait('@getLoanRepayment')
      cy.get('.RaEditButton-root').click()
    }
    cy.get('[data-testid="input-payment_date"] input').clear().type('2024-03-15')
    cy.get('[data-testid="input-amount"] input')
      .clear()
      .type(<string>(<unknown>crupdatedData.amount))
    selectReferenceWithCreate('input-loan_id', 'loan_id', <string>loan1Mock.lender)
    cy.get('button[type="submit"]').click()
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-item-home"]').scrollTo('bottom', { duration: 500 })
    cy.wait(200)
    cy.get('[data-testid="menu-loan-repayments"]').click()
    cy.wait('@getLoanRepayments')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.get('[data-testid="menu-item-home"]').should('exist')
    cy.get('[data-testid="menu-loan-repayments"]').scrollIntoView()
    cy.get('[data-testid="menu-loan-repayments"]').click({ force: true })
    cy.wait('@getLoanRepayments')
    cy.get('body').then(($body) => {
      if ($body.find('.RaSidebar-modal').length) {
        cy.get('body').click(0, 0)
      }
    })
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(String(loanRepayment1Mock.amount)).should('be.visible')
    cy.contains(String(loanRepayment2Mock.amount)).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(String(loanRepayment1Mock.amount)).click()
    cy.wait('@getLoanRepayment')
    cy.contains(String(loanRepayment1Mock.amount)).should('exist')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/loan_repayments', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateLoanRepayments(req.body)))
    }).as('createLoanRepayment')
    creatOrUpdate(true)
    cy.wait(3000)
    cy.wait('@createLoanRepayment')
    cy.url().should('include', '/loan_repayments')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/loan_repayments', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateLoanRepayments(req.body)))
    }).as('updateLoanRepayment')
    creatOrUpdate(false)
    cy.wait(3000)
    cy.wait('@updateLoanRepayment')
    cy.url().should('include', '/loan_repayments')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    cy.intercept('GET', '**/loan_repayments*', mockSuccessResponse(loanRepaymentsMock)).as(
      'getLoanRepayments',
    )
    cy.intercept('GET', '**/loan_repayments/lr1_id', mockSuccessResponse(loanRepayment1Mock)).as(
      'getLoanRepayment',
    )
    cy.intercept('GET', '**/loan_repayments/newId', mockSuccessResponse(loanRepayment1Mock)).as(
      'getLoanRepaymentCreate',
    )
    loginInPage()
  })

  it('should display loan repayments list', () => showList(true))
  it('should show loan repayment details', () => showDetails(true))
  it('should create a new loan repayment', () => canCreate(true))
  it('should update an existing loan repayment', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/loan_repayments',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createLoanRepaymentFail')
    creatOrUpdate(true)
    cy.wait('@createLoanRepaymentFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/loan_repayments',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateLoanRepaymentFail')
    creatOrUpdate(false)
    cy.wait('@updateLoanRepaymentFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display loan repayments list on mobile', () => showList(false))
  it('should show loan repayment details on mobile', () => showDetails(false))
  it('should create a new loan repayment on mobile', () => canCreate(false))
  it('should update an existing loan repayment on mobile', () => canUpdate(false))
})
