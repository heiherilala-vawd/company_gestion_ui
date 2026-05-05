import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  travelMaterials1Mock,
  crupdateTravelMaterialsMock,
  createOrUpdateTravelMaterialss,
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
      cy.contains('Create').click()
    } else {
      cy.contains(<number>travelMaterials1Mock.quantity).click()
      cy.wait('@getTravelMaterial')
      cy.contains('Edit').click()
    }
    selectTravelExpense('Déplacement: ' + travelMaterials1Mock.travel?.expense?.description)
    selectMaterial('material_id')
    cy.get('[data-testid="input-quantity"] input')
      .clear()
      .type(String(<number>crupdatedData.quantity))
    cy.get('button[type="submit"]').click()
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
    cy.get('[data-testid="menu-travel-materials"]').click()
    cy.wait('@getTravelMaterials')
  })

  it('should display travel materials list', () => {
    cy.contains(<number>travelMaterials1Mock.quantity).should('be.visible')
    cy.contains(<number>travelMaterials1Mock.quantity_received).should('be.visible')
    cy.contains(<string>travelMaterials1Mock.material?.name).should('be.visible')
    cy.contains(
      travelMaterials2Mock.travel?.departure_location?.name +
        ' → ' +
        travelMaterials2Mock.travel?.arrival_location?.name,
    ).should('be.visible')
  })

  it('should show travel material details', () => {
    cy.contains(<number>travelMaterials1Mock.quantity).click()
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
  })

  it('should create a new travel material', () => {
    cy.intercept('PUT', '**/travel_materials*', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateTravelMaterialss(req.body)))
    }).as('createTravelMaterial')
    creatOrUpdate(true)
    cy.wait('@createTravelMaterial')
    cy.url().should('include', '/travel_materials')
  })

  it('should update an existing travel material', () => {
    cy.intercept('PUT', '**/travel_materials*', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateTravelMaterialss(req.body)))
    }).as('updateTravelMaterial')
    creatOrUpdate(false)
    cy.wait('@updateTravelMaterial')
    cy.url().should('include', '/travel_materials')
  })

  it('should show error on create failure', () => {
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
    cy.intercept(
      'PUT',
      '**/travel_materials*',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateTravelMaterialFail')
    creatOrUpdate(false)
    cy.wait('@updateTravelMaterialFail')
    cy.get('.RaNotification-error').should('be.visible')
  })
})
