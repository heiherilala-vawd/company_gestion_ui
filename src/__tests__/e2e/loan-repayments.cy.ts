import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  loanRepayment1Mock,
  loanRepayment2Mock,
  loanRepaymentsMock,
  crupdateLoanRepaymentsMock,
  createOrUpdateLoanRepayments,
} from '../mocks/responses/loan-repayments-api'
import {
  expandMonetarySections,
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectReferenceWithCreate,
} from '../support/utils.ts'
import { loan1Mock } from '../mocks/responses/loans-api'

function toAmountRegex(amount: number): RegExp {
  const str = String(amount)
  const pattern = str.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1[.,\\s\\u202f]*')
  return new RegExp(pattern)
}

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
      cy.contains(toAmountRegex(loanRepayment1Mock.amount)).click()
      cy.wait('@getLoanRepayment')
      cy.get('.RaEditButton-root').click()
    }
    cy.get('[data-testid="input-payment_date"] input').clear().type('2024-03-15')
    cy.get('[data-testid="input-amount"] input')
      .clear()
      .type(<string>(<unknown>crupdatedData.amount))
    if (isCreating) {
      selectReferenceWithCreate('input-loan_id', 'loan_id', <string>loan1Mock.lender)
    }
    cy.get('button[type="submit"]').click({ force: true })
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-item-home"]').scrollTo('bottom', { duration: 500 })
    cy.wait(200)
    expandMonetarySections()
    cy.get('[data-testid="menu-loan-repayments"]').click()
    cy.wait('@getLoanRepayments')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.wait(1000)
    cy.get('[class*="RaSidebarToggleButton"]').first().click({ force: true })
    cy.wait(1000)
    cy.get('[data-testid="menu-item-home"]', { timeout: 10000 }).should('exist')
    expandMonetarySections()
    cy.get('[data-testid="menu-loan-repayments"]').click({ force: true })
    cy.wait('@getLoanRepayments')
    cy.get('[class*="RaSidebarToggleButton"]').first().click({ force: true })
    cy.wait(500)
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(toAmountRegex(loanRepayment1Mock.amount)).should('be.visible')
    cy.contains(toAmountRegex(loanRepayment2Mock.amount)).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(toAmountRegex(loanRepayment1Mock.amount)).click()
    cy.wait('@getLoanRepayment')
    cy.contains(toAmountRegex(loanRepayment1Mock.amount)).should('exist')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/loans_repayment', (req) => {
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
    cy.intercept('PUT', '**/loans_repayment', (req) => {
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
    interceptGeneralEndpoint()
    cy.intercept('GET', '**/loans_repayment*', mockSuccessResponse(loanRepaymentsMock)).as(
      'getLoanRepayments',
    )
    cy.intercept('GET', '**/loans_repayment/lr1_id', mockSuccessResponse(loanRepayment1Mock)).as(
      'getLoanRepayment',
    )
    cy.intercept('GET', '**/loans_repayment/newId', mockSuccessResponse(loanRepayment1Mock)).as(
      'getLoanRepaymentCreate',
    )
    loginInPage()
    insertInToLocalStorage()
  })

  it('should display loan repayments list', () => showList(true))
  it('should show loan repayment details', () => showDetails(true))
  it('should create a new loan repayment', () => canCreate(true))
  it('should update an existing loan repayment', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/loans_repayment',
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
      '**/loans_repayment',
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
