import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  fixedCost1Mock,
  fixedCost2Mock,
  fixedCostsMock,
  crupdateFixedCostsMock,
  createOrUpdateFixedCosts,
} from '../mocks/responses/fixed-costs-api'
import {
  expandMonetarySections,
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
} from '../support/utils.ts'

describe('E2E: Fixed Costs Mobile', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateFixedCostsMock[0]
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click({ force: true })
      cy.get('[data-testid="input-id"] input').then(($input) => {
        $input.val('newId')
        $input.trigger('change')
      })
    } else {
      cy.contains(<string>fixedCost1Mock.name).click({ force: true })
      cy.wait('@getFixedCost')
      cy.get('.RaEditButton-root').click({ force: true })
    }
    cy.get('[data-testid="input-name"] input')
      .clear()
      .type(<string>crupdatedData.name)
    cy.get('[data-testid="input-amount"] input')
      .clear()
      .type(<string>(<unknown>crupdatedData.amount))
    cy.get('[data-testid="input-description"] textarea:visible')
      .first()
      .clear()
      .type(<string>crupdatedData.description, { force: true })
    cy.get('button[type="submit"]').click({ force: true })
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-item-home"]').scrollTo('bottom', { duration: 500 })
    cy.wait(200)
    cy.get('[data-testid="menu-item-home"]').within(() => {
      cy.contains('Entrées').click({ force: true })
      cy.contains('Sorties continues').click({ force: true })
    })
    cy.get('[data-testid="menu-fixed-costs"]').click()
    cy.wait('@getFixedCosts')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.wait(1000)
    cy.get('[class*="RaSidebarToggleButton"]').first().click({ force: true })
    cy.wait(1000)
    cy.get('[data-testid="menu-item-home"]', { timeout: 10000 }).should('exist')
    expandMonetarySections()
    cy.get('[data-testid="menu-fixed-costs"]').click({ force: true })
    cy.wait('@getFixedCosts')
    cy.get('[class*="RaSidebarToggleButton"]').first().click({ force: true })
    cy.wait(500)
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>fixedCost1Mock.name).should('be.visible')
    cy.contains(<string>fixedCost2Mock.name).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>fixedCost1Mock.name).click({ force: true })
    cy.wait('@getFixedCost')
    cy.contains(<string>fixedCost1Mock.name).should('exist')
    cy.contains(<string>fixedCost1Mock.description).should('exist')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/fixed_costs', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateFixedCosts(req.body)))
    }).as('createFixedCost')
    creatOrUpdate(true)
    cy.wait(3000)
    cy.wait('@createFixedCost')
    cy.url().should('include', '/fixed_costs')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/fixed_costs', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateFixedCosts(req.body)))
    }).as('updateFixedCost')
    creatOrUpdate(false)
    cy.wait(3000)
    cy.wait('@updateFixedCost')
    cy.url().should('include', '/fixed_costs')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    interceptGeneralEndpoint()
    cy.intercept('GET', '**/fixed_costs*', mockSuccessResponse(fixedCostsMock)).as('getFixedCosts')
    cy.intercept('GET', '**/fixed_costs/fc1_id', mockSuccessResponse(fixedCost1Mock)).as(
      'getFixedCost',
    )
    cy.intercept('GET', '**/fixed_costs/newId', mockSuccessResponse(fixedCost1Mock)).as(
      'getFixedCostCreate',
    )
    loginInPage()
    insertInToLocalStorage()
  })

  it('should display fixed costs list', () => showList(true))
  it('should show fixed cost details', () => showDetails(true))
  it('should create a new fixed cost', () => canCreate(true))
  it('should update an existing fixed cost', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/fixed_costs',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createFixedCostFail')
    creatOrUpdate(true)
    cy.wait('@createFixedCostFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/fixed_costs',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateFixedCostFail')
    creatOrUpdate(false)
    cy.wait('@updateFixedCostFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display fixed costs list on mobile', () => showList(false))
  it('should show fixed cost details on mobile', () => showDetails(false))
  it('should create a new fixed cost on mobile', () => canCreate(false))
  it('should update an existing fixed cost on mobile', () => canUpdate(false))
})
