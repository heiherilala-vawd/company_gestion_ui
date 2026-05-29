import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  materialWarehouse1Mock,
  materialWarehouse2Mock,
  materialWarehousesMock,
} from '../mocks/responses/material-warehouse-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectReferenceWithCreate,
} from '../support/utils.ts'
import { material1Mock } from '../mocks/responses/materials-api'
import { warehouse1Mock } from '../mocks/responses/warehouses-api'

describe('E2E: Material Warehouse', () => {
  function creatOrUpdate(isCreating: boolean) {
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click()
      cy.get('[data-testid="input-id"] input').then(($input) => {
        $input.val('newId')
        $input.trigger('change')
      })
    } else {
      cy.contains(<string>materialWarehouse1Mock.material?.name).click()
      cy.wait('@getMaterialWarehouse')
      cy.get('.RaEditButton-root').click()
    }
    selectReferenceWithCreate('input-material_id', 'material_id', <string>material1Mock.name)
    selectReferenceWithCreate('input-warehouse_id', 'warehouse_id', <string>warehouse1Mock.name)
    cy.get('[data-testid="input-quantity"] input').clear().type('100')
    cy.get('button[type="submit"]').click({ force: true })
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-item-home"]').scrollTo('bottom', { duration: 500 })
    cy.wait(200)
    cy.get('[data-testid="menu-stock"]').click()
    cy.wait('@getMaterialWarehouses')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.get('[data-testid="menu-item-home"]').should('exist')
    cy.get('[data-testid="menu-stock"]').scrollIntoView()
    cy.get('[data-testid="menu-stock"]').click({ force: true })
    cy.wait('@getMaterialWarehouses')
    cy.get('body').then(($body) => {
      if ($body.find('.RaSidebar-modal').length) {
        cy.get('body').click(0, 0)
      }
    })
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>materialWarehouse1Mock.material?.name).should('be.visible')
    cy.contains(<string>materialWarehouse2Mock.material?.name).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>materialWarehouse1Mock.material?.name).click()
    cy.wait('@getMaterialWarehouse')
    cy.contains(<string>materialWarehouse1Mock.material?.name).should('exist')
    cy.contains(<string>materialWarehouse1Mock.warehouse?.name).should('exist')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/material_warehouse', (req) => {
      req.reply(mockSuccessResponse([{ ...materialWarehouse1Mock, id: 'newId' }]))
    }).as('createMaterialWarehouse')
    creatOrUpdate(true)
    cy.wait(3000)
    cy.wait('@createMaterialWarehouse')
    cy.url().should('include', '/material_warehouse')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/material_warehouse', (req) => {
      req.reply(mockSuccessResponse([materialWarehouse1Mock]))
    }).as('updateMaterialWarehouse')
    creatOrUpdate(false)
    cy.wait(3000)
    cy.wait('@updateMaterialWarehouse')
    cy.url().should('include', '/material_warehouse')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    cy.intercept('GET', '**/material_warehouse*', mockSuccessResponse(materialWarehousesMock)).as(
      'getMaterialWarehouses',
    )
    cy.intercept(
      'GET',
      '**/material_warehouse/mw1_id',
      mockSuccessResponse(materialWarehouse1Mock),
    ).as('getMaterialWarehouse')
    cy.intercept(
      'GET',
      '**/material_warehouse/newId',
      mockSuccessResponse(materialWarehouse1Mock),
    ).as('getMaterialWarehouseCreate')
    loginInPage()
  })

  it('should display material warehouse list', () => showList(true))
  it('should show material warehouse details', () => showDetails(true))
  it('should create a new material warehouse', () => canCreate(true))
  it('should update an existing material warehouse', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/material_warehouse',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createMaterialWarehouseFail')
    creatOrUpdate(true)
    cy.wait('@createMaterialWarehouseFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/material_warehouse',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateMaterialWarehouseFail')
    creatOrUpdate(false)
    cy.wait('@updateMaterialWarehouseFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display material warehouse list on mobile', () => showList(false))
  it('should show material warehouse details on mobile', () => showDetails(false))
  it('should create a new material warehouse on mobile', () => canCreate(false))
  it('should update an existing material warehouse on mobile', () => canUpdate(false))
})
