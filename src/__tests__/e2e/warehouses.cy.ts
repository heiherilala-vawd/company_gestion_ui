import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  warehouse1Mock,
  createOrUpdateWarehouses,
  crupdateWarehousesMock,
  warehouse2Mock,
} from '../mocks/responses/warehouses-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectJob,
} from '../support/utils.ts'

describe('E2E: Warehouses', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateWarehousesMock[0]
    if (isCreating) {
      cy.contains('Create').click()
    } else {
      cy.contains(<string>warehouse1Mock.name).click()
      cy.wait('@getWarehouse')
      cy.get('.RaEditButton-root').click()
    }
    cy.get('[data-testid="input-name"] input')
      .clear()
      .type(<string>crupdatedData.name)
    cy.get('[data-testid="input-description"] textarea:visible')
      .clear()
      .type(<string>crupdatedData.description, { force: true })
    if (!isCreating) {
      selectJob()
    }
    cy.get('button[type="submit"]').click()
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-warehouses"]').click()
    cy.wait('@getWarehouses')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.get('[class*="RaSidebarToggleButton"]').first().click()
    cy.get('[data-testid="menu-warehouses"]').click()
    cy.wait('@getWarehouses')
    cy.get('[class*="RaSidebarToggleButton"]').first().click()
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>warehouse1Mock.name).should('be.visible')
    cy.contains(<string>warehouse2Mock.name).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>warehouse1Mock.name).click()
    cy.wait('@getWarehouse')
    cy.contains(<string>warehouse1Mock.name).should('be.visible')
    cy.contains(<string>warehouse1Mock.description).should('be.visible')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/warehouses*', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateWarehouses(req.body)))
    }).as('createWarehouse')
    creatOrUpdate(true)
    cy.wait('@createWarehouse')
    cy.url().should('include', '/warehouses')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/warehouses*', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateWarehouses(req.body)))
    }).as('updateWarehouse')
    creatOrUpdate(false)
    cy.wait('@updateWarehouse')
    cy.url().should('include', '/warehouses')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
  })

  it('should display warehouses list', () => showList(true))
  it('should show warehouse details', () => showDetails(true))
  it('should create a new warehouse', () => canCreate(true))
  it('should update an existing warehouse', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/warehouses***',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createWarehouseFail')
    creatOrUpdate(true)
    cy.wait('@createWarehouseFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/warehouses*',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateWarehouseFail')
    creatOrUpdate(false)
    cy.wait('@updateWarehouseFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display warehouses list on mobile', () => showList(false))
  it('should show warehouse details on mobile', () => showDetails(false))
  it('should create a new warehouse on mobile', () => canCreate(false))
  it('should update an existing warehouse on mobile', () => canUpdate(false))
})
