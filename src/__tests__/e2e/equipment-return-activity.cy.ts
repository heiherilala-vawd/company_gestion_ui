import { mockSuccessResponse } from '../mocks/responses/auth-api'
import {
  equipmentUsage1Mock,
  returnEquipmentUsageMock,
} from '../mocks/responses/equipment-usage-api'
import { insertInToLocalStorage, interceptGeneralEndpoint, loginInPage } from '../support/utils.ts'

describe('E2E: EquipmentReturnActivity', () => {
  beforeEach(() => {
    interceptGeneralEndpoint()
    loginInPage()
    insertInToLocalStorage()
  })

  function navigateToPage() {
    cy.visit('/#/equipment_return_activity', { failOnStatusCode: false })
    cy.wait('@getEquipmentUsages', { timeout: 20000 })
    cy.wait('@getEquipment', { timeout: 20000 })
  }

  it('should display equipment in use', () => {
    navigateToPage()

    cy.contains('h5', "Retour d'équipement").should('be.visible')
    cy.contains('Excavator XL200').should('be.visible')
  })

  it('should return equipment with RETURNED status and no incident_id', () => {
    const usageId = equipmentUsage1Mock.id

    cy.intercept('PUT', `**/equipment_usages/${usageId}/return*`, (req) => {
      expect(req.query.status).to.eq('RETURNED')
      expect(req.query.incident_id === undefined).to.eq(true)
      req.reply(mockSuccessResponse(returnEquipmentUsageMock(usageId, 'RETURNED')))
    }).as('returnEquipmentRETURNED')

    navigateToPage()

    cy.get(`[data-testid="checkbox-return-${usageId}"]`).click()
    cy.get('[data-testid="submit-return-equipment"]').should('contain', '1')
    cy.get('[data-testid="submit-return-equipment"]').click()

    cy.wait('@returnEquipmentRETURNED')
  })

  it('should return equipment with LOST status and send incident_id', () => {
    const usageId = equipmentUsage1Mock.id

    cy.intercept('PUT', `**/equipment_usages/${usageId}/return*`, (req) => {
      expect(req.query.status).to.eq('LOST')
      expect(req.query.incident_id).to.match(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      )
      req.reply(mockSuccessResponse(returnEquipmentUsageMock(usageId, 'LOST')))
    }).as('returnEquipmentLOST')

    navigateToPage()

    cy.get(`[data-testid="checkbox-return-${usageId}"]`).click()
    cy.get(`[data-testid="status-select-${usageId}"]`).click()
    cy.get('[role="menuitem"][data-value="LOST"]').click()
    cy.get('[data-testid="submit-return-equipment"]').click()

    cy.wait('@returnEquipmentLOST')
  })

  it('should return equipment with BROKEN status and send incident_id', () => {
    const usageId = equipmentUsage1Mock.id

    cy.intercept('PUT', `**/equipment_usages/${usageId}/return*`, (req) => {
      expect(req.query.status).to.eq('BROKEN')
      expect(req.query.incident_id).to.match(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      )
      req.reply(mockSuccessResponse(returnEquipmentUsageMock(usageId, 'BROKEN')))
    }).as('returnEquipmentBROKEN')

    navigateToPage()

    cy.get(`[data-testid="checkbox-return-${usageId}"]`).click()
    cy.get(`[data-testid="status-select-${usageId}"]`).click()
    cy.get('[role="menuitem"][data-value="BROKEN"]').click()
    cy.get('[data-testid="submit-return-equipment"]').click()

    cy.wait('@returnEquipmentBROKEN')
  })
})
