import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  createOrUpdateMaterials,
  crupdateMaterialsMock,
  material1Mock,
  material2Mock,
} from '../mocks/responses/materials-api'
import { insertInToLocalStorage, interceptGeneralEndpoint, loginInPage } from '../support/utils.ts'

describe('E2E: Materials', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateMaterialsMock[0]
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click()
    } else {
      cy.contains(<string>material1Mock.name).click()
      cy.wait('@getMaterial')
      cy.get('.RaEditButton-root').click()
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

  function navigateToDesktop() {
    cy.get('[data-testid="menu-materials"]').click()
    cy.wait('@getMaterials')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.get('[data-testid="menu-item-home"]').should('exist')
    cy.get('[data-testid="menu-materials"]').scrollIntoView()
    cy.get('[data-testid="menu-materials"]').click({ force: true })
    cy.wait('@getMaterials')
    cy.get('body').then(($body) => {
      if ($body.find('.RaSidebar-modal').length) {
        cy.get('body').click(0, 0) // clique hors menu
      }
    })
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>material1Mock.name).should('be.visible')
    cy.contains(<string>material2Mock.name).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>material1Mock.name).click()
    cy.wait('@getMaterial')
    cy.contains(<string>material1Mock.name).should('exist')
    cy.contains(<string>material1Mock.description).should('exist')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/materials', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateMaterials(req.body)))
    }).as('createMaterial')
    creatOrUpdate(true)
    cy.wait(3000)
    cy.wait('@createMaterial')
    cy.url().should('include', '/materials')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/materials', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateMaterials(req.body)))
    }).as('updateMaterial')
    creatOrUpdate(false)
    cy.wait(3000)
    cy.wait('@updateMaterial')
    cy.url().should('include', '/materials')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
  })

  it('should display materials list', () => showList(true))
  it('should show material details', () => showDetails(true))
  it('should create a new material', () => canCreate(true))
  it('should update an existing material', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
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
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/materials',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateMaterialFail')
    creatOrUpdate(false)
    cy.wait('@updateMaterialFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display materials list on mobile', () => showList(false))
  it('should show material details on mobile', () => showDetails(false))
  it('should create a new material on mobile', () => canCreate(false))
  it('should update an existing material on mobile', () => canUpdate(false))
})
