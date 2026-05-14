import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  travelEquipment1Mock,
  travelEquipment2Mock,
  crupdateTravelEquipmentMock,
  createOrUpdateTravelEquipments,
} from '../mocks/responses/travel-equipment-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectTravelExpense,
  selectEquipment,
  selectEnumType,
} from '../support/utils.ts'

describe('E2E: Travel Equipments', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateTravelEquipmentMock[0]
    if (isCreating) {
      cy.contains('Create').click()
    } else {
      cy.contains(<number>travelEquipment1Mock.quantity).click()
      cy.wait('@getTravelEquipment')
      cy.get('.RaEditButton-root').click()
    }
    selectTravelExpense('Déplacement: ' + travelEquipment1Mock.travel?.expense?.description)
    selectEquipment('equipment')
    cy.get('[data-testid="input-quantity"] input')
      .clear()
      .type(String(<number>crupdatedData.quantity), { force: true })

    selectEnumType('input-status', 'En cours')
    cy.get('[data-testid="input-comment"] textarea:visible')
      .clear()
      .type(<string>crupdatedData.comment)
    cy.get('button[type="submit"]').click()
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-travel-equipments"]').click()
    cy.wait('@getTravelEquipments')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.get('[class*="RaSidebarToggleButton"]').first().click()
    cy.get('[data-testid="menu-travel-equipments"]').click()
    cy.wait('@getTravelEquipments')
    cy.get('[class*="RaSidebarToggleButton"]').first().click()
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<number>travelEquipment1Mock.quantity).should('be.visible')
    cy.contains(<number>travelEquipment2Mock.quantity).should('be.visible')
    cy.contains(<string>travelEquipment1Mock.equipment?.name).should('be.visible')
    cy.contains(
      travelEquipment2Mock.travel?.departure_location?.name +
        ' → ' +
        travelEquipment2Mock.travel?.arrival_location?.name,
    ).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<number>travelEquipment1Mock.quantity).click()
    cy.wait('@getTravelEquipment')
    cy.contains(<string>travelEquipment1Mock.equipment?.name).should('exist')
    cy.contains(<number>travelEquipment1Mock.quantity).should('exist')
    cy.contains('En cours').should('exist')
    cy.contains(
      travelEquipment1Mock.travel?.departure_location?.name +
        ' → ' +
        travelEquipment1Mock.travel?.arrival_location?.name,
    ).should('be.visible')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/travel_equipment*', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateTravelEquipments([req.body])))
    }).as('createTravelEquipment')
    creatOrUpdate(true)
    cy.wait('@createTravelEquipment')
    cy.url().should('include', '/travel_equipment')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/travel_equipment*', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateTravelEquipments([req.body])))
    }).as('updateTravelEquipment')
    creatOrUpdate(false)
    cy.wait('@updateTravelEquipment')
    cy.url().should('include', '/travel_equipment')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
  })

  it('should display travel equipments list', () => showList(true))
  it('should show travel equipment details', () => showDetails(true))
  it('should create a new travel equipment', () => canCreate(true))
  it('should update an existing travel equipment', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/travel_equipment*',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createTravelEquipmentFail')
    creatOrUpdate(true)
    cy.wait('@createTravelEquipmentFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/travel_equipment*',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateTravelEquipmentFail')
    creatOrUpdate(false)
    cy.wait('@updateTravelEquipmentFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display travel equipments list on mobile', () => showList(false))
  it('should show travel equipment details on mobile', () => showDetails(false))
  it('should create a new travel equipment on mobile', () => canCreate(false))
  it('should update an existing travel equipment on mobile', () => canUpdate(false))
})
