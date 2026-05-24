import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  receipt1Mock,
  receipt2Mock,
  receiptsMock,
  crupdateReceiptsMock,
  createOrUpdateReceipts,
} from '../mocks/responses/receipts-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectReferenceWithCreate,
} from '../support/utils.ts'
import { income1Mock } from '../mocks/responses/incomes-api'

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
      cy.contains(String(receipt1Mock.amount)).click()
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
    cy.get('button[type="submit"]').click()
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-item-home"]').scrollTo('bottom', { duration: 500 })
    cy.wait(200)
    cy.get('[data-testid="menu-receipts"]').click()
    cy.wait('@getReceipts')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.get('[data-testid="menu-item-home"]').should('exist')
    cy.get('[data-testid="menu-receipts"]').scrollIntoView()
    cy.get('[data-testid="menu-receipts"]').click({ force: true })
    cy.wait('@getReceipts')
    cy.get('body').then(($body) => {
      if ($body.find('.RaSidebar-modal').length) {
        cy.get('body').click(0, 0)
      }
    })
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(String(receipt1Mock.amount)).should('be.visible')
    cy.contains(String(receipt2Mock.amount)).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(String(receipt1Mock.amount)).click()
    cy.wait('@getReceipt')
    cy.contains(String(receipt1Mock.amount)).should('exist')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/receipts', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateReceipts(req.body)))
    }).as('createReceipt')
    creatOrUpdate(true)
    cy.wait(3000)
    cy.wait('@createReceipt')
    cy.url().should('include', '/receipts')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/receipts', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateReceipts(req.body)))
    }).as('updateReceipt')
    creatOrUpdate(false)
    cy.wait(3000)
    cy.wait('@updateReceipt')
    cy.url().should('include', '/receipts')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    cy.intercept('GET', '**/receipts*', mockSuccessResponse(receiptsMock)).as('getReceipts')
    cy.intercept('GET', '**/receipts/rec1_id', mockSuccessResponse(receipt1Mock)).as('getReceipt')
    cy.intercept('GET', '**/receipts/newId', mockSuccessResponse(receipt1Mock)).as(
      'getReceiptCreate',
    )
    loginInPage()
  })

  it('should display receipts list', () => showList(true))
  it('should show receipt details', () => showDetails(true))
  it('should create a new receipt', () => canCreate(true))
  it('should update an existing receipt', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/receipts',
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
      '**/receipts',
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
