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

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
    cy.get('[data-testid="menu-warehouses"]').click()
    cy.wait('@getWarehouses')
  })

  it('should display warehouses list', () => {
    cy.contains(<string>warehouse1Mock.name).should('be.visible')
    cy.contains(<string>warehouse2Mock.name).should('be.visible')
  })

  it('should show warehouse details', () => {
    cy.contains(<string>warehouse1Mock.name).click()
    cy.wait('@getWarehouse')
    cy.contains(<string>warehouse1Mock.name).should('be.visible')
    cy.contains(<string>warehouse1Mock.description).should('be.visible')
  })

  it('should create a new warehouse', () => {
    cy.intercept('PUT', '**/warehouses*', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateWarehouses(req.body)))
    }).as('createWarehouse')
    creatOrUpdate(true)
    cy.wait('@createWarehouse')
    cy.url().should('include', '/warehouses')
  })

  it('should update an existing warehouse', () => {
    cy.intercept('PUT', '**/warehouses*', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateWarehouses(req.body)))
    }).as('updateWarehouse')
    creatOrUpdate(false)
    cy.wait('@updateWarehouse')
    cy.url().should('include', '/warehouses')
  })

  it('should show error on create failure', () => {
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
    cy.intercept(
      'PUT',
      '**/warehouses*',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateWarehouseFail')
    creatOrUpdate(false)
    cy.wait('@updateWarehouseFail')
    cy.get('.RaNotification-error').should('be.visible')
  })
})
