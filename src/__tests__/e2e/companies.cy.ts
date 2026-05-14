import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  company1Mock,
  company2Mock,
  crupdateCompaniesMock,
  createOrUpdateCompanies,
} from '../mocks/responses/companies-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectEnumType,
} from '../support/utils.ts'

describe('E2E: Companies', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateCompaniesMock[0]
    if (isCreating) {
      cy.contains('Create').click()
      selectEnumType('input-company-type', <string>crupdatedData.company_type)
    } else {
      cy.contains(<string>company1Mock.name).click()
      cy.wait('@getCompany')
      cy.get('.RaEditButton-root').click()
    }
    cy.get('[data-testid="input-name"] input')
      .clear()
      .type(<string>crupdatedData.name)
    cy.get('[data-testid="input-description"] textarea:visible')
      .first()
      .clear()
      .type(<string>crupdatedData.description, { force: true })
    cy.get('[data-testid="input-comment"] input')
      .clear()
      .type(<string>crupdatedData.comment)
    cy.get('button[type="submit"]').click()
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-companies"]').click()
    cy.wait('@getCompanies')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.get('[class*="RaSidebarToggleButton"]').first().click()
    cy.get('[data-testid="menu-companies"]').click()
    cy.wait('@getCompanies')
    cy.get('[class*="RaSidebarToggleButton"]').first().click()
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>company1Mock.name).should('be.visible')
    cy.contains(<string>company2Mock.name).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>company1Mock.name).click()
    cy.wait('@getCompany')
    cy.contains(<string>company1Mock.name).should('exist')
    cy.contains(<string>company1Mock.rib).should('exist')
    cy.contains(<string>company1Mock.description).should('exist')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '/companies*', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateCompanies(req.body)))
    }).as('createCompany')
    creatOrUpdate(true)
    cy.wait('@createCompany')
    cy.url().should('include', '/companies')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '/companies*', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateCompanies(req.body)))
    }).as('updateCompany')
    creatOrUpdate(false)
    cy.wait('@updateCompany')
    cy.url().should('include', '/companies')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
  })

  it('should display companies list', () => showList(true))
  it('should show company details', () => showDetails(true))
  it('should create a new company', () => canCreate(true))
  it('should update an existing company', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '/companies*',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createCompanyFail')
    creatOrUpdate(true)
    cy.wait('@createCompanyFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept('PUT', '/companies*', (req) => {
      req.reply(mockErrorResponse('BadRequestException', 'Update failed', 400))
    }).as('updateCompanyFail')
    creatOrUpdate(false)
    cy.wait('@updateCompanyFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display companies list on mobile', () => showList(false))
  it('should show company details on mobile', () => showDetails(false))
  it('should create a new company on mobile', () => canCreate(false))
  it('should update an existing company on mobile', () => canUpdate(false))
})
