import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  budgetLine1Mock,
  budgetLine2Mock,
  budgetLinesMock,
  crupdateBudgetLinesMock,
  createOrUpdateBudgetLines,
} from '../mocks/responses/budget-lines-api'
import { insertInToLocalStorage, interceptGeneralEndpoint, loginInPage } from '../support/utils.ts'

describe('E2E: Budget Lines', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateBudgetLinesMock[0]
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click()
      cy.get('[data-testid="input-id"] input').then(($input) => {
        $input.val('newId')
        $input.trigger('change')
      })
    } else {
      cy.contains(<string>budgetLine1Mock.category).click()
      cy.wait('@getBudgetLine')
      cy.get('.RaEditButton-root').click()
    }
    cy.get('[data-testid="input-category"] input')
      .clear()
      .type(<string>crupdatedData.category)
    cy.get('[data-testid="input-planned_amount"] input')
      .clear()
      .type(<string>(<unknown>crupdatedData.planned_amount))
    cy.get('button[type="submit"]').click()
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-item-home"]').scrollTo('bottom', { duration: 500 })
    cy.wait(200)
    cy.get('[data-testid="menu-budget-lines"]').click()
    cy.wait('@getBudgetLines')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.get('[data-testid="menu-item-home"]').should('exist')
    cy.get('[data-testid="menu-budget-lines"]').scrollIntoView()
    cy.get('[data-testid="menu-budget-lines"]').click({ force: true })
    cy.wait('@getBudgetLines')
    cy.get('body').then(($body) => {
      if ($body.find('.RaSidebar-modal').length) {
        cy.get('body').click(0, 0)
      }
    })
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>budgetLine1Mock.category).should('be.visible')
    cy.contains(<string>budgetLine2Mock.category).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>budgetLine1Mock.category).click()
    cy.wait('@getBudgetLine')
    cy.contains(<string>budgetLine1Mock.category).should('exist')
    cy.contains(<string>budgetLine1Mock.description).should('exist')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/budget_lines', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateBudgetLines(req.body)))
    }).as('createBudgetLine')
    creatOrUpdate(true)
    cy.wait(3000)
    cy.wait('@createBudgetLine')
    cy.url().should('include', '/budget_lines')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/budget_lines', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateBudgetLines(req.body)))
    }).as('updateBudgetLine')
    creatOrUpdate(false)
    cy.wait(3000)
    cy.wait('@updateBudgetLine')
    cy.url().should('include', '/budget_lines')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    cy.intercept('GET', '**/budget_lines*', mockSuccessResponse(budgetLinesMock)).as(
      'getBudgetLines',
    )
    cy.intercept('GET', '**/budget_lines/bl1_id', mockSuccessResponse(budgetLine1Mock)).as(
      'getBudgetLine',
    )
    cy.intercept('GET', '**/budget_lines/newId', mockSuccessResponse(budgetLine1Mock)).as(
      'getBudgetLineCreate',
    )
    loginInPage()
  })

  it('should display budget lines list', () => showList(true))
  it('should show budget line details', () => showDetails(true))
  it('should create a new budget line', () => canCreate(true))
  it('should update an existing budget line', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/budget_lines',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createBudgetLineFail')
    creatOrUpdate(true)
    cy.wait('@createBudgetLineFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/budget_lines',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateBudgetLineFail')
    creatOrUpdate(false)
    cy.wait('@updateBudgetLineFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display budget lines list on mobile', () => showList(false))
  it('should show budget line details on mobile', () => showDetails(false))
  it('should create a new budget line on mobile', () => canCreate(false))
  it('should update an existing budget line on mobile', () => canUpdate(false))
})
