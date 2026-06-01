import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  supplier1Mock,
  supplier2Mock,
  createOrUpdateSuppliers,
  crupdateSuppliersMock,
} from '../mocks/responses/suppliers-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
} from '../support/utils.ts'

describe('E2E: Suppliers', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateSuppliersMock[0]
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click()
    } else {
      cy.contains(<string>supplier1Mock.name).click()
      cy.wait('@getSupplier')
      cy.get('.RaEditButton-root').click()
    }
    cy.get('[data-testid="input-name"] input').clear().type(<string>crupdatedData.name)
    cy.get('[data-testid="input-siret"] input').clear().type(<string>crupdatedData.siret)
    cy.get('[data-testid="input-email"] input')
      .clear()
      .type(<string>crupdatedData.email)
    cy.get('[data-testid="input-address"] textarea:visible')
      .clear()
      .type(<string>crupdatedData.address, { force: true })
    cy.get('[data-testid="input-phone"] input')
      .clear()
      .type(<string>crupdatedData.phone)
    cy.get('[data-testid="input-contact_name"] input')
      .clear()
      .type(<string>crupdatedData.contact_name)
    cy.get('button[type="submit"]').click({ force: true })
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-suppliers"]').click()
    cy.wait('@getSuppliers')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.get('[data-testid="menu-item-home"]').should('exist')
    cy.get('[data-testid="menu-suppliers"]').scrollIntoView()
    cy.get('[data-testid="menu-suppliers"]').click({ force: true })
    cy.wait('@getSuppliers')
    cy.get('body').then(($body) => {
      if ($body.find('.RaSidebar-modal').length) {
        cy.get('body').click(0, 0)
      }
    })
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>supplier1Mock.name).should('be.visible')
    cy.contains(<string>supplier2Mock.name).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>supplier1Mock.name).click()
    cy.wait('@getSupplier')
    cy.contains(<string>supplier1Mock.name).should('be.visible')
    cy.contains(<string>supplier1Mock.email).should('be.visible')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '/companies/*/suppliers*', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateSuppliers(req.body)))
    }).as('createSupplier')
    creatOrUpdate(true)
    cy.wait(3000)
    cy.wait('@createSupplier')
    cy.url().should('include', '/suppliers')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '/companies/*/suppliers*', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateSuppliers(req.body)))
    }).as('updateSupplier')
    creatOrUpdate(false)
    cy.wait(3000)
    cy.wait('@updateSupplier')
    cy.url().should('include', '/suppliers')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
  })

  it('should display suppliers list', () => showList(true))
  it('should show supplier details', () => showDetails(true))
  it('should create a new supplier', () => canCreate(true))
  it('should update an existing supplier', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '/companies/*/suppliers*',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createSupplierFail')
    creatOrUpdate(true)
    cy.wait('@createSupplierFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '/companies/*/suppliers*',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateSupplierFail')
    creatOrUpdate(false)
    cy.wait('@updateSupplierFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display suppliers list on mobile', () => showList(false))
  it('should show supplier details on mobile', () => showDetails(false))
  it('should create a new supplier on mobile', () => canCreate(false))
  it('should update an existing supplier on mobile', () => canUpdate(false))
})
