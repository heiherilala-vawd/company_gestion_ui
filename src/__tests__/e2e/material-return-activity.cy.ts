import { mockSuccessResponse } from '../mocks/responses/auth-api'
import {
  materialConsumption1Mock,
  returnMaterialConsumptionMock,
  completeMaterialConsumptionMock,
} from '../mocks/responses/material-consumption-api'
import { material1Mock } from '../mocks/responses/materials-api'
import { insertInToLocalStorage, interceptGeneralEndpoint, loginInPage } from '../support/utils.ts'

describe('E2E: MaterialReturnActivity', () => {
  beforeEach(() => {
    interceptGeneralEndpoint()
    loginInPage()
    insertInToLocalStorage()
  })

  function navigateToPage() {
    cy.visit('/#/material_return_activity', { failOnStatusCode: false })
    cy.wait('@getMaterialConsumptions', { timeout: 20000 })
    cy.wait('@getMaterials', { timeout: 20000 })
    cy.wait('@getWarehouses', { timeout: 20000 })
  }

  it('should display material consumptions in progress', () => {
    navigateToPage()

    cy.contains('h5', 'Retour de matériaux').should('be.visible')
    cy.contains(material1Mock.name || 'Ciment').should('be.visible')
  })

  it('should return materials via dedicated endpoint', () => {
    const consumptionId = materialConsumption1Mock.id
    const returnQty = 10

    cy.intercept('PUT', `**/material_consumptions/${consumptionId}/return*`, (req) => {
      expect(req.query.quantity).to.eq(String(returnQty))
      req.reply(mockSuccessResponse(returnMaterialConsumptionMock(consumptionId, returnQty)))
    }).as('returnMaterial')

    navigateToPage()

    cy.get(`[data-testid="input-return-qty-${consumptionId}"]`).type(String(returnQty))
    cy.get('[data-testid="submit-return"]').click()

    cy.wait('@returnMaterial')
  })

  it('should complete material consumption via dedicated endpoint', () => {
    const consumptionId = materialConsumption1Mock.id

    cy.intercept('PUT', `**/material_consumptions/${consumptionId}/complete`, (req) => {
      req.reply(mockSuccessResponse(completeMaterialConsumptionMock(consumptionId)))
    }).as('completeMaterial')

    navigateToPage()

    cy.get(`[data-testid="checkbox-finish-${consumptionId}"]`).click()
    cy.get('[data-testid="submit-return"]').click()

    cy.wait('@completeMaterial')
  })

  it('should return and complete in the same submission', () => {
    const consumptionId = materialConsumption1Mock.id
    const returnQty = 5

    cy.intercept('PUT', `**/material_consumptions/${consumptionId}/return*`, (req) => {
      expect(req.query.quantity).to.eq(String(returnQty))
      req.reply(mockSuccessResponse(returnMaterialConsumptionMock(consumptionId, returnQty)))
    }).as('returnMaterialBoth')

    cy.intercept('PUT', `**/material_consumptions/${consumptionId}/complete`, (req) => {
      req.reply(mockSuccessResponse(completeMaterialConsumptionMock(consumptionId)))
    }).as('completeMaterialBoth')

    navigateToPage()

    cy.get(`[data-testid="input-return-qty-${consumptionId}"]`).type(String(returnQty))
    cy.get(`[data-testid="checkbox-finish-${consumptionId}"]`).click()
    cy.get('[data-testid="submit-return"]').click()

    cy.wait('@returnMaterialBoth')
    cy.wait('@completeMaterialBoth')
  })
})
