import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  crupdateIncomesMock,
  createOrUpdateIncomes,
  income1Mock,
  income2Mock,
} from '../mocks/responses/incomes-api'
import {
  expandMonetarySections,
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectIncomeType,
} from '../support/utils.ts'

describe('E2E: Incomes', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateIncomesMock[0]
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click({ force: true })
    } else {
      cy.contains(<string>income1Mock.source_organization)
        .first()
        .click()
      cy.wait('@getIncome')
      cy.wait(500)

      cy.get('.RaEditButton-root').click()
    }
    cy.wait('@getIncomeTypes')
    selectIncomeType('income_type_id')
    cy.get('[data-testid="input-source_organization"] input')
      .clear()
      .type(<string>crupdatedData.source_organization)
    cy.get('[data-testid="input-invoice_reference"] input')
      .clear()
      .type(<string>crupdatedData.invoice_reference)
    cy.get('[data-testid="input-amount"] input')
      .clear()
      .type(<string>(<unknown>crupdatedData.amount))
    cy.get('[data-testid="input-description"] textarea:visible')
      .clear()
      .type(<string>crupdatedData.description, { force: true })
    cy.get('button[type="submit"]').click({ force: true })
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-item-home"]').scrollTo('bottom', { duration: 500 })
    cy.wait(200)
    expandMonetarySections()
    cy.get('[data-testid="menu-incomes"]').click()
    cy.wait('@getIncomes')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.reload()
    cy.wait(1000)
    cy.get('[class*="RaSidebarToggleButton"]').first().click()
    cy.wait(1000)
    expandMonetarySections()
    cy.get('[data-testid="menu-incomes"]').click({ force: true })
    cy.wait('@getIncomes')
    cy.get('[class*="RaSidebarToggleButton"]').first().click({ force: true })
    cy.wait(500)
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>income1Mock.source_organization).should('be.visible')
    cy.contains(<string>income2Mock.source_organization).should('be.visible')
    cy.contains(<number>income1Mock.amount).should('be.visible')
    cy.contains(<number>income2Mock.amount).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>income1Mock.source_organization)
      .first()
      .click({ force: true })
    cy.wait('@getIncome')
    cy.contains(<string>income1Mock.description).should('exist')
    cy.contains(<string>income1Mock.source_organization).should('exist')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/incomes', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateIncomes(req.body)))
    }).as('createIncome')
    creatOrUpdate(true)
    cy.wait(3000)
    cy.wait('@createIncome')
    cy.url().should('include', '/incomes')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/incomes', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateIncomes(req.body)))
    }).as('updateIncome')
    creatOrUpdate(false)
    cy.wait(3000)
    cy.wait('@updateIncome')
    cy.url().should('include', '/incomes')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
  })

  it('should display incomes list', () => showList(true))
  it('should show income details', () => showDetails(true))
  it('should create a new income', () => canCreate(true))
  it('should update an existing income', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/incomes',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createIncomeFail')
    creatOrUpdate(true)
    cy.wait('@createIncomeFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/incomes',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateIncomeFail')
    creatOrUpdate(false)
    cy.wait('@updateIncomeFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display incomes list on mobile', () => showList(false))
  it('should show income details on mobile', () => showDetails(false))
  it('should create a new income on mobile', () => canCreate(false))
  it('should update an existing income on mobile', () => canUpdate(false))
})
