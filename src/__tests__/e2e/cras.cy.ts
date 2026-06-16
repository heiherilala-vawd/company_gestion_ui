import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  cras1Mock,
  cras2Mock,
  crupdateCrasMock,
  createOrUpdateCras,
} from '../mocks/responses/cras-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectEnumType,
} from '../support/utils.ts'

describe('E2E: Cras', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateCrasMock[0]
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click()
    } else {
      cy.contains(<string>cras1Mock.immatriculation).click()
      cy.wait('@getCrasDetail')
      cy.get('.RaEditButton-root').click()
    }
    cy.get('[data-testid="input-immatriculation"] input')
      .clear()
      .type(<string>crupdatedData.immatriculation)
    selectEnumType('input-type_carburant', 'Diesel')
    cy.get('button[type="submit"]').click({ force: true })
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-cras"]').click()
    cy.wait('@getCras')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.get('[data-testid="menu-item-home"]').should('exist')
    cy.get('[data-testid="menu-cras"]').scrollIntoView()
    cy.get('[data-testid="menu-cras"]').click({ force: true })
    cy.wait('@getCras')
    cy.get('body').then(($body) => {
      if ($body.find('.RaSidebar-modal').length) {
        cy.get('body').click(0, 0)
      }
    })
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>cras1Mock.immatriculation).should('be.visible')
    cy.contains(<string>cras2Mock.immatriculation).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>cras1Mock.immatriculation).click()
    cy.wait('@getCrasDetail')
    cy.contains(<string>cras1Mock.immatriculation).should('be.visible')
    cy.contains(<string>cras1Mock.marque).should('be.visible')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/cras', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateCras(req.body)))
    }).as('createCras')
    creatOrUpdate(true)
    cy.wait(3000)
    cy.wait('@createCras')
    cy.url().should('include', '/cras')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/cras', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateCras(req.body)))
    }).as('updateCras')
    creatOrUpdate(false)
    cy.wait(3000)
    cy.wait('@updateCras')
    cy.url().should('include', '/cras')
  }

  beforeEach(() => {
    interceptGeneralEndpoint()
    loginInPage()
    insertInToLocalStorage()
  })

  it('should display cras list', () => showList(true))
  it('should show cras details', () => showDetails(true))
  it('should create a new cras', () => canCreate(true))
  it('should update an existing cras', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/cras',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createCrasFail')
    creatOrUpdate(true)
    cy.wait('@createCrasFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/cras',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateCrasFail')
    creatOrUpdate(false)
    cy.wait('@updateCrasFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display cras list on mobile', () => showList(false))
  it('should show cras details on mobile', () => showDetails(false))
  it('should create a new cras on mobile', () => canCreate(false))
  it('should update an existing cras on mobile', () => canUpdate(false))
})
