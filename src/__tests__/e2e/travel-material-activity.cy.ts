import { mockSuccessResponse } from '../mocks/responses/auth-api'
import { travelMaterials1Mock, travelEquipment1Mock } from '../mocks/responses'
import { insertInToLocalStorage, interceptGeneralEndpoint, loginInPage } from '../support/utils.ts'

describe('E2E: TravelMaterialActivity (Réception - Éléments non arrivés par conteneur)', () => {
  beforeEach(() => {
    interceptGeneralEndpoint()
    loginInPage()
    insertInToLocalStorage()
  })

  function navigateToPage() {
    cy.visit('/#/travel_materials_activity', { failOnStatusCode: false })
    cy.wait('@getTravelMaterialsNotArrived', { timeout: 20000 })
    cy.wait('@getTravelEquipmentsNotArrived', { timeout: 20000 })
  }

  it('should display items grouped by container', () => {
    navigateToPage()

    cy.contains('h5', 'Réception - Éléments non arrivés').should('be.visible')

    // Should display both containers
    cy.contains('Blue Box').should('be.visible')
    cy.contains('Red Crate').should('be.visible')

    // Should display equipment and material items
    cy.contains(travelEquipment1Mock.equipment?.name as string).should('be.visible')
    cy.contains(travelMaterials1Mock.material?.name as string).should('be.visible')

    // Should show type labels
    cy.contains('Équipement').scrollIntoView().should('be.visible')
    cy.contains('Matériau').scrollIntoView().should('be.visible')
  })

  it('should confirm material arrival within a container', () => {
    cy.intercept('PUT', '**/travel_materials/arrival', (req) => {
      const body = req.body as Array<{
        id: string
        quantity_received?: number
        quantity_lost?: number
        arrival_location?: string | null
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

    cy.get('[data-testid="warehouse-select"]').select('wh1_id')
    cy.get('[data-testid="new-arrival-location-select"]').select('wh2_id')
    cy.get('[data-testid="checkbox-tm1_id"]').click()
    cy.get('[data-testid="validate-btn"]').should('contain', '1')
    cy.get('[data-testid="validate-btn"]').should('not.be.disabled').click()
    cy.contains('h2', 'Résumé de la validation').should('be.visible')
    cy.get('[data-testid="dialog-confirm-arrival"]').click()

    cy.wait('@confirmMaterialArrival').its('request.body.0.arrival_location').should('eq', 'wh2_id')
  })

  it('should confirm material arrival with null arrival_location', () => {
    cy.intercept('PUT', '**/travel_materials/arrival', (req) => {
      const body = req.body as Array<{
        id: string
        quantity_received?: number
        quantity_lost?: number
        arrival_location?: string | null
      }>
      const updated = body.map((c) => ({
        ...travelMaterials1Mock,
        quantity_received: c.quantity_received ?? travelMaterials1Mock.quantity_received,
        quantity_lost: c.quantity_lost ?? 0,
        updated_at: new Date().toISOString(),
      }))
      req.reply(mockSuccessResponse(updated))
    }).as('confirmMaterialArrivalNoLocation')

    navigateToPage()

    cy.get('[data-testid="warehouse-select"]').select('wh1_id')
    cy.get('[data-testid="checkbox-tm1_id"]').click()
    cy.get('[data-testid="validate-btn"]').should('contain', '1')
    cy.get('[data-testid="validate-btn"]').should('not.be.disabled').click()
    cy.contains('h2', 'Résumé de la validation').should('be.visible')
    cy.get('[data-testid="dialog-confirm-arrival"]').click()

    cy.wait('@confirmMaterialArrivalNoLocation')
      .its('request.body.0.arrival_location')
      .should('be.null')
  })

  it('should confirm equipment arrival within a container', () => {
    cy.intercept('PUT', '**/travel_equipments/arrival', (req) => {
      const body = req.body as Array<{
        id: string
        status: string
        arrival_location?: string | null
        incident_id?: string
      }>
      const updated = body.map((c) => ({
        ...travelEquipment1Mock,
        status: c.status,
        updated_at: new Date().toISOString(),
      }))
      req.reply(mockSuccessResponse(updated))
    }).as('confirmEquipmentArrival')

    navigateToPage()

    cy.get('[data-testid="warehouse-select"]').select('wh1_id')
    cy.get('[data-testid="new-arrival-location-select"]').select('wh2_id')
    cy.get('[data-testid="checkbox-teq1_id"]').click()

    cy.contains('button', /Effectuer la validation/).click()
    cy.contains('h2', 'Résumé de la validation').should('be.visible')
    cy.get('[data-testid="dialog-confirm-arrival"]').click()

    cy.wait('@confirmEquipmentArrival')
      .its('request.body.0.arrival_location')
      .should('eq', 'wh2_id')
  })

  it('should confirm both material and equipment in same validation', () => {
    cy.intercept('PUT', '**/travel_materials/arrival', (req) => {
      req.reply(mockSuccessResponse([travelMaterials1Mock]))
    }).as('confirmMultiMaterial')
    cy.intercept('PUT', '**/travel_equipments/arrival', (req) => {
      req.reply(mockSuccessResponse([travelEquipment1Mock]))
    }).as('confirmMultiEquipment')

    navigateToPage()

    cy.get('[data-testid="warehouse-select"]').select('wh1_id')
    cy.get('[data-testid="checkbox-tm1_id"]').click()
    cy.get('[data-testid="checkbox-teq1_id"]').click()

    cy.get('[data-testid="validate-btn"]').should('contain', '2')
    cy.get('[data-testid="validate-btn"]').click()
    cy.contains('h2', 'Résumé de la validation').should('be.visible')
    cy.get('[data-testid="dialog-confirm-arrival"]').click()

    cy.wait('@confirmMultiMaterial')
    cy.wait('@confirmMultiEquipment')
  })

  it('should send incident_id when equipment status is LOST', () => {
    cy.intercept('PUT', '**/travel_equipments/arrival', (req) => {
      const body = req.body as Array<{
        id: string
        status: string
        arrival_location?: string | null
        incident_id?: string
      }>
      expect(body[0].status).to.eq('LOST')
      expect(body[0].incident_id != null).to.eq(true)
      expect(body[0].incident_id).to.match(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      )
      const updated = body.map((c) => ({
        ...travelEquipment1Mock,
        status: c.status,
        updated_at: new Date().toISOString(),
      }))
      req.reply(mockSuccessResponse(updated))
    }).as('confirmEquipmentLost')

    navigateToPage()

    cy.get('[data-testid="warehouse-select"]').select('wh1_id')
    cy.get('[data-testid="checkbox-teq1_id"]').click()
    cy.get('[data-testid="status-select-teq1_id"]').click()
    cy.get('[role="option"][data-value="LOST"]').click()
    cy.get('[data-testid="validate-btn"]').click()
    cy.contains('h2', 'Résumé de la validation').should('be.visible')
    cy.get('[data-testid="dialog-confirm-arrival"]').click()
    cy.wait('@confirmEquipmentLost')
  })

  it('should send incident_id when equipment status is DAMAGED', () => {
    cy.intercept('PUT', '**/travel_equipments/arrival', (req) => {
      const body = req.body as Array<{
        id: string
        status: string
        arrival_location?: string | null
        incident_id?: string
      }>
      expect(body[0].status).to.eq('DAMAGED')
      expect(body[0].incident_id != null).to.eq(true)
      const updated = body.map((c) => ({
        ...travelEquipment1Mock,
        status: c.status,
        updated_at: new Date().toISOString(),
      }))
      req.reply(mockSuccessResponse(updated))
    }).as('confirmEquipmentDamaged')

    navigateToPage()

    cy.get('[data-testid="warehouse-select"]').select('wh1_id')
    cy.get('[data-testid="checkbox-teq1_id"]').click()
    cy.get('[data-testid="status-select-teq1_id"]').click()
    cy.get('[role="option"][data-value="DAMAGED"]').click()
    cy.get('[data-testid="validate-btn"]').click()
    cy.contains('h2', 'Résumé de la validation').should('be.visible')
    cy.get('[data-testid="dialog-confirm-arrival"]').click()
    cy.wait('@confirmEquipmentDamaged')
  })

  it('should NOT send incident_id when equipment status is ARRIVED', () => {
    cy.intercept('PUT', '**/travel_equipments/arrival', (req) => {
      const body = req.body as Array<{
        id: string
        status: string
        arrival_location?: string | null
        incident_id?: string
      }>
      expect(body[0].status).to.eq('ARRIVED')
      expect(body[0].incident_id === undefined).to.eq(true)
      const updated = body.map((c) => ({
        ...travelEquipment1Mock,
        status: c.status,
        updated_at: new Date().toISOString(),
      }))
      req.reply(mockSuccessResponse(updated))
    }).as('confirmEquipmentArrived')

    navigateToPage()

    cy.get('[data-testid="warehouse-select"]').select('wh1_id')
    cy.get('[data-testid="checkbox-teq1_id"]').click()
    cy.get('[data-testid="validate-btn"]').click()
    cy.contains('h2', 'Résumé de la validation').should('be.visible')
    cy.get('[data-testid="dialog-confirm-arrival"]').click()
    cy.wait('@confirmEquipmentArrived')
  })
})
