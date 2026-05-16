import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  equipment1Mock,
  crupdateEquipmentMock,
  createOrUpdateEquipments,
  equipment2Mock,
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
      cy.get('[class*="RaCreateButton"]').click()
    } else {
      cy.contains(<string>equipment1Mock.name).click()
      cy.wait('@getEquipment')
      cy.get('.RaEditButton-root').click()
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
      .type(String(<number>crupdatedData.floor_number))
    cy.get('[data-testid="input-storage_number"] input')
      .clear()
      .type(String(<number>crupdatedData.storage_number))
    cy.get('button[type="submit"]').click()
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-equipments"]').click()
    cy.wait('@getEquipments')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.get('[data-testid="menu-item-home"]').should('exist')
    cy.get('[data-testid="menu-equipments"]').scrollIntoView()
    cy.get('[data-testid="menu-equipments"]').click({ force: true })
    cy.wait('@getEquipments')
    cy.get('body').then(($body) => {
      if ($body.find('.RaSidebar-modal').length) {
        cy.get('body').click(0, 0) // clique hors menu
      }
    })
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>equipment1Mock.name).should('be.visible')
    cy.contains(<string>equipment2Mock.name).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>equipment1Mock.name).click()
    cy.wait('@getEquipment')
    cy.contains(<string>equipment1Mock.name).should('be.visible')
    cy.contains(<string>equipment1Mock.description).should('be.visible')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/equipment', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateEquipments(req.body)))
    }).as('createEquipment')
    creatOrUpdate(true)
    cy.wait(3000)
    cy.wait('@createEquipment')
    cy.url().should('include', '/equipment')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/equipment', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateEquipments(req.body)))
    }).as('updateEquipment')
    creatOrUpdate(false)
    cy.wait(3000)
    cy.wait('@updateEquipment')
    cy.url().should('include', '/equipment')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
  })

  it('should display equipment list', () => showList(true))
  it('should show equipment details', () => showDetails(true))
  it('should create a new equipment', () => canCreate(true))
  it('should update an existing equipment', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
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
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/equipment',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateEquipmentFail')
    creatOrUpdate(false)
    cy.wait('@updateEquipmentFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display equipment list on mobile', () => showList(false))
  it('should show equipment details on mobile', () => showDetails(false))
  it('should create a new equipment on mobile', () => canCreate(false))
  it('should update an existing equipment on mobile', () => canUpdate(false))
})
