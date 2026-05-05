import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  equipment1Mock,
  equipment2Mock,
  equipmentsMock,
  crupdateEquipmentMock,
  createOrUpdateEquipments,
} from '../mocks/responses/equipment-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectWarehouse,
} from '../support/utils.ts'

describe('E2E: Equipment', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateEquipmentMock[0]
    if (isCreating) {
      cy.contains('Create').click()
    } else {
      cy.contains(<string>equipment1Mock.name).click()
      cy.wait('@getEquipment')
      cy.contains('Edit').click()
    }
    cy.get('[data-testid="input-name"] input')
      .clear()
      .type(<string>crupdatedData.name)
    cy.get('[data-testid="input-description"] textarea:visible')
      .clear()
      .type(<string>crupdatedData.description, { force: true })
    selectWarehouse(null)
    cy.get('[data-testid="input-floor_number"] input')
      .clear()
      .type(<string>crupdatedData.floor_number)
    cy.get('[data-testid="input-storage_number"] input')
      .clear()
      .type(<string>crupdatedData.storage_number)
    cy.get('button[type="submit"]').click()
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
    cy.get('[data-testid="menu-equipments"]').click()
    cy.wait('@getEquipments')
  })

  it('should display equipment list', () => {
    cy.contains(<string>equipment1Mock.name).should('be.visible')
    cy.contains(<string>equipment2Mock.name).should('be.visible')
  })

  it('should show equipment details', () => {
    cy.contains(<string>equipment1Mock.name).click()
    cy.wait('@getEquipment')
    cy.contains(<string>equipment1Mock.name).should('be.visible')
    cy.contains(<string>equipment1Mock.description).should('be.visible')
  })

  it('should create a new equipment', () => {
    cy.intercept('PUT', '**/equipment', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateEquipments(req.body)))
    }).as('createEquipment')
    creatOrUpdate(true)
    cy.wait('@createEquipment')
    cy.url().should('include', '/equipment')
  })

  it('should update an existing equipment', () => {
    cy.intercept('PUT', '**/equipment', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateEquipments(req.body)))
    }).as('updateEquipment')
    creatOrUpdate(false)
    cy.wait('@updateEquipment')
    cy.url().should('include', '/equipment')
  })

  it('should show error on create failure', () => {
    cy.intercept(
      'PUT',
      '**/equipment',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createEquipmentFail')
    creatOrUpdate(true)
    cy.wait('@createEquipmentFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    cy.intercept(
      'PUT',
      '**/equipment',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateEquipmentFail')
    creatOrUpdate(false)
    cy.wait('@updateEquipmentFail')
    cy.get('.RaNotification-error').should('be.visible')
  })
})
