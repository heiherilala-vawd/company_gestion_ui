import { mockSuccessResponse } from '../mocks/responses/auth-api'
import { createOrUpdateEquipments } from '../mocks/responses/equipment-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectWarehouse,
} from '../support/utils.ts'

describe('E2E: Equipment Bulk Create', () => {
  beforeEach(() => {
    interceptGeneralEndpoint()
    insertInToLocalStorage()
    loginInPage()
  })

  function testBulkCreate(desktop: boolean) {
    if (!desktop) cy.viewport(375, 667)

    cy.intercept('PUT', '**/equipments', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateEquipments(req.body)))
    }).as('createEquipments')

    cy.visit('/#/equipment_bulk_create', { failOnStatusCode: false })
    cy.contains("Création en masse d'équipements").should('be.visible')

    selectWarehouse(null)

    cy.get('[data-testid="input-bulk-name"] input').first().clear().type('Marteau Piqueur')
    cy.get('[data-testid="input-bulk-description"] input')
      .first()
      .clear()
      .type('Marteau piqueur professionnel')
    cy.get('[data-testid="input-bulk-quantity"] input').first().clear().type('3')

    cy.get('.RaSimpleFormIterator-add').first().click()
    cy.get('[data-testid="input-bulk-name"] input').eq(1).clear().type('Perceuse')
    cy.get('[data-testid="input-bulk-description"] input')
      .eq(1)
      .clear()
      .type('Perceuse sans fil 18V')
    cy.get('[data-testid="input-bulk-quantity"] input').eq(1).clear().type('2')

    cy.get('[data-testid="submit-bulk-create"]').click()

    cy.wait('@createEquipments')
    cy.get('.RaNotification-success').should('be.visible')
    cy.url({ timeout: 5000 }).should('include', '/equipment')
  }

  it('should bulk create equipment on desktop', () => testBulkCreate(true))
  it('should bulk create equipment on mobile', () => testBulkCreate(false))

  it('should show error when no warehouse selected', () => {
    cy.visit('/#/equipment_bulk_create', { failOnStatusCode: false })
    cy.contains("Création en masse d'équipements").should('be.visible')

    cy.get('[data-testid="submit-bulk-create"]').click()
    cy.get('.RaNotification-error').should('be.visible')
  })
})
