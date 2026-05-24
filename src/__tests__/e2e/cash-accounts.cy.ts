import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  cashAccount1Mock,
  cashAccount2Mock,
  cashAccountsMock,
  crupdateCashAccountsMock,
  createOrUpdateCashAccounts,
} from '../mocks/responses/cash-accounts-api'
import { insertInToLocalStorage, interceptGeneralEndpoint, loginInPage } from '../support/utils.ts'

describe('E2E: Cash Accounts', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateCashAccountsMock[0]
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click()
      cy.get('[data-testid="input-id"] input').then(($input) => {
        $input.val('newId')
        $input.trigger('change')
      })
    } else {
      cy.contains(<string>cashAccount1Mock.name).click()
      cy.wait('@getCashAccount')
      cy.get('.RaEditButton-root').click()
    }
    cy.get('[data-testid="input-name"] input')
      .clear()
      .type(<string>crupdatedData.name)
    cy.get('[data-testid="input-balance"] input')
      .clear()
      .type(<string>(<unknown>crupdatedData.balance))
    cy.get('[data-testid="input-description"] textarea:visible')
      .first()
      .clear()
      .type(<string>crupdatedData.description, { force: true })
    cy.get('button[type="submit"]').click()
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-item-home"]').scrollTo('bottom', { duration: 500 })
    cy.wait(200)
    cy.get('[data-testid="menu-cash-accounts"]').click()
    cy.wait('@getCashAccounts')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.get('[data-testid="menu-item-home"]').should('exist')
    cy.get('[data-testid="menu-cash-accounts"]').scrollIntoView()
    cy.get('[data-testid="menu-cash-accounts"]').click({ force: true })
    cy.wait('@getCashAccounts')
    cy.get('body').then(($body) => {
      if ($body.find('.RaSidebar-modal').length) {
        cy.get('body').click(0, 0)
      }
    })
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>cashAccount1Mock.name).should('be.visible')
    cy.contains(<string>cashAccount2Mock.name).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>cashAccount1Mock.name).click()
    cy.wait('@getCashAccount')
    cy.contains(<string>cashAccount1Mock.name).should('exist')
    cy.contains(<string>cashAccount1Mock.description).should('exist')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/cash_accounts', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateCashAccounts(req.body)))
    }).as('createCashAccount')
    creatOrUpdate(true)
    cy.wait(3000)
    cy.wait('@createCashAccount')
    cy.url().should('include', '/cash_accounts')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/cash_accounts', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateCashAccounts(req.body)))
    }).as('updateCashAccount')
    creatOrUpdate(false)
    cy.wait(3000)
    cy.wait('@updateCashAccount')
    cy.url().should('include', '/cash_accounts')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    cy.intercept('GET', '**/cash_accounts*', mockSuccessResponse(cashAccountsMock)).as(
      'getCashAccounts',
    )
    cy.intercept('GET', '**/cash_accounts/ca1_id', mockSuccessResponse(cashAccount1Mock)).as(
      'getCashAccount',
    )
    cy.intercept('GET', '**/cash_accounts/newId', mockSuccessResponse(cashAccount1Mock)).as(
      'getCashAccountCreate',
    )
    loginInPage()
  })

  it('should display cash accounts list', () => showList(true))
  it('should show cash account details', () => showDetails(true))
  it('should create a new cash account', () => canCreate(true))
  it('should update an existing cash account', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/cash_accounts',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createCashAccountFail')
    creatOrUpdate(true)
    cy.wait('@createCashAccountFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/cash_accounts',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateCashAccountFail')
    creatOrUpdate(false)
    cy.wait('@updateCashAccountFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display cash accounts list on mobile', () => showList(false))
  it('should show cash account details on mobile', () => showDetails(false))
  it('should create a new cash account on mobile', () => canCreate(false))
  it('should update an existing cash account on mobile', () => canUpdate(false))
})
