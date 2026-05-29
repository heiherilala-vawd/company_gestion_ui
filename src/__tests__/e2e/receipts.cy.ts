import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  receipt1Mock,
  receipt2Mock,
  receiptsMock,
  crupdateReceiptsMock,
  createOrUpdateReceipts,
} from '../mocks/responses/receipts-api'
import {
  expandMonetarySections,
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectReferenceWithCreate,
} from '../support/utils.ts'
import { income1Mock } from '../mocks/responses/incomes-api'

function toAmountRegex(amount: number): RegExp {
  const str = String(amount)
  const pattern = str.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1[.,\\s\\u202f]*')
  return new RegExp(pattern)
}

describe('E2E: Receipts', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateReceiptsMock[0]
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click()
      cy.get('[data-testid="input-id"] input').then(($input) => {
        $input.val('newId')
        $input.trigger('change')
      })
    } else {
      cy.contains(toAmountRegex(receipt1Mock.amount)).click()
      cy.wait('@getReceipt')
      cy.get('.RaEditButton-root').click()
    }
    cy.get('[data-testid="input-payment_date"] input').clear().type('2024-03-15')
    cy.get('[data-testid="input-amount"] input')
      .clear()
      .type(<string>(<unknown>crupdatedData.amount))
    selectReferenceWithCreate(
      'input-income_id',
      'income_id',
      <string>income1Mock.source_organization,
    )
    cy.get('button[type="submit"]').click({ force: true })
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-item-home"]').scrollTo('bottom', { duration: 500 })
    cy.wait(200)
    expandMonetarySections()
    cy.get('[data-testid="menu-receipts"]').click()
    cy.wait('@getReceipts')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.wait(1000)
    cy.get('[class*="RaSidebarToggleButton"]').first().click({ force: true })
    cy.wait(1000)
    cy.get('[data-testid="menu-item-home"]', { timeout: 10000 }).should('exist')
    expandMonetarySections()
    cy.get('[data-testid="menu-receipts"]').click({ force: true })
    cy.wait('@getReceipts')
    cy.get('[class*="RaSidebarToggleButton"]').first().click({ force: true })
    cy.wait(500)
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(toAmountRegex(receipt1Mock.amount)).should('be.visible')
    cy.contains(toAmountRegex(receipt2Mock.amount)).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(toAmountRegex(receipt1Mock.amount)).click()
    cy.wait('@getReceipt')
    cy.contains(toAmountRegex(receipt1Mock.amount)).should('exist')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    creatOrUpdate(true)
    cy.wait('@createReceipt', { timeout: 15000 })
    cy.url().should('include', '/receipts')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/incomes_receipts', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateReceipts(req.body)))
    }).as('updateReceipt')
    creatOrUpdate(false)
    cy.wait('@updateReceipt', { timeout: 15000 })
    cy.url().should('include', '/receipts')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    interceptGeneralEndpoint()
    loginInPage()
    insertInToLocalStorage()
    cy.intercept('GET', '**/incomes_receipts*', mockSuccessResponse(receiptsMock)).as('getReceipts')
    cy.intercept('GET', '**/incomes_receipts/rec1_id', mockSuccessResponse(receipt1Mock)).as(
      'getReceipt',
    )
    cy.intercept('PUT', '**/incomes_receipts', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateReceipts(req.body)))
    }).as('createReceipt')
  })

  it('should display receipts list', () => showList(true))
  it('should show receipt details', () => showDetails(true))
  it('should create a new receipt', () => canCreate(true))
  it('should update an existing receipt', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/incomes_receipts',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createReceiptFail')
    creatOrUpdate(true)
    cy.wait('@createReceiptFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/incomes_receipts',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateReceiptFail')
    creatOrUpdate(false)
    cy.wait('@updateReceiptFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display receipts list on mobile', () => showList(false))
  it('should show receipt details on mobile', () => showDetails(false))
  it('should create a new receipt on mobile', () => canCreate(false))
  it('should update an existing receipt on mobile', () => canUpdate(false))
})
