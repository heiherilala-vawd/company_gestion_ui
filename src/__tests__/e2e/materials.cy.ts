import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import { createOrUpdateMaterials } from '../mocks/responses/materials-api'
import { insertInToLocalStorage, interceptGeneralEndpoint, loginInPage } from '../support/utils.ts'

describe('E2E: Materials', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateMaterialsMock[0]
    if (isCreating) {
      cy.contains('Create').click()
    } else {
      cy.contains(<string>material1Mock.name).click()
      cy.wait('@getMaterial')
      cy.contains('Edit').click()
    }
    cy.get('[data-testid="input-name"] input')
      .clear()
      .type(<string>crupdatedData.name)
    cy.get('[data-testid="input-description"] textarea:visible')
      .clear()
      .type(<string>crupdatedData.description, { force: true })
    cy.get('[data-testid="input-unit"]').click()
    cy.contains('Litre').click({ force: true })
    cy.get('button[type="submit"]').click()
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
    cy.get('[data-testid="menu-materials"]').click()
    cy.wait('@getMaterials')
  })

  it('should display materials list', () => {
    cy.contains(<string>material1Mock.name).should('be.visible')
    cy.contains(<string>material2Mock.name).should('be.visible')
  })

  it('should show material details', () => {
    cy.contains(<string>material1Mock.name).click()
    cy.wait('@getMaterial')
    cy.contains(<string>material1Mock.name).should('exist')
    cy.contains(<string>material1Mock.description).should('exist')
  })

  it('should create a new material', () => {
    cy.intercept('PUT', '**/materials', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateMaterials(req.body)))
    }).as('createMaterial')
    creatOrUpdate(true)
    cy.wait('@createMaterial')
    cy.url().should('include', '/materials')
  })

  it('should update an existing material', () => {
    cy.intercept('PUT', '**/materials', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateMaterials(req.body)))
    }).as('updateMaterial')
    creatOrUpdate(false)
    cy.wait('@updateMaterial')
    cy.url().should('include', '/materials')
  })

  it('should show error on create failure', () => {
    cy.intercept(
      'PUT',
      '**/materials',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createMaterialFail')
    creatOrUpdate(true)
    cy.wait('@createMaterialFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    cy.intercept(
      'PUT',
      '**/materials',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateMaterialFail')
    creatOrUpdate(false)
    cy.wait('@updateMaterialFail')
    cy.get('.RaNotification-error').should('be.visible')
  })
})
