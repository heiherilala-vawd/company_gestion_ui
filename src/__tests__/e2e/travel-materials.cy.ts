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
  selectMaterial,
} from '../support/utils.ts'

describe('E2E: Travel Materials', () => {
  function updateRecord() {
    const crupdatedData = crupdateTravelMaterialsMock[0]
    cy.contains('td', <string>travelMaterials1Mock.material?.name).click({ force: true })
    cy.wait('@getTravelMaterial', { timeout: 15000 })
    cy.get('.RaEditButton-root').click({ force: true })
    selectMaterial('material')
    cy.get('[data-testid="input-quantity"] input')
      .clear()
      .type(String(<number>crupdatedData.quantity))
    cy.get('button[type="submit"]').click({ force: true })
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-travel-materials"]').click()
    cy.wait('@getTravelMaterials')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.get('[data-testid="menu-item-home"]').should('exist')
    cy.get('[data-testid="menu-travel-materials"]').scrollIntoView()
    cy.get('[data-testid="menu-travel-materials"]').click({ force: true })
    cy.wait('@getTravelMaterials')
    cy.get('body').then(($body) => {
      if ($body.find('.RaSidebar-modal').length) {
        cy.get('body').click(0, 0)
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
    cy.contains('td', <string>travelMaterials1Mock.material?.name).click({ force: true })
    cy.wait('@getTravelMaterial', { timeout: 15000 })
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

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/travel_materials*', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateTravelMaterials(req.body)))
    }).as('updateTravelMaterial')
    updateRecord()
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
  it('should update an existing travel material', () => canUpdate(true))

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/travel_materials*',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateTravelMaterialFail')
    updateRecord()
    cy.wait('@updateTravelMaterialFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display travel materials list on mobile', () => showList(false))
  it('should show travel material details on mobile', () => showDetails(false))
  it('should update an existing travel material on mobile', () => canUpdate(false))
})
