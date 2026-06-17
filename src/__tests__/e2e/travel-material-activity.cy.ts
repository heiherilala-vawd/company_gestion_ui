import { mockSuccessResponse } from '../mocks/responses/auth-api'
import { travelMaterials1Mock, travelEquipment1Mock } from '../mocks/responses'
import { insertInToLocalStorage, interceptGeneralEndpoint, loginInPage } from '../support/utils.ts'

describe('E2E: TravelMaterialActivity (Réception - Éléments non arrivés)', () => {
  beforeEach(() => {
    interceptGeneralEndpoint()
    loginInPage()
    insertInToLocalStorage()
  })

  function navigateToPage() {
    cy.visit('/#/travel_materials_activity', { failOnStatusCode: false })
    cy.wait('@getTravelMaterialsNotArrived', { timeout: 20000 })
  }

  it('should display travel materials with not_arrived filter', () => {
    navigateToPage()

    cy.contains('h5', 'Réception - Éléments non arrivés').should('be.visible')
    cy.contains(travelMaterials1Mock.material?.name as string).should('be.visible')
    cy.contains('th', 'Matériau').should('be.visible')
  })

  it('should confirm material arrival successfully', () => {
    cy.intercept('PUT', '**/travel_materials/arrival', (req) => {
      const body = req.body as Array<{
        id: string
        quantity_received?: number
        quantity_lost?: number
      }>
      const updated = body.map((c) => ({
        ...travelMaterials1Mock,
        quantity_received: c.quantity_received ?? travelMaterials1Mock.quantity_received,
        quantity_lost: c.quantity_lost ?? 0,
        updated_at: new Date().toISOString(),
      }))
      req.reply(mockSuccessResponse(updated))
    }).as('confirmMaterialArrival')

    navigateToPage()

    cy.contains('h5', 'Réception - Éléments non arrivés').should('be.visible')
    cy.get('[data-testid="warehouse-select"]').select('wh1_id')
    cy.get('[data-testid="checkbox-tm1_id"]').click()
    cy.get('[data-testid="validate-btn"]').should('contain', '1')
    cy.get('[data-testid="validate-btn"]').should('not.be.disabled').click()
    cy.contains('h2', 'Résumé de la validation').should('be.visible')
    cy.get('[data-testid="dialog-confirm-arrival"]').click()

    cy.wait('@confirmMaterialArrival')
  })

  it('should switch to equipment mode and display travel equipment', () => {
    navigateToPage()

    cy.get('[data-testid="toggle-equipment"]').click()
    cy.wait('@getTravelEquipmentsNotArrived', { timeout: 20000 })

    cy.contains('th', 'Équipement').should('be.visible')
    cy.contains(travelEquipment1Mock.equipment?.name as string).should('be.visible')
  })

  it('should confirm equipment arrival successfully', () => {
    cy.intercept('PUT', '**/travel_equipments/arrival', (req) => {
      const body = req.body as Array<{ id: string; status: string }>
      const updated = body.map((c) => ({
        ...travelEquipment1Mock,
        status: c.status,
        updated_at: new Date().toISOString(),
      }))
      req.reply(mockSuccessResponse(updated))
    }).as('confirmEquipmentArrival')

    navigateToPage()

    cy.get('[data-testid="toggle-equipment"]').click()
    cy.wait('@getTravelEquipmentsNotArrived', { timeout: 20000 })

    cy.get('[data-testid="warehouse-select"]').select('wh1_id')
    cy.get('[data-testid="checkbox-teq1_id"]').click()

    cy.contains('button', /Effectuer la validation/).click()
    cy.contains('h2', 'Résumé de la validation').should('be.visible')
    cy.get('[data-testid="dialog-confirm-arrival"]').click()

    cy.wait('@confirmEquipmentArrival')
  })
})
