import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  materialConsumption1Mock,
  materialConsumption2Mock,
  materialConsumptionsMock,
  crupdateMaterialConsumptionsMock,
  createOrUpdateMaterialConsumptions,
} from '../mocks/responses/material-consumption-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectReferenceWithCreate,
} from '../support/utils.ts'
import { material1Mock } from '../mocks/responses/materials-api'
import { warehouse1Mock } from '../mocks/responses/warehouses-api'

describe('E2E: Material Consumption', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateMaterialConsumptionsMock[0]
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click()
      cy.get('[data-testid="input-id"] input').then(($input) => {
        $input.val('newId')
        $input.trigger('change')
      })
    } else {
      cy.contains(String(materialConsumption1Mock.material_id)).click()
      cy.wait('@getMaterialConsumption')
      cy.get('.RaEditButton-root').click()
    }
    cy.wait('@getJobs')
    cy.get('[data-testid="input-material_id"]').should('be.visible')
    cy.get('[data-testid="input-warehouse_id"]').should('be.visible')
    cy.get('[data-testid="input-job_id"]').should('be.visible')
    selectReferenceWithCreate('input-material_id', 'material_id', <string>material1Mock.name)
    selectReferenceWithCreate('input-warehouse_id', 'warehouse_id', <string>warehouse1Mock.name)
    cy.get('[data-testid="input-quantity"] input')
      .clear()
      .type(<string>(<unknown>crupdatedData.quantity))
    cy.get('[data-testid="input-job_id"]')
      .scrollIntoView()
      .within(() => {
        cy.get('[role="combobox"], .MuiSelect-select').first().click({ force: true })
      })
    cy.get('#menu-job_id li', { timeout: 10000 }).should('have.length.of.at.least', 1)
    cy.get('#menu-job_id li').eq(1).click({ force: true })
    cy.get('button[type="submit"]').click({ force: true })
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-item-home"]').scrollTo('bottom', { duration: 500 })
    cy.wait(200)
    cy.get('[data-testid="menu-material-consumption"]').click()
    cy.wait('@getMaterialConsumptions')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.get('[data-testid="menu-item-home"]').should('exist')
    cy.get('[data-testid="menu-material-consumption"]').scrollIntoView()
    cy.get('[data-testid="menu-material-consumption"]').click({ force: true })
    cy.wait('@getMaterialConsumptions')
    cy.get('body').then(($body) => {
      if ($body.find('.RaSidebar-modal').length) {
        cy.get('body').click(0, 0)
      }
    })
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(String(materialConsumption1Mock.material_id)).should('be.visible')
    cy.contains(String(materialConsumption2Mock.material_id)).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(String(materialConsumption1Mock.material_id)).click()
    cy.wait('@getMaterialConsumption')
    cy.contains(String(materialConsumption1Mock.material_id)).should('exist')
    cy.contains(<string>materialConsumption1Mock.reason).should('exist')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/material_consumption', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateMaterialConsumptions(req.body)))
    }).as('createMaterialConsumption')
    creatOrUpdate(true)
    cy.wait(3000)
    cy.wait('@createMaterialConsumption')
    cy.url().should('include', '/material_consumption')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/material_consumption', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateMaterialConsumptions(req.body)))
    }).as('updateMaterialConsumption')
    creatOrUpdate(false)
    cy.wait(3000)
    cy.wait('@updateMaterialConsumption')
    cy.url().should('include', '/material_consumption')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    cy.intercept(
      'GET',
      '**/material_consumption*',
      mockSuccessResponse(materialConsumptionsMock),
    ).as('getMaterialConsumptions')
    cy.intercept(
      'GET',
      '**/material_consumption/mc1_id',
      mockSuccessResponse(materialConsumption1Mock),
    ).as('getMaterialConsumption')
    cy.intercept(
      'GET',
      '**/material_consumption/newId',
      mockSuccessResponse(materialConsumption1Mock),
    ).as('getMaterialConsumptionCreate')
    loginInPage()
  })

  it('should display material consumption list', () => showList(true))
  it('should show material consumption details', () => showDetails(true))
  it('should create a new material consumption', () => canCreate(true))
  it('should update an existing material consumption', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/material_consumption',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createMaterialConsumptionFail')
    creatOrUpdate(true)
    cy.wait('@createMaterialConsumptionFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/material_consumption',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateMaterialConsumptionFail')
    creatOrUpdate(false)
    cy.wait('@updateMaterialConsumptionFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display material consumption list on mobile', () => showList(false))
  it('should show material consumption details on mobile', () => showDetails(false))
  it('should create a new material consumption on mobile', () => canCreate(false))
  it('should update an existing material consumption on mobile', () => canUpdate(false))
})
