import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  travelMaterials1Mock,
  createOrUpdateTravelMaterials,
  travelMaterials2Mock,
  crupdateTravelMaterialsMock,
} from '../mocks/responses/travel-materials-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectTravelExpense,
  selectMaterial,
} from '../support/utils.ts'

describe('E2E: Travel Materials', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateTravelMaterialsMock[0]
    if (isCreating) {
      cy.get('[data-testid="AddIcon"]').click()
    } else {
      cy.contains(<string>travelMaterials1Mock.material?.name)
        .first()
        .click()
      cy.wait('@getTravelMaterial')
      cy.get('.RaEditButton-root').click()
    }
    selectTravelExpense('Déplacement: ' + travelMaterials1Mock.travel?.expense?.description)
    selectMaterial('material')
    cy.get('[data-testid="input-quantity"] input')
      .clear()
      .type(String(<number>crupdatedData.quantity))
    cy.get('button[type="submit"]').click()
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-travel-materials"]').click()
    cy.wait('@getTravelMaterials')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.get('[class*="RaSidebarToggleButton"]').first().click()
    cy.get('[data-testid="menu-travel-materials"]').click()
    cy.wait('@getTravelMaterials')
    cy.get('body').then(($body) => {
      if ($body.find('.RaSidebar-modal').length) {
        cy.get('body').click(0, 0) // clique hors menu
      }
    })
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) {
      navigateToDesktop()
      cy.contains(<number>travelMaterials1Mock.quantity).should('be.visible')
      cy.contains(<number>travelMaterials1Mock.quantity_received).should('be.visible')
    } else navigateToMobile()
    cy.contains(<string>travelMaterials1Mock.material?.name).should('be.visible')
    cy.contains(
      travelMaterials2Mock.travel?.departure_location?.name +
        ' → ' +
        travelMaterials2Mock.travel?.arrival_location?.name,
    ).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>travelMaterials1Mock.material?.name)
      .first()
      .click()
    cy.wait('@getTravelMaterial')
    cy.contains('Cement bags').should('exist')
    cy.contains(<number>travelMaterials1Mock.quantity).should('exist')
    cy.contains(<number>travelMaterials1Mock.quantity_received).should('exist')
    cy.contains(<string>travelMaterials1Mock.material?.name).should('exist')
    cy.contains(
      travelMaterials1Mock.travel?.departure_location?.name +
        ' → ' +
        travelMaterials1Mock.travel?.arrival_location?.name,
    ).should('be.visible')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/travel_materials*', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateTravelMaterials(req.body)))
    }).as('createTravelMaterial')
    creatOrUpdate(true)
    cy.wait(3000)
    cy.wait('@createTravelMaterial')
    cy.url().should('include', '/travel_materials')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/travel_materials*', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateTravelMaterials(req.body)))
    }).as('updateTravelMaterial')
    creatOrUpdate(false)
    cy.wait(3000)
    cy.wait('@updateTravelMaterial')
    cy.url().should('include', '/travel_materials')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
  })

  it('should display travel materials list', () => showList(true))
  it('should show travel material details', () => showDetails(true))
  it('should create a new travel material', () => canCreate(true))
  it('should update an existing travel material', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/travel_materials*',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createTravelMaterialFail')
    creatOrUpdate(true)
    cy.wait('@createTravelMaterialFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/travel_materials*',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateTravelMaterialFail')
    creatOrUpdate(false)
    cy.wait('@updateTravelMaterialFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display travel materials list on mobile', () => showList(false))
  it('should show travel material details on mobile', () => showDetails(false))
  it('should create a new travel material on mobile', () => canCreate(false))
  it('should update an existing travel material on mobile', () => canUpdate(false))
})
