import { mockSuccessResponse } from '../mocks/responses/auth-api'
import { createOrUpdateEquipmentIncidents } from '../mocks/responses'
import { insertInToLocalStorage, interceptGeneralEndpoint, loginInPage } from '../support/utils.ts'

describe('E2E: EquipmentIncident', () => {
  beforeEach(() => {
    interceptGeneralEndpoint()
    loginInPage()
    insertInToLocalStorage()
  })

  function navigateToList() {
    cy.visit('/#/equipment_incident', { failOnStatusCode: false })
    cy.wait('@getEquipmentIncidents', { timeout: 20000 })
  }

  it('should display the incident list', () => {
    navigateToList()

    cy.contains('Endommagé').should('be.visible')
    cy.contains('Perdu').should('be.visible')
  })

  it('should navigate to create and submit a new incident', () => {
    cy.intercept('PUT', '**/equipment_incidents', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateEquipmentIncidents(req.body)))
    }).as('createIncident')

    cy.visit('/#/equipment_incident/create', { failOnStatusCode: false })

    cy.get('[data-testid="input-incident_type"]').click()
    cy.get('[data-value="DAMAGED"]').click()
    cy.get('[data-testid="input-equipment_id"]').clear().type('eq1_id')
    cy.get('[data-testid="input-comment"]').clear().type('Test incident')

    cy.get('button[type="submit"]').click()
    cy.wait('@createIncident', { timeout: 20000 })
  })
})
