import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  incomeType1Mock,
  incomeType2Mock,
  createOrUpdateIncomeTypes,
  crupdateIncomeTypesMock,
} from '../mocks/responses/income-types-api'
import { insertInToLocalStorage, interceptGeneralEndpoint, loginInPage } from '../support/utils.ts'

describe('E2E: Income Types', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateIncomeTypesMock[0]
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click()
    } else {
      cy.contains(<string>incomeType1Mock.name).click()
      cy.wait('@getIncomeType')
      cy.get('.RaEditButton-root').click()
    }
    cy.get('[data-testid="input-name"] input')
      .clear()
      .type(<string>crupdatedData.name)
    cy.get('[data-testid="input-description"] textarea:visible')
      .clear()
      .type(<string>crupdatedData.description, { force: true })
    cy.get('button[type="submit"]').click({ force: true })
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-income-types"]').click()
    cy.wait('@getIncomeTypes')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.get('[data-testid="menu-item-home"]').should('exist')
    cy.get('[data-testid="menu-income-types"]').scrollIntoView()
    cy.get('[data-testid="menu-income-types"]').click({ force: true })
    cy.wait('@getIncomeTypes')
    cy.get('body').then(($body) => {
      if ($body.find('.RaSidebar-modal').length) {
        cy.get('body').click(0, 0)
      }
    })
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>incomeType1Mock.name).should('be.visible')
    cy.contains(<string>incomeType2Mock.name).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>incomeType1Mock.name).click()
    cy.wait('@getIncomeType')
    cy.contains(<string>incomeType1Mock.name).should('be.visible')
    cy.contains(<string>incomeType1Mock.description).should('be.visible')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/income_types*', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateIncomeTypes(req.body)))
    }).as('createIncomeType')
    creatOrUpdate(true)
    cy.wait(3000)
    cy.wait('@createIncomeType')
    cy.url().should('include', '/income_types')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/income_types*', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateIncomeTypes(req.body)))
    }).as('updateIncomeType')
    creatOrUpdate(false)
    cy.wait(3000)
    cy.wait('@updateIncomeType')
    cy.url().should('include', '/income_types')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
  })

  it('should display income types list', () => showList(true))
  it('should show income type details', () => showDetails(true))
  it('should create a new income type', () => canCreate(true))
  it('should update an existing income type', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/income_types*',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createIncomeTypeFail')
    creatOrUpdate(true)
    cy.wait('@createIncomeTypeFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/income_types*',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateIncomeTypeFail')
    creatOrUpdate(false)
    cy.wait('@updateIncomeTypeFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display income types list on mobile', () => showList(false))
  it('should show income type details on mobile', () => showDetails(false))
  it('should create a new income type on mobile', () => canCreate(false))
  it('should update an existing income type on mobile', () => canUpdate(false))
})
